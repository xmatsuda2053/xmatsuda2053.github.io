/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TaskMemo: () => (/* binding */ TaskMemo)
/* harmony export */ });
/* harmony import */ var _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _constants_svg_const__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
/* harmony import */ var _classes_file_manager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4);
/* harmony import */ var _style_task_memo_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5);
/* harmony import */ var _svg_btn_svg_btn__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(8);
/* harmony import */ var _context_menu_context_menu__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(12);
/* harmony import */ var _constants_event_const__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(13);
/* harmony import */ var _tree_view_tree_view__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(15);
/* harmony import */ var _tree_view_task_title__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(17);
/* harmony import */ var _tree_view_group_title__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(21);
/* harmony import */ var _contents_group_contents_group__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(23);
/* harmony import */ var _contents_task_contents_task__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(26);
/* harmony import */ var _contents_history_contents_hisotry__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(28);
/* harmony import */ var _contents_history_contetns_history_item__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(30);
/* harmony import */ var _form_form_fieldset__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(32);
/* harmony import */ var _form_form_input__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(34);
/* harmony import */ var _form_form_date__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(36);
/* harmony import */ var _form_form_textarea__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(38);
/* harmony import */ var _form_form_table__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(40);
/* harmony import */ var _form_form_radio__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(42);
// CSS






// Componets




















/**
 * TaskMemo コンポーネント
 * @class TaskMemo
 * @extends {HTMLElement}
 */
function TaskMemo() {
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

      (0,_svg_btn_svg_btn__WEBPACK_IMPORTED_MODULE_4__.SvgBtn)();
      (0,_context_menu_context_menu__WEBPACK_IMPORTED_MODULE_5__.ContextMenu)();

      (0,_tree_view_tree_view__WEBPACK_IMPORTED_MODULE_7__.TreeView)();
      (0,_tree_view_task_title__WEBPACK_IMPORTED_MODULE_8__.TaskTitle)();
      (0,_tree_view_group_title__WEBPACK_IMPORTED_MODULE_9__.GroupTitle)();

      (0,_form_form_fieldset__WEBPACK_IMPORTED_MODULE_14__.FormFieldset)();
      (0,_form_form_input__WEBPACK_IMPORTED_MODULE_15__.FormInput)();
      (0,_form_form_date__WEBPACK_IMPORTED_MODULE_16__.FormDate)();
      (0,_form_form_textarea__WEBPACK_IMPORTED_MODULE_17__.FormTextarea)();
      (0,_form_form_table__WEBPACK_IMPORTED_MODULE_18__.FormTable)();
      (0,_form_form_radio__WEBPACK_IMPORTED_MODULE_19__.FormRadio)();

      (0,_contents_group_contents_group__WEBPACK_IMPORTED_MODULE_10__.ContentsGroup)();
      (0,_contents_task_contents_task__WEBPACK_IMPORTED_MODULE_11__.ContentsTask)();
      (0,_contents_history_contents_hisotry__WEBPACK_IMPORTED_MODULE_12__.ContentsHistory)();
      (0,_contents_history_contetns_history_item__WEBPACK_IMPORTED_MODULE_13__.ContentsHistoryItem)();

      this.fileManager = new _classes_file_manager__WEBPACK_IMPORTED_MODULE_2__.FileManager();

      // Shadow DOMをオープンモードでアタッチ
      this.attachShadow({ mode: "open" });

      // CSSを適用
      this.shadowRoot.adoptedStyleSheets = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__.ElmUtils.createStylesheet(_style_task_memo_css__WEBPACK_IMPORTED_MODULE_3__["default"]);

      // オブジェクトを配置
      this.container = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__.ElmUtils.createElm("div", "container");
      this.treeView = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__.ElmUtils.createElm("div", "treeview", ["scroll"]);
      this.contents = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__.ElmUtils.createElm("div", "contents");

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
      const folderOpenBtn = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__.ElmUtils.createElm("svg-btn", "folder-open");
      folderOpenBtn.iconPaths = _constants_svg_const__WEBPACK_IMPORTED_MODULE_1__.SvgConst.folderPaths;
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
      const floatBtns = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__.ElmUtils.createFloatArea();
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
      this.treeViewRoot = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__.ElmUtils.createElm("tree-view", "tree-view-root");

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
        _constants_event_const__WEBPACK_IMPORTED_MODULE_6__.EventConst.ADD_NEW_TASK_ITEM_EVENT_NAME,
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
        _constants_event_const__WEBPACK_IMPORTED_MODULE_6__.EventConst.ADD_NEW_GROUP_ITEM_EVENT_NAME,
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
        _constants_event_const__WEBPACK_IMPORTED_MODULE_6__.EventConst.DELETE_TREEVIEW_ITEM_EVENT_NAME,
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
        _constants_event_const__WEBPACK_IMPORTED_MODULE_6__.EventConst.CHANGE_TREEVIEW_EVENT_NAME,
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
        _constants_event_const__WEBPACK_IMPORTED_MODULE_6__.EventConst.CLICK_TASK_EVENT_NAME,
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
        _constants_event_const__WEBPACK_IMPORTED_MODULE_6__.EventConst.CLICK_GROUP_EVENT_NAME,
        (e) => {
          const item = e.detail.item;
          this.#addContentsGroup(item.id, item.name);
        }
      );
    }

    /**
     * TreeViewのグループダブルクリックイベントを登録
     */
    //TODO
    #attachDblClickGroupItemEventListener() {
      this.treeViewRoot.addEventListener(
        _constants_event_const__WEBPACK_IMPORTED_MODULE_6__.EventConst.DBL_CLICK_GROUP_EVENT_NAME,
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
        this.contentsGroup = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__.ElmUtils.createElm("contents-group");
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
          _constants_event_const__WEBPACK_IMPORTED_MODULE_6__.EventConst.CHANGE_CONTENTS_GROUP_EVENT_NAME,
          async (e) => {
            const data = this.contentsGroup.getData();
            await this.#saveContentsGroup(id, data);
            group.name = data.title;
            group.refreshView();
          }
        );

        // グループ内のグループのクリックを検知
        this.contentsGroup.addEventListener(
          _constants_event_const__WEBPACK_IMPORTED_MODULE_6__.EventConst.CLICK_CONTENTS_GROUP_GROUP_EVENT_NAME,
          (e) => {
            const item = e.detail.item;
            this.#addContentsGroup(item.id, item.name);
          }
        );

        // グループ内のタスクのクリックを検知
        this.contentsGroup.addEventListener(
          _constants_event_const__WEBPACK_IMPORTED_MODULE_6__.EventConst.CLICK_CONTENTS_GROUP_TASK_EVENT_NAME,
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
        this.contentsTask = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__.ElmUtils.createElm("contents-task");
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
          _constants_event_const__WEBPACK_IMPORTED_MODULE_6__.EventConst.CHANGE_CONTENTS_TASK_EVENT_NAME,
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


/***/ }),
/* 2 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ElmUtils: () => (/* binding */ ElmUtils)
/* harmony export */ });
/**
 * 要素作成ユーティリティクラス
 */
class ElmUtils {
  /**
   * CSSスタイルシートを作成するメソッド
   *
   * @method createStylesheet
   * @param {string} style - スタイルの文字列
   * @returns {CSSStyleSheet[]} - 作成されたスタイルシートの配列
   * @description
   * 与えられたスタイルの文字列を元に、新しいCSSStyleSheetを作成して返す。
   */
  static createStylesheet = (style) => {
    const styleSheet = new CSSStyleSheet();
    styleSheet.replaceSync(style);
    return [styleSheet];
  };

  /**
   * 指定されたタグ名、ID、およびクラスリストを持つ要素を作成するメソッド
   *
   * @method createElm
   * @param {string} tag - 作成する要素のタグ名
   * @param {string|null} [id=null] - 作成する要素のID。デフォルトはnull。
   * @param {Array} [classList=[]] - 追加するクラスのリスト。デフォルトは空の配列。
   * @returns {HTMLElement} - 作成されたHTML要素
   * @description
   * 指定されたタグ名、ID、およびクラスリストを持つHTML要素を作成して返す。
   */
  static createElm = (tag, id = null, classList = []) => {
    const div = document.createElement(tag);

    if (id) div.id = id;
    if (classList.length) div.classList.add(...classList);

    return div;
  };

  /**
   * フロートエリアを作成するメソッド
   *
   * @method createFloatArea
   * @returns {HTMLElement} - 作成されたフロートエリアのHTML要素
   * @description
   * 指定されたクラスリストを持つフロートエリアのdiv要素を作成して返す。
   */
  static createFloatArea = () => {
    return this.createElm("div", null, ["float-area"]);
  };

  /**
   * 指定されたターゲット要素のタグ名が指定されたタグ名と一致するかどうかを確認します。
   *
   * @static
   * @param {HTMLElement} target - ターゲット要素
   * @param {string} tagName - 一致を確認するタグ名
   * @returns {boolean} ターゲットのタグ名が指定されたタグ名と一致する場合は true、それ以外の場合は false
   */
  static tagEq = (target, tagName) => {
    return target.tagName.toLowerCase() === tagName;
  };
}


/***/ }),
/* 3 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SvgConst: () => (/* binding */ SvgConst)
/* harmony export */ });
/**
 * SVG定数クラス
 */
class SvgConst {
  /**
   * 縦の線SVGのパスデータを含むオブジェクトの配列を生成する。
   * @type {Object}
   * @property {string} name - アイコンフォルダの名前
   * @property {Array<Object>} paths - 各パスオブジェクトの配列
   * @property {string} paths.path - インラインSVGパスの定義
   */
  static linePaths = {
    name: "icon-line",
    paths: [{ path: "M0 0h24v24H0z" }, { path: "M12 4v17" }],
  };

  /**
   * すべて開くSVGのパスデータを含むオブジェクトの配列を生成する。
   * @type {Object}
   * @property {string} name - アイコンフォルダの名前
   * @property {Array<Object>} paths - 各パスオブジェクトの配列
   * @property {string} paths.path - インラインSVGパスの定義
   */
  static treeOpenPaths = {
    name: "icon-tree-open",
    paths: [
      { path: "M0 0h24v24H0z" },
      { path: "M12 20h-6a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h6" },
      { path: "M18 14v7" },
      { path: "M18 3v7" },
      { path: "M15 18l3 3l3 -3" },
      { path: "M15 6l3 -3l3 3" },
    ],
  };

  /**
   * すべて閉じるSVGのパスデータを含むオブジェクトの配列を生成する。
   * @type {Object}
   * @property {string} name - アイコンフォルダの名前
   * @property {Array<Object>} paths - 各パスオブジェクトの配列
   * @property {string} paths.path - インラインSVGパスの定義
   */
  static treeClosePaths = {
    name: "icon-tree-close",
    paths: [
      { path: "M0 0h24v24H0z" },
      { path: "M12 20h-6a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h6" },
      { path: "M18 14v7" },
      { path: "M18 3v7" },
      { path: "M15 7l3 3l3 -3" },
      { path: "M15 17l3 -3l3 3" },
    ],
  };

  /**
   * 静的なフォルダパスを定義するオブジェクト
   * @type {Object}
   * @property {string} name - アイコンフォルダの名前
   * @property {Array<Object>} paths - 各パスオブジェクトの配列
   * @property {string} paths.path - インラインSVGパスの定義
   */
  static folderPaths = {
    name: "icon-folder",
    paths: [
      {
        path: "M0 0h24v24H0z",
      },
      {
        path: "M5 4h4l3 3h7a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-11a2 2 0 0 1 2 -2",
      },
    ],
  };

  /**
   * 四角形に十字SVGのパスデータを含むオブジェクトの配列
   *
   * @type {Object}
   * @property {string} name - アイコンフォルダの名前
   * @property {Array<Object>} paths - 各パスオブジェクトの配列
   * @property {string} paths.path - インラインSVGパスの定義
   */
  static squarePlusPaths = {
    name: "icon-square-plus",
    paths: [
      {
        path: "M0 0h24v24H0z",
      },
      {
        path: "M9 12h6",
      },
      {
        path: "M12 9v6",
      },
      {
        path: "M3 5a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-14z",
      },
    ],
  };

  /**
   * 四角形のパスデータを含むオブジェクトの配列
   *
   * @type {Object}
   * @property {string} name - アイコンフォルダの名前
   * @property {Array<Object>} paths - 各パスオブジェクトの配列
   * @property {string} paths.path - インラインSVGパスの定義
   */
  static squarePaths = {
    name: "icon-square",
    paths: [
      {
        path: "M0 0h24v24H0z",
      },
      {
        path: "M3 3m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z",
      },
    ],
  };

  /**
   * 四角形とチェックのパスデータを含むオブジェクトの配列
   *
   * @type {Object}
   * @property {string} name - アイコンフォルダの名前
   * @property {Array<Object>} paths - 各パスオブジェクトの配列
   * @property {string} paths.path - インラインSVGパスの定義
   */
  static squareCheckPaths = {
    name: "icon-square-check",
    paths: [
      {
        path: "M0 0h24v24H0z",
      },
      {
        path: "M3 3m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z",
      },
      {
        path: "M9 12l2 2l4 -4",
      },
    ],
  };

  /**
   * 四角形と点のパスデータを含むオブジェクトの配列
   *
   * @type {Object}
   * @property {string} name - アイコンフォルダの名前
   * @property {Array<Object>} paths - 各パスオブジェクトの配列
   * @property {string} paths.path - インラインSVGパスの定義
   */
  static squareDotPaths = {
    name: "icon-square-dot",
    paths: [
      {
        path: "M0 0h24v24H0z",
      },
      {
        path: "M3 3m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z",
      },
      {
        path: "M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0",
      },
    ],
  };

  /**
   * 四角形とアラートのパスデータを含むオブジェクトの配列
   *
   * @type {Object}
   * @property {string} name - アイコンフォルダの名前
   * @property {Array<Object>} paths - 各パスオブジェクトの配列
   * @property {string} paths.path - インラインSVGパスの定義
   */
  static squareAlertPaths = {
    name: "icon-square-alert",
    paths: [
      {
        path: "M0 0h24v24H0z",
      },
      {
        path: "M3 5a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-14z",
      },
      {
        path: "M12 8v4",
      },
      {
        path: "M12 16h.01",
      },
    ],
  };

  /**
   * 四角形とバツ印のパスデータを含むオブジェクトの配列
   *
   * @type {Object}
   * @property {string} name - アイコンフォルダの名前
   * @property {Array<Object>} paths - 各パスオブジェクトの配列
   * @property {string} paths.path - インラインSVGパスの定義
   */
  static squareXPaths = {
    name: "icon-square-x",
    paths: [
      {
        path: "M0 0h24v24H0z",
      },
      {
        path: "M3 5a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-14z",
      },
      {
        path: "M9 9l6 6m0 -6l-6 6",
      },
    ],
  };

  /**
   * フォルダ追加SVGのパスデータを含むオブジェクトの配列を生成する。
   *
   * @type {Object}
   * @property {string} name - アイコンフォルダの名前
   * @property {Array<Object>} paths - 各パスオブジェクトの配列
   * @property {string} paths.path - インラインSVGパスの定義
   */
  static folderPlusPaths = {
    name: "icon-folder-plus",
    paths: [
      { path: "M0 0h24v24H0z" },
      {
        path: "M12 19h-7a2 2 0 0 1 -2 -2v-11a2 2 0 0 1 2 -2h4l3 3h7a2 2 0 0 1 2 2v3.5",
      },
      {
        path: "M16 19h6",
      },
      { path: "M19 16v6" },
    ],
  };

  /**
   * 右向き山形SVGのパスデータを含むオブジェクトの配列を生成する。
   *
   * @type {Object}
   * @property {string} name - アイコンフォルダの名前
   * @property {Array<Object>} paths - 各パスオブジェクトの配列
   * @property {string} paths.path - インラインSVGパスの定義
   */
  static chevronRightPaths = {
    name: "icon-chevron-right",
    paths: [
      { path: "M0 0h24v24H0z" },
      {
        path: "M9 6l6 6l-6 6",
      },
    ],
  };

  /**
   * ゴミ箱SVGのパスデータを含むオブジェクトの配列を生成する。
   *
   * @type {Object}
   * @property {string} name - アイコンフォルダの名前
   * @property {Array<Object>} paths - 各パスオブジェクトの配列
   * @property {string} paths.path - インラインSVGパスの定義
   */
  static trashPaths = {
    name: "icon-trash",
    paths: [
      { path: "M0 0h24v24H0z" },
      { path: "M4 7l16 0" },
      { path: "M10 11l0 6" },
      { path: "M14 11l0 6" },
      { path: "M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" },
      { path: "M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" },
    ],
  };

  /**
   * プラスSVGのパスデータを含むオブジェクトの配列を生成する。
   * @returns {Object[]} SVGのパスデータを含むオブジェクトの配列。
   * @returns {string} return.path - SVGのパス情報。
   */
  static plusPaths = {
    name: "icon-plus",
    paths: [
      { path: "M0 0h24v24H0z" },
      { path: "M12 5l0 14" },
      { path: "M5 12l14 0" },
    ],
  };

  /**
   * フィルタSVGのパスデータを含むオブジェクトの配列を生成する。
   * @returns {Object[]} SVGのパスデータを含むオブジェクトの配列。
   * @returns {string} return.path - SVGのパス情報。
   */
  static FilterPaths = {
    name: "icon-filter",
    paths: [
      { path: "M0 0h24v24H0z" },
      {
        path: "M4 4h16v2.172a2 2 0 0 1 -.586 1.414l-4.414 4.414v7l-6 2v-8.5l-4.48 -4.928a2 2 0 0 1 -.52 -1.345v-2.227z",
      },
    ],
  };

  /**
   * フォルダSVGのパスデータを含むオブジェクトの配列を生成する。
   * @returns {Object[]} SVGのパスデータを含むオブジェクトの配列。
   * @returns {string} return.path - SVGのパス情報。
   */
  static FolderhPaths = {
    name: "icon-folder",
    paths: [
      { path: "M0 0h24v24H0z" },
      {
        path: "M5 4h4l3 3h7a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-11a2 2 0 0 1 2 -2",
      },
    ],
  };
}


/***/ }),
/* 4 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FileManager: () => (/* binding */ FileManager)
/* harmony export */ });
/**
 * ファイル操作を行うためのマネージャークラス
 */
class FileManager {
  /**
   * コンストラクタ
   */
  constructor() {
    this.directoryHandler = null;
    this.writeLock = Promise.resolve(); // 初期化時のロック
  }

  /**
   * ディレクトリを選択する
   * @returns {Promise<boolean>} ディレクトリを正常に開けたかどうか
   */
  async selectDirectory() {
    try {
      this.directoryHandler = await window.showDirectoryPicker({
        mode: "readwrite",
      });
      return true;
    } catch (err) {
      throw err;
    }
  }

  /**
   * ファイルを書き込む
   * @param {string} fileName 書き込むファイルの名前
   * @returns {Promise<string|null>} ファイルの内容。ファイルが存在しない場合はnull
   * @throws {Error} ディレクトリが開かれていない場合、またはファイル書き込みに失敗した場合
   */
  async writeFile(fileName, content) {
    if (!this.directoryHandler) {
      throw new Error("ディレクトリがまだ開かれていません。");
    }
    // ロック取得とリリースの処理（書き込みの一貫性を担保）
    this.writeLock = this.writeLock.then(async () => {
      try {
        const fileHandle = await this.directoryHandler.getFileHandle(fileName, {
          create: true,
        });
        const writable = await fileHandle.createWritable();
        await writable.write(content);
        await writable.close();
      } catch (err) {
        throw err;
      }
    });

    return this.writeLock; // プロミスを返す
  }

  /**
   * ファイルを読み込む
   * @param {string} fileName 読み込むファイルの名前
   * @returns {Promise<string|null>} ファイルの内容、ファイルが存在しない場合はnull
   * @throws {Error} ディレクトリが開かれていない場合、またはファイル読み込みに失敗した場合
   */
  async loadFile(fileName) {
    if (!this.directoryHandler) {
      throw new Error("ディレクトリがまだ開かれていません。");
    }
    try {
      // ファイルハンドルを取得してファイルを読み込む
      const fileHandle = await this.directoryHandler.getFileHandle(fileName);
      const file = await fileHandle.getFile();
      if (file.size <= 0) {
        return null;
      }
      return await file.text();
    } catch (err) {
      if (err.name === "NotFoundError") {
        return null;
      } else {
        throw err;
      }
    }
  }

  /**
   * 対象文字列を含むファイルを検索する。
   * @param {string} text 検索文字列
   * @returns {Promise<array|null>} 検索結果、ファイルが存在しない場合はnull
   * @throws {Error} ディレクトリが開かれていない場合、またはファイル読み込みに失敗した場合
   */
  async search(text) {
    if (!this.directoryHandler) {
      throw new Error("ディレクトリがまだ開かれていません。");
    }
    try {
      const result = [];
      for await (const [name, handle] of this.directoryHandler.entries()) {
        const file = await handle.getFile();
        const fileStr = await file.text();
        if (fileStr.indexOf(text) !== -1) {
          result.push(name);
        }
      }
      return result;
    } catch (err) {
      if (err.name === "NotFoundError") {
        return null;
      } else {
        throw err;
      }
    }
  }
}


/***/ }),
/* 5 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `/*! destyle.css v4.0.1 | MIT License | https://github.com/nicolas-cusan/destyle.css */
/* Reset box-model and set borders */
/* ============================================ */
*,
::before,
::after {
  box-sizing: border-box;
  border-style: solid;
  border-width: 0;
  min-width: 0;
}

/* Document */
/* ============================================ */
/**
 * 1. Correct the line height in all browsers.
 * 2. Prevent adjustments of font size after orientation changes in iOS.
 * 3. Remove gray overlay on links for iOS.
 */
html {
  line-height: 1.15; /* 1 */
  -webkit-text-size-adjust: 100%; /* 2 */
  -webkit-tap-highlight-color: transparent; /* 3*/
}

/* Sections */
/* ============================================ */
/**
 * Remove the margin in all browsers.
 */
body {
  margin: 0;
}

/**
 * Render the \`main\` element consistently in IE.
 */
main {
  display: block;
}

/* Vertical rhythm */
/* ============================================ */
p,
table,
blockquote,
address,
pre,
iframe,
form,
figure,
dl {
  margin: 0;
}

/* Headings */
/* ============================================ */
h1,
h2,
h3,
h4,
h5,
h6 {
  font-size: inherit;
  font-weight: inherit;
  margin: 0;
}

/* Lists (enumeration) */
/* ============================================ */
ul,
ol {
  margin: 0;
  padding: 0;
  list-style: none;
}

/* Lists (definition) */
/* ============================================ */
dt {
  font-weight: bold;
}

dd {
  margin-left: 0;
}

/* Grouping content */
/* ============================================ */
/**
 * 1. Add the correct box sizing in Firefox.
 * 2. Show the overflow in Edge and IE.
 */
hr {
  box-sizing: content-box; /* 1 */
  height: 0; /* 1 */
  overflow: visible; /* 2 */
  border-top-width: 1px;
  margin: 0;
  clear: both;
  color: inherit;
}

/**
 * 1. Correct the inheritance and scaling of font size in all browsers.
 * 2. Correct the odd \`em\` font sizing in all browsers.
 */
pre {
  font-family: monospace, monospace; /* 1 */
  font-size: inherit; /* 2 */
}

address {
  font-style: inherit;
}

/* Text-level semantics */
/* ============================================ */
/**
 * Remove the gray background on active links in IE 10.
 */
a {
  background-color: transparent;
  text-decoration: none;
  color: inherit;
}

/**
 * 1. Remove the bottom border in Chrome 57-
 * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.
 */
abbr[title] {
  text-decoration: underline dotted; /* 2 */
}

/**
 * Add the correct font weight in Chrome, Edge, and Safari.
 */
b,
strong {
  font-weight: bolder;
}

/**
 * 1. Correct the inheritance and scaling of font size in all browsers.
 * 2. Correct the odd \`em\` font sizing in all browsers.
 */
code,
kbd,
samp {
  font-family: monospace, monospace; /* 1 */
  font-size: inherit; /* 2 */
}

/**
 * Add the correct font size in all browsers.
 */
small {
  font-size: 80%;
}

/**
 * Prevent \`sub\` and \`sup\` elements from affecting the line height in
 * all browsers.
 */
sub,
sup {
  font-size: 75%;
  line-height: 0;
  position: relative;
  vertical-align: baseline;
}

sub {
  bottom: -0.25em;
}

sup {
  top: -0.5em;
}

/* Replaced content */
/* ============================================ */
/**
 * Prevent vertical alignment issues.
 */
svg,
img,
embed,
object,
iframe {
  vertical-align: bottom;
}

/* Forms */
/* ============================================ */
/**
 * Reset form fields to make them styleable.
 * 1. Make form elements stylable across systems iOS especially.
 * 2. Inherit text-transform from parent.
 */
button,
input,
optgroup,
select,
textarea {
  -webkit-appearance: none; /* 1 */
  appearance: none;
  vertical-align: middle;
  color: inherit;
  font: inherit;
  background: transparent;
  padding: 0;
  margin: 0;
  border-radius: 0;
  text-align: inherit;
  text-transform: inherit; /* 2 */
}

/**
 * Correct cursors for clickable elements.
 */
button,
[type=button],
[type=reset],
[type=submit] {
  cursor: pointer;
}

button:disabled,
[type=button]:disabled,
[type=reset]:disabled,
[type=submit]:disabled {
  cursor: default;
}

/**
 * Improve outlines for Firefox and unify style with input elements & buttons.
 */
:-moz-focusring {
  outline: auto;
}

select:disabled {
  opacity: inherit;
}

/**
 * Remove padding
 */
option {
  padding: 0;
}

/**
 * Reset to invisible
 */
fieldset {
  margin: 0;
  padding: 0;
  min-width: 0;
}

legend {
  padding: 0;
}

/**
 * Add the correct vertical alignment in Chrome, Firefox, and Opera.
 */
progress {
  vertical-align: baseline;
}

/**
 * Remove the default vertical scrollbar in IE 10+.
 */
textarea {
  overflow: auto;
}

/**
 * Correct the cursor style of increment and decrement buttons in Chrome.
 */
[type=number]::-webkit-inner-spin-button,
[type=number]::-webkit-outer-spin-button {
  height: auto;
}

/**
 * Correct the outline style in Safari.
 */
[type=search] {
  outline-offset: -2px; /* 1 */
}

/**
 * Remove the inner padding in Chrome and Safari on macOS.
 */
[type=search]::-webkit-search-decoration {
  -webkit-appearance: none;
}

/**
 * 1. Correct the inability to style clickable types in iOS and Safari.
 * 2. Fix font inheritance.
 */
::-webkit-file-upload-button {
  -webkit-appearance: button; /* 1 */
  font: inherit; /* 2 */
}

/**
 * Fix appearance for Firefox
 */
[type=number] {
  -moz-appearance: textfield;
  appearance: textfiled;
}

/**
 * Clickable labels
 */
label[for] {
  cursor: pointer;
}

/* Interactive */
/* ============================================ */
/*
 * Add the correct display in Edge, IE 10+, and Firefox.
 */
details {
  display: block;
}

/*
 * Add the correct display in all browsers.
 */
summary {
  display: list-item;
}

/*
 * Remove outline for editable content.
 */
[contenteditable]:focus {
  outline: auto;
}

/* Tables */
/* ============================================ */
/**
1. Correct table border color inheritance in all Chrome and Safari.
*/
table {
  border-color: inherit; /* 1 */
  border-collapse: collapse;
}

caption {
  text-align: left;
}

td,
th {
  vertical-align: top;
  padding: 0;
}

th {
  text-align: left;
  font-weight: bold;
}

.svg {
  position: absolute;
  width: 0;
  height: 0;
  overflow: hidden;
}

.svg-icon {
  display: block;
  width: 1em;
  height: 1em;
  stroke-width: 0;
  stroke: currentColor;
  fill: currentColor;
  pointer-events: none;
}
.svg-icon use {
  pointer-events: none;
}

* {
  font-family: monospace;
}

.scroll {
  overflow-y: scroll;
}
.scroll::-webkit-scrollbar {
  display: none;
}

.float-area {
  position: absolute;
  right: 1rem;
  bottom: 1rem;
}
.float-area * {
  display: block;
  margin-top: 0.25rem;
}

