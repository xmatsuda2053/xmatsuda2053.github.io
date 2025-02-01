import { ElmUtils } from "../../utils/elm-utils";
import { SvgUtils } from "../../utils/svg-utils";
import { FileManager } from "../../classes/file-manager";

import { SvgBtn } from "../svgBtn/svg-btn";
import { TreeView } from "../treeView/tree-view";

import styles from "./style/task-memo.css";

//--------------------------------------------------
// 定数
//--------------------------------------------------
/**
 * TreeViewの内容を保存するJSONファイル名
 */
const TREE_VIEW_FILE_NAME = "tree.json";

/**
 * TaskMemo コンポーネント
 * @class TaskMemo
 * @extends {HTMLElement}
 */
export function TaskMemo() {
  class TaskMemo extends HTMLElement {
    // *******************************************************
    // * 初期処理
    // *******************************************************

    /**
     * コンストラクタ
     * @return {void}
     */
    constructor() {
      super();

      this.fileManager = new FileManager();
      SvgBtn();
      TreeView();

      // Shadow DOMをオープンモードでアタッチ
      this.attachShadow({ mode: "open" });
      this.shadowRoot.innerHTML = "";

      // CSSを適用
      this.shadowRoot.adoptedStyleSheets = ElmUtils.createStylesheet(styles);

      // 各種コンテンツを格納するためのGridを初期化
      this.treeviewMenu = ElmUtils.createElm("div", "treeview-menu");

      this.contentsMenu = ElmUtils.createElm("div", "contents-menu");

      this.treeview = ElmUtils.createElm("div", "treeview", ["scroll"]);

      this.contents = ElmUtils.createElm("div", "contents");
      this.contents.appendChild(this.#createFolderOpenBtnInFloatArea());

      this.container = ElmUtils.createElm("div", "container");
      this.container.appendChild(this.treeviewMenu);
      this.container.appendChild(this.contentsMenu);
      this.container.appendChild(this.treeview);
      this.container.appendChild(this.contents);

      this.shadowRoot.appendChild(this.container);
    }

    /**
     * フォルダを開くボタンを作成するメソッド
     * @private
     * @description
     * フォルダを開くためのボタンを作成し、そのアイコンを設定し、円形にする。
     * ボタンがクリックされると、"folderOpen" をコンソールにログ出力する。
     * @returns {HTMLElement} - 作成されたfolderOpenBtn要素
     */
    #createFolderOpenBtnInFloatArea() {
      const folderOpenBtn = ElmUtils.createElm("svg-btn", "folder-open");
      folderOpenBtn.iconPaths = SvgUtils.folderPaths;
      folderOpenBtn.isCircle = true;

      /**
       * ボタンクリック
       */
      folderOpenBtn.addEventListener("click", async () => {
        try {
          if (await this.fileManager.selectDirectory()) {
            this.#addEmptyTreeView();
            this.#loadTreeViewData();
            folderOpenBtn.remove();
          }
        } catch (error) {
          console.error("ディレクトリの選択に失敗しました", error);
        }
      });

      /**
       * Floatボタン用の領域でラップ
       */
      const floatBtns = ElmUtils.createFloatArea();
      floatBtns.appendChild(folderOpenBtn);

      return floatBtns;
    }

    // *******************************************************
    // * TreeView制御処理
    // *******************************************************

    /**
     * 空のTreeViewを作成し、各種イベントリスナーを登録する。
     * @return {void}
     */
    #addEmptyTreeView() {
      this.treeViewRoot = ElmUtils.createElm("tree-view", "tree-view-root");
      this.treeview.appendChild(this.treeViewRoot);

      // タスクを新規追加した際のイベント
      this.treeViewRoot.addEventListener("addTaskItem", (e) => {
        this.#saveTreeView();
      });

      // グループを新規追加した際のイベント
      this.treeViewRoot.addEventListener("addGroupItem", (e) => {
        this.#saveTreeView();
      });

      // アイテムを削除した際のイベント
      this.treeViewRoot.addEventListener("deleteItem", (e) => {
        this.#saveTreeView();
      });

      // タスクをクリックした際のイベント
      this.treeViewRoot.addEventListener("clickTaskItem", (e) => {
        console.log(`task-memo) click task item : ${e.id}`);
      });

      // グループをクリックした際のイベント
      this.treeViewRoot.addEventListener("clickGroupItem", (e) => {
        console.log(`group-memo) click group item : ${e.id}`);
      });
    }

    /**
     * この非同期メソッドは、ツリービューデータをファイルから読み込み、
     * 読み込んだデータを使用してツリービューをレンダリングします。
     * 読み込みが失敗した場合、エラーメッセージをログに記録します。
     * @returns {Promise<void>} このメソッドの処理が完了したことを示すプロミス
     */
    async #loadTreeViewData() {
      try {
        const jsonStr = await this.fileManager.loadFile(TREE_VIEW_FILE_NAME);
        this.treeViewRoot.render(jsonStr);
      } catch (error) {
        console.error("ツリーデータの読み込みに失敗しました:", error);
      }
    }

    /**
     * この非同期メソッドは、ツリービューデータをJSON形式でファイルに保存します。
     * ツリービューデータを取得し、ファイルに書き込みます。
     * 保存処理が失敗した場合、エラーメッセージをログに記録します。
     * @returns {Promise<void>} このメソッドの処理が完了したことを示すプロミス
     */
    async #saveTreeView() {
      try {
        const jsonStr = JSON.stringify(this.treeViewRoot.getData());
        await this.fileManager.writeFile(TREE_VIEW_FILE_NAME, jsonStr);
      } catch (writeError) {
        console.error("ツリーデータの保存に失敗しました:", writeError);
      }
    }
  }
  customElements.define("task-memo", TaskMemo);
}
