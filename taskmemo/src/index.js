import { Utils } from "./js/com/utils";
import { FileManager } from "./js/com/file-manager";
import { SearchBar } from "./js/component/search-bar";
import { TreeView } from "./js/component/tree-view";
import { TaskContents } from "./js/component/task-contents";
import { TaskHistory } from "./js/component/task-history";
import { TaskHistoryItem } from "./js/component/task-history-item";

import styles from "./style/css/index-style.css";

let fileManager = null;

/**
 * 検索エリアに検索バーを追加する。
 * @returns {void}
 */
const addSearch = () => {
  const searchArea = document.getElementById("search");
  const searchBar = document.createElement("search-bar");
  searchBar.classList.add("item");
  searchArea.appendChild(searchBar);
};

/**
 * 変更内容を保存
 */
const saveFile = async () => {
  const taskContents = document.getElementById("taskContentsRoot");
  const taskHistory = document.getElementById("taskHistoryRoot");

  const fileName = `${taskContents.dataset.id}.json`;
  const taskData = taskContents.getFormInputData();
  const historyData = taskHistory.getHistoryData();

  if (!taskData) return;
  if (!historyData) return;

  await fileManager.saveFile(
    fileName,
    JSON.stringify({ taskData, historyData })
  );
};

/**
 * 入力内容変更時のイベントを削除
 */
const removeFormChangeEvent = () => {
  const oldTaskContetns = document.getElementById("taskContentsRoot");
  const oldTaskHistory = document.getElementById("taskHistoryRoot");

  if (oldTaskContetns !== null) {
    oldTaskContetns.removeEventListener("formChangeEvent", saveFile);
    oldTaskContetns.remove();
  }
  if (oldTaskHistory !== null) {
    oldTaskHistory.removeEventListener("formChangeEvent", saveFile);
    oldTaskHistory.remove();
  }
};

/**
 * TreeViewにアイテムを追加する。
 */
const addTreeView = async () => {
  /**
   * TreeViewのアイテムをクリックした際の処理
   * @param {Element} elm
   */
  const taskClickHandler = (elm) => {
    // タイトル変更時の処理
    const titleChangeHandler = (event) => {
      const text = elm.getElementsByClassName("name-text")[0];
      text.innerText = event.target.value;
      elm.dataset.name = event.target.value;
    };

    // 進捗変更時の処理
    const taskStatusChangeHander = (percent) => {
      if (percent === "100") {
        elm.classList.add("task-finish");
      } else {
        if (elm.classList.contains("task-finish")) {
          elm.classList.remove("task-finish");
        }
      }
    };

    // 既存のイベントを削除（予期せぬ上書き防止）
    removeFormChangeEvent();

    // タスク内容の表示
    const contents = document.getElementById("contents");
    const taskContents = document.createElement("task-contents");

    contents.innerHTML = "";
    contents.appendChild(taskContents);

    taskContents.id = "taskContentsRoot";
    taskContents.dataset.id = elm.dataset.id;
    taskContents.setFileManager(fileManager);
    taskContents.setTitleChangeHandler(titleChangeHandler);
    taskContents.setStatusChangeHandler(taskStatusChangeHander);
    taskContents.readTaskData(elm.dataset.id);

    // タスク履歴の表示
    const history = document.getElementById("history");
    const taskHistory = document.createElement("task-history");

    history.innerHTML = "";
    history.appendChild(taskHistory);

    taskHistory.id = "taskHistoryRoot";
    taskHistory.setFileManager(fileManager);
    taskHistory.readTaskHistoryData(elm.dataset.id);

    // 変更内容保存
    taskContents.addEventListener("formChangeEvent", saveFile);
    taskHistory.addEventListener("formChangeEvent", saveFile);
  };

  const treeviewArea = document.getElementById("treeview");
  const treeView = document.createElement("tree-view");
  treeView.classList.add("item");
  treeView.id = "tree-view-item";

  // ファイルマネージャーを設定
  treeView.setFileManager(fileManager);

  // タスク追加ボタンのクリック時の処理を注入
  treeView.setTaskClickHandler(taskClickHandler);

  // ツリービューにアイテムを追加
  await treeView.readTreeData();
  treeviewArea.appendChild(treeView);

  // 画面初期表示を空の状態にする
  removeFormChangeEvent();
  treeView.removeSelectedTask();
};

/**
 * フォルダを開くボタンを追加する。
 * @returns {void}
 */
const addBtnFolderOpen = () => {
  const container = document.getElementById("container");

  const svg = Utils.svg({
    name: "folder",
    paths: [
      {
        path: "M5 4h4l3 3h7a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-11a2 2 0 0 1 2 -2",
      },
    ],
  });

  const btn = Utils.svgBtn("folder");
  btn.classList.add("float-button");
  btn.addEventListener("click", async () => {
    fileManager = new FileManager();
    if (await fileManager.openDirectory()) {
      addSearch();
      await addTreeView();
      btn.remove();
    }
  });

  container.appendChild(svg);
  container.appendChild(btn);
};

/**
 * グリッド領域を追加する。
 * @returns {void}
 */
const addGridArea = () => {
  const createArea = (id, classList) => {
    const div = document.createElement("div");
    div.id = id;
    classList.forEach((cls) => {
      div.classList.add(cls);
    });
    return div;
  };

  const search = createArea("search", ["grid-area--search"]);
  const treeview = createArea("treeview", ["grid-area--tree", "scroll"]);
  const contents = createArea("contents", ["grid-area--contents", "scroll"]);
  const history = createArea("history", ["grid-area--history", "scroll"]);

  const container = document.getElementById("container");
  container.innerHTML = "";
  container.appendChild(search);
  container.appendChild(treeview);
  container.appendChild(contents);
  container.appendChild(history);

  document.adoptedStyleSheets = Utils.createStyle(styles);
};

/**
 * ページ読み込み時の処理
 * @returns {void}
 */
window.addEventListener("load", () => {
  // Web Componentを定義
  SearchBar();
  TreeView();
  TaskContents();
  TaskHistory();
  TaskHistoryItem();

  // 初期表示
  addGridArea();
  addBtnFolderOpen();
});