#container {
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-rows: 1fr;
  grid-template-columns: 300px 1fr;
  grid-template-rows: 1fr;
  gap: 0em 0em;
  grid-template-areas: "treeview contents";
  height: 100vh;
}
#container #treeview {
  grid-area: treeview;
  height: 100vh;
}
#container #contents {
  grid-area: contents;
  background-color: #d4f1ef;
  height: 100vh;
}
`, ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 6 */
/***/ ((module) => {



module.exports = function (i) {
  return i[1];
};

/***/ }),
/* 7 */
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SvgBtn: () => (/* binding */ SvgBtn)
/* harmony export */ });
/* harmony import */ var _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _utils_event_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9);
/* harmony import */ var _utils_svg_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(10);
/* harmony import */ var _style_svg_btn_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(11);






/**
 * SvgBtn コンポーネント
 * @class SvgBtn
 * @extends {HTMLElement}
 */
function SvgBtn() {
  class SvgBtn extends HTMLElement {
    /**
     * コンストラクタ
     * @constructor
     * @returns {void}
     * @description
     * SvgBtn コンポーネントのインスタンスを初期化するコンストラクタ。
     * Shadow DOM をオープンモードでアタッチし、CSSを適用し、ボタン要素を作成します。
     */
    constructor() {
      super();

      // Shadow DOMをオープンモードでアタッチ
      this.attachShadow({ mode: "open" });
      this.shadowRoot.innerHTML = "";

      // CSSを適用
      this.shadowRoot.adoptedStyleSheets = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__.ElmUtils.createStylesheet(_style_svg_btn_css__WEBPACK_IMPORTED_MODULE_3__["default"]);

      // フラグ初期化
      this.isToggle = false;

      // 空のボタンを作成
      this.button = document.createElement("button");
      this.button.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (this.isToggle) {
          this.button.classList.toggle("toggle-on");
        }
        this.shadowRoot.dispatchEvent(_utils_event_utils__WEBPACK_IMPORTED_MODULE_1__.EventUtils.createEvent("click"));
      });
      this.shadowRoot.appendChild(this.button);
    }

    /**
     * アイコンを設定するセッター
     * @param {HTMLElement} paths - 設定するアイコン要素
     * @returns {void}
     */
    set iconPaths(paths) {
      this._svgIcon = _utils_svg_utils__WEBPACK_IMPORTED_MODULE_2__.SvgUtils.createSvg(paths);
      this._svgUse = _utils_svg_utils__WEBPACK_IMPORTED_MODULE_2__.SvgUtils.createSvgUse(this._svgIcon);
      this.button.appendChild(this._svgIcon);
      this.button.appendChild(this._svgUse);
    }

    /**
     * ボタンを円形にするかどうかを設定するプロパティ
     * @param {boolean} flg - 円形にする場合は true、しない場合は false
     * @description 指定された値に応じて、ボタンに "circle" クラスを追加または削除する。
     */
    set isCircle(flg) {
      if (flg) {
        this.button.classList.add("circle");
      } else {
        this.button.classList.remove("circle");
      }
    }

    /**
     * ボタンのサイズを設定するセッター
     * @param {string} value - 設定するサイズ
     */
    set size(value) {
      this._svgUse.style = `font-size: ${value}`;
    }

    /**
     * ボタンのカラーを設定するセッター
     * @param {string} value - 設定するカラー
     */
    set color(value) {
      this.button.classList.remove("red", "green", "blue", "white", "black");
      this.button.classList.add(value);
    }

    /**
     * ボタンのホバーを設定するセッター
     * @param {bool} flag - ホバーを設定する場合は true、しない場合は false
     */
    set hover(flag) {
      this.button.classList.toggle("hover", flag);
    }

    /**
     * トグルボタンの設定を行うセッター
     * @param {bool} flag - トグルボタンにする場合は true、しない場合は false
     */
    set toggle(flag) {
      this.isToggle = flag;
    }

    /**
     * トグルボタンの状態を取得するゲッター
     * @returns {bool} トグルボタンがオンの場合は true、オフの場合は false
     */
    get toggle() {
      return this.button.classList.contains("toggle-on");
    }

    /**
     * トグルボタンをオンにするメソッド
     * @param {bool} flag - トグルをオンにする場合は true、しない場合は false
     * @returns {void}
     */
    toggleOn(flag) {
      this.button.classList.toggle("toggle-on", flag);
    }
  }
  customElements.define("svg-btn", SvgBtn);
}


/***/ }),
/* 9 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EventUtils: () => (/* binding */ EventUtils)
/* harmony export */ });
/**
 * イベント作成ユーティリティクラス
 */
class EventUtils {
  /**
   * カスタムイベントを作成する静的メソッド
   * @param {string} eventName - イベントの名前
   * @param {Object} [item={}] - イベントに関連するオブジェクト
   * @return {CustomEvent} - 作成されたカスタムイベント
   */
  static createEvent = (eventName, item = {}) => {
    return new CustomEvent(eventName, {
      detail: { item: item },
      bubbles: true,
      composed: true,
    });
  };
}


/***/ }),
/* 10 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SvgUtils: () => (/* binding */ SvgUtils)
/* harmony export */ });
/* harmony import */ var _elm_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);


/**
 * SVG要素作成ユーティリティクラス
 */
class SvgUtils {
  /**
   * SVG要素を作成するメソッド
   *
   * @method createSvg
   * @param {string} name - シンボルの名前
   * @param {Array<Object>} paths - SVGのパス情報の配列。各オブジェクトは `path` と `isFill` プロパティを持つ。
   * @returns {SVGSVGElement} - 作成されたSVG要素
   * @description
   * 指定された名前とパス情報でSVG要素を作成し、返す。
   * パスはシンボルとして `defs` に定義される。
   */
  static createSvg = (iconData) => {
    const { name, paths } = iconData;
    const svgNS = "http://www.w3.org/2000/svg";
    const xlinkNS = "http://www.w3.org/1999/xlink";

    // SVGタグを作成する
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("aria-hidden", "true");
    svg.setAttribute("version", "1.1");
    svg.setAttribute("xmlns", svgNS);
    svg.setAttribute("xmlns:xlink", xlinkNS);
    svg.classList.add("svg");

    // Defsタグを作成する
    const defs = document.createElementNS(svgNS, "defs");

    // symbolタグを作成する
    const symbol = document.createElementNS(svgNS, "symbol");
    symbol.setAttribute("id", name);
    symbol.setAttribute("viewBox", "0 0 24 24");
    symbol.setAttribute("fill", "none");
    symbol.setAttribute("stroke", "currentColor");
    symbol.setAttribute("stroke-width", "2");
    symbol.setAttribute("stroke-linecap", "round");
    symbol.setAttribute("stroke-linejoin", "round");

    // SVGのPathを作成し、symbolタグに追加する
    paths.forEach((elm, index) => {
      const path = document.createElementNS(svgNS, "path");
      if (index === 0) {
        path.setAttribute("stroke", "none");
        path.setAttribute("fill", "none");
      } else if (elm.isFill) {
        path.setAttribute("stroke", "none");
        path.setAttribute("fill", "currentColor");
      }
      path.setAttribute("d", elm.path);
      symbol.appendChild(path);
    });

    // defsタグにsymbolタグを追加する
    defs.appendChild(symbol);

    // svgタグにdefsタグを追加する。
    svg.appendChild(defs);

    return svg;
  };

  /**
   * SVG use 要素を作成するプライベートメソッド
   * @param {HTMLElement} svgIcon - 設定するアイコン要素
   * @returns {SVGElement} 作成されたSVG要素
   * @description
   * 指定されたSVGアイコン要素を元に、SVG use 要素を作成して返します。
   */
  static createSvgUse(svgIcon) {
    const svgNS = "http://www.w3.org/2000/svg";
    const xlinkNS = "http://www.w3.org/1999/xlink";

    // SVG要素を作成し、クラスを追加する
    const svg = document.createElementNS(svgNS, "svg");
    svg.classList.add("svg-icon");

    // アイコンのIDを取得
    const iconName = svgIcon.getElementsByTagName("symbol")[0].id;

    // use要素を作成し、SVG要素に追加する
    const use = document.createElementNS(svgNS, "use");
    use.setAttributeNS(xlinkNS, "xlink:href", `#${iconName}`);
    svg.appendChild(use);

    return svg;
  }

  /**
   * アイコンを作成する静的メソッド
   * @param {Object} iconData - アイコンデータのオブジェクト
   * @return {HTMLElement} - 作成されたSVG要素
   */
  static createIcon(iconData) {
    const icon = this.createSvg(iconData);
    const use = this.createSvgUse(icon);
    const div = _elm_utils__WEBPACK_IMPORTED_MODULE_0__.ElmUtils.createElm("div");

    div.appendChild(icon);
    div.appendChild(use);

    return div;
  }
}


/***/ }),
/* 11 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `/*! destyle.css v4.0.1 | MIT License | https://github.com/nicolas-cusan/destyle.css */
/* Reset box-model and set borders */
/* ============================================ */
*,
::before,
::after {
  box-sizing: border-box;
  border-style: solid;
  border-width: 0;
  min-width: 0;
}

/* Document */
/* ============================================ */
/**
 * 1. Correct the line height in all browsers.
 * 2. Prevent adjustments of font size after orientation changes in iOS.
 * 3. Remove gray overlay on links for iOS.
 */
html {
  line-height: 1.15; /* 1 */
  -webkit-text-size-adjust: 100%; /* 2 */
  -webkit-tap-highlight-color: transparent; /* 3*/
}

/* Sections */
/* ============================================ */
/**
 * Remove the margin in all browsers.
 */
body {
  margin: 0;
}

/**
 * Render the \`main\` element consistently in IE.
 */
main {
  display: block;
}

/* Vertical rhythm */
/* ============================================ */
p,
table,
blockquote,
address,
pre,
iframe,
form,
figure,
dl {
  margin: 0;
}

/* Headings */
/* ============================================ */
h1,
h2,
h3,
h4,
h5,
h6 {
  font-size: inherit;
  font-weight: inherit;
  margin: 0;
}

/* Lists (enumeration) */
/* ============================================ */
ul,
ol {
  margin: 0;
  padding: 0;
  list-style: none;
}

/* Lists (definition) */
/* ============================================ */
dt {
  font-weight: bold;
}

dd {
  margin-left: 0;
}

/* Grouping content */
/* ============================================ */
/**
 * 1. Add the correct box sizing in Firefox.
 * 2. Show the overflow in Edge and IE.
 */
hr {
  box-sizing: content-box; /* 1 */
  height: 0; /* 1 */
  overflow: visible; /* 2 */
  border-top-width: 1px;
  margin: 0;
  clear: both;
  color: inherit;
}

/**
 * 1. Correct the inheritance and scaling of font size in all browsers.
 * 2. Correct the odd \`em\` font sizing in all browsers.
 */
pre {
  font-family: monospace, monospace; /* 1 */
  font-size: inherit; /* 2 */
}

address {
  font-style: inherit;
}

/* Text-level semantics */
/* ============================================ */
/**
 * Remove the gray background on active links in IE 10.
 */
a {
  background-color: transparent;
  text-decoration: none;
  color: inherit;
}

/**
 * 1. Remove the bottom border in Chrome 57-
 * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.
 */
abbr[title] {
  text-decoration: underline dotted; /* 2 */
}

/**
 * Add the correct font weight in Chrome, Edge, and Safari.
 */
b,
strong {
  font-weight: bolder;
}

/**
 * 1. Correct the inheritance and scaling of font size in all browsers.
 * 2. Correct the odd \`em\` font sizing in all browsers.
 */
code,
kbd,
samp {
  font-family: monospace, monospace; /* 1 */
  font-size: inherit; /* 2 */
}

/**
 * Add the correct font size in all browsers.
 */
small {
  font-size: 80%;
}

/**
 * Prevent \`sub\` and \`sup\` elements from affecting the line height in
 * all browsers.
 */
sub,
sup {
  font-size: 75%;
  line-height: 0;
  position: relative;
  vertical-align: baseline;
}

sub {
  bottom: -0.25em;
}

sup {
  top: -0.5em;
}

/* Replaced content */
/* ============================================ */
/**
 * Prevent vertical alignment issues.
 */
svg,
img,
embed,
object,
iframe {
  vertical-align: bottom;
}

/* Forms */
/* ============================================ */
/**
 * Reset form fields to make them styleable.
 * 1. Make form elements stylable across systems iOS especially.
 * 2. Inherit text-transform from parent.
 */
button,
input,
optgroup,
select,
textarea {
  -webkit-appearance: none; /* 1 */
  appearance: none;
  vertical-align: middle;
  color: inherit;
  font: inherit;
  background: transparent;
  padding: 0;
  margin: 0;
  border-radius: 0;
  text-align: inherit;
  text-transform: inherit; /* 2 */
}

/**
 * Correct cursors for clickable elements.
 */
button,
[type=button],
[type=reset],
[type=submit] {
  cursor: pointer;
}

button:disabled,
[type=button]:disabled,
[type=reset]:disabled,
[type=submit]:disabled {
  cursor: default;
}

/**
 * Improve outlines for Firefox and unify style with input elements & buttons.
 */
:-moz-focusring {
  outline: auto;
}

select:disabled {
  opacity: inherit;
}

/**
 * Remove padding
 */
option {
  padding: 0;
}

/**
 * Reset to invisible
 */
fieldset {
  margin: 0;
  padding: 0;
  min-width: 0;
}

legend {
  padding: 0;
}

/**
 * Add the correct vertical alignment in Chrome, Firefox, and Opera.
 */
progress {
  vertical-align: baseline;
}

/**
 * Remove the default vertical scrollbar in IE 10+.
 */
textarea {
  overflow: auto;
}

/**
 * Correct the cursor style of increment and decrement buttons in Chrome.
 */
[type=number]::-webkit-inner-spin-button,
[type=number]::-webkit-outer-spin-button {
  height: auto;
}

/**
 * Correct the outline style in Safari.
 */
[type=search] {
  outline-offset: -2px; /* 1 */
}

/**
 * Remove the inner padding in Chrome and Safari on macOS.
 */
[type=search]::-webkit-search-decoration {
  -webkit-appearance: none;
}

/**
 * 1. Correct the inability to style clickable types in iOS and Safari.
 * 2. Fix font inheritance.
 */
::-webkit-file-upload-button {
  -webkit-appearance: button; /* 1 */
  font: inherit; /* 2 */
}

/**
 * Fix appearance for Firefox
 */
[type=number] {
  -moz-appearance: textfield;
  appearance: textfiled;
}

/**
 * Clickable labels
 */
label[for] {
  cursor: pointer;
}

/* Interactive */
/* ============================================ */
/*
 * Add the correct display in Edge, IE 10+, and Firefox.
 */
details {
  display: block;
}

/*
 * Add the correct display in all browsers.
 */
summary {
  display: list-item;
}

/*
 * Remove outline for editable content.
 */
[contenteditable]:focus {
  outline: auto;
}

/* Tables */
/* ============================================ */
/**
1. Correct table border color inheritance in all Chrome and Safari.
*/
table {
  border-color: inherit; /* 1 */
  border-collapse: collapse;
}

caption {
  text-align: left;
}

td,
th {
  vertical-align: top;
  padding: 0;
}

th {
  text-align: left;
  font-weight: bold;
}

.svg {
  position: absolute;
  width: 0;
  height: 0;
  overflow: hidden;
}

.svg-icon {
  display: block;
  width: 1em;
  height: 1em;
  stroke-width: 0;
  stroke: currentColor;
  fill: currentColor;
  pointer-events: none;
}
.svg-icon use {
  pointer-events: none;
}

* {
  font-family: monospace;
}

.circle {
  z-index: 99999;
  color: #fffffb;
  background-color: #0a3981;
  border: 1px solid #0a3981;
  box-shadow: 0px 3px 3px 0px rgba(0, 0, 0, 0.1);
  padding: 0.5rem;
  border-radius: 50%;
}
.circle:hover {
  color: #0a3981;
  background-color: #fffff8;
  border-color: #0a3981;
}
.circle .svg-icon {
  font-size: 1.8rem;
}

.hover {
  color: #8f8f8f;
  border-radius: 0.25rem;
}
.hover.red:hover {
  color: #d84040;
  background-color: #fdfbee;
}
.hover.green:hover {
  color: #0e7405;
  background-color: #fdfbee;
}
.hover.blue:hover {
  color: #003092;
  background-color: #fdfbee;
}
.hover.white:hover {
  color: #fffffb;
  background-color: #fdfbee;
}
.hover.black:hover {
  color: #000000;
  background-color: #fdfbee;
}

.toggle-on.red {
  color: #d84040;
}
.toggle-on.green {
  color: #0e7405;
}
.toggle-on.blue {
  color: #003092;
}
.toggle-on.white {
  color: #fffffb;
}
.toggle-on.black {
  color: #000000;
}
`, ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 12 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ContextMenu: () => (/* binding */ ContextMenu)
/* harmony export */ });
/* harmony import */ var _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _utils_svg_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(10);
/* harmony import */ var _utils_event_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9);
/* harmony import */ var _constants_event_const__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(13);
/* harmony import */ var _style_context_menu_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(14);







/**
 * ContextMenu コンポーネント
 * @class ContextMenu
 * @extends {HTMLElement}
 */
function ContextMenu() {
  class ContextMenu extends HTMLElement {
    /**
     * コンストラクタ
     * @return {void}
     */
    constructor() {
      super();

      // Shadow DOMをオープンモードでアタッチ
      this.attachShadow({ mode: "open" });
      this.shadowRoot.innerHTML = "";

      // CSSを適用
      this.shadowRoot.adoptedStyleSheets = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__.ElmUtils.createStylesheet(_style_context_menu_css__WEBPACK_IMPORTED_MODULE_4__["default"]);

      // 空のコンテンツを作成
      this.area = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__.ElmUtils.createElm("div", "context-area");
      this.area.addEventListener("click", () => {
        this.area.classList.remove("open");

        const disabledItems = this.menu.querySelectorAll(".disabled");
        for (let item of disabledItems) {
          item.classList.remove("disabled");
        }

        this.shadowRoot.dispatchEvent(
          _utils_event_utils__WEBPACK_IMPORTED_MODULE_2__.EventUtils.createEvent(_constants_event_const__WEBPACK_IMPORTED_MODULE_3__.EventConst.CLOSE_CONTEXT_MENU)
        );
      });

      this.menu = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__.ElmUtils.createElm("div", "context-menu");

      this.area.appendChild(this.menu);
      this.shadowRoot.appendChild(this.area);
    }

    /**
     * コンテキストメニューを指定された位置に開きます。
     * @param {MouseEvent} e - コンテキストメニューを開く際のマウスイベント
     */
    openMenu(e) {
      this.area.classList.add("open");
      this.menu.style.left = `${e.pageX + 10}px`;
      this.menu.style.top = `${e.pageY - 20}px`;
    }

    /**
     * クリックターゲットを取得します。
     * @returns {Element} _clickTarget - 現在のクリックターゲット要素
     */
    get clickTarget() {
      return this._clickTarget;
    }

    /**
     * クリックターゲットを設定します。
     * @param {Element} value - 新しいクリックターゲット要素
     */
    set clickTarget(value) {
      this._clickTarget = value;
    }

    /**
     * ボタンを追加するメソッド
     * @param {string} id - ボタンのID
     * @param {string} title - ボタンのタイトル
     * @param {object} iconData - アイコン設定情報
     * @return {void}
     */
    addButton(id, title, iconData) {
      const icon = _utils_svg_utils__WEBPACK_IMPORTED_MODULE_1__.SvgUtils.createIcon(iconData);

      const text = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__.ElmUtils.createElm("p");
      text.classList.add("button-text");
      text.innerText = title;

      const btn = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__.ElmUtils.createElm("div", id, ["button-area"]);
      btn.appendChild(icon);
      btn.appendChild(text);

      /**
       * クリックイベント
       */
      btn.addEventListener("click", () => {
        if (btn.classList.contains("disabled")) {
          return;
        }
        this.shadowRoot.dispatchEvent(_utils_event_utils__WEBPACK_IMPORTED_MODULE_2__.EventUtils.createEvent(`click-${id}`));
      });

      this.menu.appendChild(btn);
    }

    /**
     * 指定されたIDを持つボタン要素を無効化します。
     * @param {string} id - 無効化するボタン要素のID
     */
    setDisabled(id) {
      const btn = this.shadowRoot.getElementById(id);
      btn.classList.add("disabled");
    }

    /**
     * 罫線を引く
     */
    addBorder() {
      this.menu.appendChild(_utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__.ElmUtils.createElm("hr"));
    }
  }
  customElements.define("context-menu", ContextMenu);
}


/***/ }),
/* 13 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EventConst: () => (/* binding */ EventConst)
/* harmony export */ });
/**
 * イベント定数クラス
 */
class EventConst {
  /**
   * コンテキストメニューを閉じる
   */
  static CLOSE_CONTEXT_MENU = "closeContextMenu";
  /**
   * TreeViewのタスクをクリック
   */
  static CLICK_TASK_EVENT_NAME = "clickTaskItem";

  /**
   * TreeViewのグループをクリック
   */
  static CLICK_GROUP_EVENT_NAME = "clickGruopItem";

  /**
   * TreeViewのグループをダブルクリック
   */
  static DBL_CLICK_GROUP_EVENT_NAME = "dblClickGruopItem";
  /**
   * 新規タスクを追加
   */
  static ADD_NEW_TASK_ITEM_EVENT_NAME = "addTaskItem";

  /**
   * 新規グループを追加
   */
  static ADD_NEW_GROUP_ITEM_EVENT_NAME = "addGroupItem";

  /**
   * TreeViewのアイテムを削除を追加
   */
  static DELETE_TREEVIEW_ITEM_EVENT_NAME = "deleteTreeViewItem";

  /**
   * TreeView変更イベント
   */
  static CHANGE_TREEVIEW_EVENT_NAME = "changeTreeView";

  /**
   * フォームアイテム変更イベント
   */
  static CHANGE_FORM_ITEM_EVENT_NAME = "changeFormItem";

  /**
   * コンテンツグループ変更イベント
   */
  static CHANGE_CONTENTS_GROUP_EVENT_NAME = "changeContentsGroup";

  /**
   * グループ内グループのクリックイベント
   */
  static CLICK_CONTENTS_GROUP_GROUP_EVENT_NAME = "clickContentsGroupGroup";

  /**
   * グループ内タスクのクリックイベント
   */
  static CLICK_CONTENTS_GROUP_TASK_EVENT_NAME = "clickContentsGroupTask";

  /**
   * コンテンツタスク変更イベント
   */
  static CHANGE_CONTENTS_TASK_EVENT_NAME = "changeContentsTask";

  /**
   * 履歴コンテンツ追加イベント
   */
  static ADD_HISTORY_CONTENTS_EVENT_NAME = "addHistoryContents";
}


/***/ }),
/* 14 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `/*! destyle.css v4.0.1 | MIT License | https://github.com/nicolas-cusan/destyle.css */
/* Reset box-model and set borders */
/* ============================================ */
*,
::before,
::after {
  box-sizing: border-box;
  border-style: solid;
  border-width: 0;
  min-width: 0;
}

/* Document */
/* ============================================ */
/**
 * 1. Correct the line height in all browsers.
 * 2. Prevent adjustments of font size after orientation changes in iOS.
 * 3. Remove gray overlay on links for iOS.
 */
html {
  line-height: 1.15; /* 1 */
  -webkit-text-size-adjust: 100%; /* 2 */
  -webkit-tap-highlight-color: transparent; /* 3*/
}

/* Sections */
/* ============================================ */
/**
 * Remove the margin in all browsers.
 */
body {
  margin: 0;
}

/**
 * Render the \`main\` element consistently in IE.
 */
main {
  display: block;
}

/* Vertical rhythm */
/* ============================================ */
p,
table,
blockquote,
address,
pre,
iframe,
form,
figure,
dl {
  margin: 0;
}

/* Headings */
/* ============================================ */
h1,
h2,
h3,
h4,
h5,
h6 {
  font-size: inherit;
  font-weight: inherit;
  margin: 0;
}

/* Lists (enumeration) */
/* ============================================ */
ul,
ol {
  margin: 0;
  padding: 0;
  list-style: none;
}

/* Lists (definition) */
/* ============================================ */
dt {
  font-weight: bold;
}

dd {
  margin-left: 0;
}

/* Grouping content */
/* ============================================ */
/**
 * 1. Add the correct box sizing in Firefox.
 * 2. Show the overflow in Edge and IE.
 */
hr {
  box-sizing: content-box; /* 1 */
  height: 0; /* 1 */
  overflow: visible; /* 2 */
  border-top-width: 1px;
  margin: 0;
  clear: both;
  color: inherit;
}

/**
 * 1. Correct the inheritance and scaling of font size in all browsers.
 * 2. Correct the odd \`em\` font sizing in all browsers.
 */
pre {
  font-family: monospace, monospace; /* 1 */
  font-size: inherit; /* 2 */
}

address {
  font-style: inherit;
}

/* Text-level semantics */
/* ============================================ */
/**
 * Remove the gray background on active links in IE 10.
 */
a {
  background-color: transparent;
  text-decoration: none;
  color: inherit;
}

/**
 * 1. Remove the bottom border in Chrome 57-
 * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.
 */
abbr[title] {
  text-decoration: underline dotted; /* 2 */
}

/**
 * Add the correct font weight in Chrome, Edge, and Safari.
 */
b,
strong {
  font-weight: bolder;
}

/**
 * 1. Correct the inheritance and scaling of font size in all browsers.
 * 2. Correct the odd \`em\` font sizing in all browsers.
 */
code,
kbd,
samp {
  font-family: monospace, monospace; /* 1 */
  font-size: inherit; /* 2 */
}

/**
 * Add the correct font size in all browsers.
 */
small {
  font-size: 80%;
}

/**
 * Prevent \`sub\` and \`sup\` elements from affecting the line height in
 * all browsers.
 */
sub,
sup {
  font-size: 75%;
  line-height: 0;
  position: relative;
  vertical-align: baseline;
}

sub {
  bottom: -0.25em;
}

sup {
  top: -0.5em;
}

/* Replaced content */
/* ============================================ */
/**
 * Prevent vertical alignment issues.
 */
svg,
img,
embed,
object,
iframe {
  vertical-align: bottom;
}

/* Forms */
/* ============================================ */
/**
 * Reset form fields to make them styleable.
 * 1. Make form elements stylable across systems iOS especially.
 * 2. Inherit text-transform from parent.
 */
button,
input,
optgroup,
select,
textarea {
  -webkit-appearance: none; /* 1 */
  appearance: none;
  vertical-align: middle;
  color: inherit;
  font: inherit;
  background: transparent;
  padding: 0;
  margin: 0;
  border-radius: 0;
  text-align: inherit;
  text-transform: inherit; /* 2 */
}

/**
 * Correct cursors for clickable elements.
 */
button,
[type=button],
[type=reset],
[type=submit] {
  cursor: pointer;
}

button:disabled,
[type=button]:disabled,
[type=reset]:disabled,
[type=submit]:disabled {
  cursor: default;
}

/**
 * Improve outlines for Firefox and unify style with input elements & buttons.
 */
:-moz-focusring {
  outline: auto;
}

select:disabled {
  opacity: inherit;
}

/**
 * Remove padding
 */
option {
  padding: 0;
}

/**
 * Reset to invisible
 */
fieldset {
  margin: 0;
  padding: 0;
  min-width: 0;
}

legend {
  padding: 0;
}

/**
 * Add the correct vertical alignment in Chrome, Firefox, and Opera.
 */
progress {
  vertical-align: baseline;
}

/**
 * Remove the default vertical scrollbar in IE 10+.
 */
textarea {
  overflow: auto;
}

/**
 * Correct the cursor style of increment and decrement buttons in Chrome.
 */
[type=number]::-webkit-inner-spin-button,
[type=number]::-webkit-outer-spin-button {
  height: auto;
}

/**
 * Correct the outline style in Safari.
 */
[type=search] {
  outline-offset: -2px; /* 1 */
}

/**
 * Remove the inner padding in Chrome and Safari on macOS.
 */
[type=search]::-webkit-search-decoration {
  -webkit-appearance: none;
}

/**
 * 1. Correct the inability to style clickable types in iOS and Safari.
 * 2. Fix font inheritance.
 */
::-webkit-file-upload-button {
  -webkit-appearance: button; /* 1 */
  font: inherit; /* 2 */
}

/**
 * Fix appearance for Firefox
 */
[type=number] {
  -moz-appearance: textfield;
  appearance: textfiled;
}

/**
 * Clickable labels
 */
label[for] {
  cursor: pointer;
}

/* Interactive */
/* ============================================ */
/*
 * Add the correct display in Edge, IE 10+, and Firefox.
 */
details {
  display: block;
}

/*
 * Add the correct display in all browsers.
 */
summary {
  display: list-item;
}

/*
 * Remove outline for editable content.
 */
[contenteditable]:focus {
  outline: auto;
}

/* Tables */
/* ============================================ */
/**
1. Correct table border color inheritance in all Chrome and Safari.
*/
table {
  border-color: inherit; /* 1 */
  border-collapse: collapse;
}

caption {
  text-align: left;
}

td,
th {
  vertical-align: top;
  padding: 0;
}

th {
  text-align: left;
  font-weight: bold;
}

.svg {
  position: absolute;
  width: 0;
  height: 0;
  overflow: hidden;
}

.svg-icon {
  display: block;
  width: 1em;
  height: 1em;
  stroke-width: 0;
  stroke: currentColor;
  fill: currentColor;
  pointer-events: none;
}
.svg-icon use {
  pointer-events: none;
}

* {
  font-family: monospace;
}

