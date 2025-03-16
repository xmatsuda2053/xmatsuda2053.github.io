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

import { ContentsGroup } from "../contents-group/contents-group";
import { ContentsTask } from "../contents-task/contents-task";
import { ContentsHistory } from "../contents-history/contents-hisotry";
import { ContentsHistoryItem } from "../contents-history/contetns-history-item";

import { FormFieldset } from "../form/form-fieldset";
import { FormInput } from "../form/form-input";
import { FormDate } from "../form/form-date";
import { FormTextarea } from "../form/form-textarea";
import { FormTable } from "../form/form-table";
import { FormRadio } from "../form/form-radio";

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

      FormFieldset();
      FormInput();
      FormDate();
      FormTextarea();
      FormTable();
      FormRadio();

      ContentsGroup();
      ContentsTask();
      ContentsHistory();
      ContentsHistoryItem();

      this.fileManager = new FileManager();

      // Shadow DOMをオープンモードでアタッチ
      this.attachShadow({ mode: "open" });

      // CSSを適用
      this.shadowRoot.adoptedStyleSheets = ElmUtils.createStylesheet(styles);

      // オブジェクトを配置
      this.container = ElmUtils.createElm("div", "container");
      this.treeView = ElmUtils.createElm("div", "treeview", ["scroll"]);
      this.contents = ElmUtils.createElm("div", "contents");

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

      this.treeViewRoot.searchHandler = async (text) => {
        return await this.fileManager.search(text);
      };

      this.treeView.innerHTML = "";
      this.treeView.appendChild(this.treeViewRoot);

      // 各イベントを登録
      this.#attachAddTaskEventListener();
      this.#attachAddGroupEventListener();
      this.#attachDeleteTreeViewItemEventListener();
      this.#attachChangeTreeViewEventListener();
      this.#attachClickTaskItemEventListener();
      this.#attachClickGroupItemEventListener();
      this.#attachDblClickGroupItemEventListener();
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
          const item = e.detail.item;
          this.#addContentsTask(item.id, item.name);
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
          const item = e.detail.item;
          this.#addContentsGroup(item.id, item.name, group);
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
          const item = e.detail.item;
          this.#addContentsTask(item.id, item.name);
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
          const item = e.detail.item;
          this.#addContentsGroup(item.id, item.name);
        }
      );
    }

    /**
     * TreeViewのグループダブルクリックイベントを登録
     */
    #attachDblClickGroupItemEventListener() {
      this.treeViewRoot.addEventListener(
        EventConst.DBL_CLICK_GROUP_EVENT_NAME,
        (e) => {
          const item = e.detail.item;
          this.treeViewRoot.toggleGroup(item.id);
          this.#addContentsGroup(item.id, item.name);
        }
      );
    }

    // *******************************************************
    // * グループアイテム
    // *******************************************************

    /**
     * 非同期でコンテンツグループを追加します。
     * @param {string} id - グループID。
     * @param {string} name - グループ名。
     * @returns {Promise<null|void>} - 失敗した場合はnullを返します。
     */
    async #addContentsGroup(id, name) {
      try {
        // TreeViewのアイテムを取得
        const group = this.treeViewRoot.getItemById(id);

        // TreeViewのアイテムを選択中に変更
        this.treeViewRoot.selectItemById(id);

        // データ取得
        let str = await this.fileManager.loadFile(`${id}.json`);

        // グループコンテンツ作成
        this.contentsGroup = ElmUtils.createElm("contents-group");
        this.contentsGroup.groupId = id;
        if (!str) {
          this.contentsGroup.groupTitle = name;
          const newData = this.contentsGroup.getData();
          await this.#saveContentsGroup(id, newData);
          str = await this.fileManager.loadFile(`${id}.json`);
        }
        this.contentsGroup.render(str);
        this.contentsGroup.renderItems(this.treeViewRoot.getGroupItemsById(id));

        // グループコンテンツを登録
        this.contents.innerHTML = "";
        this.contents.appendChild(this.contentsGroup);

        // グループの変更を検知し反映
        this.contentsGroup.addEventListener(
          EventConst.CHANGE_CONTENTS_GROUP_EVENT_NAME,
          async (e) => {
            const data = this.contentsGroup.getData();
            await this.#saveContentsGroup(id, data);
            group.name = data.title;
            group.refreshView();
          }
        );

        // グループ内のグループのクリックを検知
        this.contentsGroup.addEventListener(
          EventConst.CLICK_CONTENTS_GROUP_GROUP_EVENT_NAME,
          (e) => {
            const item = e.detail.item;
            this.#addContentsGroup(item.id, item.name);
          }
        );

        // グループ内のタスクのクリックを検知
        this.contentsGroup.addEventListener(
          EventConst.CLICK_CONTENTS_GROUP_TASK_EVENT_NAME,
          (e) => {
            const item = e.detail.item;
            this.#addContentsTask(item.id, item.name);
          }
        );
      } catch (error) {
        console.error("グループデータの読み込みに失敗しました:", error);
        return null;
      }
    }

    /**
     * 非同期でグループコンテンツを保存します。
     * @param {string} id - グループID。
     * @param {object} data - 保存するデータ。
     * @returns {Promise<void>}
     */
    async #saveContentsGroup(id, data) {
      try {
        const finename = `${id}.json`;
        await this.fileManager.writeFile(finename, JSON.stringify(data));
      } catch (writeError) {
        console.error("グループコンテンツの保存に失敗しました:", writeError);
      }
    }

    // *******************************************************
    // * タスクアイテム
    // *******************************************************

    /**
     * 非同期でタスクを追加します。
     * @param {string} id - タスクID。
     * @param {string} name - タスク名。
     * @returns {Promise<null|void>} - 失敗した場合はnullを返します。
     */
    async #addContentsTask(id, name) {
      try {
        // TreeViewのアイテムを取得
        const task = this.treeViewRoot.getItemById(id);

        // TreeViewのアイテムを選択中に変更
        this.treeViewRoot.selectItemById(id);

        // データ取得
        let str = await this.fileManager.loadFile(`${id}.json`);

        // タスクコンテンツ作成
        this.contentsTask = ElmUtils.createElm("contents-task");
        this.contentsTask.taskId = id;
        if (!str) {
          this.contentsTask.taskTitle = name;
          const newData = this.contentsTask.getData();
          await this.#saveContentsTask(id, newData);
          str = await this.fileManager.loadFile(`${id}.json`);
        }
        this.contentsTask.render(str);

        // タスクコンテンツを登録
        this.contents.innerHTML = "";
        this.contents.appendChild(this.contentsTask);

        // タスクの変更を検知し反映
        this.contentsTask.addEventListener(
          EventConst.CHANGE_CONTENTS_TASK_EVENT_NAME,
          async (e) => {
            const data = this.contentsTask.getData();
            await this.#saveContentsTask(id, data);

            task.name = data.taskData.title;
            task.duedate = data.taskData.dueDate;
            task.priority = data.taskData.priority;
            task.status = data.taskData.status;

            task.refreshView();
          }
        );
      } catch (error) {
        console.error("タスクデータの読み込みに失敗しました:", error);
        return null;
      }
    }

    /**
     * 非同期でタスクコンテンツを保存します。
     * @param {string} id - タスクID。
     * @param {object} data - 保存するデータ。
     * @returns {Promise<void>}
     */
    #saveContentsTask(id, data) {
      try {
        const finename = `${id}.json`;
        this.fileManager.writeFile(finename, JSON.stringify(data));
      } catch (writeError) {
        console.error("タスクコンテンツの保存に失敗しました:", writeError);
      }
    }
  }
  customElements.define("task-memo", TaskMemo);
}
