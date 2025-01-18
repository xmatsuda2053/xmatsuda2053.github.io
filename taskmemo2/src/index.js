/**
 * 共通関数
 */
import { Utils } from "./js/common/utils";
import { SvgIcon } from "./js/common/svgIcon";
import { FileManager } from "./js/common/file-manager";

/**
 * Web Components
 */
import { ControlMenu } from "./js/components/control-menu";
import { TreeView } from "./js/components/tree-view";
import { TaskItem } from "./js/components/task-item";
import { PartsInput } from "./js/parts/parts-input";
import { PartsDueDate } from "./js/parts/parts-due-date";
import { PartsStaff } from "./js/parts/parts-staff";
import { PartsRadio } from "./js/parts/parts-radio";
import { PartsTextarea } from "./js/parts/parts-textarea";
import { HistoryItem } from "./js/components/history-item";
import { PartsHistoryItem } from "./js/parts/parts-history-item";

/**
 * スタイルシート
 */
import indexCss from "./style/css/index.css";

/**
 * ファイルマネージャー用のインスタンス変数
 */
const fileManager = new FileManager();

/**
 * アプリケーションのルートクラス
 */
const container = document.getElementById("container");

/**
 * Header領域
 */
const gridHeader = Utils.createDiv("grid-header", []);

/**
 * TreeView用のControl領域
 */
const gridControl = Utils.createDiv("grid-control", []);

/**
 * TreeView領域
 */
const gridTreeView = Utils.createDiv("grid-tree", ["scroll"]);

/**
 * Task領域
 */
const gridTask = Utils.createDiv("grid-task", ["scroll"]);

/**
 * History領域
 */
const gridHistory = Utils.createDiv("grid-history", ["scroll"]);

//--------------------------------------------------
// 定数
//--------------------------------------------------
/**
 * TreeViewの内容を保存するJSONファイル名
 */
const TREE_VIEW_FILE_NAME = "tree.json";

//--------------------------------------------------
// 初期表示
//--------------------------------------------------

/**
 * 画面初期表示
 * @returns {void}
 */
const init = () => {
  // WebComponentsをロードする
  ControlMenu();
  TreeView();
  TaskItem();
  PartsInput();
  PartsDueDate();
  PartsStaff();
  PartsRadio();
  PartsTextarea();
  HistoryItem();
  PartsHistoryItem();

  // CSSを適用する
  document.adoptedStyleSheets = Utils.createStyleSheetWithFilename(indexCss);

  // 初期表示項目を設定する。
  addGridArea();
  addFolderOpenButton();
};

/**
 * `addGridArea` 関数は指定されたコンテナにグリッドエリアを追加する
 */
const addGridArea = () => {
  container.innerHTML = "";
  container.appendChild(gridHeader);
  container.appendChild(gridControl);
  container.appendChild(gridTreeView);
  container.appendChild(gridTask);
  container.appendChild(gridHistory);
};

/**
 * フォルダを開くボタンをコンテナ要素に追加する関数
 */
const addFolderOpenButton = () => {
  // フォルダを開くSVGアイコンを作成する
  const svgFolderIcon = Utils.createSvg("folder", SvgIcon.folderPaths());

  // フォルダを開くボタンを作成する
  const folderOpenButton = Utils.createSvgButton("folder");
  folderOpenButton.id = "folder-open-button";
  folderOpenButton.classList.add("float-button");

  // ボタンのクリックイベントを設定する
  folderOpenButton.addEventListener("click", async (e) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      if (await fileManager.selectDirectory()) {
        // ディレクトリが選択された場合
        addControl();
        addTreeView();
        folderOpenButton.remove();
      }
    } catch (error) {
      console.error("ディレクトリの選択に失敗しました", error);
    }
  });

  // アイコンとボタンをコンテナ要素に追加する
  container.appendChild(svgFolderIcon);
  container.appendChild(folderOpenButton);
};

//--------------------------------------------------
// Control
//--------------------------------------------------
/**
 * Controlを画面に新規追加する
 * @returns {void}
 */