#context-area {
  display: none;
  position: absolute;
  z-index: 10000;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: transparent;
}
#context-area.open {
  display: block;
}
#context-area #context-menu {
  position: absolute;
  z-index: 100000;
  background-color: #fffff8;
  border: 1px solid #8f8f8f;
  border-radius: 0.25rem;
  padding: 0.25rem;
}
#context-area #context-menu .button-area {
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 0.2rem 0.5rem;
}
#context-area #context-menu .button-area:hover {
  border-radius: 0.25rem;
  background-color: #0078d4;
  color: #fffffb;
}
#context-area #context-menu .button-area .svg-icon {
  margin-right: 0.25rem;
  height: 1rem;
  width: 1rem;
}
#context-area #context-menu .button-area .button-text {
  padding-top: 1px;
}
#context-area #context-menu .button-area.disabled {
  color: #cccccc;
}
#context-area #context-menu .button-area.disabled:hover {
  color: #cccccc;
  background-color: transparent;
}
#context-area #context-menu hr {
  margin: 0.25rem 0;
  height: 1px;
  background-color: #5f5f5f;
  border: none;
}
`, ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 15 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TreeView: () => (/* binding */ TreeView)
/* harmony export */ });
/* harmony import */ var _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _utils_event_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9);
/* harmony import */ var _constants_event_const__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(13);
/* harmony import */ var _constants_svg_const__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3);
/* harmony import */ var _style_tree_view_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(16);
// CSS







/**
 * TreeView コンポーネント
 * @class TreeView
 * @extends {HTMLElement}
 */
function TreeView() {
  /**
   * ドラッグ中の要素
   */
  let draggedElement;

  /**
   * 指定されたエレメント内のグループアイテムを取得する関数。
   * 与えられたエレメント内の`.group-items`クラスを持つ要素を見つけ、返します。
   *
   * @param {Element} element - グループアイテムを取得するエレメント。
   * @returns {Element} - グループアイテムを含むエレメント。
   */
  const getItems = (element) => element.querySelector(".group-items");

  class TreeView extends HTMLElement {
    // *******************************************************
    // * 初期処理
    // *******************************************************

    /**
     * コンストラクタ
     * @return {void}
     */
    constructor() {
      super();

      // Shadow DOMをオープンモードでアタッチ
      this.attachShadow({ mode: "open" });
      this.shadowRoot.innerHTML = "";

      // CSSを適用
      this.shadowRoot.adoptedStyleSheets = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__.ElmUtils.createStylesheet(_style_tree_view_css__WEBPACK_IMPORTED_MODULE_4__["default"]);

      // コンテンツの初期設定
      this.header = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__.ElmUtils.createElm("div", "header");
      this.root = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__.ElmUtils.createElm("div", "root");

      this.shadowRoot.appendChild(this.header);
      this.shadowRoot.appendChild(this.root);

      // コンテキストメニューを追加
      this.#addHeaderMenu();
      this.#addContextMenu();
    }

    /**
     * 検索メソッドを設定する。
     * @param {function} func - 検索メソッド
     */
    set searchHandler(func) {
      this.searchFunction = func;
    }

    /**
     * 指定したIDのグループを開く／閉じる
     * @param {string} id
     */
    toggleGroup(id) {
      const details = this.shadowRoot.getElementById(id).closest("details");
      details.open = !details.open;
    }

    // *******************************************************
    // * ヘッダーメニュー
    // *******************************************************
    #addHeaderMenu() {
      const headerMenu = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__.ElmUtils.createElm("div", "header-menu");
      headerMenu.appendChild(this.#createAllOpenButton());
      headerMenu.appendChild(this.#createAllCloseButton());
      headerMenu.appendChild(this.#createLine());
      headerMenu.appendChild(this.#createFilterNotStartedButton());
      headerMenu.appendChild(this.#createFilterStartedButton());
      headerMenu.appendChild(this.#createFilterCompletButton());
      headerMenu.appendChild(this.#createFilterOverDeadlineButton());
      headerMenu.appendChild(this.#createFilterButton());
      this.header.appendChild(headerMenu);
    }

    /**
     * セパレータを作成する。
     * @returns ボタン
     */
    #createLine() {
      const line = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__.ElmUtils.createElm("svg-btn", "line");
      line.iconPaths = _constants_svg_const__WEBPACK_IMPORTED_MODULE_3__.SvgConst.linePaths;
      line.size = "1.15rem";
      return line;
    }

    /**
     * ベースとなるボタンを作成する。
     * @param {string} id - ボタンのID
     * @param {Array} paths - アイコンのパス
     * @returns ボタン
     */
    #createButton(id, paths) {
      const btn = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__.ElmUtils.createElm("svg-btn", id);
      btn.iconPaths = paths;
      btn.size = "1.15rem";
      btn.color = "black";
      btn.hover = true;
      return btn;
    }

    /**
     * トグルボタンを作成する。
     * @param {string} id - ボタンのID
     * @param {Array} paths - アイコンのパス
     * @returns ボタン
     */
    #createToggleButton(id, paths) {
      const btn = this.#createButton(id, paths);
      btn.toggle = true;
      btn.toggleOn(true);
      return btn;
    }

    /**
     * グループをすべて開くボタンを作成する。
     * @returns ボタン
     */
    #createAllOpenButton() {
      const btn = this.#createButton("all-open", _constants_svg_const__WEBPACK_IMPORTED_MODULE_3__.SvgConst.treeOpenPaths);
      btn.addEventListener("click", () => {
        const details = this.root.querySelectorAll("details");
        details.forEach((detail) => (detail.open = true));
      });

      return btn;
    }

    /**
     * グループをすべて閉じるボタンを作成する。
     * @returns ボタン
     */
    #createAllCloseButton() {
      const btn = this.#createButton("all-close", _constants_svg_const__WEBPACK_IMPORTED_MODULE_3__.SvgConst.treeClosePaths);
      btn.addEventListener("click", () => {
        const details = this.root.querySelectorAll("details");
        details.forEach((detail) => (detail.open = false));
      });

      return btn;
    }

    /**
     * 未開始タスクのフィルタ設定ボタンを作成する。
     * @returns ボタン
     */
    #createFilterNotStartedButton() {
      this.btnFilterNotStarted = this.#createToggleButton(
        "filter-not-started",
        _constants_svg_const__WEBPACK_IMPORTED_MODULE_3__.SvgConst.squarePaths
      );
      this.btnFilterNotStarted.addEventListener("click", () => {
        this.#filterTreeViewItem();
      });
      return this.btnFilterNotStarted;
    }

    /**
     * 実行中タスクのフィルタ設定ボタンを作成する。
     * @returns ボタン
     */
    #createFilterStartedButton() {
      this.btnFilterStarted = this.#createToggleButton(
        "filter-started",
        _constants_svg_const__WEBPACK_IMPORTED_MODULE_3__.SvgConst.squareDotPaths
      );
      this.btnFilterStarted.addEventListener("click", () => {
        this.#filterTreeViewItem();
      });
      return this.btnFilterStarted;
    }

    /**
     * 完了タスクのフィルタ設定ボタンを作成する。
     * @returns ボタン
     */
    #createFilterCompletButton() {
      this.btnFilterComplet = this.#createToggleButton(
        "filter-completed",
        _constants_svg_const__WEBPACK_IMPORTED_MODULE_3__.SvgConst.squareCheckPaths
      );
      this.btnFilterComplet.addEventListener("click", () => {
        this.#filterTreeViewItem();
      });
      return this.btnFilterComplet;
    }

    /**
     * 遅延タスクのフィルタ設定ボタンを作成する。
     * @returns ボタン
     */
    #createFilterOverDeadlineButton() {
      this.btnFilterOverDeadline = this.#createToggleButton(
        "filter-over-deadline",
        _constants_svg_const__WEBPACK_IMPORTED_MODULE_3__.SvgConst.squareAlertPaths
      );
      this.btnFilterOverDeadline.color = "red";
      this.btnFilterOverDeadline.addEventListener("click", () => {
        this.#filterTreeViewItem();
      });
      return this.btnFilterOverDeadline;
    }

    /**
     * フィルタボタンを作成する。
     * @returns ボタン
     */
    #createFilterButton() {
      const btn = this.#createToggleButton("item-filter", _constants_svg_const__WEBPACK_IMPORTED_MODULE_3__.SvgConst.FilterPaths);
      btn.color = "green";
      btn.toggleOn(false);

      this.searchText = "";
      this.searchResult = [];

      // 検索
      btn.addEventListener("click", async () => {
        this.searchText = "";
        this.searchResult = [];

        if (btn.toggle) {
          this.searchText = prompt("検索条件を入力");
          if (this.searchText) {
            this.searchResult = await this.searchFunction(this.searchText);
          } else {
            btn.toggleOn(false);
          }
        }

        this.#filterTreeViewItem();
      });

      return btn;
    }

    /**
     * TreeViewのタスクに対するフィルタを設定する。
     */
    #filterTreeViewItem() {
      this.root.querySelectorAll("task-title").forEach((task) => {
        const flag = task.flag;
        let isDisabled;

        // ステータスフィルター
        if (flag.isComplete) {
          isDisabled = !this.btnFilterComplet.toggle;
        } else if (flag.isOverDeadline) {
          isDisabled = !this.btnFilterOverDeadline.toggle;
        } else if (flag.isNotStarted) {
          isDisabled = !this.btnFilterNotStarted.toggle;
        } else {
          isDisabled = !this.btnFilterStarted.toggle;
        }

        // 検索文字列フィルター
        if (!isDisabled && this.searchText) {
          isDisabled = this.searchResult.indexOf(`${task.id}.json`) === -1;
        }

        task.classList.toggle("disabled", isDisabled);
      });
    }

    // *******************************************************
    // * コンテキストメニュー
    // *******************************************************

    /**
     * コンテキストメニューを初期化し、Shadow DOMに追加します。
     * また、右クリック（コンテキストメニュー）のイベントリスナーを設定します。
     * @private
     */
    #addContextMenu() {
      this.menu = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__.ElmUtils.createElm("context-menu", "menu");
      this.shadowRoot.appendChild(this.menu);

      // ボタンを追加
      this.#insertAddTaskButton();
      this.#insertAddGroupButton();
      this.menu.addBorder();
      this.#insertDeleteItemButton();

      /**
       * メニューを開く
       * @param {MouseEvent} e - コンテキストメニューのイベントオブジェクト
       */
      this.shadowRoot.addEventListener("contextmenu", (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.menu.openMenu(e);

        const isTask = e.target.tagName.toLowerCase() === "task-title";
        const isGroup = e.target.tagName.toLowerCase() === "group-title";

        // ターゲットがタスクの場合、追加ボタンを無効
        if (isTask) {
          this.menu.setDisabled("add-new-task");
          this.menu.setDisabled("add-new-group");
        }

        // ターゲットがアイテム以外の場合、削除ボタンを無効
        if (!isTask && !isGroup) {
          this.menu.setDisabled("delete-item");
        }

        // メニューのターゲットを設定する
        this.menu.clickTarget = e.target;

        // メニューを開いている状態を設定
        if (isTask || isGroup) {
          this.menu.clickTarget.menuOpen = true;
        }
      });

      /**
       * メニューの「closeMenu」イベントをリッスンし、メニューのクリックターゲットを更新します。
       * @event closeMenu - メニューが閉じられたときに発生するイベント
       */
      this.menu.addEventListener(_constants_event_const__WEBPACK_IMPORTED_MODULE_2__.EventConst.CLOSE_CONTEXT_MENU, () => {
        this.menu.clickTarget.menuOpen = false;
        this.menu.clickTarget = null;
      });
    }

    /**
     * コンテキストメニューのターゲット要素を取得します。
     * クリックされた要素が特定の条件を満たす場合、その要素に対応するターゲットを返します。
     * デフォルトではルート要素を返します。
     * @param {HtmlElement} target - 対象
     * @returns {Element} - メニューを適用するターゲット要素
     * @private
     */
    #getMenuTarget(target) {
      if (target && target.tagName.toLowerCase() === "group-title") {
        const details = target.closest("details");
        const items = getItems(details);
        return items || this.root;
      }

      return this.root;
    }

    /**
     * 新しいタスクを追加するためのボタンを作成し、メニューに追加します。
     * ボタンがクリックされたときのイベントリスナーを設定します。
     * @private
     */
    #insertAddTaskButton() {
      const id = "add-new-task";
      const title = "新しいタスク";
      this.menu.addButton(id, title, _constants_svg_const__WEBPACK_IMPORTED_MODULE_3__.SvgConst.squarePlusPaths);

      /**
       * クリックイベント
       * @param {Event} event - クリックイベントオブジェクト
       */
      this.menu.addEventListener(`click-${id}`, (e) => {
        const name = prompt("新しいタスクを作成", "新規タスク");
        if (!name) {
          return;
        }

        const root = this.#getMenuTarget(this.menu.clickTarget);
        const task = this.#createNewTaskItem({ name: name });

        root.appendChild(task);

        this.#openGroup(root);
        const data = task.querySelector("task-title").getData();
        this.dispatchEvent(
          _utils_event_utils__WEBPACK_IMPORTED_MODULE_1__.EventUtils.createEvent(_constants_event_const__WEBPACK_IMPORTED_MODULE_2__.EventConst.ADD_NEW_TASK_ITEM_EVENT_NAME, data)
        );
      });
    }

    /**
     * 新しいグループを追加するためのボタンを作成し、メニューに追加します。
     * ボタンがクリックされたときのイベントリスナーを設定します。
     * @private
     */
    #insertAddGroupButton() {
      const id = "add-new-group";
      const title = "新しいグループ";
      this.menu.addButton(id, title, _constants_svg_const__WEBPACK_IMPORTED_MODULE_3__.SvgConst.folderPlusPaths);

      /**
       * クリックイベント
       * @param {Event} event - クリックイベントオブジェクト
       */
      this.menu.addEventListener(`click-${id}`, (e) => {
        const name = prompt("新しいグループを作成", "新規グループ");
        if (!name) {
          return;
        }

        const root = this.#getMenuTarget(this.menu.clickTarget);
        const group = this.#createNewGroupItem({ name: name });

        root.appendChild(group);

        this.#openGroup(root);
        const data = group.querySelector("group-title").getData();
        this.dispatchEvent(
          _utils_event_utils__WEBPACK_IMPORTED_MODULE_1__.EventUtils.createEvent(_constants_event_const__WEBPACK_IMPORTED_MODULE_2__.EventConst.ADD_NEW_GROUP_ITEM_EVENT_NAME, data)
        );
      });
    }

    /**
     * アイテムを削除するためのボタンを作成し、メニューに追加します。
     * ボタンがクリックされたときのイベントリスナーを設定します。
     * @private
     */
    #insertDeleteItemButton() {
      const id = "delete-item";
      const title = "削除";
      this.menu.addButton(id, title, _constants_svg_const__WEBPACK_IMPORTED_MODULE_3__.SvgConst.trashPaths);

      /**
       * クリックイベント
       * @param {Event} event - クリックイベントオブジェクト
       */
      this.menu.addEventListener(`click-${id}`, (e) => {
        this.#deleteItem(this.menu.clickTarget.id);
        this.dispatchEvent(
          _utils_event_utils__WEBPACK_IMPORTED_MODULE_1__.EventUtils.createEvent(_constants_event_const__WEBPACK_IMPORTED_MODULE_2__.EventConst.DELETE_TREEVIEW_ITEM_EVENT_NAME)
        );
      });
    }

    // *******************************************************
    // * TreeViewのデータ取得
    // *******************************************************

    /**
     * ツリービューのデータを取得する
     *
     * @returns {string} ツリーデータを返す。
     */
    getData() {
      /**
       * ノードリストから全ての要素を再帰的に取得する。
       *
       * @param {NodeList} nodes - 処理するノードリスト。
       * @returns {Array} 処理結果の要素リストを返す。
       */
      const getAllElement = (nodes) => {
        const elements = [];

        nodes.forEach((node) => {
          const isTask = node.dataset.type === "task";
          const isGroup = node.dataset.type === "group";

          if (isTask) {
            const task = node.querySelector("task-title");
            const data = task.getData();
            elements.push(data);
          } else if (isGroup) {
            const group = node.querySelector("group-title");
            const items = getItems(node);
            const data = group.getData();
            data.children = getAllElement(items.childNodes);
            elements.push(data);
          } else {
            // 何もしない
          }
        });

        return elements;
      };

      return getAllElement(this.root.childNodes);
    }

    /**
     * 指定されたIDに対応する要素を取得します。
     * @param {string} id - 取得する要素のID。
     * @returns {HTMLElement|null} - 指定されたIDに対応する要素。存在しない場合はnullを返します。
     */
    getItemById(id) {
      return this.shadowRoot.getElementById(id);
    }

    /**
     * 指定されたIDの要素を選択中の状態にします。
     * @param {string} id - 取得する要素のID。
     */
    selectItemById(id) {
      if (this.selectedItemId) {
        const beforeItem = this.shadowRoot.getElementById(this.selectedItemId);
        beforeItem.selected = false;
      }
      const item = this.getItemById(id);
      item.selected = true;

      this.selectedItemId = id;
    }

    /**
     * 指定されたIDに対応するグループの項目データを取得します。
     * @param {string} id - グループのID。
     * @returns {Array<Object>} - 項目データの配列。
     */
    getGroupItemsById(id) {
      const details = this.shadowRoot.getElementById(id).closest("details");
      const childElms = getItems(details).children;

      const items = [];
      for (let elm of childElms) {
        const item = elm.querySelectorAll("task-title,group-title")[0];
        const data = item.getData();
        data.id = item.id;
        if (data.type === "task") {
          data.paths = item.paths;
          data.flag = item.flag;
        }
        items.push(data);
      }

      return items;
    }

    // *******************************************************
    // * TreeViewの作成
    // *******************************************************
    /**
     * JSON文字列を元にツリービューをレンダリングします。
     * @param {string} jsonStr - JSON形式の文字列データ。
     */
    renderTreeView(jsonStr) {
      if (!jsonStr) {
        return;
      }

      /**
       * Jsonデータを元にTreeViewに項目を追加する（再帰処理）
       * @param {HTMLElement} currentRoot 追加先のルート要素
       * @param {object} data 追加するデータ
       * @returns {void}
       * @private
       */
      const addTreeViewItem = (root, data) => {
        if (data.type === "task") {
          // タスクを追加
          const task = this.#createNewTaskItem(data);
          root.appendChild(task);
        } else {
          // グループを追加
          const group = this.#createNewGroupItem(data);
          root.appendChild(group);

          // グループの子要素を追加
          const items = getItems(group);
          const children = data.children || data.childlen || [];
          (children || []).forEach((child) => {
            addTreeViewItem(items, child);
          });
        }
      };

      JSON.parse(jsonStr).forEach((data) => {
        addTreeViewItem(this.root, data);
      });
    }

    // *******************************************************
    // * TreeView要素の作成／削除
    // *******************************************************

    /**
     * 指定されたデータを元に新しいタスクアイテムを作成し、クリックイベントを設定します。
     * @param {Object} [data={}] - タスクアイテムの初期データ
     * @returns {HTMLElement} item - 作成されたタスクアイテム要素
     */
    #createNewTaskItem(data = {}) {
      const title = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__.ElmUtils.createElm("task-title");
      title.init(data);

      const item = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__.ElmUtils.createElm("div", null, ["tree-item"]);
      item.appendChild(title);
      item.setAttribute("draggable", true);
      item.dataset.type = "task";

      this.#addDragEventListeners(item);

      return item;
    }

    /**
     * 指定されたデータを元に新しいグループアイテムを作成します。
     * グループアイテムには、タイトル、詳細、および子アイテムのコンテナが含まれます。
     * @param {Object} [data={}] - グループアイテムの初期データ
     * @returns {HTMLElement} details - 作成されたグループアイテム要素
     * @private
     */
    #createNewGroupItem(data = {}) {
      const title = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__.ElmUtils.createElm("group-title");
      title.init(data);

      const details = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__.ElmUtils.createElm("details", null, ["tree-item"]);
      const summary = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__.ElmUtils.createElm("summary", null);
      const items = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__.ElmUtils.createElm("div", null, ["group-items"]);

      details.setAttribute("draggable", true);
      details.dataset.type = "group";
      details.addEventListener("toggle", () => {
        title.open = details.open;
      });

      summary.appendChild(title);

      details.appendChild(summary);
      details.appendChild(items);

      this.#addDragEventListeners(details);

      return details;
    }

    /**
     * 指定された要素の最も近い`<details>`要素を開きます。
     * @param {Element} element - `<details>`要素を検索する基点となる要素
     * @private
     */
    #openGroup(element) {
      const details = element.closest("details");
      if (details) details.open = true;
    }

    #deleteItem(id) {
      this.shadowRoot.getElementById(id).closest(".tree-item").remove();
    }

    // *******************************************************
    // * TreeViewのドラッグ＆ドロップ
    // *******************************************************
    /**
     * ドラッグイベントリスナーを追加
     * @param {HTMLElement} element ドラッグイベントリスナーを追加する要素
     */
    #addDragEventListeners(element) {
      element.addEventListener("dragstart", this.#handleDragStart);
      element.addEventListener("dragover", this.#handleDragOver, true);
      element.addEventListener("dragend", this.#handleDragEnd);
    }

    /**
     * ドラッグ操作開始
     * @param {Event} e
     */
    #handleDragStart(e) {
      draggedElement = e.target;
      draggedElement.classList.add("dragging");
      e.dataTransfer.effectAllowed = "move";
    }

    /**
     * ドラッグ中
     * @param {Event} e
     */
    #handleDragOver(e) {
      e.preventDefault();
      e.dataTransfer.dropEffect = "move";

      // タスクまたはグループのルート要素を取得
      const target = e.target.closest(".tree-item");

      // 自分自身と被っている場合
      if (!target || target === draggedElement) {
        return;
      }

      // draggedElement が target の中に含まれている場合
      if (draggedElement.contains(target)) {
        return;
      }

      // マウス位置が位置に来ているかを計算
      const rect = target.getBoundingClientRect();
      const nowPosition = (e.clientY - rect.top) / (rect.bottom - rect.top);

      // 要素の挿入位置を決定
      const targetIsTask = e.target.tagName.toLowerCase() === "task-title";

      if (targetIsTask) {
        if (nowPosition > 0.5) {
          target.insertAdjacentElement("afterend", draggedElement);
        } else {
          target.insertAdjacentElement("beforebegin", draggedElement);
        }
      } else {
        if (nowPosition > 0.5) {
          if (nowPosition >= 0.75) {
            target.insertAdjacentElement("afterend", draggedElement);
          } else {
            // 子要素に追加
            const items = target.querySelector(".group-items");
            items.appendChild(draggedElement);
          }
        } else {
          target.insertAdjacentElement("beforebegin", draggedElement);
        }
      }
    }

    /**
     * ドラッグ終了
     * @param {Event} e
     */
    #handleDragEnd(e) {
      if (!draggedElement) return;
      draggedElement.classList.remove("dragging");
      draggedElement = null;
      this.dispatchEvent(
        _utils_event_utils__WEBPACK_IMPORTED_MODULE_1__.EventUtils.createEvent(_constants_event_const__WEBPACK_IMPORTED_MODULE_2__.EventConst.CHANGE_TREEVIEW_EVENT_NAME)
      );
    }
  }
  customElements.define("tree-view", TreeView);
}


/***/ }),
/* 16 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `/*! destyle.css v4.0.1 | MIT License | https://github.com/nicolas-cusan/destyle.css */
/* Reset box-model and set borders */
/* ============================================ */
*,
::before,
::after {
  box-sizing: border-box;
  border-style: solid;
  border-width: 0;
  min-width: 0;
}

/* Document */
/* ============================================ */
/**
 * 1. Correct the line height in all browsers.
 * 2. Prevent adjustments of font size after orientation changes in iOS.
 * 3. Remove gray overlay on links for iOS.
 */
html {
  line-height: 1.15; /* 1 */
  -webkit-text-size-adjust: 100%; /* 2 */
  -webkit-tap-highlight-color: transparent; /* 3*/
}

/* Sections */
/* ============================================ */
/**
 * Remove the margin in all browsers.
 */
body {
  margin: 0;
}

/**
 * Render the \`main\` element consistently in IE.
 */
main {
  display: block;
}

/* Vertical rhythm */
/* ============================================ */
p,
table,
blockquote,
address,
pre,
iframe,
form,
figure,
dl {
  margin: 0;
}

/* Headings */
/* ============================================ */
h1,
h2,
h3,
h4,
h5,
h6 {
  font-size: inherit;
  font-weight: inherit;
  margin: 0;
}

/* Lists (enumeration) */
/* ============================================ */
ul,
ol {
  margin: 0;
  padding: 0;
  list-style: none;
}

/* Lists (definition) */
/* ============================================ */
dt {
  font-weight: bold;
}

dd {
  margin-left: 0;
}

/* Grouping content */
/* ============================================ */
/**
 * 1. Add the correct box sizing in Firefox.
 * 2. Show the overflow in Edge and IE.
 */
hr {
  box-sizing: content-box; /* 1 */
  height: 0; /* 1 */
  overflow: visible; /* 2 */
  border-top-width: 1px;
  margin: 0;
  clear: both;
  color: inherit;
}

/**
 * 1. Correct the inheritance and scaling of font size in all browsers.
 * 2. Correct the odd \`em\` font sizing in all browsers.
 */
pre {
  font-family: monospace, monospace; /* 1 */
  font-size: inherit; /* 2 */
}

address {
  font-style: inherit;
}

/* Text-level semantics */
/* ============================================ */
/**
 * Remove the gray background on active links in IE 10.
 */
a {
  background-color: transparent;
  text-decoration: none;
  color: inherit;
}

/**
 * 1. Remove the bottom border in Chrome 57-
 * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.
 */
abbr[title] {
  text-decoration: underline dotted; /* 2 */
}

/**
 * Add the correct font weight in Chrome, Edge, and Safari.
 */
b,
strong {
  font-weight: bolder;
}

/**
 * 1. Correct the inheritance and scaling of font size in all browsers.
 * 2. Correct the odd \`em\` font sizing in all browsers.
 */
code,
kbd,
samp {
  font-family: monospace, monospace; /* 1 */
  font-size: inherit; /* 2 */
}

/**
 * Add the correct font size in all browsers.
 */
small {
  font-size: 80%;
}

/**
 * Prevent \`sub\` and \`sup\` elements from affecting the line height in
 * all browsers.
 */
sub,
sup {
  font-size: 75%;
  line-height: 0;
  position: relative;
  vertical-align: baseline;
}

sub {
  bottom: -0.25em;
}

sup {
  top: -0.5em;
}

/* Replaced content */
/* ============================================ */
/**
 * Prevent vertical alignment issues.
 */
svg,
img,
embed,
object,
iframe {
  vertical-align: bottom;
}

/* Forms */
/* ============================================ */
/**
 * Reset form fields to make them styleable.
 * 1. Make form elements stylable across systems iOS especially.
 * 2. Inherit text-transform from parent.
 */
button,
input,
optgroup,
select,
textarea {
  -webkit-appearance: none; /* 1 */
  appearance: none;
  vertical-align: middle;
  color: inherit;
  font: inherit;
  background: transparent;
  padding: 0;
  margin: 0;
  border-radius: 0;
  text-align: inherit;
  text-transform: inherit; /* 2 */
}

/**
 * Correct cursors for clickable elements.
 */
button,
[type=button],
[type=reset],
[type=submit] {
  cursor: pointer;
}

button:disabled,
[type=button]:disabled,
[type=reset]:disabled,
[type=submit]:disabled {
  cursor: default;
}

/**
 * Improve outlines for Firefox and unify style with input elements & buttons.
 */
:-moz-focusring {
  outline: auto;
}

select:disabled {
  opacity: inherit;
}

/**
 * Remove padding
 */
option {
  padding: 0;
}

/**
 * Reset to invisible
 */
fieldset {
  margin: 0;
  padding: 0;
  min-width: 0;
}

legend {
  padding: 0;
}

/**
 * Add the correct vertical alignment in Chrome, Firefox, and Opera.
 */
progress {
  vertical-align: baseline;
}

/**
 * Remove the default vertical scrollbar in IE 10+.
 */
textarea {
  overflow: auto;
}

/**
 * Correct the cursor style of increment and decrement buttons in Chrome.
 */
[type=number]::-webkit-inner-spin-button,
[type=number]::-webkit-outer-spin-button {
  height: auto;
}

/**
 * Correct the outline style in Safari.
 */
[type=search] {
  outline-offset: -2px; /* 1 */
}

/**
 * Remove the inner padding in Chrome and Safari on macOS.
 */
[type=search]::-webkit-search-decoration {
  -webkit-appearance: none;
}

/**
 * 1. Correct the inability to style clickable types in iOS and Safari.
 * 2. Fix font inheritance.
 */
::-webkit-file-upload-button {
  -webkit-appearance: button; /* 1 */
  font: inherit; /* 2 */
}

/**
 * Fix appearance for Firefox
 */
[type=number] {
  -moz-appearance: textfield;
  appearance: textfiled;
}

/**
 * Clickable labels
 */
label[for] {
  cursor: pointer;
}

/* Interactive */
/* ============================================ */
/*
 * Add the correct display in Edge, IE 10+, and Firefox.
 */
details {
  display: block;
}

/*
 * Add the correct display in all browsers.
 */
summary {
  display: list-item;
}

/*
 * Remove outline for editable content.
 */
[contenteditable]:focus {
  outline: auto;
}

/* Tables */
/* ============================================ */
/**
1. Correct table border color inheritance in all Chrome and Safari.
*/
table {
  border-color: inherit; /* 1 */
  border-collapse: collapse;
}

caption {
  text-align: left;
}

td,
th {
  vertical-align: top;
  padding: 0;
}

th {
  text-align: left;
  font-weight: bold;
}

.svg {
  position: absolute;
  width: 0;
  height: 0;
  overflow: hidden;
}

.svg-icon {
  display: block;
  width: 1em;
  height: 1em;
  stroke-width: 0;
  stroke: currentColor;
  fill: currentColor;
  pointer-events: none;
}
.svg-icon use {
  pointer-events: none;
}

* {
  font-family: monospace;
}

#header-menu {
  padding: 0.5rem 0;
  margin: 0 0.5rem;
  border-bottom: 1px solid #8f8f8f;
}

