/**
 * 共通関数
 */
import { Utils } from "./js/common/utils";
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
let fileManager;

//--------------------------------------------------
// Control
//--------------------------------------------------
/**
 * Controlを画面に新規追加する
 * @returns {void}
 */
const addControl = () => {
  const gridControl = document.getElementById("grid-control");
  const control = document.createElement("control-menu");
  gridControl.innerHTML = "";
  gridControl.appendChild(control);
  control.id = "control-menu-root";
};

//--------------------------------------------------
// TreeView
//--------------------------------------------------
/**
 * TreeViewを画面に新規追加する
 * @returns {void}
 */
const addTreeView = async () => {
  // 空のツリービューを追加する
  const gridTreeView = document.getElementById("grid-tree");
  const treeView = document.createElement("tree-view");
  gridTreeView.innerHTML = "";
  gridTreeView.appendChild(treeView);
  treeView.id = "tree-view-root";

  treeView.registerAddTaskHandler(AddTaskEventHandler); //タスク追加用のイベントを登録
  treeView.registerClickTaskHandler(clickTaskEventHandler); //タスククリック時のイベントを追加

  // TreeViewコンテンツのデータを取得し描画する
  await fileManager.loadFile("tree.json").then((jsonStr) => {
    // TreeViewを描画
    if (jsonStr) {
      treeView.renderTreeView(jsonStr);
    }
  });

  // TreeViewにアイテムを追加した場合、内容を保存する
  treeView.addEventListener("addItem", async () => {
    await fileManager.writeFile(
      "tree.json",
      JSON.stringify(treeView.getTreeViewData())
    );
  });
};

/**
 * 空のTaskItemとHistoryItemを作成
 * @param {string} id
 * @param {string} name タスク名
 * @param {HTMLElement} element タスクボタン
 */
const createEmptyTaskAndHistory = (id, btn) => {
  const gridTask = document.getElementById("grid-task");
  const gridHistory = document.getElementById("grid-history");
  const taskItem = document.createElement("task-item");
  const historyItem = document.createElement("history-item");

  const treeView = document.getElementById("tree-view-root");

  // 既存の画面をクリア
  gridTask.innerHTML = "";
  gridHistory.innerHTML = "";

  // 識別用のIDをセット
  taskItem.dataset.id = id;
  historyItem.dataset.id = id;

  taskItem.id = "task-item";
  historyItem.id = "history-item";

  /**
   * タイトル変更時、タスクボタンにタイトルを反映する
   * @param {string} changeName
   */
  const changeTitleHandler = (changeName) => {
    btn.innerText = changeName;
    btn.dataset.name = changeName;
  };
  taskItem.registerChangeTitleHandler(changeTitleHandler);

  /**
   * 期限日のdeadline変更時、タスクボタンに結果を反映する
   * @param {string} duedateString
   */
  const changeDeadlineHandler = (duedateString) => {
    btn.dataset.duedate = duedateString;
    treeView.setDeadline(btn);
  };
  taskItem.registerChangeDeadlineHandler(changeDeadlineHandler);

  /**
   * 作業完了時（進捗100%）、タスクボタンに結果を反映する
   */
  const changeStatusHandler = (status) => {
    if (status < 100) {
      btn.classList.remove("task-finished");
    } else {
      btn.classList.add("task-finished");
    }
  };
  taskItem.registerChangeStatusHandler(changeStatusHandler);

  // 変更内容の保存処理
  /**
   * タスク・履歴データを保存する
   */
  const saveData = async () => {
    // TreeViewを保存
    const treeView = document.getElementById("tree-view-root");
    await fileManager.writeFile(
      "tree.json",
      JSON.stringify(treeView.getTreeViewData())
    );

    // タスクと履歴を保存
    const data = {
      taskData: taskItem.getTaskData(),
      historyData: historyItem.getHistoryData(),
    };
    await fileManager.writeFile(`${id}.json`, JSON.stringify(data));
  };

  // タスク変更時の処理
  taskItem.addEventListener("changeTask", async () => {
    await saveData();
  });

  // 履歴変更時の処理
  historyItem.addEventListener("changeHistory", async () => {
    await saveData();
  });

  // 新規画面を描画
  gridTask.appendChild(taskItem);
  gridHistory.appendChild(historyItem);
  saveData();
};