const addControl = () => {
  const control = Utils.createElm("control-menu", "control-menu-root");
  gridControl.innerHTML = "";
  gridControl.appendChild(control);
};

//--------------------------------------------------
// TreeView
//--------------------------------------------------
/**
 * ファイルからツリーデータを非同期に読み込む。
 * @returns {Promise<string|null>} 取得したツリーデータの文字列、または取得に失敗した場合は null。
 */
const loadTreeViewData = async () => {
  try {
    const str = await fileManager.loadFile(TREE_VIEW_FILE_NAME);
    return str;
  } catch (error) {
    console.error("ツリーデータの読み込みに失敗しました:", error);
    return null;
  }
};

/**
 * TreeViewの内容を保存する
 */
const saveTreeView = async () => {
  const treeView = document.getElementById("tree-view-root");
  try {
    await fileManager.writeFile(
      TREE_VIEW_FILE_NAME,
      JSON.stringify(treeView.getTreeViewData())
    );
  } catch (writeError) {
    console.error("ツリーデータの保存に失敗しました:", writeError);
  }
};

/**
 * TreeViewを画面に新規追加する。
 * @returns {Promise<void>}
 */
const addTreeView = async () => {
  try {
    gridTreeView.innerHTML = ""; // 初期化する

    // 空のTreeViewを追加する
    const treeView = Utils.createElm("tree-view", "tree-view-root");
    gridTreeView.appendChild(treeView);

    // TreeViewに各種イベントを登録する
    treeView.setAddTaskHandler(addTaskEventHandler); // タスク追加用のイベントを登録する
    treeView.setClickTaskHandler(clickTaskEventHandler); // タスククリック時のイベントを追加する

    // TreeViewの内容を描画する
    treeView.renderTreeView(await loadTreeViewData());

    // TreeViewにアイテムを追加した場合、内容を保存する
    treeView.addEventListener("addItem", async () => {
      await saveTreeView();
    });
  } catch (error) {
    console.error("TreeViewの初期化中にエラーが発生しました:", error);
  }
};

/**
 * タスクと履歴を新規追加するイベントハンドラ
 * @param {Object} conf - タスクアイテムのオブジェクト。
 * @param {string} conf.id - アイテムのID。
 * @param {string} conf.name - アイテムの名前。
 * @param {string} conf.task - アイテム用のボタン。
 * @returns {void}
 */
const addTaskEventHandler = (conf) => {
  const { id, name } = conf;

  // 空のアイテムを準備
  const taskItem = createEmptyTask(conf);
  const historyItem = createEmptyHistory(conf);

  // 作成したアイテムを画面に追加
  gridTask.innerHTML = "";
  gridHistory.innerHTML = "";
  gridTask.appendChild(taskItem);
  gridHistory.appendChild(historyItem);

  // 作成したアイテムをファイルに保存する
  saveTreeView();
  saveTaskAndHistoryData(id);

  // タスク名を設定し、変更イベントの発行を許可する。
  taskItem.setTitle(name);
  taskItem.enableCustomEvent();

  // 履歴の変更イベントの発行を許可する。
  historyItem.enableCustomEvent();
};

/**
 * タスククリック時にタスクと履歴を開くイベントハンドラ
 * @param {Object} conf - タスクアイテムのオブジェクト。
 * @param {string} conf.id - アイテムのID。
 * @returns {void}
 */
const clickTaskEventHandler = async (conf) => {
  // 空のアイテムを準備
  const taskItem = createEmptyTask(conf);
  const historyItem = createEmptyHistory(conf);

  // 作成したアイテムを画面に追加
  gridTask.innerHTML = "";
  gridHistory.innerHTML = "";
  gridTask.appendChild(taskItem);
  gridHistory.appendChild(historyItem);

  // JSONデータを取得し画面描画
  const { id } = conf;

  try {
    const jsonStr = await fileManager.loadFile(`${id}.json`);
    const data = JSON.parse(jsonStr);

    taskItem.renderTaskItem(data.taskData);
    historyItem.renderHistoryItem(data.historyData);

    taskItem.enableCustomEvent();
    historyItem.enableCustomEvent();

    // 読み込み時に履歴最下部までスクロール
    historyItem.addEventListener("addHistory", () => {
      autoScroll();
    });
    autoScroll();
  } catch (error) {
    console.error("データの読込中にエラーが発生しました:", id, error);
  }
};