#root {
  width: 100%;
  height: 100%;
  padding: 0.5rem;
}
#root details summary {
  list-style: none;
}
#root details .group-items {
  margin-left: 1.1rem;
}
#root .dragging {
  opacity: 0.5;
}
#root .disabled {
  display: none;
}
`, ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 17 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TaskTitle: () => (/* binding */ TaskTitle)
/* harmony export */ });
/* harmony import */ var _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _utils_svg_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(10);
/* harmony import */ var _constants_svg_const__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3);
/* harmony import */ var _utils_id_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(18);
/* harmony import */ var _utils_event_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9);
/* harmony import */ var _constants_event_const__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(13);
/* harmony import */ var _utils_date_utils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(19);
/* harmony import */ var _style_task_title_css__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(20);










/**
 * TaskTitle コンポーネント
 * @class TaskTitle
 * @extends {HTMLElement}
 */
function TaskTitle() {
  class TaskTitle extends HTMLElement {
    /**
     * コンストラクタ
     * @return {void}
     */
    constructor() {
      super();

      // Shadow DOMをオープンモードでアタッチ
      this.attachShadow({ mode: "open" });
      this.shadowRoot.innerHTML = "";

      // CSSを適用
      this.shadowRoot.adoptedStyleSheets = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__.ElmUtils.createStylesheet(_style_task_title_css__WEBPACK_IMPORTED_MODULE_7__["default"]);

      // 空の要素を作成
      this.root = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__.ElmUtils.createElm("div", "root", ["task-title"]);

      this.shadowRoot.appendChild(this.root);
    }

    /**
     * タスクの名前ゲッター
     * @returns {string} - タスクの名前
     */
    get name() {
      return this._name;
    }

    /**
     * タスクの名前セッター
     * @param {string} value - 新しい名前
     */
    set name(value) {
      this._name = value;
    }

    /**
     * タスクの期限日ゲッター
     * @returns {string} - 期限日
     */
    get duedate() {
      return this._duedate;
    }

    /**
     * タスクの期限日セッター
     * @param {string} value - 新しい期限日
     */
    set duedate(value) {
      this._duedate = value;
    }

    /**
     * タスクの優先度ゲッター
     * @returns {string} - 優先度
     */
    get priority() {
      return this._priority;
    }

    /**
     * タスクの優先度セッター
     * @param {string} value - 新しい優先度
     */
    set priority(value) {
      this._priority = value;
    }

    /**
     * タスクの状態ゲッター
     * @returns {string} - 状態
     */
    get status() {
      return this._status;
    }

    /**
     * タスクの状態セッター
     * @param {string} value - 新しい状態
     */
    set status(value) {
      this._status = value;
    }

    /**
     * 種類
     * @returns {string} - 種類
     */
    get type() {
      return "task";
    }

    /**
     * アイコンパス
     * @returns {string} - アイコンパス
     */
    get paths() {
      return this._paths;
    }

    /**
     * フラグ
     * @returns {Object} - フラグ
     */
    get flag() {
      return this._flag;
    }

    /**
     * メニューを開いている状態
     * @param {bool} value - 状態
     */
    set menuOpen(value) {
      this.root.classList.toggle("menu-opened", value);
    }

    /**
     * 選択状態の切り替え
     * @param {bool} value - 状態
     */
    set selected(value) {
      this.root.classList.toggle("selected", value);
    }

    /**
     * タスクを初期化するメソッド
     * @param {Object} data - タスクデータのオブジェクト
     * @param {string} data.id - タスクのID
     * @param {string} data.name - タスクの名前
     * @param {string} data.duedate - タスクの期限日
     * @param {string} data.priority - タスクの優先度
     * @param {string} data.status - タスクの状態
     * @return {void} - なし
     */
    init(data) {
      this.id = data.id || _utils_id_utils__WEBPACK_IMPORTED_MODULE_3__.IdUtils.getUniqueId();
      this.name = data.name || "新規タスク";
      this.duedate = data.duedate || "";
      this.priority = data.priority || "";
      this.status = data.status || "0";

      this.#refreshView();

      /**
       * クリックイベントを通知
       */
      this.root.addEventListener("click", () => {
        this.shadowRoot.dispatchEvent(
          _utils_event_utils__WEBPACK_IMPORTED_MODULE_4__.EventUtils.createEvent(_constants_event_const__WEBPACK_IMPORTED_MODULE_5__.EventConst.CLICK_TASK_EVENT_NAME, {
            id: this.id,
          })
        );
      });
    }

    /**
     * 現在のオブジェクトのデータを収集し、データアイテムとして返します。
     * @returns {Object} dataItem - データアイテムオブジェクト
     * @returns {string} dataItem.id - タスクのID
     * @returns {string} dataItem.name - タスクの名前（デフォルトは "新規タスク"）
     * @returns {string} dataItem.type - タスクのタイプ
     * @returns {string} dataItem.duedate - タスクの期限日
     * @returns {string} dataItem.priority - タスクの優先度
     * @returns {number} dataItem.status - タスクのステータス（デフォルトは 0）
     */
    getData() {
      const dataItem = {};
      dataItem.id = this.id;
      dataItem.name = this.name || "新規タスク";
      dataItem.type = this.type;
      dataItem.duedate = this.duedate || "";
      dataItem.priority = this.priority || "";
      dataItem.status = this.status || 0;

      return dataItem;
    }

    /**
     * タスクの表示内容を更新するメソッド
     * @return {void} - なし
     */
    refreshView() {
      this.#refreshView();
      this.dispatchEvent(
        _utils_event_utils__WEBPACK_IMPORTED_MODULE_4__.EventUtils.createEvent(_constants_event_const__WEBPACK_IMPORTED_MODULE_5__.EventConst.CHANGE_TREEVIEW_EVENT_NAME)
      );
    }

    /**
     * タスクの表示内容を更新するメソッド
     * @private
     * @return {void} - なし
     */
    #refreshView() {
      this.root.innerHTML = "";
      const isComplete = this.status === "100";
      const isNotStarted = this.status === "0";
      const isOverDeadline = _utils_date_utils__WEBPACK_IMPORTED_MODULE_6__.DateUtils.calcDateDiffToday(this.duedate) < 3;

      this._flag = {
        isComplete: isComplete,
        isNotStarted: isNotStarted,
        isOverDeadline: isOverDeadline,
      };

      // アイコン設定
      this.root.classList.toggle("complete", isComplete);
      this.root.classList.toggle("over-deadline", isOverDeadline);

      let paths;
      if (isComplete) {
        paths = _constants_svg_const__WEBPACK_IMPORTED_MODULE_2__.SvgConst.squareCheckPaths; // 完了
      } else if (isOverDeadline) {
        paths = _constants_svg_const__WEBPACK_IMPORTED_MODULE_2__.SvgConst.squareAlertPaths; // 注意
      } else if (isNotStarted) {
        paths = _constants_svg_const__WEBPACK_IMPORTED_MODULE_2__.SvgConst.squarePaths; // 未着手
      } else {
        paths = _constants_svg_const__WEBPACK_IMPORTED_MODULE_2__.SvgConst.squareDotPaths; // 進行中
      }

      this._paths = paths;

      const icon = _utils_svg_utils__WEBPACK_IMPORTED_MODULE_1__.SvgUtils.createIcon(paths);
      this.root.appendChild(icon);

      // タスク名設定
      const text = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__.ElmUtils.createElm("p", null, ["task-text"]);
      text.innerText = this.name;
      this.root.appendChild(text);
    }
  }
  customElements.define("task-title", TaskTitle);
}


/***/ }),
/* 18 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   IdUtils: () => (/* binding */ IdUtils)
/* harmony export */ });
/**
 * IDユーティリティクラス
 */
class IdUtils {
  /**
   * 一意のIDを生成する
   * @returns {string} 一意のID
   */
  static getUniqueId = () => {
    // ランダム文字列を生成する
    const randomStr = Math.floor(10000 * Math.random()).toString(16);

    // 日付文字列を生成
    const date = new Date();
    const parts = {
      yyyy: date.getFullYear(),
      MM: String(date.getMonth() + 1).padStart(2, "0"),
      dd: String(date.getDate()).padStart(2, "0"),
      HH: String(date.getHours()).padStart(2, "0"),
      mm: String(date.getMinutes()).padStart(2, "0"),
      ss: String(date.getSeconds()).padStart(2, "0"),
      SSS: String(date.getMilliseconds()).padStart(3, "0"),
    };

    const format = "{yyyy}{MM}{dd}{HH}{mm}{ss}{SSS}";
    const systemDate = format.replace(
      /{(yyyy|MM|dd|HH|mm|ss|SSS)}/g,
      (matched) => parts[matched.slice(1, -1)]
    );

    return `${systemDate}_${randomStr}`;
  };
}


/***/ }),
/* 19 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DateUtils: () => (/* binding */ DateUtils)
/* harmony export */ });
/**
 * 日付ユーティリティクラス
 */
class DateUtils {
  /**
   * 日付オブジェクトからフォーマットされた文字列を生成するヘルパー関数
   * @param {Date} date 日付オブジェクト
   * @param {string} format 日付フォーマット
   * @returns {string} フォーマットされた日付文字列
   */
  static formatDate = (date, format = "{yyyy}{MM}{dd}{HH}{mm}{ss}{SSS}") => {
    const parts = {
      yyyy: date.getFullYear(),
      MM: String(date.getMonth() + 1).padStart(2, "0"),
      dd: String(date.getDate()).padStart(2, "0"),
      HH: String(date.getHours()).padStart(2, "0"),
      mm: String(date.getMinutes()).padStart(2, "0"),
      ss: String(date.getSeconds()).padStart(2, "0"),
      SSS: String(date.getMilliseconds()).padStart(3, "0"),
    };

    return format.replace(
      /{(yyyy|MM|dd|HH|mm|ss|SSS)}/g,
      (matched) => parts[matched.slice(1, -1)]
    );
  };

  /**
   * 日付文字列をDateオブジェクトに変換する。
   * @param {string} dateString - "yyyy-mm-dd"形式の日付文字列。
   * @returns {Date} - 変換されたDateオブジェクト。
   */
  static parseDate = (dateString) => {
    // 日付であるか判定
    if (!this.isValidDate(dateString)) {
      throw new Error("日付文字列の形式が正しくありません。");
    }
    // "-"で日付を分割し、配列として取得
    const parts = dateString.split("-");

    // 配列の要素を数値に変換
    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1; // 月は0-11で表現されるため-1
    const day = parseInt(parts[2], 10);

    // Dateオブジェクトを作成して返す
    return new Date(year, month, day);
  };

  /**
   * 与えられた文字列がyyyy-mm-dd形式の日付かどうかを判定する
   *
   * @param {string} dateString - 判定する文字列。
   * @returns {boolean} - 有効な日付形式かどうか。
   */
  static isValidDate = (dateString) => {
    // 正規表現によるフォーマットのチェック
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(dateString)) {
      return false;
    }

    // Dateオブジェクトを使用して実際の有効性を確認
    const date = new Date(dateString);
    const timestamp = date.getTime();
    if (typeof timestamp !== "number" || Number.isNaN(timestamp)) {
      return false;
    }

    // 入力された文字列が有効な日付か確認
    return date.toISOString().startsWith(dateString);
  };

  /**
   * 与えられた日付文字列と当日の日付との差を日数で計算する。
   * @param {string} dataString - yyyy-mm-dd形式の日付文字列。
   * @returns {number} - 当日からの残り日数。
   */
  static calcDateDiffToday(dataString) {
    /**
     * ミリ秒を1日単位に変換する定数
     */
    const MS_PER_DAY = 86400000;

    // 空の場合は処理対象外
    if (!this.isValidDate(dataString)) {
      return 0;
    }
    // 入力された日付をパース
    const data = this.parseDate(dataString);
    // 本日の日付を取得してフォーマット
    const today = this.parseDate(
      this.formatDate(new Date(), "{yyyy}-{MM}-{dd}")
    );
    // 残り日数を計算
    const dayCount = Math.floor((data - today) / MS_PER_DAY);

    return dayCount;
  }
}


/***/ }),
/* 20 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `/*! destyle.css v4.0.1 | MIT License | https://github.com/nicolas-cusan/destyle.css */
/* Reset box-model and set borders */
/* ============================================ */
*,
::before,
::after {
  box-sizing: border-box;
  border-style: solid;
  border-width: 0;
  min-width: 0;
}

/* Document */
/* ============================================ */
/**
 * 1. Correct the line height in all browsers.
 * 2. Prevent adjustments of font size after orientation changes in iOS.
 * 3. Remove gray overlay on links for iOS.
 */
html {
  line-height: 1.15; /* 1 */
  -webkit-text-size-adjust: 100%; /* 2 */
  -webkit-tap-highlight-color: transparent; /* 3*/
}

/* Sections */
/* ============================================ */
/**
 * Remove the margin in all browsers.
 */
body {
  margin: 0;
}

/**
 * Render the \`main\` element consistently in IE.
 */
main {
  display: block;
}

/* Vertical rhythm */
/* ============================================ */
p,
table,
blockquote,
address,
pre,
iframe,
form,
figure,
dl {
  margin: 0;
}

/* Headings */
/* ============================================ */
h1,
h2,
h3,
h4,
h5,
h6 {
  font-size: inherit;
  font-weight: inherit;
  margin: 0;
}

/* Lists (enumeration) */
/* ============================================ */
ul,
ol {
  margin: 0;
  padding: 0;
  list-style: none;
}

/* Lists (definition) */
/* ============================================ */
dt {
  font-weight: bold;
}

dd {
  margin-left: 0;
}

/* Grouping content */
/* ============================================ */
/**
 * 1. Add the correct box sizing in Firefox.
 * 2. Show the overflow in Edge and IE.
 */
hr {
  box-sizing: content-box; /* 1 */
  height: 0; /* 1 */
  overflow: visible; /* 2 */
  border-top-width: 1px;
  margin: 0;
  clear: both;
  color: inherit;
}

/**
 * 1. Correct the inheritance and scaling of font size in all browsers.
 * 2. Correct the odd \`em\` font sizing in all browsers.
 */
pre {
  font-family: monospace, monospace; /* 1 */
  font-size: inherit; /* 2 */
}

address {
  font-style: inherit;
}

/* Text-level semantics */
/* ============================================ */
/**
 * Remove the gray background on active links in IE 10.
 */
a {
  background-color: transparent;
  text-decoration: none;
  color: inherit;
}

/**
 * 1. Remove the bottom border in Chrome 57-
 * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.
 */
abbr[title] {
  text-decoration: underline dotted; /* 2 */
}

/**
 * Add the correct font weight in Chrome, Edge, and Safari.
 */
b,
strong {
  font-weight: bolder;
}

/**
 * 1. Correct the inheritance and scaling of font size in all browsers.
 * 2. Correct the odd \`em\` font sizing in all browsers.
 */
code,
kbd,
samp {
  font-family: monospace, monospace; /* 1 */
  font-size: inherit; /* 2 */
}

/**
 * Add the correct font size in all browsers.
 */
small {
  font-size: 80%;
}

/**
 * Prevent \`sub\` and \`sup\` elements from affecting the line height in
 * all browsers.
 */
sub,
sup {
  font-size: 75%;
  line-height: 0;
  position: relative;
  vertical-align: baseline;
}

sub {
  bottom: -0.25em;
}

sup {
  top: -0.5em;
}

/* Replaced content */
/* ============================================ */
/**
 * Prevent vertical alignment issues.
 */
svg,
img,
embed,
object,
iframe {
  vertical-align: bottom;
}

/* Forms */
/* ============================================ */
/**
 * Reset form fields to make them styleable.
 * 1. Make form elements stylable across systems iOS especially.
 * 2. Inherit text-transform from parent.
 */
button,
input,
optgroup,
select,
textarea {
  -webkit-appearance: none; /* 1 */
  appearance: none;
  vertical-align: middle;
  color: inherit;
  font: inherit;
  background: transparent;
  padding: 0;
  margin: 0;
  border-radius: 0;
  text-align: inherit;
  text-transform: inherit; /* 2 */
}

/**
 * Correct cursors for clickable elements.
 */
button,
[type=button],
[type=reset],
[type=submit] {
  cursor: pointer;
}

button:disabled,
[type=button]:disabled,
[type=reset]:disabled,
[type=submit]:disabled {
  cursor: default;
}

/**
 * Improve outlines for Firefox and unify style with input elements & buttons.
 */
:-moz-focusring {
  outline: auto;
}

select:disabled {
  opacity: inherit;
}

/**
 * Remove padding
 */
option {
  padding: 0;
}

/**
 * Reset to invisible
 */
fieldset {
  margin: 0;
  padding: 0;
  min-width: 0;
}

legend {
  padding: 0;
}

/**
 * Add the correct vertical alignment in Chrome, Firefox, and Opera.
 */
progress {
  vertical-align: baseline;
}

/**
 * Remove the default vertical scrollbar in IE 10+.
 */
textarea {
  overflow: auto;
}

/**
 * Correct the cursor style of increment and decrement buttons in Chrome.
 */
[type=number]::-webkit-inner-spin-button,
[type=number]::-webkit-outer-spin-button {
  height: auto;
}

/**
 * Correct the outline style in Safari.
 */
[type=search] {
  outline-offset: -2px; /* 1 */
}

/**
 * Remove the inner padding in Chrome and Safari on macOS.
 */
[type=search]::-webkit-search-decoration {
  -webkit-appearance: none;
}

/**
 * 1. Correct the inability to style clickable types in iOS and Safari.
 * 2. Fix font inheritance.
 */
::-webkit-file-upload-button {
  -webkit-appearance: button; /* 1 */
  font: inherit; /* 2 */
}

/**
 * Fix appearance for Firefox
 */
[type=number] {
  -moz-appearance: textfield;
  appearance: textfiled;
}

/**
 * Clickable labels
 */
label[for] {
  cursor: pointer;
}

/* Interactive */
/* ============================================ */
/*
 * Add the correct display in Edge, IE 10+, and Firefox.
 */
details {
  display: block;
}

/*
 * Add the correct display in all browsers.
 */
summary {
  display: list-item;
}

/*
 * Remove outline for editable content.
 */
[contenteditable]:focus {
  outline: auto;
}

/* Tables */
/* ============================================ */
/**
1. Correct table border color inheritance in all Chrome and Safari.
*/
table {
  border-color: inherit; /* 1 */
  border-collapse: collapse;
}

caption {
  text-align: left;
}

td,
th {
  vertical-align: top;
  padding: 0;
}

th {
  text-align: left;
  font-weight: bold;
}

.svg {
  position: absolute;
  width: 0;
  height: 0;
  overflow: hidden;
}

.svg-icon {
  display: block;
  width: 1em;
  height: 1em;
  stroke-width: 0;
  stroke: currentColor;
  fill: currentColor;
  pointer-events: none;
}
.svg-icon use {
  pointer-events: none;
}

* {
  font-family: monospace;
}

.task-title {
  cursor: pointer;
  display: flex;
  align-items: center;
  text-decoration-skip-ink: none;
  border-radius: 0.15rem;
  padding: 0.15rem;
}
.task-title:hover, .task-title.menu-opened, .task-title.selected {
  background-color: #0078d4;
  color: #fffff8;
}
.task-title.over-deadline {
  color: #f93827;
}
.task-title.over-deadline:hover, .task-title.over-deadline.selected {
  background-color: #f93827;
  color: #fffff8;
}
.task-title.complete {
  color: #838383;
  text-decoration: line-through;
}
.task-title.complete:hover, .task-title.complete.selected {
  background-color: #838383;
  color: #fffff8;
}
.task-title .svg-icon {
  margin-right: 0.25rem;
  height: 1rem;
  width: 1rem;
}
.task-title .task-text {
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding-top: 1px;
}
`, ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 21 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GroupTitle: () => (/* binding */ GroupTitle)
/* harmony export */ });
/* harmony import */ var _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _utils_svg_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(10);
/* harmony import */ var _constants_svg_const__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3);
/* harmony import */ var _utils_id_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(18);
/* harmony import */ var _utils_event_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9);
/* harmony import */ var _constants_event_const__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(13);
/* harmony import */ var _style_group_title_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(22);









/**
 * GroupTitle コンポーネント
 * @class GroupTitle
 * @extends {HTMLElement}
 */
function GroupTitle() {
  class GroupTitle extends HTMLElement {
    /**
     * コンストラクタ
     * @return {void}
     */
    constructor() {
      super();

      // Shadow DOMをオープンモードでアタッチ
      this.attachShadow({ mode: "open" });
      this.shadowRoot.innerHTML = "";

      // CSSを適用
      this.shadowRoot.adoptedStyleSheets = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__.ElmUtils.createStylesheet(_style_group_title_css__WEBPACK_IMPORTED_MODULE_6__["default"]);

      // 空の要素を作成
      this.root = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__.ElmUtils.createElm("div", "root", ["group-title"]);

      this.shadowRoot.appendChild(this.root);
    }

    /**
     * グループの名前セッター
     * @param {string} value - 新しい名前
     */
    set name(value) {
      this._name = value;
      this.#refreshView();
      this.dispatchEvent(
        _utils_event_utils__WEBPACK_IMPORTED_MODULE_4__.EventUtils.createEvent(_constants_event_const__WEBPACK_IMPORTED_MODULE_5__.EventConst.CHANGE_TREEVIEW_EVENT_NAME)
      );
    }

    /**
     * グループの名前ゲッター
     * @returns {string} - グループの名前
     */
    get name() {
      return this._name;
    }

    /**
     * グループの開閉状態を設定します。
     * @param {boolean} value - グループを開く場合はtrue、閉じる場合はfalse
     */
    set open(value) {
      this.root.classList.toggle("group-opened", value);
    }

    /**
     * 種類
     * @returns {string} - 種類
     */
    get type() {
      return "group";
    }

    /**
     * メニューを開いている状態
     * @param {bool} value - 状態
     */
    set menuOpen(value) {
      this.root.classList.toggle("menu-opened", value);
    }

    /**
     * 選択状態の切り替え
     * @param {bool} value - 状態
     */
    set selected(value) {
      this.root.classList.toggle("selected", value);
    }

    /**
     * グループを初期化するメソッド
     * @param {Object} data - グループデータのオブジェクト
     * @param {string} data.id - グループのID
     * @param {string} data.name - グループの名前
     * @return {void} - なし
     */
    init(data) {
      const id = _utils_id_utils__WEBPACK_IMPORTED_MODULE_3__.IdUtils.getUniqueId();
      this.id = data.id || `g${id}`;
      this.name = data.name || "新規グループ";

      this.#refreshView();

      /**
       * クリックイベントを通知
       */
      this.root.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.shadowRoot.dispatchEvent(
          _utils_event_utils__WEBPACK_IMPORTED_MODULE_4__.EventUtils.createEvent(_constants_event_const__WEBPACK_IMPORTED_MODULE_5__.EventConst.CLICK_GROUP_EVENT_NAME, {
            id: this.id,
            name: this.name,
          })
        );
      });

      /**
       * ダブルクリックイベントを追加
       */
      // TODO
      this.root.addEventListener("dblclick", () => {
        this.shadowRoot.dispatchEvent(
          _utils_event_utils__WEBPACK_IMPORTED_MODULE_4__.EventUtils.createEvent(_constants_event_const__WEBPACK_IMPORTED_MODULE_5__.EventConst.DBL_CLICK_GROUP_EVENT_NAME, {
            id: this.id,
            name: this.name,
          })
        );
      });
    }

    /**
     * 現在のオブジェクトのデータを収集し、データアイテムとして返します。
     * @returns {Object} dataItem - データアイテムオブジェクト
     * @returns {string|null} dataItem.id - グループのID（存在しない場合はnull）
     * @returns {string} dataItem.name - グループの名前（デフォルトは "新規グループ"）
     */
    getData() {
      const dataItem = {};
      dataItem.id = this.id || null;
      dataItem.name = this.name || "新規グループ";
      dataItem.type = this.type;

      return dataItem;
    }

    /**
     * タスクの表示内容を更新するメソッド
     * @return {void} - なし
     */
    refreshView() {
      this.#refreshView();
      this.dispatchEvent(
        _utils_event_utils__WEBPACK_IMPORTED_MODULE_4__.EventUtils.createEvent(_constants_event_const__WEBPACK_IMPORTED_MODULE_5__.EventConst.CHANGE_TREEVIEW_EVENT_NAME)
      );
    }

    /**
     * グループの表示状態を更新するメソッド
     * @private
     * @return {void} - なし
     */
    #refreshView() {
      // 初期化
      this.root.innerHTML = "";

      // アイコン設定
      const icon = _utils_svg_utils__WEBPACK_IMPORTED_MODULE_1__.SvgUtils.createIcon(_constants_svg_const__WEBPACK_IMPORTED_MODULE_2__.SvgConst.chevronRightPaths);
      this.root.appendChild(icon);

      // タイトル設定
      const text = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__.ElmUtils.createElm("span", null, ["group-text"]);
      text.innerText = this.name;
      this.root.appendChild(text);
    }
  }
  customElements.define("group-title", GroupTitle);
}


/***/ }),
/* 22 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `/*! destyle.css v4.0.1 | MIT License | https://github.com/nicolas-cusan/destyle.css */
/* Reset box-model and set borders */
/* ============================================ */
*,
::before,
::after {
  box-sizing: border-box;
  border-style: solid;
  border-width: 0;
  min-width: 0;
}

/* Document */
/* ============================================ */
/**
 * 1. Correct the line height in all browsers.
 * 2. Prevent adjustments of font size after orientation changes in iOS.
 * 3. Remove gray overlay on links for iOS.
 */
html {
  line-height: 1.15; /* 1 */
  -webkit-text-size-adjust: 100%; /* 2 */
  -webkit-tap-highlight-color: transparent; /* 3*/
}

/* Sections */
/* ============================================ */
/**
 * Remove the margin in all browsers.
 */
body {
  margin: 0;
}

/**
 * Render the \`main\` element consistently in IE.
 */
main {
  display: block;
}

/* Vertical rhythm */
/* ============================================ */
p,
table,
blockquote,
address,
pre,
iframe,
form,
figure,
dl {
  margin: 0;
}

/* Headings */
/* ============================================ */
h1,
h2,
h3,
h4,
h5,
h6 {
  font-size: inherit;
  font-weight: inherit;
  margin: 0;
}

/* Lists (enumeration) */
/* ============================================ */
ul,
ol {
  margin: 0;
  padding: 0;
  list-style: none;
}

/* Lists (definition) */
/* ============================================ */
dt {
  font-weight: bold;
}

dd {
  margin-left: 0;
}

/* Grouping content */
/* ============================================ */
/**
 * 1. Add the correct box sizing in Firefox.
 * 2. Show the overflow in Edge and IE.
 */
hr {
  box-sizing: content-box; /* 1 */
  height: 0; /* 1 */
  overflow: visible; /* 2 */
  border-top-width: 1px;
  margin: 0;
  clear: both;
  color: inherit;
}

/**
 * 1. Correct the inheritance and scaling of font size in all browsers.
 * 2. Correct the odd \`em\` font sizing in all browsers.
 */
pre {
  font-family: monospace, monospace; /* 1 */
  font-size: inherit; /* 2 */
}

address {
  font-style: inherit;
}

/* Text-level semantics */
/* ============================================ */
/**
 * Remove the gray background on active links in IE 10.
 */
a {
  background-color: transparent;
  text-decoration: none;
  color: inherit;
}

/**
 * 1. Remove the bottom border in Chrome 57-
 * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.
 */
abbr[title] {
  text-decoration: underline dotted; /* 2 */
}

/**
 * Add the correct font weight in Chrome, Edge, and Safari.
 */
b,
strong {
  font-weight: bolder;
}

/**
 * 1. Correct the inheritance and scaling of font size in all browsers.
 * 2. Correct the odd \`em\` font sizing in all browsers.
 */
code,
kbd,
samp {
  font-family: monospace, monospace; /* 1 */
  font-size: inherit; /* 2 */
}

/**
 * Add the correct font size in all browsers.
 */
small {
  font-size: 80%;
}

/**
 * Prevent \`sub\` and \`sup\` elements from affecting the line height in
 * all browsers.
 */
sub,
sup {
  font-size: 75%;
  line-height: 0;
  position: relative;
  vertical-align: baseline;
}

sub {
  bottom: -0.25em;
}

sup {
  top: -0.5em;
}

/* Replaced content */
/* ============================================ */
/**
 * Prevent vertical alignment issues.
 */
svg,
img,
embed,
object,
iframe {
  vertical-align: bottom;
}

/* Forms */
/* ============================================ */
/**
 * Reset form fields to make them styleable.
 * 1. Make form elements stylable across systems iOS especially.
 * 2. Inherit text-transform from parent.
 */
button,
input,
optgroup,
select,
textarea {
  -webkit-appearance: none; /* 1 */
  appearance: none;
  vertical-align: middle;
  color: inherit;
  font: inherit;
  background: transparent;
  padding: 0;
  margin: 0;
  border-radius: 0;
  text-align: inherit;
  text-transform: inherit; /* 2 */
}

/**
 * Correct cursors for clickable elements.
 */
button,
[type=button],
[type=reset],
[type=submit] {
  cursor: pointer;
}

button:disabled,
[type=button]:disabled,
[type=reset]:disabled,
[type=submit]:disabled {
  cursor: default;
}

/**
 * Improve outlines for Firefox and unify style with input elements & buttons.
 */
:-moz-focusring {
  outline: auto;
}

select:disabled {
  opacity: inherit;
}

/**
 * Remove padding
 */
option {
  padding: 0;
}

/**
 * Reset to invisible
 */
fieldset {
  margin: 0;
  padding: 0;
  min-width: 0;
}

legend {
  padding: 0;
}

/**
 * Add the correct vertical alignment in Chrome, Firefox, and Opera.
 */
progress {
  vertical-align: baseline;
}

/**
 * Remove the default vertical scrollbar in IE 10+.
 */
textarea {
  overflow: auto;
}

/**
 * Correct the cursor style of increment and decrement buttons in Chrome.
 */
[type=number]::-webkit-inner-spin-button,
[type=number]::-webkit-outer-spin-button {
  height: auto;
}

/**
 * Correct the outline style in Safari.
 */
[type=search] {
  outline-offset: -2px; /* 1 */
}

/**
 * Remove the inner padding in Chrome and Safari on macOS.
 */
[type=search]::-webkit-search-decoration {
  -webkit-appearance: none;
}

/**
 * 1. Correct the inability to style clickable types in iOS and Safari.
 * 2. Fix font inheritance.
 */
::-webkit-file-upload-button {
  -webkit-appearance: button; /* 1 */
  font: inherit; /* 2 */
}

/**
 * Fix appearance for Firefox
 */
[type=number] {
  -moz-appearance: textfield;
  appearance: textfiled;
}

/**
 * Clickable labels
 */
label[for] {
  cursor: pointer;
}

/* Interactive */
/* ============================================ */
/*
 * Add the correct display in Edge, IE 10+, and Firefox.
 */
details {
  display: block;
}

/*
 * Add the correct display in all browsers.
 */
summary {
  display: list-item;
}

/*
 * Remove outline for editable content.
 */
[contenteditable]:focus {
  outline: auto;
}

/* Tables */
/* ============================================ */
/**
1. Correct table border color inheritance in all Chrome and Safari.
*/
table {
  border-color: inherit; /* 1 */
  border-collapse: collapse;
}

caption {
  text-align: left;
}

td,
th {
  vertical-align: top;
  padding: 0;
}

th {
  text-align: left;
  font-weight: bold;
}

.svg {
  position: absolute;
  width: 0;
  height: 0;
  overflow: hidden;
}

.svg-icon {
  display: block;
  width: 1em;
  height: 1em;
  stroke-width: 0;
  stroke: currentColor;
  fill: currentColor;
  pointer-events: none;
}
.svg-icon use {
  pointer-events: none;
}

* {
  font-family: monospace;
}

