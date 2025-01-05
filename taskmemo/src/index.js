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
 * TreeViewにアイテムを追加する。
 */
const addTreeView = () => {
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

    // タスク内容の表示
    const contents = document.getElementById("contents");
    const taskContents = document.createElement("task-contents");
    contents.innerHTML = "";
    contents.appendChild(taskContents);

    taskContents.setFileManager(fileManager);
    taskContents.setTitleChangeHandler(titleChangeHandler);
    taskContents.readTaskData(elm.dataset.id);

    // タスク履歴の表示
    const history = document.getElementById("history");
    const taskHistory = document.createElement("task-history");
    history.innerHTML = "";
    history.appendChild(taskHistory);

    taskHistory.setFileManager(fileManager);
    taskHistory.readTaskHistoryData(elm.dataset.id);

    // 変更内容保存
    const saveFile = async () => {
      const fileName = `${elm.dataset.id}.json`;
      const taskData = taskContents.getFormInputData();
      const historyData = taskHistory.getHistoryData();
      await fileManager.saveFile(
        fileName,
        JSON.stringify({ taskData, historyData })
      );
    };

    taskContents.addEventListener("formChangeEvent", async (e) => {
      await saveFile();
    });

    taskHistory.addEventListener("formChangeEvent", async (e) => {
      await saveFile();
    });
  };

  const treeviewArea = document.getElementById("treeview");
  const treeView = document.createElement("tree-view");
  treeView.classList.add("item");

  // ファイルマネージャーを設定
  treeView.setFileManager(fileManager);

  // タスク追加ボタンのクリック時の処理を注入
  treeView.setTaskClickHandler(taskClickHandler);

  // ツリービューにアイテムを追加
  treeView.readTreeData();
  treeviewArea.appendChild(treeView);
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
      addTreeView();
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