/**
 * 履歴の最下部までスクロールする
 */
const autoScroll = () => {
  const bottom = gridHistory.scrollHeight - gridHistory.clientHeight;
  gridHistory.scrollTo({ top: bottom, behavior: "smooth" });
};

/**
 * 空のタスクアイテムを作成する関数
 * @param {Object} conf - 入力項目のオブジェクト～
 * @param {string} conf.id - アイテムの識別用ID～
 * @param {HTMLElement} conf.task - タスクボタンの要素～
 * @returns {HTMLElement} - 作成されたタスクアイテム
 */
const createEmptyTask = (conf) => {
  const taskItem = Utils.createElm("task-item", "task-item");
  const { id, task } = conf;

  // 識別用のIDをセットする
  taskItem.dataset.id = id;

  // イベント登録する
  taskItem.setTitleChangeHandler(createTitleChangeEventHandler(task));
  taskItem.setDueDateChangeHandler(createDueDateChangeEventHandler(task));
  taskItem.setStatusChangeHandler(createStatusChangeEventHandler(task));

  // タスクの内容が変更された場合、ファイルに保存する
  taskItem.addEventListener("changeTask", () => {
    saveTreeView();
    saveTaskAndHistoryData(id);
  });

  return taskItem;
};

/**
 * 空の履歴アイテムを作成する関数
 * @param {Object} conf - 入力項目のオブジェクト～
 * @param {string} conf.id - アイテムの識別用ID～
 * @param {HTMLElement} conf.task - タスクボタンの要素～
 * @returns {HTMLElement} - 作成されたタスクアイテム
 */
const createEmptyHistory = (conf) => {
  const historyItem = Utils.createElm("history-item", "history-item");
  const { id } = conf;

  // 識別用のIDをセットする。
  historyItem.dataset.id = id;

  // 履歴の内容が変更された場合、ファイルに保存する
  historyItem.addEventListener("changeHistory", () => {
    saveTreeView();
    saveTaskAndHistoryData(id);
  });

  return historyItem;
};

/**
 * タイトル変更時のTreeView操作イベントハンドラを作成する。
 * @param {HTMLElement} task - 対象のタスクボタン。
 * @returns {Function} 変更された名前を設定するイベントハンドラ。
 */
const createTitleChangeEventHandler = (task) => {
  return (newName) => {
    task.innerText = newName; // ボタンのテキストを変更する
    task.dataset.name = newName; // ボタンのデータ属性を変更する
  };
};

/**
 * 期限日変更時のTreeView操作イベントハンドラを作成する。
 * @param {HTMLElement} task - 対象のタスクボタン。
 * @returns {Function} 変更された期限日を設定するイベントハンドラ。
 */
const createDueDateChangeEventHandler = (task) => {
  return (newDuedateString) => {
    task.dataset.duedate = newDuedateString;
  };
};

/**
 * 進捗率変更時のTreeView操作イベントハンドラを作成する。
 * @param {HTMLElement} task - 対象のタスクボタン。
 * @returns {Function} 変更された進捗率を設定するイベントハンドラ。
 */
const createStatusChangeEventHandler = (task) => {
  return (newStatus) => {
    task.dataset.status = newStatus;
  };
};

/**
 * タスクデータと履歴データを保存する関数
 * @param {string} id - 保存するデータのファイル名の一部となるID～
 * @returns {void}
 */
const saveTaskAndHistoryData = async (id) => {
  try {
    await fileManager.writeFile(
      `${id}.json`,
      JSON.stringify({
        taskData: document.getElementById("task-item").getTaskData(),
        historyData: document.getElementById("history-item").getHistoryData(),
      })
    );
  } catch (error) {
    console.error("データの保存中にエラーが発生しました:", id, error);
  }
};

/**
 * 画面ロード処理
 * @returns {void}
 */
window.addEventListener("load", () => {
  init();
});