.group-title {
  cursor: pointer;
  display: flex;
  align-items: center;
  text-decoration-skip-ink: none;
  border-radius: 0.15rem;
  padding: 0.15rem;
}
.group-title::-webkit-details-marker {
  display: none;
}
.group-title:hover, .group-title.menu-opened, .group-title.selected {
  background-color: #0078d4;
  color: #fffff8;
}
.group-title .svg-icon {
  margin-right: 0.25rem;
  height: 1rem;
  width: 1rem;
  transition: transform 0.25s;
}
.group-title.group-opened .svg-icon {
  transform: rotate(90deg);
  top: 0.22rem;
  left: 0.18rem;
}
.group-title .group-text {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding-top: 1px;
}
`, ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 23 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ContentsGroup: () => (/* binding */ ContentsGroup)
/* harmony export */ });
/* harmony import */ var _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _utils_svg_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(10);
/* harmony import */ var _constants_svg_const__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3);
/* harmony import */ var _utils_event_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9);
/* harmony import */ var _constants_event_const__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(13);
/* harmony import */ var _constants_priority_const__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(24);
/* harmony import */ var _style_contents_group_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(25);









/**
 * ContentsGroup コンポーネント
 * @class ContentsGroup
 * @extends {HTMLElement}
 */
function ContentsGroup() {
  class ContentsGroup extends HTMLElement {
    /**
     * コンストラクタ
     * @return {void}
     */
    constructor() {
      super();

      // Shadow DOMをオープンモードでアタッチ
      this.attachShadow({ mode: "open" });
      this.shadowRoot.innerHTML = "";

      // CSSを適用
      this.shadowRoot.adoptedStyleSheets = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__.ElmUtils.createStylesheet(_style_contents_group_css__WEBPACK_IMPORTED_MODULE_6__["default"]);

      // 空の要素を作成
      this.root = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__.ElmUtils.createElm("div", "root", [
        "contents-group",
        "scroll",
      ]);

      this.#addGroupId();
      this.#addGroupTitle();
      this.#addGroupOverview();

      this.shadowRoot.appendChild(this.root);

      // 変更イベントを伝播
      this.root.addEventListener(_constants_event_const__WEBPACK_IMPORTED_MODULE_4__.EventConst.CHANGE_FORM_ITEM_EVENT_NAME, () => {
        this.dispatchEvent(
          _utils_event_utils__WEBPACK_IMPORTED_MODULE_3__.EventUtils.createEvent(_constants_event_const__WEBPACK_IMPORTED_MODULE_4__.EventConst.CHANGE_CONTENTS_GROUP_EVENT_NAME)
        );
      });
    }

    // **************************************************
    // * グループデータの入出力
    // **************************************************
    /**
     * グループのプロパティ情報を画面出力する
     * @param {string} jsonStr
     * @returns {void}
     */
    render(jsonStr) {
      if (!jsonStr) {
        return;
      }
      const data = JSON.parse(jsonStr);
      this._groupTitle.value = data.title;
      this._groupOverview.value = data.overview;
    }

    /**
     * グループ内のコンテンツデータを出力する。
     * @param {array} items
     * @returns {void}
     */
    renderItems(items = []) {
      if (items.length === 0) {
        return;
      }

      this.#addEmptyGroupItems();

      this.table.header = [
        "ID",
        "ステータス",
        "名称",
        "優先度",
        "期日",
        "進捗率",
      ];

      items.forEach((item) => {
        if (item.type === "task") {
          // タスク
          const icon = _utils_svg_utils__WEBPACK_IMPORTED_MODULE_1__.SvgUtils.createIcon(item.paths);
          const priority = _constants_priority_const__WEBPACK_IMPORTED_MODULE_5__.PriorityConst.text(item.priority) || "?";

          this.table.appendTr();

          // タスクの状態クラスを設定
          if (item.flag.isComplete) {
            this.table.setTrClass("complete");
          } else if (item.flag.isOverDeadline) {
            this.table.setTrClass("alert");
          }

          // ID
          this.table.addTd();
          this.table.setTdElment(item.id);
          this.table.setTdWidth("150px");

          // ステータス
          this.table.addTd();
          this.table.setTdElment(icon);
          this.table.setTdWidth("100px");
          this.table.setTdAlign("center");

          // タスク名
          this.table.addTd();
          this.table.setTdElment(item.name);
          this.table.setTdClickEvent(() => {
            this.shadowRoot.dispatchEvent(
              _utils_event_utils__WEBPACK_IMPORTED_MODULE_3__.EventUtils.createEvent(
                _constants_event_const__WEBPACK_IMPORTED_MODULE_4__.EventConst.CLICK_CONTENTS_GROUP_TASK_EVENT_NAME,
                {
                  id: item.id,
                  name: item.name,
                }
              )
            );
          });

          // 優先度
          this.table.addTd();
          this.table.setTdElment(priority);
          this.table.setTdWidth("100px");
          this.table.setTdAlign("center");

          // 期日
          this.table.addTd();
          this.table.setTdElment(item.duedate);
          this.table.setTdWidth("100px");
          this.table.setTdAlign("center");

          // 進捗率
          this.table.addTd();
          this.table.setTdElment(`${item.status}%`);
          this.table.setTdWidth("100px");
          this.table.setTdAlign("center");
        } else {
          // グループ
          this.table.appendTr();

          // ID
          this.table.addTd();
          this.table.setTdElment(item.id);
          this.table.setTdWidth("150px");

          // ステータス
          const icon = _utils_svg_utils__WEBPACK_IMPORTED_MODULE_1__.SvgUtils.createIcon(_constants_svg_const__WEBPACK_IMPORTED_MODULE_2__.SvgConst.FolderhPaths);
          icon.style = "color: #E9762B";

          this.table.addTd();
          this.table.setTdElment(icon);
          this.table.setTdWidth("100px");
          this.table.setTdAlign("center");

          // タスク名
          this.table.addTd();
          this.table.setTdElment(item.name);
          this.table.setTdClickEvent(() => {
            this.shadowRoot.dispatchEvent(
              _utils_event_utils__WEBPACK_IMPORTED_MODULE_3__.EventUtils.createEvent(
                _constants_event_const__WEBPACK_IMPORTED_MODULE_4__.EventConst.CLICK_CONTENTS_GROUP_GROUP_EVENT_NAME,
                {
                  id: item.id,
                  name: item.name,
                }
              )
            );
          });

          // 優先度
          this.table.addTd();
          this.table.setTdElment("-");
          this.table.setTdWidth("100px");
          this.table.setTdAlign("center");

          // 期日
          this.table.addTd();
          this.table.setTdElment("-");
          this.table.setTdWidth("100px");
          this.table.setTdAlign("center");

          // 進捗率
          this.table.addTd();
          this.table.setTdElment("-");
          this.table.setTdWidth("100px");
          this.table.setTdAlign("center");
        }
      });
    }

    /**
     * データアイテムを取得します。
     * @returns {Object} dataItem - 取得したデータアイテム。
     * @property {string} dataItem.title - グループタイトルの値。
     * @property {string} dataItem.overview - グループ概要の値。空の場合は空文字列を返します。
     */
    getData() {
      const dataItem = {};
      dataItem.title = this._groupTitle.value;
      dataItem.overview = this._groupOverview.value || "";

      return dataItem;
    }

    // **************************************************
    // * グループID
    // **************************************************

    /**
     * 新しい入力IDを作成し、ルートエレメントに追加するメソッド。
     * `form-input-item`というタグを持つ新しいエレメントを作成し、そのタイトルを「ID」に設定して、ルートエレメントに追加します。
     */
    #addGroupId() {
      const filedset = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__.ElmUtils.createElm("form-fieldset");
      filedset.title = "ID";

      this._groupId = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__.ElmUtils.createElm("form-input", "id");
      this._groupId.title = "ID";
      this._groupId.readOnly = true;
      this._groupId.width = "600px";

      filedset.addItem(this._groupId);
      this.root.appendChild(filedset);
    }

    /**
     * グループIDを設定するセッターメソッド。
     * このメソッドは、指定された値を`groupId`エレメントの値として設定します。
     *
     * @param {string} val - 設定するグループIDの値。
     */
    set groupId(val) {
      this._groupId.value = val;
    }

    // **************************************************
    // * グループ名
    // **************************************************
    /**
     * 新しい入力タイトルを作成し、ルートエレメントに追加するメソッド。
     * `form-input-item`というタグを持つ新しいエレメントを作成し、そのタイトルを「グループ名」に設定して、ルートエレメントに追加します。
     */
    #addGroupTitle() {
      const filedset = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__.ElmUtils.createElm("form-fieldset");
      filedset.title = "グループ名";
      filedset.required = true;

      this._groupTitle = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__.ElmUtils.createElm("form-input", "title");
      this._groupTitle.width = "600px";

      filedset.addItem(this._groupTitle);
      this.root.appendChild(filedset);
    }

    /**
     * グループタイトルを設定するセッターメソッド。
     * このメソッドは、指定された値を`groupTitle`エレメントの値として設定します。
     *
     * @param {string} val - 設定するグループタイトルの値。
     */
    set groupTitle(val) {
      this._groupTitle.value = val;
    }

    // **************************************************
    // * 概要
    // **************************************************

    /**
     * グループの概要を追加します。
     * @private
     */
    #addGroupOverview() {
      const filedset = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__.ElmUtils.createElm("form-fieldset");
      filedset.title = "概要";

      this._groupOverview = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__.ElmUtils.createElm("form-textarea", "overview");
      this._groupOverview.width = "600px";
      this._groupOverview.rows = 5;
      this._groupOverview.placeholder = "グループの概要説明";

      filedset.addItem(this._groupOverview);
      this.root.appendChild(filedset);
    }

    // **************************************************
    // * アイテム
    // **************************************************

    /**
     * 空のアイテム一覧を追加します。
     * @private
     */
    #addEmptyGroupItems() {
      const filedset = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__.ElmUtils.createElm("form-fieldset");
      filedset.title = "タスク一覧";

      this.table = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__.ElmUtils.createElm("form-table");

      filedset.addItem(this.table);
      this.root.appendChild(filedset);
    }
  }
  customElements.define("contents-group", ContentsGroup);
}


/***/ }),
/* 24 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PriorityConst: () => (/* binding */ PriorityConst)
/* harmony export */ });
/**
 * 優先度定数クラス
 */
class PriorityConst {
  /**
   * 優先度のパラメータ配列。
   * @type {Array<{value: number, text: string}>}
   */
  static PARAM = [
    { value: 5, text: "最低" },
    { value: 4, text: "低" },
    { value: 3, text: "中" },
    { value: 2, text: "高" },
    { value: 1, text: "最高" },
  ];

  /**
   * 指定された値に対応するテキストを取得します。
   * @param {number} value - 検索する値。
   * @returns {string} - 対応するテキスト。見つからない場合はnullを返します。
   */
  static text(value) {
    const priority = this.PARAM.find((p) => p.value == value);
    return priority ? priority.text : null;
  }

  /**
   * 指定されたテキストに対応する値を取得します。
   * @param {string} text - 検索するテキスト。
   * @returns {number} - 対応する値。見つからない場合はnullを返します。
   */
  static value(text) {
    const priority = this.PARAM.find((p) => p.text == text);
    return priority ? priority.value : null;
  }
}


/***/ }),
/* 25 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `/*! destyle.css v4.0.1 | MIT License | https://github.com/nicolas-cusan/destyle.css */
/* Reset box-model and set borders */
/* ============================================ */
*,
::before,
::after {
  box-sizing: border-box;
  border-style: solid;
  border-width: 0;
  min-width: 0;
}

/* Document */
/* ============================================ */
/**
 * 1. Correct the line height in all browsers.
 * 2. Prevent adjustments of font size after orientation changes in iOS.
 * 3. Remove gray overlay on links for iOS.
 */
html {
  line-height: 1.15; /* 1 */
  -webkit-text-size-adjust: 100%; /* 2 */
  -webkit-tap-highlight-color: transparent; /* 3*/
}

/* Sections */
/* ============================================ */
/**
 * Remove the margin in all browsers.
 */
body {
  margin: 0;
}

/**
 * Render the \`main\` element consistently in IE.
 */
main {
  display: block;
}

/* Vertical rhythm */
/* ============================================ */
p,
table,
blockquote,
address,
pre,
iframe,
form,
figure,
dl {
  margin: 0;
}

/* Headings */
/* ============================================ */
h1,
h2,
h3,
h4,
h5,
h6 {
  font-size: inherit;
  font-weight: inherit;
  margin: 0;
}

/* Lists (enumeration) */
/* ============================================ */
ul,
ol {
  margin: 0;
  padding: 0;
  list-style: none;
}

/* Lists (definition) */
/* ============================================ */
dt {
  font-weight: bold;
}

dd {
  margin-left: 0;
}

/* Grouping content */
/* ============================================ */
/**
 * 1. Add the correct box sizing in Firefox.
 * 2. Show the overflow in Edge and IE.
 */
hr {
  box-sizing: content-box; /* 1 */
  height: 0; /* 1 */
  overflow: visible; /* 2 */
  border-top-width: 1px;
  margin: 0;
  clear: both;
  color: inherit;
}

/**
 * 1. Correct the inheritance and scaling of font size in all browsers.
 * 2. Correct the odd \`em\` font sizing in all browsers.
 */
pre {
  font-family: monospace, monospace; /* 1 */
  font-size: inherit; /* 2 */
}

address {
  font-style: inherit;
}

/* Text-level semantics */
/* ============================================ */
/**
 * Remove the gray background on active links in IE 10.
 */
a {
  background-color: transparent;
  text-decoration: none;
  color: inherit;
}

/**
 * 1. Remove the bottom border in Chrome 57-
 * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.
 */
abbr[title] {
  text-decoration: underline dotted; /* 2 */
}

/**
 * Add the correct font weight in Chrome, Edge, and Safari.
 */
b,
strong {
  font-weight: bolder;
}

/**
 * 1. Correct the inheritance and scaling of font size in all browsers.
 * 2. Correct the odd \`em\` font sizing in all browsers.
 */
code,
kbd,
samp {
  font-family: monospace, monospace; /* 1 */
  font-size: inherit; /* 2 */
}

/**
 * Add the correct font size in all browsers.
 */
small {
  font-size: 80%;
}

/**
 * Prevent \`sub\` and \`sup\` elements from affecting the line height in
 * all browsers.
 */
sub,
sup {
  font-size: 75%;
  line-height: 0;
  position: relative;
  vertical-align: baseline;
}

sub {
  bottom: -0.25em;
}

sup {
  top: -0.5em;
}

/* Replaced content */
/* ============================================ */
/**
 * Prevent vertical alignment issues.
 */
svg,
img,
embed,
object,
iframe {
  vertical-align: bottom;
}

/* Forms */
/* ============================================ */
/**
 * Reset form fields to make them styleable.
 * 1. Make form elements stylable across systems iOS especially.
 * 2. Inherit text-transform from parent.
 */
button,
input,
optgroup,
select,
textarea {
  -webkit-appearance: none; /* 1 */
  appearance: none;
  vertical-align: middle;
  color: inherit;
  font: inherit;
  background: transparent;
  padding: 0;
  margin: 0;
  border-radius: 0;
  text-align: inherit;
  text-transform: inherit; /* 2 */
}

/**
 * Correct cursors for clickable elements.
 */
button,
[type=button],
[type=reset],
[type=submit] {
  cursor: pointer;
}

button:disabled,
[type=button]:disabled,
[type=reset]:disabled,
[type=submit]:disabled {
  cursor: default;
}

/**
 * Improve outlines for Firefox and unify style with input elements & buttons.
 */
:-moz-focusring {
  outline: auto;
}

select:disabled {
  opacity: inherit;
}

/**
 * Remove padding
 */
option {
  padding: 0;
}

/**
 * Reset to invisible
 */
fieldset {
  margin: 0;
  padding: 0;
  min-width: 0;
}

legend {
  padding: 0;
}

/**
 * Add the correct vertical alignment in Chrome, Firefox, and Opera.
 */
progress {
  vertical-align: baseline;
}

/**
 * Remove the default vertical scrollbar in IE 10+.
 */
textarea {
  overflow: auto;
}

/**
 * Correct the cursor style of increment and decrement buttons in Chrome.
 */
[type=number]::-webkit-inner-spin-button,
[type=number]::-webkit-outer-spin-button {
  height: auto;
}

/**
 * Correct the outline style in Safari.
 */
[type=search] {
  outline-offset: -2px; /* 1 */
}

/**
 * Remove the inner padding in Chrome and Safari on macOS.
 */
[type=search]::-webkit-search-decoration {
  -webkit-appearance: none;
}

/**
 * 1. Correct the inability to style clickable types in iOS and Safari.
 * 2. Fix font inheritance.
 */
::-webkit-file-upload-button {
  -webkit-appearance: button; /* 1 */
  font: inherit; /* 2 */
}

/**
 * Fix appearance for Firefox
 */
[type=number] {
  -moz-appearance: textfield;
  appearance: textfiled;
}

/**
 * Clickable labels
 */
label[for] {
  cursor: pointer;
}

/* Interactive */
/* ============================================ */
/*
 * Add the correct display in Edge, IE 10+, and Firefox.
 */
details {
  display: block;
}

/*
 * Add the correct display in all browsers.
 */
summary {
  display: list-item;
}

/*
 * Remove outline for editable content.
 */
[contenteditable]:focus {
  outline: auto;
}

/* Tables */
/* ============================================ */
/**
1. Correct table border color inheritance in all Chrome and Safari.
*/
table {
  border-color: inherit; /* 1 */
  border-collapse: collapse;
}

caption {
  text-align: left;
}

td,
th {
  vertical-align: top;
  padding: 0;
}

th {
  text-align: left;
  font-weight: bold;
}

.svg {
  position: absolute;
  width: 0;
  height: 0;
  overflow: hidden;
}

.svg-icon {
  display: block;
  width: 1em;
  height: 1em;
  stroke-width: 0;
  stroke: currentColor;
  fill: currentColor;
  pointer-events: none;
}
.svg-icon use {
  pointer-events: none;
}

* {
  font-family: monospace;
}

.scroll {
  overflow-y: scroll;
}
.scroll::-webkit-scrollbar {
  display: none;
}

.float-area {
  position: absolute;
  right: 1rem;
  bottom: 1rem;
}
.float-area * {
  display: block;
  margin-top: 0.25rem;
}

#root {
  width: 100%;
  height: 100%;
  padding: 0.75rem;
}
`, ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 26 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ContentsTask: () => (/* binding */ ContentsTask)
/* harmony export */ });
/* harmony import */ var _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _utils_svg_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(10);
/* harmony import */ var _constants_svg_const__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3);
/* harmony import */ var _utils_event_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9);
/* harmony import */ var _constants_event_const__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(13);
/* harmony import */ var _constants_priority_const__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(24);
/* harmony import */ var _style_contents_task_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(27);









/**
 * ContentsTask コンポーネント
 * @class ContentsTask
 * @extends {HTMLElement}
 */
function ContentsTask() {
  class ContentsTask extends HTMLElement {
    /**
     * コンストラクタ
     * @return {void}
     */
    constructor() {
      super();

      // Shadow DOMをオープンモードでアタッチ
      this.attachShadow({ mode: "open" });
      this.shadowRoot.innerHTML = "";

      // CSSを適用
      this.shadowRoot.adoptedStyleSheets = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__.ElmUtils.createStylesheet(_style_contents_task_css__WEBPACK_IMPORTED_MODULE_6__["default"]);

      // 空の要素を作成
      this.root = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__.ElmUtils.createElm("div", "root", ["contents-task"]);
      this.property = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__.ElmUtils.createElm("div", "task-property", ["scroll"]);
      this.history = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__.ElmUtils.createElm("div", "task-history", ["scroll"]);

      this.root.appendChild(this.property);
      this.root.appendChild(this.history);

      this.#addTaskId();
      this.#addTaskTitle();
      this.#addTaskDueDate();
      this.#addStaff();
      this.#addPriority();
      this.#addStatus();
      this.#addMemo();
      this.#addFolderpath();
      this.#addUrl();
      this.#addFreenotes();
      this.#addHistory();

      this.shadowRoot.appendChild(this.root);

      // 変更イベントを伝播
      this.root.addEventListener(_constants_event_const__WEBPACK_IMPORTED_MODULE_4__.EventConst.CHANGE_FORM_ITEM_EVENT_NAME, () => {
        this.dispatchEvent(
          _utils_event_utils__WEBPACK_IMPORTED_MODULE_3__.EventUtils.createEvent(_constants_event_const__WEBPACK_IMPORTED_MODULE_4__.EventConst.CHANGE_CONTENTS_TASK_EVENT_NAME)
        );
      });
    }

    // **************************************************
    // * タスクデータの入出力
    // **************************************************
    /**
     * タスクのプロパティ情報を画面出力する
     * @param {string} jsonStr
     * @returns {void}
     */
    render(jsonStr) {
      if (!jsonStr) {
        return;
      }
      const data = JSON.parse(jsonStr);
      this._taskTitle.value = data.taskData.title;
      this._taskDueDate.value = data.taskData.dueDate;
      this._staffDiv.value = data.taskData.staffDiv;
      this._staffName.value = data.taskData.staffName;
      this._staffTel.value = data.taskData.staffTel;
      this._priority.value = data.taskData.priority;
      this._status.value = data.taskData.status;
      this._memo.value = data.taskData.memo;
      this._folderpath.value = data.taskData.folderpath;
      this._url.value = data.taskData.url;
      this._freenotes.value = data.taskData.freenotes;

      this._historyContents.render(data.historyData);
    }

    /**
     * タスクのプロパティデータを取得する。
     * @returns {object} - タスクデータ
     */
    getData() {
      return {
        taskData: {
          title: this._taskTitle.value,
          dueDate: this._taskDueDate.value,
          staffDiv: this._staffDiv.value,
          staffName: this._staffName.value,
          staffTel: this._staffTel.value,
          priority: this._priority.value,
          status: this._status.value,
          memo: this._memo.value,
          folderpath: this._folderpath.value,
          url: this._url.value,
          freenotes: this._freenotes.value,
        },
        historyData: this._historyContents.getData(),
      };
    }

    // **************************************************
    // * タスクID
    // **************************************************

    /**
     * 新しい入力IDを作成し、ルートエレメントに追加するメソッド。
     */
    #addTaskId() {
      const filedset = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__.ElmUtils.createElm("form-fieldset");
      filedset.title = "ID";

      this._taskId = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__.ElmUtils.createElm("form-input", "id");
      this._taskId.title = "ID";
      this._taskId.readOnly = true;

      filedset.addItem(this._taskId);
      this.property.appendChild(filedset);
    }

    /**
     * タスクIDを設定するセッターメソッド。
     * このメソッドは、指定された値を`taskId`エレメントの値として設定します。
     *
     * @param {string} val - 設定するタスクIDの値。
     */
    set taskId(val) {
      this._taskId.value = val;
    }

    // **************************************************
    // * タスク名
    // **************************************************
    /**
     * 新しい入力タイトルを作成し、ルートエレメントに追加するメソッド。
     */
    #addTaskTitle() {
      const filedset = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__.ElmUtils.createElm("form-fieldset");
      filedset.title = "タスク名";
      filedset.required = true;

      this._taskTitle = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__.ElmUtils.createElm("form-input", "title");
      this._taskTitle.placeholder = "XXXXXの作成";

      filedset.addItem(this._taskTitle);
      this.property.appendChild(filedset);
    }

    /**
     * タスクタイトルを設定するセッターメソッド。
     * このメソッドは、指定された値を`taskTitle`エレメントの値として設定します。
     *
     * @param {string} val - 設定するタスクタイトルの値。
     */
    set taskTitle(val) {
      this._taskTitle.value = val;
    }

    // **************************************************
    // * 期限日
    // **************************************************
    /**
     * 新しい期限日を作成し、ルートエレメントに追加するメソッド。
     */
    #addTaskDueDate() {
      const filedset = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__.ElmUtils.createElm("form-fieldset");
      filedset.title = "期限日";
      filedset.required = true;

      this._taskDueDate = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__.ElmUtils.createElm("form-date", "due-date");

      filedset.addItem(this._taskDueDate);
      this.property.appendChild(filedset);
    }

    // **************************************************
    // * 担当者
    // **************************************************
    /**
     * 新しい担当者を作成し、ルートエレメントに追加するメソッド。
     */
    #addStaff() {
      const filedset = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__.ElmUtils.createElm("form-fieldset");
      filedset.title = "担当者";
      filedset.required = true;

      // 担当者の所属
      const fildsetStaffDiv = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__.ElmUtils.createElm("form-fieldset");
      this._staffDiv = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__.ElmUtils.createElm("form-input", "staff-div");

      fildsetStaffDiv.addItem(this._staffDiv);
      fildsetStaffDiv.title = "所属";
      this._staffDiv.placeholder = "情報システム課";

      // 担当者の氏名
      const fildsetStaffName = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__.ElmUtils.createElm("form-fieldset");
      this._staffName = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__.ElmUtils.createElm("form-input", "staff-name");

      fildsetStaffName.addItem(this._staffName);
      fildsetStaffName.title = "氏名";
      this._staffName.placeholder = "日本 太郎";

      // 担当者の電話番号
      const fildsetStaffTel = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__.ElmUtils.createElm("form-fieldset");
      this._staffTel = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__.ElmUtils.createElm("form-input", "staff-tel");

      fildsetStaffTel.addItem(this._staffTel);
      fildsetStaffTel.title = "電話番号";
      this._staffTel.placeholder = "0123-45-6789";

      // プロパティ画面に追加
      filedset.addItem(fildsetStaffDiv);
      filedset.addItem(fildsetStaffName);
      filedset.addItem(fildsetStaffTel);

      this.property.appendChild(filedset);
    }

    // **************************************************
    // * 優先度
    // **************************************************

    /**
     * 新しい優先度を作成し、ルートエレメントに追加するメソッド。
     */
    #addPriority() {
      const filedset = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__.ElmUtils.createElm("form-fieldset");
      filedset.title = "優先度";
      filedset.required = true;

      this._priority = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__.ElmUtils.createElm("form-radio", "priority");
      this._priority.items = _constants_priority_const__WEBPACK_IMPORTED_MODULE_5__.PriorityConst.PARAM;

      filedset.addItem(this._priority);
      this.property.appendChild(filedset);
    }

    // **************************************************
    // * 進捗率
    // **************************************************
    /**
     * 新しい進捗率を作成し、ルートエレメントに追加するメソッド。
     */
    #addStatus() {
      const filedset = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__.ElmUtils.createElm("form-fieldset");
      filedset.title = "進捗率";

      this._status = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__.ElmUtils.createElm("form-radio", "status");
      this._status.items = [
        { value: "0", text: "0%" },
        { value: "10", text: "10%" },
        { value: "20", text: "20%" },
        { value: "30", text: "30%" },
        { value: "40", text: "40%" },
        { value: "50", text: "50%" },
        { value: "60", text: "60%" },
        { value: "70", text: "70%" },
        { value: "80", text: "80%" },
        { value: "90", text: "90%" },
        { value: "100", text: "100%" },
      ];

      this._status.value = "0";

      filedset.addItem(this._status);
      this.property.appendChild(filedset);
    }

    // **************************************************
    // * 概要
    // **************************************************

    /**
     * タスクの概要を追加します。
     * @private
     */
    #addMemo() {
      const filedset = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__.ElmUtils.createElm("form-fieldset");
      filedset.title = "作業概要";

      this._memo = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__.ElmUtils.createElm("form-textarea", "memo");
      this._memo.rows = 10;
      this._memo.placeholder = "タスクの概要説明";

      filedset.addItem(this._memo);
      this.property.appendChild(filedset);
    }

    // **************************************************
    // * 作業フォルダパス
    // **************************************************

    /**
     * 作業フォルダパスを追加します。
     * @private
     */
    #addFolderpath() {
      const filedset = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__.ElmUtils.createElm("form-fieldset");
      filedset.title = "作業フォルダパス";

      this._folderpath = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__.ElmUtils.createElm("form-textarea", "folderpath ");
      this._folderpath.rows = 3;
      this._folderpath.placeholder = "作業フォルダパス(E:\workspace)";

      filedset.addItem(this._folderpath);
      this.property.appendChild(filedset);
    }

    // **************************************************
    // * URL
    // **************************************************

    /**
     * URLを追加します。
     * @private
     */
    #addUrl() {
      const filedset = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__.ElmUtils.createElm("form-fieldset");
      filedset.title = "URL";

      this._url = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__.ElmUtils.createElm("form-textarea", "url ");
      this._url.rows = 3;
      this._url.placeholder = "https://example.com";

      filedset.addItem(this._url);
      this.property.appendChild(filedset);
    }

    // **************************************************
    // * 自由記述欄
    // **************************************************

    /**
     * 自由記述欄を追加します。
     * @private
     */
    #addFreenotes() {
      const filedset = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__.ElmUtils.createElm("form-fieldset");
      filedset.title = "自由記述欄";

      this._freenotes = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__.ElmUtils.createElm("form-textarea", "freenotes");
      this._freenotes.rows = 10;
      this._freenotes.placeholder = "etc";

      filedset.addItem(this._freenotes);
      this.property.appendChild(filedset);
    }

    // **************************************************
    // * 作業履歴
    // **************************************************
    /**
     * 作業履歴を追加します。
     * @private
     */
    #addHistory() {
      this._historyContents = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__.ElmUtils.createElm("contents-history");
      this.history.appendChild(this._historyContents);

      // 更新イベントを連携
      this._historyContents.addEventListener(
        _constants_event_const__WEBPACK_IMPORTED_MODULE_4__.EventConst.CHANGE_FORM_ITEM_EVENT_NAME,
        (e) => {
          this.dispatchEvent(
            _utils_event_utils__WEBPACK_IMPORTED_MODULE_3__.EventUtils.createEvent(_constants_event_const__WEBPACK_IMPORTED_MODULE_4__.EventConst.CHANGE_FORM_ITEM_EVENT_NAME)
          );
        }
      );

      // 履歴追加イベントを連携
      this._historyContents.addEventListener(
        _constants_event_const__WEBPACK_IMPORTED_MODULE_4__.EventConst.ADD_HISTORY_CONTENTS_EVENT_NAME,
        (e) => {
          this.#scrollBottomHistory();
        }
      );
    }

    /**
     * 履歴を末尾までスクロールする。
     */
    #scrollBottomHistory() {
      const bottom = this.history.scrollHeight - this.history.clientHeight;
      this.history.scrollTo({ top: bottom, behavior: "smooth" });
    }
  }
  customElements.define("contents-task", ContentsTask);
}


/***/ }),
/* 27 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `/*! destyle.css v4.0.1 | MIT License | https://github.com/nicolas-cusan/destyle.css */
/* Reset box-model and set borders */
/* ============================================ */
*,
::before,
::after {
  box-sizing: border-box;
  border-style: solid;
  border-width: 0;
  min-width: 0;
}