/**
 * タスク追加イベント
 * @param {string} id
 * @param {string} name タスク名
 * @param {HTMLElement} btn タスクボタン
 */
const AddTaskEventHandler = (id, name, btn) => {
  // 空のアイテムを準備
  createEmptyTaskAndHistory(id, btn);
  const taskItem = document.getElementById("task-item");
  const historyItem = document.getElementById("history-item");

  // タスク名を画面に設定
  taskItem.setTitle(name);

  // 入力内容変更時のイベントを有効化
  taskItem.enableCustomEvent();
  historyItem.enableCustomEvent();
};

/**
 * タスククリックイベント
 * @param {string} id
 * @param {HTMLElement} btn タスクボタン
 */
const clickTaskEventHandler = async (id, btn) => {
  // 空のアイテムを準備
  createEmptyTaskAndHistory(id, btn);
  const taskItem = document.getElementById("task-item");
  const historyItem = document.getElementById("history-item");

  // JSONデータを取得し画面描画
  const jsonStr = await fileManager.loadFile(`${id}.json`);
  const data = JSON.parse(jsonStr);

  taskItem.renderTaskItem(data.taskData);
  historyItem.renderHistoryItem(data.historyData);

  taskItem.enableCustomEvent();
  historyItem.enableCustomEvent();

  /**
   * 履歴追加時、最下部に自動スクロールする
   */
  const autoScroll = () => {
    const gridHistory = document.getElementById("grid-history");
    const bottom = gridHistory.scrollHeight - gridHistory.clientHeight;
    gridHistory.scrollTo({ top: bottom, behavior: "smooth" });
  };
  historyItem.addEventListener("addHistory", () => {
    autoScroll();
  });
  autoScroll();
};

//--------------------------------------------------
// 初期表示
//--------------------------------------------------

/**
 * レイアウトを定義するGridおよびCSSをDOMに追加する
 * @returns {void}
 */
const init = () => {
  /**
   * 指定されたIDおよびクラスリストを持つ新しいdiv要素を作成する
   * @param {string} id - 新しいdiv要素に割り当てるID
   * @param {string[]} classList - 新しいdiv要素に追加するクラスの配列
   * @returns {HTMLDivElement} 新しく作成されたdiv要素
   */
  const createGrid = (id, classList) => {
    const div = document.createElement("div");
    div.id = id;
    div.classList.add(...classList);
    return div;
  };

  // CSSおよびGridを画面に適用する
  document.adoptedStyleSheets = Utils.createStyleSheetWithFilename(indexCss);

  const container = document.getElementById("container");
  container.innerHTML = "";
  container.appendChild(createGrid("grid-header", []));
  container.appendChild(createGrid("grid-control", []));
  container.appendChild(createGrid("grid-tree", ["scroll"]));
  container.appendChild(createGrid("grid-task", ["scroll"]));
  container.appendChild(createGrid("grid-history", ["scroll"]));

  // フォルダを開くボタンを追加する
  const svgIcon = Utils.createSvg("folder", [
    {
      path: "M0 0h24v24H0z",
    },
    {
      path: "M5 4h4l3 3h7a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-11a2 2 0 0 1 2 -2",
    },
  ]);

  const folderOpenButton = Utils.createSvgButton("folder");
  folderOpenButton.id = "folder-open-button";
  folderOpenButton.classList.add("float-button");

  container.appendChild(svgIcon);
  container.appendChild(folderOpenButton);

  // フォルダを開くイベントを追加する
  folderOpenButton.addEventListener("click", async (e) => {
    e.preventDefault();
    e.stopPropagation();

    fileManager = new FileManager();
    if (await fileManager.selectDirectory()) {
      folderOpenButton.remove();
      addControl();
      addTreeView();
    }
  });
};

/**
 * 画面ロード処理
 * @returns {void}
 */
window.addEventListener("load", () => {
  // WebComponentsを読み込み
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

  // 画面初期表示
  init();
});
