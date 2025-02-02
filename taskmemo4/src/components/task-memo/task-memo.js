// CSS
import { ElmUtils } from "../../utils/elm-utils";
import { SvgConst } from "../../constants/svg-const";
import { FileManager } from "../../classes/file-manager";

import styles from "./style/task-memo.css";

// Componets
import { SvgBtn } from "../svg-btn/svg-btn";
import { ContextMenu } from "../context-menu/context-menu";
import { EventConst } from "../../constants/event-const";

import { TreeView } from "../tree-view/tree-view";
import { TaskTitle } from "../tree-view/task-title";
import { GroupTitle } from "../tree-view/group-title";

/**
 * TaskMemo コンポーネント
 * @class TaskMemo
 * @extends {HTMLElement}
 */
export function TaskMemo() {
  // *******************************************************
  // * 定数
  // *******************************************************
  /**
   * TreeViewの内容を保存するJSONファイル名
   */
  const TREE_VIEW_FILE_NAME = "tree.json";

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

      SvgBtn();
      ContextMenu();

      TreeView();
      TaskTitle();
      GroupTitle();

      this.fileManager = new FileManager();

      // Shadow DOMをオープンモードでアタッチ
      this.attachShadow({ mode: "open" });

      // CSSを適用
      this.shadowRoot.adoptedStyleSheets = ElmUtils.createStylesheet(styles);

      // オブジェクトを配置
      this.container = ElmUtils.createElm("div", "container");
      this.treeView = ElmUtils.createElm("div", "treeview", ["scroll"]);
      this.contents = ElmUtils.createElm("div", "contents", ["scroll"]);

      this.contents.appendChild(this.#createFolderOpenBtnInFloatArea());

      this.container.appendChild(this.treeView);
      this.container.appendChild(this.contents);

      this.shadowRoot.innerHTML = "";
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
      folderOpenBtn.iconPaths = SvgConst.folderPaths;
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

      this.treeView.innerHTML = "";
      this.treeView.appendChild(this.treeViewRoot);

      // 各イベントを登録
      this.#attachAddTaskEventListener();
      this.#attachAddGroupEventListener();
      this.#attachDeleteTreeViewItemEventListener();
      this.#attachChangeTreeViewEventListener();
      this.#attachClickTaskItemEventListener();
      this.#attachClickGroupItemEventListener();
    }

    /**
     * ツリービューデータを非同期に読み込み、ツリービューにレンダリングするメソッド。
     * ファイル読み込みに失敗した場合、エラーメッセージをコンソールに表示し、nullを返します。
     *
     * @returns {Promise<string|null>} - 非同期処理の完了を表すPromise。成功時はツリーデータの文字列、失敗時はnullを返す。
     */
    async #loadTreeViewData() {
      try {
        const str = await this.fileManager.loadFile(TREE_VIEW_FILE_NAME);
        this.treeViewRoot.renderTreeView(str);
      } catch (error) {
        console.error("ツリーデータの読み込みに失敗しました:", error);
        return null;
      }
    }

    /**
     * ツリービューデータを保存するメソッド。
     * 指定されたデータをJSON形式にシリアライズし、ファイルに書き込みます。
     *
     * @returns {Promise<void>} - 非同期処理の完了を表すPromise。
     */
    async #saveTreeView() {
      try {
        const data = this.treeViewRoot.getData();
        await this.fileManager.writeFile(
          TREE_VIEW_FILE_NAME,
          JSON.stringify(data)
        );
      } catch (writeError) {
        console.error("ツリーデータの保存に失敗しました:", writeError);
      }
    }

    /**
     * 新規タスクの追加イベントを登録
     */
    #attachAddTaskEventListener() {
      this.treeViewRoot.addEventListener(
        EventConst.ADD_NEW_TASK_ITEM_EVENT_NAME,
        async (e) => {
          await this.#saveTreeView();
        }
      );
    }

    /**
     * 新規グループの追加イベントを登録
     */
    #attachAddGroupEventListener() {
      this.treeViewRoot.addEventListener(
        EventConst.ADD_NEW_GROUP_ITEM_EVENT_NAME,
        async (e) => {
          await this.#saveTreeView();
        }
      );
    }

    /**
     * TreeViewアイテムの削除イベントを登録
     */
    #attachDeleteTreeViewItemEventListener() {
      this.treeViewRoot.addEventListener(
        EventConst.DELETE_TREEVIEW_ITEM_EVENT_NAME,
        async (e) => {
          await this.#saveTreeView();
        }
      );
    }

    /**
     * TreeViewの変更イベントを登録
     */
    #attachChangeTreeViewEventListener() {
      this.treeViewRoot.addEventListener(
        EventConst.CHANGE_TREEVIEW_EVENT_NAME,
        async (e) => {
          await this.#saveTreeView();
        }
      );
    }

    /**
     * TreeViewのタスククリックイベントを登録
     */
    #attachClickTaskItemEventListener() {
      this.treeViewRoot.addEventListener(
        EventConst.CLICK_TASK_EVENT_NAME,
        (e) => {
          console.log(`clickTaskItem:${e.detail.item.id}`);
        }
      );
    }

    /**
     * TreeViewのグループクリックイベントを登録
     */
    #attachClickGroupItemEventListener() {
      this.treeViewRoot.addEventListener(
        EventConst.CLICK_GROUP_EVENT_NAME,
        (e) => {
          console.log(`clickGruopItem:${e.detail.item.id}`);
        }
      );
    }
  }
  customElements.define("task-memo", TaskMemo);
}