/* Document */
/* ============================================ */
/**
 * 1. Correct the line height in all browsers.
 * 2. Prevent adjustments of font size after orientation changes in iOS.
 * 3. Remove gray overlay on links for iOS.
 */
html {
  line-height: 1.15; /* 1 */
  -webkit-text-size-adjust: 100%; /* 2 */
  -webkit-tap-highlight-color: transparent; /* 3*/
}

/* Sections */
/* ============================================ */
/**
 * Remove the margin in all browsers.
 */
body {
  margin: 0;
}

/**
 * Render the \`main\` element consistently in IE.
 */
main {
  display: block;
}

/* Vertical rhythm */
/* ============================================ */
p,
table,
blockquote,
address,
pre,
iframe,
form,
figure,
dl {
  margin: 0;
}

/* Headings */
/* ============================================ */
h1,
h2,
h3,
h4,
h5,
h6 {
  font-size: inherit;
  font-weight: inherit;
  margin: 0;
}

/* Lists (enumeration) */
/* ============================================ */
ul,
ol {
  margin: 0;
  padding: 0;
  list-style: none;
}

/* Lists (definition) */
/* ============================================ */
dt {
  font-weight: bold;
}

dd {
  margin-left: 0;
}

/* Grouping content */
/* ============================================ */
/**
 * 1. Add the correct box sizing in Firefox.
 * 2. Show the overflow in Edge and IE.
 */
hr {
  box-sizing: content-box; /* 1 */
  height: 0; /* 1 */
  overflow: visible; /* 2 */
  border-top-width: 1px;
  margin: 0;
  clear: both;
  color: inherit;
}

/**
 * 1. Correct the inheritance and scaling of font size in all browsers.
 * 2. Correct the odd \`em\` font sizing in all browsers.
 */
pre {
  font-family: monospace, monospace; /* 1 */
  font-size: inherit; /* 2 */
}

address {
  font-style: inherit;
}

/* Text-level semantics */
/* ============================================ */
/**
 * Remove the gray background on active links in IE 10.
 */
a {
  background-color: transparent;
  text-decoration: none;
  color: inherit;
}

/**
 * 1. Remove the bottom border in Chrome 57-
 * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.
 */
abbr[title] {
  text-decoration: underline dotted; /* 2 */
}

/**
 * Add the correct font weight in Chrome, Edge, and Safari.
 */
b,
strong {
  font-weight: bolder;
}

/**
 * 1. Correct the inheritance and scaling of font size in all browsers.
 * 2. Correct the odd \`em\` font sizing in all browsers.
 */
code,
kbd,
samp {
  font-family: monospace, monospace; /* 1 */
  font-size: inherit; /* 2 */
}

/**
 * Add the correct font size in all browsers.
 */
small {
  font-size: 80%;
}

/**
 * Prevent \`sub\` and \`sup\` elements from affecting the line height in
 * all browsers.
 */
sub,
sup {
  font-size: 75%;
  line-height: 0;
  position: relative;
  vertical-align: baseline;
}

sub {
  bottom: -0.25em;
}

sup {
  top: -0.5em;
}

/* Replaced content */
/* ============================================ */
/**
 * Prevent vertical alignment issues.
 */
svg,
img,
embed,
object,
iframe {
  vertical-align: bottom;
}

/* Forms */
/* ============================================ */
/**
 * Reset form fields to make them styleable.
 * 1. Make form elements stylable across systems iOS especially.
 * 2. Inherit text-transform from parent.
 */
button,
input,
optgroup,
select,
textarea {
  -webkit-appearance: none; /* 1 */
  appearance: none;
  vertical-align: middle;
  color: inherit;
  font: inherit;
  background: transparent;
  padding: 0;
  margin: 0;
  border-radius: 0;
  text-align: inherit;
  text-transform: inherit; /* 2 */
}

/**
 * Correct cursors for clickable elements.
 */
button,
[type=button],
[type=reset],
[type=submit] {
  cursor: pointer;
}

button:disabled,
[type=button]:disabled,
[type=reset]:disabled,
[type=submit]:disabled {
  cursor: default;
}

/**
 * Improve outlines for Firefox and unify style with input elements & buttons.
 */
:-moz-focusring {
  outline: auto;
}

select:disabled {
  opacity: inherit;
}

/**
 * Remove padding
 */
option {
  padding: 0;
}

/**
 * Reset to invisible
 */
fieldset {
  margin: 0;
  padding: 0;
  min-width: 0;
}

legend {
  padding: 0;
}

/**
 * Add the correct vertical alignment in Chrome, Firefox, and Opera.
 */
progress {
  vertical-align: baseline;
}

/**
 * Remove the default vertical scrollbar in IE 10+.
 */
textarea {
  overflow: auto;
}

/**
 * Correct the cursor style of increment and decrement buttons in Chrome.
 */
[type=number]::-webkit-inner-spin-button,
[type=number]::-webkit-outer-spin-button {
  height: auto;
}

/**
 * Correct the outline style in Safari.
 */
[type=search] {
  outline-offset: -2px; /* 1 */
}

/**
 * Remove the inner padding in Chrome and Safari on macOS.
 */
[type=search]::-webkit-search-decoration {
  -webkit-appearance: none;
}

/**
 * 1. Correct the inability to style clickable types in iOS and Safari.
 * 2. Fix font inheritance.
 */
::-webkit-file-upload-button {
  -webkit-appearance: button; /* 1 */
  font: inherit; /* 2 */
}

/**
 * Fix appearance for Firefox
 */
[type=number] {
  -moz-appearance: textfield;
  appearance: textfiled;
}

/**
 * Clickable labels
 */
label[for] {
  cursor: pointer;
}

/* Interactive */
/* ============================================ */
/*
 * Add the correct display in Edge, IE 10+, and Firefox.
 */
details {
  display: block;
}

/*
 * Add the correct display in all browsers.
 */
summary {
  display: list-item;
}

/*
 * Remove outline for editable content.
 */
[contenteditable]:focus {
  outline: auto;
}

/* Tables */
/* ============================================ */
/**
1. Correct table border color inheritance in all Chrome and Safari.
*/
table {
  border-color: inherit; /* 1 */
  border-collapse: collapse;
}

caption {
  text-align: left;
}

td,
th {
  vertical-align: top;
  padding: 0;
}

th {
  text-align: left;
  font-weight: bold;
}

.scroll {
  overflow-y: scroll;
}
.scroll::-webkit-scrollbar {
  display: none;
}

.float-area {
  position: absolute;
  right: 1rem;
  bottom: 1rem;
}
.float-area * {
  display: block;
  margin-top: 0.25rem;
}

.svg {
  position: absolute;
  width: 0;
  height: 0;
  overflow: hidden;
}

.svg-icon {
  display: block;
  width: 1em;
  height: 1em;
  stroke-width: 0;
  stroke: currentColor;
  fill: currentColor;
  pointer-events: none;
}
.svg-icon use {
  pointer-events: none;
}

* {
  font-family: monospace;
}

#root {
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-rows: 1fr;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  gap: 0em 0em;
  grid-template-areas: "task-property task-history";
  height: 100vh;
}
#root #task-property {
  grid-area: task-property;
  padding: 0.75rem;
}
#root #task-history {
  grid-area: task-history;
  padding: 0.75rem;
}
`, ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 28 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ContentsHistory: () => (/* binding */ ContentsHistory)
/* harmony export */ });
/* harmony import */ var _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _utils_svg_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(10);
/* harmony import */ var _constants_svg_const__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3);
/* harmony import */ var _utils_event_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9);
/* harmony import */ var _constants_event_const__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(13);
/* harmony import */ var _style_contents_history_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(29);








function ContentsHistory() {
  class ContentsHistory extends HTMLElement {
    /**
     * コンストラクタ
     * @return {void}
     */
    constructor() {
      super();

      // Shadow DOMをオープンモードでアタッチ
      this.attachShadow({ mode: "open" });
      this.shadowRoot.innerHTML = "";

      // CSSを適用
      this.shadowRoot.adoptedStyleSheets = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__.ElmUtils.createStylesheet(_style_contents_history_css__WEBPACK_IMPORTED_MODULE_5__["default"]);

      // 空の要素を作成
      this.root = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__.ElmUtils.createElm("div", "root", ["contents-history"]);

      // タイトル追加
      const title = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__.ElmUtils.createElm("div", "contents-title");
      title.innerText = "履歴一覧";
      this.root.appendChild(title);

      // ボタン追加
      const floatBtns = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__.ElmUtils.createFloatArea();
      const addHistoryBtn = this.#createAddHisotryButton();
      floatBtns.appendChild(addHistoryBtn);

      this.root.appendChild(floatBtns);

      // Shado Domにrootを追加
      this.shadowRoot.innerHTML = "";
      this.shadowRoot.appendChild(this.root);

      // イベント検知
      this.root.addEventListener(
        _constants_event_const__WEBPACK_IMPORTED_MODULE_4__.EventConst.CHANGE_FORM_ITEM_EVENT_NAME,
        (e) => {
          this.dispatchEvent(
            _utils_event_utils__WEBPACK_IMPORTED_MODULE_3__.EventUtils.createEvent(_constants_event_const__WEBPACK_IMPORTED_MODULE_4__.EventConst.CHANGE_FORM_ITEM_EVENT_NAME)
          );
        }
      );
    }

    /**
     * 履歴追加ボタンを作成する。
     * @returns HTMLElement
     */
    #createAddHisotryButton() {
      const addHistoryBtn = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__.ElmUtils.createElm("svg-btn", "add-hisory");
      addHistoryBtn.iconPaths = _constants_svg_const__WEBPACK_IMPORTED_MODULE_2__.SvgConst.plusPaths;
      addHistoryBtn.isCircle = true;

      // クリックイベント
      addHistoryBtn.addEventListener("click", () => {
        this.#addHistoryItem({});
        this.dispatchEvent(
          _utils_event_utils__WEBPACK_IMPORTED_MODULE_3__.EventUtils.createEvent(_constants_event_const__WEBPACK_IMPORTED_MODULE_4__.EventConst.ADD_HISTORY_CONTENTS_EVENT_NAME)
        );
      });

      return addHistoryBtn;
    }

    /**
     * 履歴内容を取得する。
     * @returns {array} - 履歴データ
     */
    getData() {
      const items = this.root.querySelectorAll("contents-history-item");
      const data = [];
      items.forEach((item) => {
        data.push(item.getData());
      });
      return data;
    }

    /**
     * 履歴アイテムを描画する。
     * @param {object} data
     */
    render(data) {
      data.forEach((item) => {
        this.#addHistoryItem(item);
      });

      requestAnimationFrame(() => {
        this.dispatchEvent(
          _utils_event_utils__WEBPACK_IMPORTED_MODULE_3__.EventUtils.createEvent(_constants_event_const__WEBPACK_IMPORTED_MODULE_4__.EventConst.ADD_HISTORY_CONTENTS_EVENT_NAME)
        );
      });
    }

    // **************************************************
    // * 履歴アイテム操作
    // **************************************************

    /**
     * 履歴アイテムを画面に追加する。
     * @param {object} data
     */
    #addHistoryItem(data) {
      const historyItem = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__.ElmUtils.createElm("contents-history-item");
      historyItem.init(data);
      this.root.appendChild(historyItem);
    }
  }
  customElements.define("contents-history", ContentsHistory);
}


/***/ }),
/* 29 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `/*! destyle.css v4.0.1 | MIT License | https://github.com/nicolas-cusan/destyle.css */
/* Reset box-model and set borders */
/* ============================================ */
*,
::before,
::after {
  box-sizing: border-box;
  border-style: solid;
  border-width: 0;
  min-width: 0;
}

/* Document */
/* ============================================ */
/**
 * 1. Correct the line height in all browsers.
 * 2. Prevent adjustments of font size after orientation changes in iOS.
 * 3. Remove gray overlay on links for iOS.
 */
html {
  line-height: 1.15; /* 1 */
  -webkit-text-size-adjust: 100%; /* 2 */
  -webkit-tap-highlight-color: transparent; /* 3*/
}

/* Sections */
/* ============================================ */
/**
 * Remove the margin in all browsers.
 */
body {
  margin: 0;
}

/**
 * Render the \`main\` element consistently in IE.
 */
main {
  display: block;
}

/* Vertical rhythm */
/* ============================================ */
p,
table,
blockquote,
address,
pre,
iframe,
form,
figure,
dl {
  margin: 0;
}

/* Headings */
/* ============================================ */
h1,
h2,
h3,
h4,
h5,
h6 {
  font-size: inherit;
  font-weight: inherit;
  margin: 0;
}

/* Lists (enumeration) */
/* ============================================ */
ul,
ol {
  margin: 0;
  padding: 0;
  list-style: none;
}

/* Lists (definition) */
/* ============================================ */
dt {
  font-weight: bold;
}

dd {
  margin-left: 0;
}

/* Grouping content */
/* ============================================ */
/**
 * 1. Add the correct box sizing in Firefox.
 * 2. Show the overflow in Edge and IE.
 */
hr {
  box-sizing: content-box; /* 1 */
  height: 0; /* 1 */
  overflow: visible; /* 2 */
  border-top-width: 1px;
  margin: 0;
  clear: both;
  color: inherit;
}

/**
 * 1. Correct the inheritance and scaling of font size in all browsers.
 * 2. Correct the odd \`em\` font sizing in all browsers.
 */
pre {
  font-family: monospace, monospace; /* 1 */
  font-size: inherit; /* 2 */
}

address {
  font-style: inherit;
}

/* Text-level semantics */
/* ============================================ */
/**
 * Remove the gray background on active links in IE 10.
 */
a {
  background-color: transparent;
  text-decoration: none;
  color: inherit;
}

/**
 * 1. Remove the bottom border in Chrome 57-
 * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.
 */
abbr[title] {
  text-decoration: underline dotted; /* 2 */
}

/**
 * Add the correct font weight in Chrome, Edge, and Safari.
 */
b,
strong {
  font-weight: bolder;
}

/**
 * 1. Correct the inheritance and scaling of font size in all browsers.
 * 2. Correct the odd \`em\` font sizing in all browsers.
 */
code,
kbd,
samp {
  font-family: monospace, monospace; /* 1 */
  font-size: inherit; /* 2 */
}

/**
 * Add the correct font size in all browsers.
 */
small {
  font-size: 80%;
}

/**
 * Prevent \`sub\` and \`sup\` elements from affecting the line height in
 * all browsers.
 */
sub,
sup {
  font-size: 75%;
  line-height: 0;
  position: relative;
  vertical-align: baseline;
}

sub {
  bottom: -0.25em;
}

sup {
  top: -0.5em;
}

/* Replaced content */
/* ============================================ */
/**
 * Prevent vertical alignment issues.
 */
svg,
img,
embed,
object,
iframe {
  vertical-align: bottom;
}

/* Forms */
/* ============================================ */
/**
 * Reset form fields to make them styleable.
 * 1. Make form elements stylable across systems iOS especially.
 * 2. Inherit text-transform from parent.
 */
button,
input,
optgroup,
select,
textarea {
  -webkit-appearance: none; /* 1 */
  appearance: none;
  vertical-align: middle;
  color: inherit;
  font: inherit;
  background: transparent;
  padding: 0;
  margin: 0;
  border-radius: 0;
  text-align: inherit;
  text-transform: inherit; /* 2 */
}

/**
 * Correct cursors for clickable elements.
 */
button,
[type=button],
[type=reset],
[type=submit] {
  cursor: pointer;
}

button:disabled,
[type=button]:disabled,
[type=reset]:disabled,
[type=submit]:disabled {
  cursor: default;
}

/**
 * Improve outlines for Firefox and unify style with input elements & buttons.
 */
:-moz-focusring {
  outline: auto;
}

select:disabled {
  opacity: inherit;
}

/**
 * Remove padding
 */
option {
  padding: 0;
}

/**
 * Reset to invisible
 */
fieldset {
  margin: 0;
  padding: 0;
  min-width: 0;
}

legend {
  padding: 0;
}

/**
 * Add the correct vertical alignment in Chrome, Firefox, and Opera.
 */
progress {
  vertical-align: baseline;
}

/**
 * Remove the default vertical scrollbar in IE 10+.
 */
textarea {
  overflow: auto;
}

/**
 * Correct the cursor style of increment and decrement buttons in Chrome.
 */
[type=number]::-webkit-inner-spin-button,
[type=number]::-webkit-outer-spin-button {
  height: auto;
}

/**
 * Correct the outline style in Safari.
 */
[type=search] {
  outline-offset: -2px; /* 1 */
}

/**
 * Remove the inner padding in Chrome and Safari on macOS.
 */
[type=search]::-webkit-search-decoration {
  -webkit-appearance: none;
}

/**
 * 1. Correct the inability to style clickable types in iOS and Safari.
 * 2. Fix font inheritance.
 */
::-webkit-file-upload-button {
  -webkit-appearance: button; /* 1 */
  font: inherit; /* 2 */
}

/**
 * Fix appearance for Firefox
 */
[type=number] {
  -moz-appearance: textfield;
  appearance: textfiled;
}

/**
 * Clickable labels
 */
label[for] {
  cursor: pointer;
}

/* Interactive */
/* ============================================ */
/*
 * Add the correct display in Edge, IE 10+, and Firefox.
 */
details {
  display: block;
}

/*
 * Add the correct display in all browsers.
 */
summary {
  display: list-item;
}

/*
 * Remove outline for editable content.
 */
[contenteditable]:focus {
  outline: auto;
}

/* Tables */
/* ============================================ */
/**
1. Correct table border color inheritance in all Chrome and Safari.
*/
table {
  border-color: inherit; /* 1 */
  border-collapse: collapse;
}

caption {
  text-align: left;
}

td,
th {
  vertical-align: top;
  padding: 0;
}

th {
  text-align: left;
  font-weight: bold;
}

.svg {
  position: absolute;
  width: 0;
  height: 0;
  overflow: hidden;
}

.svg-icon {
  display: block;
  width: 1em;
  height: 1em;
  stroke-width: 0;
  stroke: currentColor;
  fill: currentColor;
  pointer-events: none;
}
.svg-icon use {
  pointer-events: none;
}

* {
  font-family: monospace;
}

.scroll {
  overflow-y: scroll;
}
.scroll::-webkit-scrollbar {
  display: none;
}

.float-area {
  position: absolute;
  right: 1rem;
  bottom: 1rem;
}
.float-area * {
  display: block;
  margin-top: 0.25rem;
}

.contents-history {
  padding-bottom: 5rem;
}
.contents-history #contents-title {
  margin-bottom: 0.3rem;
  font-weight: bold;
  letter-spacing: 1px;
}
`, ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 30 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ContentsHistoryItem: () => (/* binding */ ContentsHistoryItem)
/* harmony export */ });
/* harmony import */ var _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _utils_date_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(19);
/* harmony import */ var _utils_id_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(18);
/* harmony import */ var _utils_svg_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(10);
/* harmony import */ var _constants_svg_const__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(3);
/* harmony import */ var _utils_event_utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(9);
/* harmony import */ var _constants_event_const__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(13);
/* harmony import */ var _style_contents_history_item_css__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(31);










function ContentsHistoryItem() {
  class ContentsHistoryItem extends HTMLElement {
    /**
     * コンストラクタ
     * @return {void}
     */
    constructor() {
      super();

      // Shadow DOMをオープンモードでアタッチ
      this.attachShadow({ mode: "open" });
      this.shadowRoot.innerHTML = "";

      // CSSを適用
      this.shadowRoot.adoptedStyleSheets = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__.ElmUtils.createStylesheet(_style_contents_history_item_css__WEBPACK_IMPORTED_MODULE_7__["default"]);

      // 空の要素を作成
      this.root = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__.ElmUtils.createElm("div", "root", ["history-item"]);
      this.footer = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__.ElmUtils.createElm("div", "footer");

      this.#addText();
      this.#addDate();
      this.#addDeleteButton();

      this.root.appendChild(this.footer);

      // Shado Domにrootを追加
      this.shadowRoot.innerHTML = "";
      this.shadowRoot.appendChild(this.root);
    }

    /**
     * 履歴内容を初期化する。
     * @param {*} data - 履歴データ
     * @returns {void}
     */
    init(data = {}) {
      this.id = data.id || _utils_id_utils__WEBPACK_IMPORTED_MODULE_2__.IdUtils.getUniqueId();
      this._text.value = data.text || "";
      this._date.value =
        data.date ||
        _utils_date_utils__WEBPACK_IMPORTED_MODULE_1__.DateUtils.formatDate(new Date(), "{yyyy}-{MM}-{dd}T{HH}:{mm}");
    }

    /**
     * 履歴データを取得する。
     * @returns {object} - 履歴データ
     */
    getData() {
      return {
        id: this.id,
        text: this._text.value,
        date: this._date.value,
      };
    }

    // **************************************************
    // * 履歴
    // **************************************************

    /**
     * 履歴入力欄を追加する。
     * @returns {void}
     */
    #addText() {
      this._text = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__.ElmUtils.createElm("form-textarea", "history-text");
      this._text.borderless = true;
      this.root.appendChild(this._text);
    }

    // **************************************************
    // * 日付
    // **************************************************

    /**
     * 日付入力欄を追加する。
     * @returns {void}
     */
    #addDate() {
      this._date = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__.ElmUtils.createElm("input", "history-date");
      this._date.type = "datetime-local";
      this.footer.appendChild(this._date);

      this._date.addEventListener("change", () => {
        this.dispatchEvent(
          _utils_event_utils__WEBPACK_IMPORTED_MODULE_5__.EventUtils.createEvent(_constants_event_const__WEBPACK_IMPORTED_MODULE_6__.EventConst.CHANGE_FORM_ITEM_EVENT_NAME)
        );
      });
    }

    // **************************************************
    // * 削除ボタン
    // **************************************************

    /**
     * 削除ボタンを追加する。
     * @returns {void}
     */
    #addDeleteButton() {
      const deleteHistoryBtn = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__.ElmUtils.createElm(
        "svg-btn",
        "delete-history-item"
      );
      deleteHistoryBtn.iconPaths = _constants_svg_const__WEBPACK_IMPORTED_MODULE_4__.SvgConst.trashPaths;
      deleteHistoryBtn.size = "1rem";
      deleteHistoryBtn.hover = true;
      deleteHistoryBtn.color = "red";

      this.footer.appendChild(deleteHistoryBtn);

      deleteHistoryBtn.addEventListener("click", () => {
        this.remove();
        this.dispatchEvent(
          _utils_event_utils__WEBPACK_IMPORTED_MODULE_5__.EventUtils.createEvent(_constants_event_const__WEBPACK_IMPORTED_MODULE_6__.EventConst.CHANGE_FORM_ITEM_EVENT_NAME)
        );
      });
    }
  }
  customElements.define("contents-history-item", ContentsHistoryItem);
}


/***/ }),
/* 31 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `/*! destyle.css v4.0.1 | MIT License | https://github.com/nicolas-cusan/destyle.css */
/* Reset box-model and set borders */
/* ============================================ */
*,
::before,
::after {
  box-sizing: border-box;
  border-style: solid;
  border-width: 0;
  min-width: 0;
}

/* Document */
/* ============================================ */
/**
 * 1. Correct the line height in all browsers.
 * 2. Prevent adjustments of font size after orientation changes in iOS.
 * 3. Remove gray overlay on links for iOS.
 */
html {
  line-height: 1.15; /* 1 */
  -webkit-text-size-adjust: 100%; /* 2 */
  -webkit-tap-highlight-color: transparent; /* 3*/
}

/* Sections */
/* ============================================ */
/**
 * Remove the margin in all browsers.
 */
body {
  margin: 0;
}

/**
 * Render the \`main\` element consistently in IE.
 */
main {
  display: block;
}

/* Vertical rhythm */
/* ============================================ */
p,
table,
blockquote,
address,
pre,
iframe,
form,
figure,
dl {
  margin: 0;
}

/* Headings */
/* ============================================ */
h1,
h2,
h3,
h4,
h5,
h6 {
  font-size: inherit;
  font-weight: inherit;
  margin: 0;
}

/* Lists (enumeration) */
/* ============================================ */
ul,
ol {
  margin: 0;
  padding: 0;
  list-style: none;
}

/* Lists (definition) */
/* ============================================ */
dt {
  font-weight: bold;
}

dd {
  margin-left: 0;
}

/* Grouping content */
/* ============================================ */
/**
 * 1. Add the correct box sizing in Firefox.
 * 2. Show the overflow in Edge and IE.
 */
hr {
  box-sizing: content-box; /* 1 */
  height: 0; /* 1 */
  overflow: visible; /* 2 */
  border-top-width: 1px;
  margin: 0;
  clear: both;
  color: inherit;
}

/**
 * 1. Correct the inheritance and scaling of font size in all browsers.
 * 2. Correct the odd \`em\` font sizing in all browsers.
 */
pre {
  font-family: monospace, monospace; /* 1 */
  font-size: inherit; /* 2 */
}

address {
  font-style: inherit;
}

/* Text-level semantics */
/* ============================================ */
/**
 * Remove the gray background on active links in IE 10.
 */
a {
  background-color: transparent;
  text-decoration: none;
  color: inherit;
}

/**
 * 1. Remove the bottom border in Chrome 57-
 * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.
 */
abbr[title] {
  text-decoration: underline dotted; /* 2 */
}

/**
 * Add the correct font weight in Chrome, Edge, and Safari.
 */
b,
strong {
  font-weight: bolder;
}

/**
 * 1. Correct the inheritance and scaling of font size in all browsers.
 * 2. Correct the odd \`em\` font sizing in all browsers.
 */
code,
kbd,
samp {
  font-family: monospace, monospace; /* 1 */
  font-size: inherit; /* 2 */
}

/**
 * Add the correct font size in all browsers.
 */
small {
  font-size: 80%;
}

/**
 * Prevent \`sub\` and \`sup\` elements from affecting the line height in
 * all browsers.
 */
sub,
sup {
  font-size: 75%;
  line-height: 0;
  position: relative;
  vertical-align: baseline;
}

sub {
  bottom: -0.25em;
}

sup {
  top: -0.5em;
}

/* Replaced content */
/* ============================================ */
/**
 * Prevent vertical alignment issues.
 */
svg,
img,
embed,
object,
iframe {
  vertical-align: bottom;
}

/* Forms */
/* ============================================ */
/**
 * Reset form fields to make them styleable.
 * 1. Make form elements stylable across systems iOS especially.
 * 2. Inherit text-transform from parent.
 */
button,
input,
optgroup,
select,
textarea {
  -webkit-appearance: none; /* 1 */
  appearance: none;
  vertical-align: middle;
  color: inherit;
  font: inherit;
  background: transparent;
  padding: 0;
  margin: 0;
  border-radius: 0;
  text-align: inherit;
  text-transform: inherit; /* 2 */
}

/**
 * Correct cursors for clickable elements.
 */
button,
[type=button],
[type=reset],
[type=submit] {
  cursor: pointer;
}

button:disabled,
[type=button]:disabled,
[type=reset]:disabled,
[type=submit]:disabled {
  cursor: default;
}

/**
 * Improve outlines for Firefox and unify style with input elements & buttons.
 */
:-moz-focusring {
  outline: auto;
}

select:disabled {
  opacity: inherit;
}

/**
 * Remove padding
 */
option {
  padding: 0;
}

/**
 * Reset to invisible
 */
fieldset {
  margin: 0;
  padding: 0;
  min-width: 0;
}

legend {
  padding: 0;
}

/**
 * Add the correct vertical alignment in Chrome, Firefox, and Opera.
 */
progress {
  vertical-align: baseline;
}

/**
 * Remove the default vertical scrollbar in IE 10+.
 */
textarea {
  overflow: auto;
}

/**
 * Correct the cursor style of increment and decrement buttons in Chrome.
 */
[type=number]::-webkit-inner-spin-button,
[type=number]::-webkit-outer-spin-button {
  height: auto;
}

/**
 * Correct the outline style in Safari.
 */
[type=search] {
  outline-offset: -2px; /* 1 */
}

/**
 * Remove the inner padding in Chrome and Safari on macOS.
 */
[type=search]::-webkit-search-decoration {
  -webkit-appearance: none;
}

/**
 * 1. Correct the inability to style clickable types in iOS and Safari.
 * 2. Fix font inheritance.
 */
::-webkit-file-upload-button {
  -webkit-appearance: button; /* 1 */
  font: inherit; /* 2 */
}

/**
 * Fix appearance for Firefox
 */
[type=number] {
  -moz-appearance: textfield;
  appearance: textfiled;
}

/**
 * Clickable labels
 */
label[for] {
  cursor: pointer;
}

/* Interactive */
/* ============================================ */
/*
 * Add the correct display in Edge, IE 10+, and Firefox.
 */
details {
  display: block;
}

/*
 * Add the correct display in all browsers.
 */
summary {
  display: list-item;
}

/*
 * Remove outline for editable content.
 */
[contenteditable]:focus {
  outline: auto;
}

/* Tables */
/* ============================================ */
/**
1. Correct table border color inheritance in all Chrome and Safari.
*/
table {
  border-color: inherit; /* 1 */
  border-collapse: collapse;
}

caption {
  text-align: left;
}

td,
th {
  vertical-align: top;
  padding: 0;
}

th {
  text-align: left;
  font-weight: bold;
}

.svg {
  position: absolute;
  width: 0;
  height: 0;
  overflow: hidden;
}

.svg-icon {
  display: block;
  width: 1em;
  height: 1em;
  stroke-width: 0;
  stroke: currentColor;
  fill: currentColor;
  pointer-events: none;
}
.svg-icon use {
  pointer-events: none;
}

* {
  font-family: monospace;
}

.scroll {
  overflow-y: scroll;
}
.scroll::-webkit-scrollbar {
  display: none;
}

.float-area {
  position: absolute;
  right: 1rem;
  bottom: 1rem;
}
.float-area * {
  display: block;
  margin-top: 0.25rem;
}

.history-item {
  background-color: #fffff8;
  border: 1px solid #6f6f6f;
  border-radius: 0.25rem;
  padding: 0.35rem;
  margin-bottom: 0.6rem;
}
.history-item #footer {
  position: relative;
  margin-top: 0.25rem;
  height: 1rem;
}
.history-item #footer #history-date {
  position: absolute;
  right: 1.5rem;
  font-size: 0.75rem;
  outline: none;
}
.history-item #footer #delete-history-item {
  position: absolute;
  right: 0.25rem;
}
`, ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 32 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FormFieldset: () => (/* binding */ FormFieldset)
/* harmony export */ });
/* harmony import */ var _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _style_form_fieldset_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(33);




/**
 * FormFieldset コンポーネント
 * @class FormFieldset
 * @extends {HTMLElement}
 */
function FormFieldset() {
  class FormFieldset extends HTMLElement {
    /**
     * コンストラクタ
     * @return {void}
     */
    constructor() {
      super();

      // Shadow DOMをオープンモードでアタッチ
      this.attachShadow({ mode: "open" });
      this.shadowRoot.innerHTML = "";

      // CSSを適用
      this.shadowRoot.adoptedStyleSheets = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__.ElmUtils.createStylesheet(_style_form_fieldset_css__WEBPACK_IMPORTED_MODULE_1__["default"]);

      // 空の要素を作成
      this.fieldset = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__.ElmUtils.createElm("fieldset", "root");
      this.legend = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__.ElmUtils.createElm("legend");

      this.fieldset.appendChild(this.legend);
      this.shadowRoot.appendChild(this.fieldset);
    }

    /**
     * Legendに値を設定する
     * @param {string} val 設定値
     * @return {void}
     */
    set title(val) {
      this.legend.innerText = val;
    }

    /**
     * フィールドセットのlegendに必須クラスを設定します。
     * @param {boolean} val - クラスを追加するかどうかのブール値。
     */
    set required(val) {
      this.legend.classList.toggle("isRequired", val);
    }

    /**
     * ネスト項目であるか否かを設定
     * @param {string} val 設定値
     * @return {void}
     */
    set nested(val) {
      this.fieldset.classList.toggle("nested", val);
    }

    /**
     * 指定されたアイテムをフィールドセットに追加します。
     * @param {HTMLElement} item - 追加するアイテム。
     */
    addItem(item) {
      if (item.tagName === "FORM-FIELDSET") {
        this.fieldset.classList.add("nestedRoot");
        item.nested = true;
      }
      this.fieldset.appendChild(item);
    }
  }
  customElements.define("form-fieldset", FormFieldset);
}


/***/ }),
/* 33 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `@charset "UTF-8";
/*! destyle.css v4.0.1 | MIT License | https://github.com/nicolas-cusan/destyle.css */
/* Reset box-model and set borders */
/* ============================================ */
*,
::before,
::after {
  box-sizing: border-box;
  border-style: solid;
  border-width: 0;
  min-width: 0;
}

/* Document */
/* ============================================ */
/**
 * 1. Correct the line height in all browsers.
 * 2. Prevent adjustments of font size after orientation changes in iOS.
 * 3. Remove gray overlay on links for iOS.
 */
html {
  line-height: 1.15; /* 1 */
  -webkit-text-size-adjust: 100%; /* 2 */
  -webkit-tap-highlight-color: transparent; /* 3*/
}

/* Sections */
/* ============================================ */
/**
 * Remove the margin in all browsers.
 */
body {
  margin: 0;
}

/**
 * Render the \`main\` element consistently in IE.
 */
main {
  display: block;
}

/* Vertical rhythm */
/* ============================================ */
p,
table,
blockquote,
address,
pre,
iframe,
form,
figure,
dl {
  margin: 0;
}

/* Headings */
/* ============================================ */
h1,
h2,
h3,
h4,
h5,
h6 {
  font-size: inherit;
  font-weight: inherit;
  margin: 0;
}

/* Lists (enumeration) */
/* ============================================ */
ul,
ol {
  margin: 0;
  padding: 0;
  list-style: none;
}

/* Lists (definition) */
/* ============================================ */
dt {
  font-weight: bold;
}

dd {
  margin-left: 0;
}

/* Grouping content */
/* ============================================ */
/**
 * 1. Add the correct box sizing in Firefox.
 * 2. Show the overflow in Edge and IE.
 */
hr {
  box-sizing: content-box; /* 1 */
  height: 0; /* 1 */
  overflow: visible; /* 2 */
  border-top-width: 1px;
  margin: 0;
  clear: both;
  color: inherit;
}

/**
 * 1. Correct the inheritance and scaling of font size in all browsers.
 * 2. Correct the odd \`em\` font sizing in all browsers.
 */
pre {
  font-family: monospace, monospace; /* 1 */
  font-size: inherit; /* 2 */
}

address {
  font-style: inherit;
}

/* Text-level semantics */
/* ============================================ */
/**
 * Remove the gray background on active links in IE 10.
 */
a {
  background-color: transparent;
  text-decoration: none;
  color: inherit;
}

/**
 * 1. Remove the bottom border in Chrome 57-
 * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.
 */
abbr[title] {
  text-decoration: underline dotted; /* 2 */
}

/**
 * Add the correct font weight in Chrome, Edge, and Safari.
 */
b,
strong {
  font-weight: bolder;
}

/**
 * 1. Correct the inheritance and scaling of font size in all browsers.
 * 2. Correct the odd \`em\` font sizing in all browsers.
 */
code,
kbd,
samp {
  font-family: monospace, monospace; /* 1 */
  font-size: inherit; /* 2 */
}

/**
 * Add the correct font size in all browsers.
 */
small {
  font-size: 80%;
}

/**
 * Prevent \`sub\` and \`sup\` elements from affecting the line height in
 * all browsers.
 */
sub,
sup {
  font-size: 75%;
  line-height: 0;
  position: relative;
  vertical-align: baseline;
}

sub {
  bottom: -0.25em;
}

sup {
  top: -0.5em;
}

/* Replaced content */
/* ============================================ */
/**
 * Prevent vertical alignment issues.
 */
svg,
img,
embed,
object,
iframe {
  vertical-align: bottom;
}

/* Forms */
/* ============================================ */
/**
 * Reset form fields to make them styleable.
 * 1. Make form elements stylable across systems iOS especially.
 * 2. Inherit text-transform from parent.
 */
button,
input,
optgroup,
select,
textarea {
  -webkit-appearance: none; /* 1 */
  appearance: none;
  vertical-align: middle;
  color: inherit;
  font: inherit;
  background: transparent;
  padding: 0;
  margin: 0;
  border-radius: 0;
  text-align: inherit;
  text-transform: inherit; /* 2 */
}

/**
 * Correct cursors for clickable elements.
 */
button,
[type=button],
[type=reset],
[type=submit] {
  cursor: pointer;
}

button:disabled,
[type=button]:disabled,
[type=reset]:disabled,
[type=submit]:disabled {
  cursor: default;
}

/**
 * Improve outlines for Firefox and unify style with input elements & buttons.
 */
:-moz-focusring {
  outline: auto;
}

select:disabled {
  opacity: inherit;
}

/**
 * Remove padding
 */
option {
  padding: 0;
}

/**
 * Reset to invisible
 */
fieldset {
  margin: 0;
  padding: 0;
  min-width: 0;
}

legend {
  padding: 0;
}

/**
 * Add the correct vertical alignment in Chrome, Firefox, and Opera.
 */
progress {
  vertical-align: baseline;
}

/**
 * Remove the default vertical scrollbar in IE 10+.
 */
textarea {
  overflow: auto;
}

/**
 * Correct the cursor style of increment and decrement buttons in Chrome.
 */
[type=number]::-webkit-inner-spin-button,
[type=number]::-webkit-outer-spin-button {
  height: auto;
}

/**
 * Correct the outline style in Safari.
 */
[type=search] {
  outline-offset: -2px; /* 1 */
}

/**
 * Remove the inner padding in Chrome and Safari on macOS.
 */
[type=search]::-webkit-search-decoration {
  -webkit-appearance: none;
}

/**
 * 1. Correct the inability to style clickable types in iOS and Safari.
 * 2. Fix font inheritance.
 */
::-webkit-file-upload-button {
  -webkit-appearance: button; /* 1 */
  font: inherit; /* 2 */
}

/**
 * Fix appearance for Firefox
 */
[type=number] {
  -moz-appearance: textfield;
  appearance: textfiled;
}

/**
 * Clickable labels
 */
label[for] {
  cursor: pointer;
}

/* Interactive */
/* ============================================ */
/*
 * Add the correct display in Edge, IE 10+, and Firefox.
 */
details {
  display: block;
}

/*
 * Add the correct display in all browsers.
 */
summary {
  display: list-item;
}

/*
 * Remove outline for editable content.
 */
[contenteditable]:focus {
  outline: auto;
}

/* Tables */
/* ============================================ */
/**
1. Correct table border color inheritance in all Chrome and Safari.
*/
table {
  border-color: inherit; /* 1 */
  border-collapse: collapse;
}

caption {
  text-align: left;
}

td,
th {
  vertical-align: top;
  padding: 0;
}

th {
  text-align: left;
  font-weight: bold;
}

* {
  font-family: monospace;
}

fieldset {
  position: relative;
  padding-bottom: 1.25rem;
}
fieldset legend {
  margin-bottom: 0.3rem;
  font-weight: bold;
  letter-spacing: 1px;
  display: flex;
  align-items: center;
}
fieldset legend.isRequired:after {
  content: "必須";
  margin-left: 0.25rem;
  border-radius: 0.25rem;
  background-color: #fb4141;
  color: #fffffb;
  font-size: 0.6rem;
  padding: 0.15rem 0.25rem;
}
fieldset.nestedRoot {
  display: flex;
}
fieldset.nested {
  margin-top: 0.25rem;
  margin-right: 0.35rem;
  padding-bottom: 0;
}
`, ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 34 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FormInput: () => (/* binding */ FormInput)
/* harmony export */ });
/* harmony import */ var _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _utils_event_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9);
/* harmony import */ var _constants_event_const__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(13);
/* harmony import */ var _style_form_input_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(35);






/**
 * FormInput コンポーネント
 * @class FormInput
 * @extends {HTMLElement}
 */
function FormInput() {
  class FormInput extends HTMLElement {
    /**
     * コンストラクタ
     * @return {void}
     */
    constructor() {
      super();

      // Shadow DOMをオープンモードでアタッチ
      this.attachShadow({ mode: "open" });
      this.shadowRoot.innerHTML = "";

      // CSSを適用
      this.shadowRoot.adoptedStyleSheets = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__.ElmUtils.createStylesheet(_style_form_input_css__WEBPACK_IMPORTED_MODULE_3__["default"]);

      // 空の要素を作成
      this.input = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__.ElmUtils.createElm("input");
      this.input.type = "text";
      this.input.style = "width:100%";

      this.shadowRoot.appendChild(this.input);

      // 変更イベントを伝播
      this.input.addEventListener("change", () => {
        this.dispatchEvent(
          _utils_event_utils__WEBPACK_IMPORTED_MODULE_1__.EventUtils.createEvent(_constants_event_const__WEBPACK_IMPORTED_MODULE_2__.EventConst.CHANGE_FORM_ITEM_EVENT_NAME)
        );
      });
    }

    /**
     * Inputに値を設定する
     * @param {string} val 設定値
     * @return {void}
     */
    set value(val) {
      this.input.value = val;
    }

    /**
     *  Inputの値を取得する
     * @return {string} 設定値
     */
    get value() {
      return this.input.value;
    }

    /**
     * Inputにプレースホルダーを設定する
     * @param {string} val 設定値
     * @return {void}
     */
    set placeholder(val) {
      this.input.placeholder = val;
    }

    /**
     * 入力フィールドに「read-only」クラスを設定または解除します。
     * @param {boolean} val - クラスを追加するかどうかのブール値。
     */
    set readOnly(val) {
      this.input.readOnly = val;
    }

    /**
     * 幅を設定します。
     * @param {string} w - 設定する幅の値（例：'100px'）。
     */
    set width(w) {
      this.input.style = `width:${w}`;
    }
  }
  customElements.define("form-input", FormInput);
}


/***/ }),
/* 35 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `/*! destyle.css v4.0.1 | MIT License | https://github.com/nicolas-cusan/destyle.css */
/* Reset box-model and set borders */
/* ============================================ */
*,
::before,
::after {
  box-sizing: border-box;
  border-style: solid;
  border-width: 0;
  min-width: 0;
}

/* Document */
/* ============================================ */
/**
 * 1. Correct the line height in all browsers.
 * 2. Prevent adjustments of font size after orientation changes in iOS.
 * 3. Remove gray overlay on links for iOS.
 */
html {
  line-height: 1.15; /* 1 */
  -webkit-text-size-adjust: 100%; /* 2 */
  -webkit-tap-highlight-color: transparent; /* 3*/
}

/* Sections */
/* ============================================ */
/**
 * Remove the margin in all browsers.
 */
body {
  margin: 0;
}

/**
 * Render the \`main\` element consistently in IE.
 */
main {
  display: block;
}

/* Vertical rhythm */
/* ============================================ */
p,
table,
blockquote,
address,
pre,
iframe,
form,
figure,
dl {
  margin: 0;
}

/* Headings */
/* ============================================ */
h1,
h2,
h3,
h4,
h5,
h6 {
  font-size: inherit;
  font-weight: inherit;
  margin: 0;
}

/* Lists (enumeration) */
/* ============================================ */
ul,
ol {
  margin: 0;
  padding: 0;
  list-style: none;
}

/* Lists (definition) */
/* ============================================ */
dt {
  font-weight: bold;
}

dd {
  margin-left: 0;
}

/* Grouping content */
/* ============================================ */
/**
 * 1. Add the correct box sizing in Firefox.
 * 2. Show the overflow in Edge and IE.
 */
hr {
  box-sizing: content-box; /* 1 */
  height: 0; /* 1 */
  overflow: visible; /* 2 */
  border-top-width: 1px;
  margin: 0;
  clear: both;
  color: inherit;
}

/**
 * 1. Correct the inheritance and scaling of font size in all browsers.
 * 2. Correct the odd \`em\` font sizing in all browsers.
 */
pre {
  font-family: monospace, monospace; /* 1 */
  font-size: inherit; /* 2 */
}

address {
  font-style: inherit;
}

/* Text-level semantics */
/* ============================================ */
/**
 * Remove the gray background on active links in IE 10.
 */
a {
  background-color: transparent;
  text-decoration: none;
  color: inherit;
}

/**
 * 1. Remove the bottom border in Chrome 57-
 * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.
 */
abbr[title] {
  text-decoration: underline dotted; /* 2 */
}

/**
 * Add the correct font weight in Chrome, Edge, and Safari.
 */
b,
strong {
  font-weight: bolder;
}

/**
 * 1. Correct the inheritance and scaling of font size in all browsers.
 * 2. Correct the odd \`em\` font sizing in all browsers.
 */
code,
kbd,
samp {
  font-family: monospace, monospace; /* 1 */
  font-size: inherit; /* 2 */
}

/**
 * Add the correct font size in all browsers.
 */
small {
  font-size: 80%;
}

/**
 * Prevent \`sub\` and \`sup\` elements from affecting the line height in
 * all browsers.
 */
sub,
sup {
  font-size: 75%;
  line-height: 0;
  position: relative;
  vertical-align: baseline;
}

sub {
  bottom: -0.25em;
}

sup {
  top: -0.5em;
}

/* Replaced content */
/* ============================================ */
/**
 * Prevent vertical alignment issues.
 */
svg,
img,
embed,
object,
iframe {
  vertical-align: bottom;
}

/* Forms */
/* ============================================ */
/**
 * Reset form fields to make them styleable.
 * 1. Make form elements stylable across systems iOS especially.
 * 2. Inherit text-transform from parent.
 */
button,
input,
optgroup,
select,
textarea {
  -webkit-appearance: none; /* 1 */
  appearance: none;
  vertical-align: middle;
  color: inherit;
  font: inherit;
  background: transparent;
  padding: 0;
  margin: 0;
  border-radius: 0;
  text-align: inherit;
  text-transform: inherit; /* 2 */
}

/**
 * Correct cursors for clickable elements.
 */
button,
[type=button],
[type=reset],
[type=submit] {
  cursor: pointer;
}

button:disabled,
[type=button]:disabled,
[type=reset]:disabled,
[type=submit]:disabled {
  cursor: default;
}

/**
 * Improve outlines for Firefox and unify style with input elements & buttons.
 */
:-moz-focusring {
  outline: auto;
}

select:disabled {
  opacity: inherit;
}

/**
 * Remove padding
 */
option {
  padding: 0;
}

/**
 * Reset to invisible
 */
fieldset {
  margin: 0;
  padding: 0;
  min-width: 0;
}

legend {
  padding: 0;
}

/**
 * Add the correct vertical alignment in Chrome, Firefox, and Opera.
 */
progress {
  vertical-align: baseline;
}

/**
 * Remove the default vertical scrollbar in IE 10+.
 */
textarea {
  overflow: auto;
}

/**
 * Correct the cursor style of increment and decrement buttons in Chrome.
 */
[type=number]::-webkit-inner-spin-button,
[type=number]::-webkit-outer-spin-button {
  height: auto;
}

/**
 * Correct the outline style in Safari.
 */
[type=search] {
  outline-offset: -2px; /* 1 */
}

/**
 * Remove the inner padding in Chrome and Safari on macOS.
 */
[type=search]::-webkit-search-decoration {
  -webkit-appearance: none;
}

/**
 * 1. Correct the inability to style clickable types in iOS and Safari.
 * 2. Fix font inheritance.
 */
::-webkit-file-upload-button {
  -webkit-appearance: button; /* 1 */
  font: inherit; /* 2 */
}

/**
 * Fix appearance for Firefox
 */
[type=number] {
  -moz-appearance: textfield;
  appearance: textfiled;
}

/**
 * Clickable labels
 */
label[for] {
  cursor: pointer;
}

/* Interactive */
/* ============================================ */
/*
 * Add the correct display in Edge, IE 10+, and Firefox.
 */
details {
  display: block;
}

/*
 * Add the correct display in all browsers.
 */
summary {
  display: list-item;
}

/*
 * Remove outline for editable content.
 */
[contenteditable]:focus {
  outline: auto;
}

/* Tables */
/* ============================================ */
/**
1. Correct table border color inheritance in all Chrome and Safari.
*/
table {
  border-color: inherit; /* 1 */
  border-collapse: collapse;
}

caption {
  text-align: left;
}

td,
th {
  vertical-align: top;
  padding: 0;
}

th {
  text-align: left;
  font-weight: bold;
}

* {
  font-family: monospace;
}

input[type=text] {
  outline: none;
  background-color: #fffff8;
  border: 1px solid #6f6f6f;
  border-radius: 0.25rem;
  line-height: 1.5rem;
  padding: 0.1rem 0.25rem;
}
input[type=text]:read-only {
  background-color: #dfdfdf;
}
`, ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 36 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FormDate: () => (/* binding */ FormDate)
/* harmony export */ });
/* harmony import */ var _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _utils_event_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9);
/* harmony import */ var _constants_event_const__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(13);
/* harmony import */ var _style_form_date_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(37);






/**
 * FormDate コンポーネント
 * @class FormDate
 * @extends {HTMLElement}
 */
function FormDate() {
  class FormDate extends HTMLElement {
    /**
     * コンストラクタ
     * @return {void}
     */
    constructor() {
      super();

      // Shadow DOMをオープンモードでアタッチ
      this.attachShadow({ mode: "open" });
      this.shadowRoot.innerHTML = "";

      // CSSを適用
      this.shadowRoot.adoptedStyleSheets = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__.ElmUtils.createStylesheet(_style_form_date_css__WEBPACK_IMPORTED_MODULE_3__["default"]);

      // 空の要素を作成
      this.input = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__.ElmUtils.createElm("input");
      this.input.type = "date";

      this.shadowRoot.appendChild(this.input);

      // 変更イベントを伝播
      this.input.addEventListener("change", () => {
        this.dispatchEvent(
          _utils_event_utils__WEBPACK_IMPORTED_MODULE_1__.EventUtils.createEvent(_constants_event_const__WEBPACK_IMPORTED_MODULE_2__.EventConst.CHANGE_FORM_ITEM_EVENT_NAME)
        );
      });
    }

    /**
     * Inputに値を設定する
     * @param {string} val 設定値
     * @return {void}
     */
    set value(val) {
      this.input.value = val;
    }

    /**
     *  Inputの値を取得する
     * @return {string} 設定値
     */
    get value() {
      return this.input.value;
    }
  }
  customElements.define("form-date", FormDate);
}


/***/ }),
/* 37 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `/*! destyle.css v4.0.1 | MIT License | https://github.com/nicolas-cusan/destyle.css */
/* Reset box-model and set borders */
/* ============================================ */
*,
::before,
::after {
  box-sizing: border-box;
  border-style: solid;
  border-width: 0;
  min-width: 0;
}

/* Document */
/* ============================================ */
/**
 * 1. Correct the line height in all browsers.
 * 2. Prevent adjustments of font size after orientation changes in iOS.
 * 3. Remove gray overlay on links for iOS.
 */
html {
  line-height: 1.15; /* 1 */
  -webkit-text-size-adjust: 100%; /* 2 */
  -webkit-tap-highlight-color: transparent; /* 3*/
}

/* Sections */
/* ============================================ */
/**
 * Remove the margin in all browsers.
 */
body {
  margin: 0;
}

/**
 * Render the \`main\` element consistently in IE.
 */
main {
  display: block;
}

/* Vertical rhythm */
/* ============================================ */
p,
table,
blockquote,
address,
pre,
iframe,
form,
figure,
dl {
  margin: 0;
}

/* Headings */
/* ============================================ */
h1,
h2,
h3,
h4,
h5,
h6 {
  font-size: inherit;
  font-weight: inherit;
  margin: 0;
}

/* Lists (enumeration) */
/* ============================================ */
ul,
ol {
  margin: 0;
  padding: 0;
  list-style: none;
}

/* Lists (definition) */
/* ============================================ */
dt {
  font-weight: bold;
}

dd {
  margin-left: 0;
}

/* Grouping content */
/* ============================================ */
/**
 * 1. Add the correct box sizing in Firefox.
 * 2. Show the overflow in Edge and IE.
 */
hr {
  box-sizing: content-box; /* 1 */
  height: 0; /* 1 */
  overflow: visible; /* 2 */
  border-top-width: 1px;
  margin: 0;
  clear: both;
  color: inherit;
}

/**
 * 1. Correct the inheritance and scaling of font size in all browsers.
 * 2. Correct the odd \`em\` font sizing in all browsers.
 */
pre {
  font-family: monospace, monospace; /* 1 */
  font-size: inherit; /* 2 */
}

address {
  font-style: inherit;
}

/* Text-level semantics */
/* ============================================ */
/**
 * Remove the gray background on active links in IE 10.
 */
a {
  background-color: transparent;
  text-decoration: none;
  color: inherit;
}

/**
 * 1. Remove the bottom border in Chrome 57-
 * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.
 */
abbr[title] {
  text-decoration: underline dotted; /* 2 */
}

/**
 * Add the correct font weight in Chrome, Edge, and Safari.
 */
b,
strong {
  font-weight: bolder;
}

/**
 * 1. Correct the inheritance and scaling of font size in all browsers.
 * 2. Correct the odd \`em\` font sizing in all browsers.
 */
code,
kbd,
samp {
  font-family: monospace, monospace; /* 1 */
  font-size: inherit; /* 2 */
}

/**
 * Add the correct font size in all browsers.
 */
small {
  font-size: 80%;
}

/**
 * Prevent \`sub\` and \`sup\` elements from affecting the line height in
 * all browsers.
 */
sub,
sup {
  font-size: 75%;
  line-height: 0;
  position: relative;
  vertical-align: baseline;
}

sub {
  bottom: -0.25em;
}

sup {
  top: -0.5em;
}

/* Replaced content */
/* ============================================ */
/**
 * Prevent vertical alignment issues.
 */
svg,
img,
embed,
object,
iframe {
  vertical-align: bottom;
}

/* Forms */
/* ============================================ */
/**
 * Reset form fields to make them styleable.
 * 1. Make form elements stylable across systems iOS especially.
 * 2. Inherit text-transform from parent.
 */
button,
input,
optgroup,
select,
textarea {
  -webkit-appearance: none; /* 1 */
  appearance: none;
  vertical-align: middle;
  color: inherit;
  font: inherit;
  background: transparent;
  padding: 0;
  margin: 0;
  border-radius: 0;
  text-align: inherit;
  text-transform: inherit; /* 2 */
}

/**
 * Correct cursors for clickable elements.
 */
button,
[type=button],
[type=reset],
[type=submit] {
  cursor: pointer;
}

button:disabled,
[type=button]:disabled,
[type=reset]:disabled,
[type=submit]:disabled {
  cursor: default;
}

/**
 * Improve outlines for Firefox and unify style with input elements & buttons.
 */
:-moz-focusring {
  outline: auto;
}

select:disabled {
  opacity: inherit;
}

/**
 * Remove padding
 */
option {
  padding: 0;
}

/**
 * Reset to invisible
 */
fieldset {
  margin: 0;
  padding: 0;
  min-width: 0;
}

legend {
  padding: 0;
}

/**
 * Add the correct vertical alignment in Chrome, Firefox, and Opera.
 */
progress {
  vertical-align: baseline;
}

/**
 * Remove the default vertical scrollbar in IE 10+.
 */
textarea {
  overflow: auto;
}

/**
 * Correct the cursor style of increment and decrement buttons in Chrome.
 */
[type=number]::-webkit-inner-spin-button,
[type=number]::-webkit-outer-spin-button {
  height: auto;
}

/**
 * Correct the outline style in Safari.
 */
[type=search] {
  outline-offset: -2px; /* 1 */
}

/**
 * Remove the inner padding in Chrome and Safari on macOS.
 */
[type=search]::-webkit-search-decoration {
  -webkit-appearance: none;
}

/**
 * 1. Correct the inability to style clickable types in iOS and Safari.
 * 2. Fix font inheritance.
 */
::-webkit-file-upload-button {
  -webkit-appearance: button; /* 1 */
  font: inherit; /* 2 */
}

/**
 * Fix appearance for Firefox
 */
[type=number] {
  -moz-appearance: textfield;
  appearance: textfiled;
}

/**
 * Clickable labels
 */
label[for] {
  cursor: pointer;
}

/* Interactive */
/* ============================================ */
/*
 * Add the correct display in Edge, IE 10+, and Firefox.
 */
details {
  display: block;
}

/*
 * Add the correct display in all browsers.
 */
summary {
  display: list-item;
}

/*
 * Remove outline for editable content.
 */
[contenteditable]:focus {
  outline: auto;
}

/* Tables */
/* ============================================ */
/**
1. Correct table border color inheritance in all Chrome and Safari.
*/
table {
  border-color: inherit; /* 1 */
  border-collapse: collapse;
}

caption {
  text-align: left;
}

td,
th {
  vertical-align: top;
  padding: 0;
}

th {
  text-align: left;
  font-weight: bold;
}

* {
  font-family: monospace;
}

input[type=date] {
  outline: none;
  background-color: #fffff8;
  border: 1px solid #6f6f6f;
  border-radius: 0.25rem;
  line-height: 1.5rem;
  padding: 0.1rem 0.25rem;
}
`, ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 38 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FormTextarea: () => (/* binding */ FormTextarea)
/* harmony export */ });
/* harmony import */ var _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _utils_event_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9);
/* harmony import */ var _constants_event_const__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(13);
/* harmony import */ var _style_form_textarea_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(39);






/**
 * FormTextarea コンポーネント
 * @class FormTextarea
 * @extends {HTMLElement}
 */
function FormTextarea() {
  class FormTextarea extends HTMLElement {
    /**
     * コンストラクタ
     * @return {void}
     */
    constructor() {
      super();

      // Shadow DOMをオープンモードでアタッチ
      this.attachShadow({ mode: "open" });
      this.shadowRoot.innerHTML = "";

      // CSSを適用
      this.shadowRoot.adoptedStyleSheets = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__.ElmUtils.createStylesheet(_style_form_textarea_css__WEBPACK_IMPORTED_MODULE_3__["default"]);

      // 空の要素を作成
      this.textarea = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__.ElmUtils.createElm("textarea");
      this.textarea.style = "width:100%";
      this.textarea.spellcheck = false;

      /**
       * 入力内容に連動して高さを変更する
       */
      this.defaultRows = 3;
      this.textarea.addEventListener("input", (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.#adjustTextareaHeight();
      });

      this.shadowRoot.appendChild(this.textarea);

      // 変更イベントを伝播
      this.textarea.addEventListener("change", () => {
        this.dispatchEvent(
          _utils_event_utils__WEBPACK_IMPORTED_MODULE_1__.EventUtils.createEvent(_constants_event_const__WEBPACK_IMPORTED_MODULE_2__.EventConst.CHANGE_FORM_ITEM_EVENT_NAME)
        );
      });
    }

    /**
     * 要素がDOMに追加された後の処理
     */
    connectedCallback() {
      this.#adjustTextareaHeight(this.defaultRows);
    }

    /**
     * テキストエリアの高さを調整します。
     * @param {number} [rows=0] - 設定する行数。0の場合は内容に基づいて行数を自動的に設定します。
     */
    #adjustTextareaHeight(rows = 0) {
      this.textarea.style.height = "auto";

      const style = window.getComputedStyle(this.textarea);
      const lineHeight = parseFloat(style.lineHeight);
      const paddingTop = parseFloat(style.paddingTop);
      const paddingBottom = parseFloat(style.paddingBottom);
      const paddingHeight = paddingTop + paddingBottom;
      const contentHeight = this.textarea.scrollHeight;

      if (rows === 0) {
        rows = Math.max(
          this.defaultRows,
          Math.round(contentHeight / lineHeight)
        );
      }

      const adjustHeight = lineHeight * rows + paddingHeight;
      this.textarea.style.height = `${adjustHeight}px`;
    }

    /**
     * Textareaに値を設定する
     * @param {string} val 設定値
     * @return {void}
     */
    set value(val) {
      this.textarea.value = val;
      requestAnimationFrame(() => {
        this.#adjustTextareaHeight();
      });
    }

    /**
     *  Textareaの値を取得する
     * @return {string} 設定値
     */
    get value() {
      return this.textarea.value;
    }

    /**
     * Textareaにプレースホルダーを設定する
     * @param {string} val 設定値
     * @return {void}
     */
    set placeholder(val) {
      this.textarea.placeholder = val;
    }

    /**
     * 幅を設定します。
     * @param {string} w - 設定する幅の値（例：'100px'）。
     */
    set width(w) {
      this.textarea.style = `width:${w}`;
    }

    /**
     * テキストエリアの行数を設定します。
     * @param {number} r - 設定する行数
     */
    set rows(r) {
      this.defaultRows = r;
      this.#adjustTextareaHeight(r);
    }

    /**
     * ボーダーの有無を設定します。
     * @param {boolean} isBorderLess - ボーダーを表示しない場合はtrueを指定します。
     */
    set borderless(isBorderLess) {
      this.textarea.classList.toggle("borderless", isBorderLess);
    }
  }
  customElements.define("form-textarea", FormTextarea);
}


/***/ }),
/* 39 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `/*! destyle.css v4.0.1 | MIT License | https://github.com/nicolas-cusan/destyle.css */
/* Reset box-model and set borders */
/* ============================================ */
*,
::before,
::after {
  box-sizing: border-box;
  border-style: solid;
  border-width: 0;
  min-width: 0;
}

/* Document */
/* ============================================ */
/**
 * 1. Correct the line height in all browsers.
 * 2. Prevent adjustments of font size after orientation changes in iOS.
 * 3. Remove gray overlay on links for iOS.
 */
html {
  line-height: 1.15; /* 1 */
  -webkit-text-size-adjust: 100%; /* 2 */
  -webkit-tap-highlight-color: transparent; /* 3*/
}

/* Sections */
/* ============================================ */
/**
 * Remove the margin in all browsers.
 */
body {
  margin: 0;
}

/**
 * Render the \`main\` element consistently in IE.
 */
main {
  display: block;
}

/* Vertical rhythm */
/* ============================================ */
p,
table,
blockquote,
address,
pre,
iframe,
form,
figure,
dl {
  margin: 0;
}

/* Headings */
/* ============================================ */
h1,
h2,
h3,
h4,
h5,
h6 {
  font-size: inherit;
  font-weight: inherit;
  margin: 0;
}

/* Lists (enumeration) */
/* ============================================ */
ul,
ol {
  margin: 0;
  padding: 0;
  list-style: none;
}

/* Lists (definition) */
/* ============================================ */
dt {
  font-weight: bold;
}

dd {
  margin-left: 0;
}

/* Grouping content */
/* ============================================ */
/**
 * 1. Add the correct box sizing in Firefox.
 * 2. Show the overflow in Edge and IE.
 */
hr {
  box-sizing: content-box; /* 1 */
  height: 0; /* 1 */
  overflow: visible; /* 2 */
  border-top-width: 1px;
  margin: 0;
  clear: both;
  color: inherit;
}

/**
 * 1. Correct the inheritance and scaling of font size in all browsers.
 * 2. Correct the odd \`em\` font sizing in all browsers.
 */
pre {
  font-family: monospace, monospace; /* 1 */
  font-size: inherit; /* 2 */
}

address {
  font-style: inherit;
}

/* Text-level semantics */
/* ============================================ */
/**
 * Remove the gray background on active links in IE 10.
 */
a {
  background-color: transparent;
  text-decoration: none;
  color: inherit;
}

/**
 * 1. Remove the bottom border in Chrome 57-
 * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.
 */
abbr[title] {
  text-decoration: underline dotted; /* 2 */
}

/**
 * Add the correct font weight in Chrome, Edge, and Safari.
 */
b,
strong {
  font-weight: bolder;
}

/**
 * 1. Correct the inheritance and scaling of font size in all browsers.
 * 2. Correct the odd \`em\` font sizing in all browsers.
 */
code,
kbd,
samp {
  font-family: monospace, monospace; /* 1 */
  font-size: inherit; /* 2 */
}

/**
 * Add the correct font size in all browsers.
 */
small {
  font-size: 80%;
}

/**
 * Prevent \`sub\` and \`sup\` elements from affecting the line height in
 * all browsers.
 */
sub,
sup {
  font-size: 75%;
  line-height: 0;
  position: relative;
  vertical-align: baseline;
}

sub {
  bottom: -0.25em;
}

sup {
  top: -0.5em;
}

/* Replaced content */
/* ============================================ */
/**
 * Prevent vertical alignment issues.
 */
svg,
img,
embed,
object,
iframe {
  vertical-align: bottom;
}

/* Forms */
/* ============================================ */
/**
 * Reset form fields to make them styleable.
 * 1. Make form elements stylable across systems iOS especially.
 * 2. Inherit text-transform from parent.
 */
button,
input,
optgroup,
select,
textarea {
  -webkit-appearance: none; /* 1 */
  appearance: none;
  vertical-align: middle;
  color: inherit;
  font: inherit;
  background: transparent;
  padding: 0;
  margin: 0;
  border-radius: 0;
  text-align: inherit;
  text-transform: inherit; /* 2 */
}

/**
 * Correct cursors for clickable elements.
 */
button,
[type=button],
[type=reset],
[type=submit] {
  cursor: pointer;
}

button:disabled,
[type=button]:disabled,
[type=reset]:disabled,
[type=submit]:disabled {
  cursor: default;
}

/**
 * Improve outlines for Firefox and unify style with input elements & buttons.
 */
:-moz-focusring {
  outline: auto;
}

select:disabled {
  opacity: inherit;
}

/**
 * Remove padding
 */
option {
  padding: 0;
}

/**
 * Reset to invisible
 */
fieldset {
  margin: 0;
  padding: 0;
  min-width: 0;
}

legend {
  padding: 0;
}

/**
 * Add the correct vertical alignment in Chrome, Firefox, and Opera.
 */
progress {
  vertical-align: baseline;
}

/**
 * Remove the default vertical scrollbar in IE 10+.
 */
textarea {
  overflow: auto;
}

/**
 * Correct the cursor style of increment and decrement buttons in Chrome.
 */
[type=number]::-webkit-inner-spin-button,
[type=number]::-webkit-outer-spin-button {
  height: auto;
}

/**
 * Correct the outline style in Safari.
 */
[type=search] {
  outline-offset: -2px; /* 1 */
}

/**
 * Remove the inner padding in Chrome and Safari on macOS.
 */
[type=search]::-webkit-search-decoration {
  -webkit-appearance: none;
}

/**
 * 1. Correct the inability to style clickable types in iOS and Safari.
 * 2. Fix font inheritance.
 */
::-webkit-file-upload-button {
  -webkit-appearance: button; /* 1 */
  font: inherit; /* 2 */
}

/**
 * Fix appearance for Firefox
 */
[type=number] {
  -moz-appearance: textfield;
  appearance: textfiled;
}

/**
 * Clickable labels
 */
label[for] {
  cursor: pointer;
}

/* Interactive */
/* ============================================ */
/*
 * Add the correct display in Edge, IE 10+, and Firefox.
 */
details {
  display: block;
}

/*
 * Add the correct display in all browsers.
 */
summary {
  display: list-item;
}

/*
 * Remove outline for editable content.
 */
[contenteditable]:focus {
  outline: auto;
}

/* Tables */
/* ============================================ */
/**
1. Correct table border color inheritance in all Chrome and Safari.
*/
table {
  border-color: inherit; /* 1 */
  border-collapse: collapse;
}

caption {
  text-align: left;
}

td,
th {
  vertical-align: top;
  padding: 0;
}

th {
  text-align: left;
  font-weight: bold;
}

* {
  font-family: monospace;
}

textarea {
  outline: none;
  background-color: #fffff8;
  border: 1px solid #6f6f6f;
  border-radius: 0.25rem;
  line-height: 1.1rem;
  padding: 0.35rem 0.25rem;
  resize: none;
  overflow-y: hidden;
  word-break: break-all;
}
textarea.borderless {
  padding: 0.15rem 0.25rem;
  border: none;
}
textarea.borderless:hover, textarea.borderless:focus {
  background-color: #efefef;
}
`, ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 40 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FormTable: () => (/* binding */ FormTable)
/* harmony export */ });
/* harmony import */ var _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _utils_svg_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(10);
/* harmony import */ var _constants_svg_const__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3);
/* harmony import */ var _style_form_table_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(41);






/**
 * FormTable コンポーネント
 * @class FormTable
 * @extends {HTMLElement}
 */
function FormTable() {
  class FormTable extends HTMLElement {
    /**
     * コンストラクタ
     * @return {void}
     */
    constructor() {
      super();

      // Shadow DOMをオープンモードでアタッチ
      this.attachShadow({ mode: "open" });
      this.shadowRoot.innerHTML = "";

      // CSSを適用
      this.shadowRoot.adoptedStyleSheets = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__.ElmUtils.createStylesheet(_style_form_table_css__WEBPACK_IMPORTED_MODULE_3__["default"]);

      // 空の要素を作成
      this.root = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__.ElmUtils.createElm("div", "root");
      this.table = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__.ElmUtils.createElm("table");
      this.thead = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__.ElmUtils.createElm("thead");
      this.tbody = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__.ElmUtils.createElm("tbody");

      this.table.appendChild(this.thead);
      this.table.appendChild(this.tbody);
      this.root.appendChild(this.table);

      this.shadowRoot.appendChild(this.root);
    }

    /**
     * 幅を設定します。
     * @param {string} w - 設定する幅の値（例：'100px'）。
     */
    set width(w) {
      this.table.style = `width:${w}`;
    }

    /**
     * ヘッダーを設定します。
     * @param {Array<string>} texts - ヘッダーに表示するテキストの配列。
     */
    set header(texts = []) {
      this.thead.innerHTML = "";
      const tr = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__.ElmUtils.createElm("tr");
      texts.forEach((text) => {
        const th = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__.ElmUtils.createElm("th");
        th.innerText = text;
        tr.appendChild(th);
      });
      this.thead.appendChild(tr);
    }

    /**
     * 新しいtr要素を作成してtbodyに追加します。
     */
    appendTr() {
      this.tr = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__.ElmUtils.createElm("tr");
      this.tbody.appendChild(this.tr);
    }

    /**
     * Tr要素にクラスを設定します。
     * @param {string} className
     */
    setTrClass(className) {
      this.tr.classList.add(className);
    }

    /**
     * 新しいtd要素を作成してtrに追加します。
     */
    addTd() {
      this.td = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__.ElmUtils.createElm("td");
      this.tr.appendChild(this.td);
    }

    /**
     * Td要素にエレメントを追加します。
     * @param {element} elm
     */
    setTdElment(elm) {
      if (typeof elm === "string") {
        const div = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__.ElmUtils.createElm("div");
        div.innerText = elm;
        this.td.appendChild(div);
      } else {
        this.td.appendChild(elm);
      }
    }

    /**
     * Td要素の横幅を設定します。
     * @param {string} width
     */
    setTdWidth(width) {
      this.td.style = `width:${width}`;
    }

    /**
     * Td要素の文字の位置を設定します。
     * @param {string} align
     */
    setTdAlign(align) {
      this.td.classList.add(align);
    }

    /**
     * セルクリック時の処理を設定する。
     * @param {function} func
     */
    setTdClickEvent(func) {
      this.td.classList.add("clickable");
      this.td.addEventListener("click", func);
    }
  }
  customElements.define("form-table", FormTable);
}


/***/ }),
/* 41 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `/*! destyle.css v4.0.1 | MIT License | https://github.com/nicolas-cusan/destyle.css */
/* Reset box-model and set borders */
/* ============================================ */
*,
::before,
::after {
  box-sizing: border-box;
  border-style: solid;
  border-width: 0;
  min-width: 0;
}

/* Document */
/* ============================================ */
/**
 * 1. Correct the line height in all browsers.
 * 2. Prevent adjustments of font size after orientation changes in iOS.
 * 3. Remove gray overlay on links for iOS.
 */
html {
  line-height: 1.15; /* 1 */
  -webkit-text-size-adjust: 100%; /* 2 */
  -webkit-tap-highlight-color: transparent; /* 3*/
}

/* Sections */
/* ============================================ */
/**
 * Remove the margin in all browsers.
 */
body {
  margin: 0;
}

/**
 * Render the \`main\` element consistently in IE.
 */
main {
  display: block;
}

/* Vertical rhythm */
/* ============================================ */
p,
table,
blockquote,
address,
pre,
iframe,
form,
figure,
dl {
  margin: 0;
}

/* Headings */
/* ============================================ */
h1,
h2,
h3,
h4,
h5,
h6 {
  font-size: inherit;
  font-weight: inherit;
  margin: 0;
}

/* Lists (enumeration) */
/* ============================================ */
ul,
ol {
  margin: 0;
  padding: 0;
  list-style: none;
}

/* Lists (definition) */
/* ============================================ */
dt {
  font-weight: bold;
}

dd {
  margin-left: 0;
}

/* Grouping content */
/* ============================================ */
/**
 * 1. Add the correct box sizing in Firefox.
 * 2. Show the overflow in Edge and IE.
 */
hr {
  box-sizing: content-box; /* 1 */
  height: 0; /* 1 */
  overflow: visible; /* 2 */
  border-top-width: 1px;
  margin: 0;
  clear: both;
  color: inherit;
}

/**
 * 1. Correct the inheritance and scaling of font size in all browsers.
 * 2. Correct the odd \`em\` font sizing in all browsers.
 */
pre {
  font-family: monospace, monospace; /* 1 */
  font-size: inherit; /* 2 */
}

address {
  font-style: inherit;
}

/* Text-level semantics */
/* ============================================ */
/**
 * Remove the gray background on active links in IE 10.
 */
a {
  background-color: transparent;
  text-decoration: none;
  color: inherit;
}

/**
 * 1. Remove the bottom border in Chrome 57-
 * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.
 */
abbr[title] {
  text-decoration: underline dotted; /* 2 */
}

/**
 * Add the correct font weight in Chrome, Edge, and Safari.
 */
b,
strong {
  font-weight: bolder;
}

/**
 * 1. Correct the inheritance and scaling of font size in all browsers.
 * 2. Correct the odd \`em\` font sizing in all browsers.
 */
code,
kbd,
samp {
  font-family: monospace, monospace; /* 1 */
  font-size: inherit; /* 2 */
}

/**
 * Add the correct font size in all browsers.
 */
small {
  font-size: 80%;
}

/**
 * Prevent \`sub\` and \`sup\` elements from affecting the line height in
 * all browsers.
 */
sub,
sup {
  font-size: 75%;
  line-height: 0;
  position: relative;
  vertical-align: baseline;
}

sub {
  bottom: -0.25em;
}

sup {
  top: -0.5em;
}

/* Replaced content */
/* ============================================ */
/**
 * Prevent vertical alignment issues.
 */
svg,
img,
embed,
object,
iframe {
  vertical-align: bottom;
}

/* Forms */
/* ============================================ */
/**
 * Reset form fields to make them styleable.
 * 1. Make form elements stylable across systems iOS especially.
 * 2. Inherit text-transform from parent.
 */
button,
input,
optgroup,
select,
textarea {
  -webkit-appearance: none; /* 1 */
  appearance: none;
  vertical-align: middle;
  color: inherit;
  font: inherit;
  background: transparent;
  padding: 0;
  margin: 0;
  border-radius: 0;
  text-align: inherit;
  text-transform: inherit; /* 2 */
}

/**
 * Correct cursors for clickable elements.
 */
button,
[type=button],
[type=reset],
[type=submit] {
  cursor: pointer;
}

button:disabled,
[type=button]:disabled,
[type=reset]:disabled,
[type=submit]:disabled {
  cursor: default;
}

/**
 * Improve outlines for Firefox and unify style with input elements & buttons.
 */
:-moz-focusring {
  outline: auto;
}

select:disabled {
  opacity: inherit;
}

/**
 * Remove padding
 */
option {
  padding: 0;
}

/**
 * Reset to invisible
 */
fieldset {
  margin: 0;
  padding: 0;
  min-width: 0;
}

legend {
  padding: 0;
}

/**
 * Add the correct vertical alignment in Chrome, Firefox, and Opera.
 */
progress {
  vertical-align: baseline;
}

/**
 * Remove the default vertical scrollbar in IE 10+.
 */
textarea {
  overflow: auto;
}

/**
 * Correct the cursor style of increment and decrement buttons in Chrome.
 */
[type=number]::-webkit-inner-spin-button,
[type=number]::-webkit-outer-spin-button {
  height: auto;
}

/**
 * Correct the outline style in Safari.
 */
[type=search] {
  outline-offset: -2px; /* 1 */
}

/**
 * Remove the inner padding in Chrome and Safari on macOS.
 */
[type=search]::-webkit-search-decoration {
  -webkit-appearance: none;
}

/**
 * 1. Correct the inability to style clickable types in iOS and Safari.
 * 2. Fix font inheritance.
 */
::-webkit-file-upload-button {
  -webkit-appearance: button; /* 1 */
  font: inherit; /* 2 */
}

/**
 * Fix appearance for Firefox
 */
[type=number] {
  -moz-appearance: textfield;
  appearance: textfiled;
}

/**
 * Clickable labels
 */
label[for] {
  cursor: pointer;
}

/* Interactive */
/* ============================================ */
/*
 * Add the correct display in Edge, IE 10+, and Firefox.
 */
details {
  display: block;
}

/*
 * Add the correct display in all browsers.
 */
summary {
  display: list-item;
}

/*
 * Remove outline for editable content.
 */
[contenteditable]:focus {
  outline: auto;
}

/* Tables */
/* ============================================ */
/**
1. Correct table border color inheritance in all Chrome and Safari.
*/
table {
  border-color: inherit; /* 1 */
  border-collapse: collapse;
}

caption {
  text-align: left;
}

td,
th {
  vertical-align: top;
  padding: 0;
}

th {
  text-align: left;
  font-weight: bold;
}

* {
  font-family: monospace;
}

.svg {
  position: absolute;
  width: 0;
  height: 0;
  overflow: hidden;
}

.svg-icon {
  display: block;
  width: 1em;
  height: 1em;
  stroke-width: 0;
  stroke: currentColor;
  fill: currentColor;
  pointer-events: none;
}
.svg-icon use {
  pointer-events: none;
}

#root table {
  width: 100%;
}
#root table thead tr th {
  background-color: #211c84;
  color: #fffffb;
  font-weight: bold;
  text-align: center;
  padding: 0.5rem;
}
#root table thead tr th:first-child {
  border-top-left-radius: 0.25rem;
}
#root table thead tr th:last-child {
  border-top-right-radius: 0.25rem;
}
#root table tbody tr:nth-child(even) td {
  background-color: #eeeeee;
}
#root table tbody tr td {
  background-color: #fffffb;
  color: #00000b;
  max-width: 300px;
  line-height: 2rem;
  padding: 0 0.5rem;
}
#root table tbody tr td.clickable {
  cursor: pointer;
}
#root table tbody tr td.clickable:hover {
  text-decoration: underline;
  color: #003092;
}
#root table tbody tr td.center {
  text-align: center;
}
#root table tbody tr td.center .svg-icon {
  vertical-align: middle;
}
#root table tbody tr td.right {
  text-align: right;
}
#root table tbody tr td.right .svg-icon {
  vertical-align: right;
}
#root table tbody tr td.left {
  text-align: left;
}
#root table tbody tr td div {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
#root table tbody tr td .svg-icon {
  display: inline-block;
  font-size: 1rem;
}
#root table tbody tr.complete td {
  color: #838383;
  text-decoration: line-through;
}
#root table tbody tr.alert td {
  color: #f93827;
}
`, ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 42 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FormRadio: () => (/* binding */ FormRadio)
/* harmony export */ });
/* harmony import */ var _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _utils_event_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9);
/* harmony import */ var _constants_event_const__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(13);
/* harmony import */ var _style_form_radio_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(43);






/**
 * FormRadio コンポーネント
 * @class FormRadio
 * @extends {HTMLElement}
 */
function FormRadio() {
  class FormRadio extends HTMLElement {
    /**
     * コンストラクタ
     * @return {void}
     */
    constructor() {
      super();

      // Shadow DOMをオープンモードでアタッチ
      this.attachShadow({ mode: "open" });
      this.shadowRoot.innerHTML = "";

      // CSSを適用
      this.shadowRoot.adoptedStyleSheets = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__.ElmUtils.createStylesheet(_style_form_radio_css__WEBPACK_IMPORTED_MODULE_3__["default"]);

      // 空の要素を作成
      this.root = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__.ElmUtils.createElm("div", "root");
      this.shadowRoot.appendChild(this.root);

      // 変更イベントを伝播
      this.root.addEventListener("change", () => {
        this.dispatchEvent(
          _utils_event_utils__WEBPACK_IMPORTED_MODULE_1__.EventUtils.createEvent(_constants_event_const__WEBPACK_IMPORTED_MODULE_2__.EventConst.CHANGE_FORM_ITEM_EVENT_NAME)
        );
      });
    }

    /**
     * 選択肢を設定する
     * @param {map} param 設定値
     * @return {void}
     */
    set items(param) {
      param.forEach((p, index) => {
        const itemName = `item${p.value}`;

        // ラベルとラジオボタンを作成
        const lbl = document.createElement("label");
        lbl.htmlFor = itemName;
        lbl.textContent = p.text;

        const radio = document.createElement("input");
        radio.type = "radio";
        radio.name = "radio";
        radio.id = itemName;
        radio.value = p.value;

        // 最初と最後の要素にクラスを追加
        if (index === 0) {
          lbl.classList.add("first");
        } else if (index === param.length - 1) {
          lbl.classList.add("last");
        }

        this.root.appendChild(lbl);
        this.root.appendChild(radio);
      });
    }

    /**
     * 選択したラジオボタンのvalueを返す
     * @return {string} value
     */
    get value() {
      const checked = this.shadowRoot.querySelector(
        'input[name="radio"]:checked'
      );
      if (!checked) {
        return null;
      }
      return checked.value;
    }

    /**
     * ラジオボタンを選択する
     * @param {string} v
     */
    set value(v) {
      if (v) {
        if (v === "") {
          return;
        }
        const rb = this.shadowRoot.getElementById(`item${v}`);
        rb.checked = true;
      }
    }
  }
  customElements.define("form-radio", FormRadio);
}


/***/ }),
/* 43 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `/*! destyle.css v4.0.1 | MIT License | https://github.com/nicolas-cusan/destyle.css */
/* Reset box-model and set borders */
/* ============================================ */
*,
::before,
::after {
  box-sizing: border-box;
  border-style: solid;
  border-width: 0;
  min-width: 0;
}

/* Document */
/* ============================================ */
/**
 * 1. Correct the line height in all browsers.
 * 2. Prevent adjustments of font size after orientation changes in iOS.
 * 3. Remove gray overlay on links for iOS.
 */
html {
  line-height: 1.15; /* 1 */
  -webkit-text-size-adjust: 100%; /* 2 */
  -webkit-tap-highlight-color: transparent; /* 3*/
}

/* Sections */
/* ============================================ */
/**
 * Remove the margin in all browsers.
 */
body {
  margin: 0;
}

/**
 * Render the \`main\` element consistently in IE.
 */
main {
  display: block;
}

/* Vertical rhythm */
/* ============================================ */
p,
table,
blockquote,
address,
pre,
iframe,
form,
figure,
dl {
  margin: 0;
}

/* Headings */
/* ============================================ */
h1,
h2,
h3,
h4,
h5,
h6 {
  font-size: inherit;
  font-weight: inherit;
  margin: 0;
}

/* Lists (enumeration) */
/* ============================================ */
ul,
ol {
  margin: 0;
  padding: 0;
  list-style: none;
}

/* Lists (definition) */
/* ============================================ */
dt {
  font-weight: bold;
}

dd {
  margin-left: 0;
}

/* Grouping content */
/* ============================================ */
/**
 * 1. Add the correct box sizing in Firefox.
 * 2. Show the overflow in Edge and IE.
 */
hr {
  box-sizing: content-box; /* 1 */
  height: 0; /* 1 */
  overflow: visible; /* 2 */
  border-top-width: 1px;
  margin: 0;
  clear: both;
  color: inherit;
}

/**
 * 1. Correct the inheritance and scaling of font size in all browsers.
 * 2. Correct the odd \`em\` font sizing in all browsers.
 */
pre {
  font-family: monospace, monospace; /* 1 */
  font-size: inherit; /* 2 */
}

address {
  font-style: inherit;
}

/* Text-level semantics */
/* ============================================ */
/**
 * Remove the gray background on active links in IE 10.
 */
a {
  background-color: transparent;
  text-decoration: none;
  color: inherit;
}

/**
 * 1. Remove the bottom border in Chrome 57-
 * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.
 */
abbr[title] {
  text-decoration: underline dotted; /* 2 */
}

/**
 * Add the correct font weight in Chrome, Edge, and Safari.
 */
b,
strong {
  font-weight: bolder;
}

/**
 * 1. Correct the inheritance and scaling of font size in all browsers.
 * 2. Correct the odd \`em\` font sizing in all browsers.
 */
code,
kbd,
samp {
  font-family: monospace, monospace; /* 1 */
  font-size: inherit; /* 2 */
}

/**
 * Add the correct font size in all browsers.
 */
small {
  font-size: 80%;
}

/**
 * Prevent \`sub\` and \`sup\` elements from affecting the line height in
 * all browsers.
 */
sub,
sup {
  font-size: 75%;
  line-height: 0;
  position: relative;
  vertical-align: baseline;
}

sub {
  bottom: -0.25em;
}

sup {
  top: -0.5em;
}

/* Replaced content */
/* ============================================ */
/**
 * Prevent vertical alignment issues.
 */
svg,
img,
embed,
object,
iframe {
  vertical-align: bottom;
}

/* Forms */
/* ============================================ */
/**
 * Reset form fields to make them styleable.
 * 1. Make form elements stylable across systems iOS especially.
 * 2. Inherit text-transform from parent.
 */
button,
input,
optgroup,
select,
textarea {
  -webkit-appearance: none; /* 1 */
  appearance: none;
  vertical-align: middle;
  color: inherit;
  font: inherit;
  background: transparent;
  padding: 0;
  margin: 0;
  border-radius: 0;
  text-align: inherit;
  text-transform: inherit; /* 2 */
}

/**
 * Correct cursors for clickable elements.
 */
button,
[type=button],
[type=reset],
[type=submit] {
  cursor: pointer;
}

button:disabled,
[type=button]:disabled,
[type=reset]:disabled,
[type=submit]:disabled {
  cursor: default;
}

/**
 * Improve outlines for Firefox and unify style with input elements & buttons.
 */
:-moz-focusring {
  outline: auto;
}

select:disabled {
  opacity: inherit;
}

/**
 * Remove padding
 */
option {
  padding: 0;
}

/**
 * Reset to invisible
 */
fieldset {
  margin: 0;
  padding: 0;
  min-width: 0;
}

legend {
  padding: 0;
}

/**
 * Add the correct vertical alignment in Chrome, Firefox, and Opera.
 */
progress {
  vertical-align: baseline;
}

/**
 * Remove the default vertical scrollbar in IE 10+.
 */
textarea {
  overflow: auto;
}

/**
 * Correct the cursor style of increment and decrement buttons in Chrome.
 */
[type=number]::-webkit-inner-spin-button,
[type=number]::-webkit-outer-spin-button {
  height: auto;
}

/**
 * Correct the outline style in Safari.
 */
[type=search] {
  outline-offset: -2px; /* 1 */
}

/**
 * Remove the inner padding in Chrome and Safari on macOS.
 */
[type=search]::-webkit-search-decoration {
  -webkit-appearance: none;
}

/**
 * 1. Correct the inability to style clickable types in iOS and Safari.
 * 2. Fix font inheritance.
 */
::-webkit-file-upload-button {
  -webkit-appearance: button; /* 1 */
  font: inherit; /* 2 */
}

/**
 * Fix appearance for Firefox
 */
[type=number] {
  -moz-appearance: textfield;
  appearance: textfiled;
}

/**
 * Clickable labels
 */
label[for] {
  cursor: pointer;
}

/* Interactive */
/* ============================================ */
/*
 * Add the correct display in Edge, IE 10+, and Firefox.
 */
details {
  display: block;
}

/*
 * Add the correct display in all browsers.
 */
summary {
  display: list-item;
}

/*
 * Remove outline for editable content.
 */
[contenteditable]:focus {
  outline: auto;
}

/* Tables */
/* ============================================ */
/**
1. Correct table border color inheritance in all Chrome and Safari.
*/
table {
  border-color: inherit; /* 1 */
  border-collapse: collapse;
}

caption {
  text-align: left;
}

td,
th {
  vertical-align: top;
  padding: 0;
}

th {
  text-align: left;
  font-weight: bold;
}

* {
  font-family: monospace;
}

input[type=radio] {
  display: none;
}

#root {
  display: flex;
  justify-content: space-between;
}
#root label {
  flex: 1;
  line-height: 1.9rem;
  text-align: center;
  background-color: #fffff8;
  border: 1px solid #6f6f6f;
  border-right: none;
}
#root label.first {
  border-top-left-radius: 0.25rem;
  border-bottom-left-radius: 0.25rem;
}
#root label.last {
  border-right: 1px solid #6f6f6f;
  border-top-right-radius: 0.25rem;
  border-bottom-right-radius: 0.25rem;
}
#root label:has(+ input:checked) {
  background-color: #0a5eb0;
  color: #fffff8;
}
#root label:hover {
  background-color: #0a5eb0;
  color: #fffff8;
}
`, ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_task_memo_task_memo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);


window.addEventListener("load", () => {
  (0,_components_task_memo_task_memo__WEBPACK_IMPORTED_MODULE_0__.TaskMemo)();
});

})();

/******/ })()
;