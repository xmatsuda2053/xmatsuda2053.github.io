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
/* harmony import */ var _toppage_top_page__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(8);
/* harmony import */ var _svg_btn_svg_btn__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(11);
/* harmony import */ var _context_menu_context_menu__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(14);
/* harmony import */ var _constants_event_const__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(15);
/* harmony import */ var _tree_view_tree_view__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(17);
/* harmony import */ var _tree_view_task_title__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(20);
/* harmony import */ var _tree_view_group_title__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(23);
/* harmony import */ var _contents_group_contents_group__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(25);
/* harmony import */ var _contents_task_contents_task__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(28);
/* harmony import */ var _contents_history_contents_hisotry__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(30);
/* harmony import */ var _contents_history_contetns_history_item__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(32);
/* harmony import */ var _form_form_fieldset__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(34);
/* harmony import */ var _form_form_input__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(36);
/* harmony import */ var _form_form_date__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(38);
/* harmony import */ var _form_form_textarea__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(40);
/* harmony import */ var _form_form_table__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(42);
/* harmony import */ var _form_form_radio__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(44);
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

      (0,_toppage_top_page__WEBPACK_IMPORTED_MODULE_4__.TopPage)();
      (0,_svg_btn_svg_btn__WEBPACK_IMPORTED_MODULE_5__.SvgBtn)();
      (0,_context_menu_context_menu__WEBPACK_IMPORTED_MODULE_6__.ContextMenu)();

      (0,_tree_view_tree_view__WEBPACK_IMPORTED_MODULE_8__.TreeView)();
      (0,_tree_view_task_title__WEBPACK_IMPORTED_MODULE_9__.TaskTitle)();
      (0,_tree_view_group_title__WEBPACK_IMPORTED_MODULE_10__.GroupTitle)();

      (0,_form_form_fieldset__WEBPACK_IMPORTED_MODULE_15__.FormFieldset)();
      (0,_form_form_input__WEBPACK_IMPORTED_MODULE_16__.FormInput)();
      (0,_form_form_date__WEBPACK_IMPORTED_MODULE_17__.FormDate)();
      (0,_form_form_textarea__WEBPACK_IMPORTED_MODULE_18__.FormTextarea)();
      (0,_form_form_table__WEBPACK_IMPORTED_MODULE_19__.FormTable)();
      (0,_form_form_radio__WEBPACK_IMPORTED_MODULE_20__.FormRadio)();

      (0,_contents_group_contents_group__WEBPACK_IMPORTED_MODULE_11__.ContentsGroup)();
      (0,_contents_task_contents_task__WEBPACK_IMPORTED_MODULE_12__.ContentsTask)();
      (0,_contents_history_contents_hisotry__WEBPACK_IMPORTED_MODULE_13__.ContentsHistory)();
      (0,_contents_history_contetns_history_item__WEBPACK_IMPORTED_MODULE_14__.ContentsHistoryItem)();

      this.fileManager = new _classes_file_manager__WEBPACK_IMPORTED_MODULE_2__.FileManager();

      // Shadow DOMをオープンモードでアタッチ
      this.attachShadow({ mode: "open" });

      // CSSを適用
      this.shadowRoot.adoptedStyleSheets = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__.ElmUtils.createStylesheet(_style_task_memo_css__WEBPACK_IMPORTED_MODULE_3__["default"]);

      // オブジェクトを配置
      this.container = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__.ElmUtils.createElm("div", "container");
      this.treeView = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__.ElmUtils.createElm("div", "treeview", ["scroll"]);
      this.contents = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__.ElmUtils.createElm("div", "contents");

      this.contents.appendChild(_utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__.ElmUtils.createElm("top-page"));
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
            this.contents.innerHTML = "";
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
        _constants_event_const__WEBPACK_IMPORTED_MODULE_7__.EventConst.ADD_NEW_TASK_ITEM_EVENT_NAME,
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
        _constants_event_const__WEBPACK_IMPORTED_MODULE_7__.EventConst.ADD_NEW_GROUP_ITEM_EVENT_NAME,
        async (e) => {
          const item = e.detail.item;
          this.#addContentsGroup(item.id, item.name);
          await this.#saveTreeView();
        }
      );
    }

    /**
     * TreeViewアイテムの削除イベントを登録
     */
    #attachDeleteTreeViewItemEventListener() {
      this.treeViewRoot.addEventListener(
        _constants_event_const__WEBPACK_IMPORTED_MODULE_7__.EventConst.DELETE_TREEVIEW_ITEM_EVENT_NAME,
        async (e) => {
          await this.#saveTreeView();
          this.contents.innerHTML = "";
        }
      );
    }

    /**
     * TreeViewの変更イベントを登録
     */
    #attachChangeTreeViewEventListener() {
      this.treeViewRoot.addEventListener(
        _constants_event_const__WEBPACK_IMPORTED_MODULE_7__.EventConst.CHANGE_TREEVIEW_EVENT_NAME,
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
        _constants_event_const__WEBPACK_IMPORTED_MODULE_7__.EventConst.CLICK_TASK_EVENT_NAME,
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
        _constants_event_const__WEBPACK_IMPORTED_MODULE_7__.EventConst.CLICK_GROUP_EVENT_NAME,
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
        _constants_event_const__WEBPACK_IMPORTED_MODULE_7__.EventConst.DBL_CLICK_GROUP_EVENT_NAME,
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
          _constants_event_const__WEBPACK_IMPORTED_MODULE_7__.EventConst.CHANGE_CONTENTS_GROUP_EVENT_NAME,
          async (e) => {
            const data = this.contentsGroup.getData();
            await this.#saveContentsGroup(id, data);
            group.name = data.title;
            group.refreshView();
          }
        );

        // グループ内のグループのクリックを検知
        this.contentsGroup.addEventListener(
          _constants_event_const__WEBPACK_IMPORTED_MODULE_7__.EventConst.CLICK_CONTENTS_GROUP_GROUP_EVENT_NAME,
          (e) => {
            const item = e.detail.item;
            this.#addContentsGroup(item.id, item.name);
          }
        );

        // グループ内のタスクのクリックを検知
        this.contentsGroup.addEventListener(
          _constants_event_const__WEBPACK_IMPORTED_MODULE_7__.EventConst.CLICK_CONTENTS_GROUP_TASK_EVENT_NAME,
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
          _constants_event_const__WEBPACK_IMPORTED_MODULE_7__.EventConst.CHANGE_CONTENTS_TASK_EVENT_NAME,
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
   * コピーSVGのパスデータを含むオブジェクトの配列を生成する。
   * @returns {Object[]} SVGのパスデータを含むオブジェクトの配列。
   * @returns {string} return.path - SVGのパス情報。
   */
  static CopyPaths = {
    name: "icon-copy",
    paths: [
      { path: "M0 0h24v24H0z" },
      {
        path: "M7 7m0 2.667a2.667 2.667 0 0 1 2.667 -2.667h8.666a2.667 2.667 0 0 1 2.667 2.667v8.666a2.667 2.667 0 0 1 -2.667 2.667h-8.666a2.667 2.667 0 0 1 -2.667 -2.667z",
      },
      {
        path: "M4.012 16.737a2.005 2.005 0 0 1 -1.012 -1.737v-10c0 -1.1 .9 -2 2 -2h10c.75 0 1.158 .385 1.5 1",
      },
    ],
  };

  /**
   * リンクSVGのパスデータを含むオブジェクトの配列を生成する。
   * @returns {Object[]} SVGのパスデータを含むオブジェクトの配列。
   * @returns {string} return.path - SVGのパス情報。
   */
  static LinkPaths = {
    name: "icon-copy",
    paths: [
      { path: "M0 0h24v24H0z" },
      {
        path: "M9 15l6 -6",
      },
      {
        path: "M11 6l.463 -.536a5 5 0 0 1 7.071 7.072l-.534 .464",
      },
      {
        path: "M13 18l-.397 .534a5.068 5.068 0 0 1 -7.127 0a4.972 4.972 0 0 1 0 -7.071l.524 -.463",
      },
    ],
  };

  /**
   * 編集SVGのパスデータを含むオブジェクトの配列を生成する。
   * @returns {Object[]} SVGのパスデータを含むオブジェクトの配列。
   * @returns {string} return.path - SVGのパス情報。
   */
  static EditPaths = {
    name: "icon-edit",
    paths: [
      { path: "M0 0h24v24H0z" },
      {
        path: "M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1",
      },
      {
        path: "M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z",
      },
      {
        path: "M16 5l3 3",
      },
    ],
  };

  /**
   * TagSVGのパスデータを含むオブジェクトの配列を生成する。
   * @returns {Object[]} SVGのパスデータを含むオブジェクトの配列。
   * @returns {string} return.path - SVGのパス情報。
   */
  static TagPaths = {
    name: "icon-tag",
    paths: [
      { path: "M0 0h24v24H0z" },
      {
        path: "M7.5 7.5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0",
      },
      {
        path: "M3 6v5.172a2 2 0 0 0 .586 1.414l7.71 7.71a2.41 2.41 0 0 0 3.408 0l5.592 -5.592a2.41 2.41 0 0 0 0 -3.408l-7.71 -7.71a2 2 0 0 0 -1.414 -.586h-5.172a3 3 0 0 0 -3 3z",
      },
    ],
  };

  /**
   * ブックSVGのパスデータを含むオブジェクトの配列を生成する。
   * @returns {Object[]} SVGのパスデータを含むオブジェクトの配列。
   * @returns {string} return.path - SVGのパス情報。
   */
  static BookPaths = {
    name: "icon-book",
    paths: [
      { path: "M0 0h24v24H0z" },
      {
        path: "M3 19a9 9 0 0 1 9 0a9 9 0 0 1 9 0",
      },
      {
        path: "M3 6a9 9 0 0 1 9 0a9 9 0 0 1 9 0",
      },
      {
        path: "M3 6l0 13",
      },
      {
        path: "M12 6l0 13",
      },
      {
        path: "M21 6l0 13",
      },
    ],
  };

  /**
   * ユーザーSVGのパスデータを含むオブジェクトの配列を生成する。
   * @returns {Object[]} SVGのパスデータを含むオブジェクトの配列。
   * @returns {string} return.path - SVGのパス情報。
   */
  static UserPaths = {
    name: "icon-user",
    paths: [
      { path: "M0 0h24v24H0z" },
      {
        path: "M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0",
      },
      {
        path: "M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2",
      },
    ],
  };

  /**
   * 期限日SVGのパスデータを含むオブジェクトの配列を生成する。
   * @returns {Object[]} SVGのパスデータを含むオブジェクトの配列。
   * @returns {string} return.path - SVGのパス情報。
   */
  static DueDatePaths = {
    name: "icon-deu-date",
    paths: [
      { path: "M0 0h24v24H0z" },
      {
        path: "M4 5m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z",
      },
      {
        path: "M16 3v4",
      },
      {
        path: "M8 3v4",
      },
      {
        path: "M4 11h16",
      },
      {
        path: "M12 16m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0",
      },
    ],
  };

  /**
   * カレンダー無効SVGのパスデータを含むオブジェクトの配列を生成する。
   * @returns {Object[]} SVGのパスデータを含むオブジェクトの配列。
   * @returns {string} return.path - SVGのパス情報。
   */
  static CalendarOff = {
    name: "icon-calendar-off",
    paths: [
      { path: "M0 0h24v24H0z" },
      {
        path: "M9 5h9a2 2 0 0 1 2 2v9m-.184 3.839a2 2 0 0 1 -1.816 1.161h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 1.158 -1.815",
      },
      {
        path: "M16 3v4",
      },
      {
        path: "M8 3v1",
      },
      {
        path: "M4 11h7m4 0h5",
      },
      {
        path: "M3 3l18 18",
      },
    ],
  };

  /**
   * アンテナSVGのパスデータを含むオブジェクトの配列を生成する。
   * @returns {Object[]} SVGのパスデータを含むオブジェクトの配列。
   * @returns {string} return.path - SVGのパス情報。
   */
  static AntennaPaths = {
    name: "icon-antenna",
    paths: [
      { path: "M0 0h24v24H0z" },
      {
        path: "M6 18l0 -3",
      },
      {
        path: "M10 18l0 -6",
      },
      {
        path: "M14 18l0 -9",
      },
      {
        path: "M18 18l0 -12",
      },
    ],
  };

  /**
   * パーセンテージSVGのパスデータを含むオブジェクトの配列を生成する。
   * @returns {Object[]} SVGのパスデータを含むオブジェクトの配列。
   * @returns {string} return.path - SVGのパス情報。
   */
  static PercentagePaths = {
    name: "icon-percentage",
    paths: [
      { path: "M0 0h24v24H0z" },
      {
        path: "M12 3a9 9 0 0 1 7.794 13.5l-7.79 -4.497z",
        isFill: true,
      },
      {
        path: "M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0",
      },
    ],
  };

  /**
   * ライティングSVGのパスデータを含むオブジェクトの配列を生成する。
   * @returns {Object[]} SVGのパスデータを含むオブジェクトの配列。
   * @returns {string} return.path - SVGのパス情報。
   */
  static WitingPaths = {
    name: "icon-writing",
    paths: [
      { path: "M0 0h24v24H0z" },
      {
        path: "M20 17v-12c0 -1.121 -.879 -2 -2 -2s-2 .879 -2 2v12l2 2l2 -2z",
      },
      {
        path: "M16 7h4",
      },
      {
        path: "M18 19h-13a2 2 0 1 1 0 -4h4a2 2 0 1 0 0 -4h-3",
      },
    ],
  };

  /**
   * WebhookSVGのパスデータを含むオブジェクトの配列を生成する。
   * @returns {Object[]} SVGのパスデータを含むオブジェクトの配列。
   * @returns {string} return.path - SVGのパス情報。
   */
  static WebhookPaths = {
    name: "icon-webhook",
    paths: [
      { path: "M0 0h24v24H0z" },
      {
        path: "M4.876 13.61a4 4 0 1 0 6.124 3.39h6",
      },
      {
        path: "M15.066 20.502a4 4 0 1 0 1.934 -7.502c-.706 0 -1.424 .179 -2 .5l-3 -5.5",
      },
      {
        path: "M16 8a4 4 0 1 0 -8 0c0 1.506 .77 2.818 2 3.5l-3 5.5",
      },
    ],
  };

  /**
   * テーブルSVGのパスデータを含むオブジェクトの配列を生成する。
   * @returns {Object[]} SVGのパスデータを含むオブジェクトの配列。
   * @returns {string} return.path - SVGのパス情報。
   */
  static TablePaths = {
    name: "icon-table",
    paths: [
      { path: "M0 0h24v24H0z" },
      {
        path: "M3 5a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-14z",
      },
      {
        path: "M3 10h18",
      },
      {
        path: "M10 3v18",
      },
    ],
  };

  /**
   * 履歴SVGのパスデータを含むオブジェクトの配列を生成する。
   * @returns {Object[]} SVGのパスデータを含むオブジェクトの配列。
   * @returns {string} return.path - SVGのパス情報。
   */
  static HistoryPaths = {
    name: "icon-history",
    paths: [
      { path: "M0 0h24v24H0z" },
      {
        path: "M12 8l0 4l2 2",
      },
      {
        path: "M3.05 11a9 9 0 1 1 .5 4m-.5 5v-5h5",
      },
    ],
  };

  /**
   * 壁紙SVGのパスデータを含むオブジェクトの配列を生成する。
   * @returns {Object[]} SVGのパスデータを含むオブジェクトの配列。
   * @returns {string} return.path - SVGのパス情報。
   */
  static WallpaperPaths = {
    name: "icon-wallpaper",
    paths: [
      { path: "M0 0h24v24H0z" },
      {
        path: "M8 6h10a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-12",
      },
      {
        path: "M6 18m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0",
      },
      {
        path: "M8 18v-12a2 2 0 1 0 -4 0v12",
      },
    ],
  };

  /**
   * 三重円SVGのパスデータを含むオブジェクトの配列を生成する。
   * @returns {Object[]} SVGのパスデータを含むオブジェクトの配列。
   * @returns {string} return.path - SVGのパス情報。
   */
  static CirclesPaths = {
    name: "icon-circles",
    paths: [
      { path: "M0 0h24v24H0z" },
      {
        path: "M12 7m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0",
      },
      {
        path: "M6.5 17m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0",
      },
      {
        path: "M17.5 17m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0",
      },
    ],
  };

  /**
   * 電話コールSVGのパスデータを含むオブジェクトの配列を生成する。
   * @returns {Object[]} SVGのパスデータを含むオブジェクトの配列。
   * @returns {string} return.path - SVGのパス情報。
   */
  static PhoneCallPaths = {
    name: "icon-phone-call",
    paths: [
      { path: "M0 0h24v24H0z" },
      {
        path: "M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2",
      },
      {
        path: "M15 7a2 2 0 0 1 2 2",
      },
      {
        path: "M15 3a6 6 0 0 1 6 6",
      },
    ],
  };

  /**
   * 線SVGのパスデータを含むオブジェクトの配列を生成する。
   * @returns {Object[]} SVGのパスデータを含むオブジェクトの配列。
   * @returns {string} return.path - SVGのパス情報。
   */
  static LinePaths = {
    name: "icon-line",
    paths: [
      { path: "M0 0h24v24H0z" },
      {
        path: "M6 18m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0",
      },
      {
        path: "M18 6m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0",
      },
      {
        path: "M7.5 16.5l9 -9",
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
/* harmony export */   TopPage: () => (/* binding */ TopPage)
/* harmony export */ });
/* harmony import */ var _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _utils_svg_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9);
/* harmony import */ var _style_top_page_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(10);





/**
 * TopPage コンポーネント
 * @class TopPage
 * @extends {HTMLElement}
 */
function TopPage() {
  class TopPage extends HTMLElement {
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
      this.shadowRoot.adoptedStyleSheets = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__.ElmUtils.createStylesheet(_style_top_page_css__WEBPACK_IMPORTED_MODULE_2__["default"]);

      // 要素作成
      this.root = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__.ElmUtils.createElm("div", "root");
      this.root.appendChild(this.#createMainTitle());

      this.shadowRoot.appendChild(this.root);
    }

    /**
     * タイトルロゴ
     * @returns {string} title
     */
    #createMainTitle() {
      const logo = () => {
        return `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAoIAAAFmCAYAAAD5zfscAAAAAXNSR0IArs4c6QAAIABJREFUeF7snQeYZUWZ/r/uYTJhQLIoIqKsqOuumPmjiAkEwYQ554QY1yxmzJjFvMYV0xrWLJgDooIKiihgImdmhmFC9//+ZqvYoqxzTtW559y+ffut5+EB+tap8FZ666svTJmSEBACQkAICAEhIASEwIJEYGpB9lqdFgJCQAgIASEgBISAEDARQU0CISAEhIAQEAJCQAgsUAREBBfowKvbQkAICAEhIASEgBAQEdQcEAJCQAgIASEgBITAAkVARHCBDry6LQSEgBAQAkJACAgBEUHNASEgBISAEBACQkAILFAERAQX6MCr20JACAgBISAEhIAQEBHUHBACQkAICAEhIASEwAJFQERwgQ68ui0EhIAQEAJCQAgIARFBzQEhIASEgBAQAkJACCxQBEQEF+jAq9tCQAgIASEgBISAEBAR1BwQAkJACAgBISAEhMACRUBEcIEOvLotBISAEBACQkAICAERQc0BISAEhIAQEAJCQAgsUAREBBfowKvbQkAICAEhIASEgBAQEdQcEAJCQAgIASEgBITAAkVARHCBDry6LQSEgBAQAkJACAgBEUHNASEgBISAEBACQkAILFAERAQX6MCr20JACAgBISAEhIAQEBHUHBACQkAICAEhIASEwAJFoJII/uJLf7jZJRddetG9n3CnS/vCZnZ2dvr0n//9YVdefPXdZ2empruoZ3qR2d632eEVq3ZedXYX5VWVccZv197vZrdc8cU+61DZQkAICAEhIASEgBDoE4FKIviFY0447KJzLn3TDW6+450PPnL/i/pqxJlfO3PpWeet/cE1a9ffdnbWhpJQTk1Pbdx591VPu92hN/lAX+09+uijp+995+ccuvaajZ++2yHbreirHpUrBISAEBACQkAICIG+Eaglgmed/Lf/Xrlq+Qkrt1vxjEe+4T5/mJqamu2jQaedNrvkbz855fgN12w6eGZmdnGbOqYXTV+0crtlr7nbQ/d5R5vvc745+biTF1+2yx73vfqqTW9avnKLPe5x+HZDEdecOpVHCAgBISAEhIAQEAJ9IdBIBJGyLd9yybe32XH7Zzz8mLuf1VdDvvOps3basOaKt21Yt+lBs7OzW5TUM71o+rItt13+qh132f6D+xyw4+qS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q4pk8G2tteftkEERwWvRquQQAkJACAgBISAEhEARgVVkUESwCLgeEwJCQAgIASEgBITANSGwggyKCF6TRiWLEBACQkAICAEhIAQmEDiXDIoIToCtR4WAEBACQkAICAEhcG0IQAZ/o7X2fgXBYsygiGABND0iBISAEBACQkAICIFrRuDxrbXfOkAGRQSvWauSTQgIASEgBISAEBACRQSOkMHXtNbu26hfeQSLwOsxISAEhIAQEAJCQAhcAwJPOOUOfGVr7TkFYR5urUEeHyciWEBLjwgBISAEhIAQEAJC4AYQmPEM7jVHHsEbULZEFAJCQAgIASEgBIRARGAFGRQRlF0JASEgBISAEBACQuBGEYAMsk38QQflFxE8CJxeEwJCQAgIASEgBITANSDAQRDuJj5CBkUEr0GDkkEICAEhIASEgBAQAmcgcJQMigieAbpeFQJCQAgIASEgBITACgSe1nMEPnVFZRN1iAhOgKVHhYAQEAJCQAgIASFwKQTuBRkUEbyUNlWvEBACQkAICAEhIAQmEbhrMigiOKkgPS4EhIAQEAJCQAgIgUsiABl8oLX2lEt+pNctIngHIOsTQkAICAEhIASEgBCYQeCZPWbw0mRQRHBGK3pWCAgBISAEhIAQEAJ3hMBdkEERwTtSpj4jBISAEBACQkAICIFZBC5NBu//f4uXco+yAE1DAAAAAElFTkSuQmCC`;
      };
      const img = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__.ElmUtils.createElm("img");
      img.src = logo();
      return img;
    }
  }
  customElements.define("top-page", TopPage);
}


/***/ }),
/* 9 */
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
/* 10 */
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

#root {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
`, ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 11 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SvgBtn: () => (/* binding */ SvgBtn)
/* harmony export */ });
/* harmony import */ var _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _utils_event_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12);
/* harmony import */ var _utils_svg_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9);
/* harmony import */ var _style_svg_btn_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(13);






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
      this.button = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__.ElmUtils.createElm("button");
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
      this.button.classList.toggle("toggle", flag);
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

    /**
     * ツールチップメッセージの設定を行うセッター
     * @param {string} text - ヒントメッセージ
     */
    set tooltip(text) {
      this.button.title = text;
    }
  }
  customElements.define("svg-btn", SvgBtn);
}


/***/ }),
/* 12 */
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
/* 13 */
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

button {
  position: relative;
}
button.circle {
  z-index: 99999;
  color: #fffffb;
  background-color: #0a3981;
  border: 1px solid #0a3981;
  box-shadow: 0px 3px 3px 0px rgba(0, 0, 0, 0.1);
  padding: 0.5rem;
  border-radius: 50%;
  transition: 0.2s;
}
button.circle:hover {
  color: #0a3981;
  background-color: #fffff8;
  border-color: #0a3981;
}
button.circle .svg-icon {
  font-size: 1.8rem;
}
button.hover {
  color: #8f8f8f;
  border-radius: 0.25rem;
  transition: 0.2s;
}
button.hover.red:hover {
  color: #d84040;
  background-color: #fdfbee;
}
button.hover.green:hover {
  color: #0e7405;
  background-color: #fdfbee;
}
button.hover.blue:hover {
  color: #003092;
  background-color: #fdfbee;
}
button.hover.white:hover {
  color: #fffffb;
  background-color: #fdfbee;
}
button.hover.black:hover {
  color: #000000;
  background-color: #fdfbee;
}
button.toggle {
  color: #8f8f8f;
}
button.toggle.toggle-on.red {
  color: #d84040;
}
button.toggle.toggle-on.green {
  color: #0e7405;
}
button.toggle.toggle-on.blue {
  color: #003092;
}
button.toggle.toggle-on.white {
  color: #fffffb;
}
button.toggle.toggle-on.black {
  color: #000000;
}
`, ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 14 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ContextMenu: () => (/* binding */ ContextMenu)
/* harmony export */ });
/* harmony import */ var _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _utils_svg_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9);
/* harmony import */ var _utils_event_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(12);
/* harmony import */ var _constants_event_const__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(15);
/* harmony import */ var _style_context_menu_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(16);







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
/* 15 */
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
/* 17 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TreeView: () => (/* binding */ TreeView)
/* harmony export */ });
/* harmony import */ var _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _utils_id_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(18);
/* harmony import */ var _utils_event_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(12);
/* harmony import */ var _constants_event_const__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(15);
/* harmony import */ var _constants_svg_const__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(3);
/* harmony import */ var _style_tree_view_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(19);
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
      this.shadowRoot.adoptedStyleSheets = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__.ElmUtils.createStylesheet(_style_tree_view_css__WEBPACK_IMPORTED_MODULE_5__["default"]);

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
      headerMenu.appendChild(this.#createLine());
      headerMenu.appendChild(this.#createFilterButton());
      this.header.appendChild(headerMenu);
    }

    /**
     * セパレータを作成する。
     * @returns ボタン
     */
    #createLine() {
      const line = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__.ElmUtils.createElm("svg-btn", "line");
      line.iconPaths = _constants_svg_const__WEBPACK_IMPORTED_MODULE_4__.SvgConst.linePaths;
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
      const btn = this.#createButton("all-open", _constants_svg_const__WEBPACK_IMPORTED_MODULE_4__.SvgConst.treeOpenPaths);
      btn.hover = true;
      btn.tooltip = "すべて開く";
      btn.addEventListener("click", () => {
        this.root.querySelectorAll("details").forEach((d) => (d.open = true));
      });

      return btn;
    }

    /**
     * グループをすべて閉じるボタンを作成する。
     * @returns ボタン
     */
    #createAllCloseButton() {
      const btn = this.#createButton("all-close", _constants_svg_const__WEBPACK_IMPORTED_MODULE_4__.SvgConst.treeClosePaths);
      btn.hover = true;
      btn.tooltip = "すべて閉じる";
      btn.addEventListener("click", () => {
        this.root.querySelectorAll("details").forEach((d) => (d.open = false));
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
        _constants_svg_const__WEBPACK_IMPORTED_MODULE_4__.SvgConst.squarePaths
      );
      this.btnFilterNotStarted.tooltip = "未着手";
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
        _constants_svg_const__WEBPACK_IMPORTED_MODULE_4__.SvgConst.squareDotPaths
      );
      this.btnFilterStarted.tooltip = "対応中";
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
        _constants_svg_const__WEBPACK_IMPORTED_MODULE_4__.SvgConst.squareCheckPaths
      );
      this.btnFilterComplet.tooltip = "完了";
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
        _constants_svg_const__WEBPACK_IMPORTED_MODULE_4__.SvgConst.squareAlertPaths
      );
      this.btnFilterOverDeadline.tooltip = "遅延";
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
      const btn = this.#createToggleButton("item-filter", _constants_svg_const__WEBPACK_IMPORTED_MODULE_4__.SvgConst.FilterPaths);
      btn.color = "green";
      btn.toggleOn(false);
      btn.tooltip = "タスクフィルタ";

      this.searchText = "";
      this.searchResult = [];

      // 検索
      btn.addEventListener("click", async () => {
        this.searchText = "";
        this.searchResult = [];

        if (btn.toggle) {
          this.searchText = prompt("タスクのフィルタ条件を入力");
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
     * TreeViewに対するフィルタを設定する。
     */
    #filterTreeViewItem() {
      // タスクフィルタ
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

        // 表示／非表示設定
        task.closest(".tree-item").classList.toggle("disabled", isDisabled);
      });

      // グループ絞り込み（タスクが０のグループは非表示）
      /**
       * グループに対して再帰的にフィルタをかける
       * @param {HTMLElement} parent
       */
      const filterGroup = (parent) => {
        // 親要素内のグループ要素を取得
        const details = Array.from(parent.children).filter(
          (c) => c.tagName.toLowerCase() === "details"
        );

        // グループの数だけ繰り返す。
        details.forEach((d) => {
          // いったん、非表示クラスを削除しグループを開く
          d.classList.remove("disabled");
          d.open = true;

          // グループにネストされている要素を取得
          const items = d.querySelector(".group-items");

          // ネスト要素のうち、非表示になっていないタスクの数をカウント
          const cnt = Array.from(items.querySelectorAll(".task")).filter(
            (t) => !t.classList.contains("disabled")
          ).length;

          if (cnt === 0) {
            // 有効タスクなしの場合、対象グループを閉じて非表示にする
            d.open = false;
            d.classList.add("disabled");
          } else {
            // 有効タスクがある場合、ネスト要素に対してさらにフィルタをかける
            filterGroup(items);
          }
        });
      };

      // ルート要素を起点にグループフィルタを実行
      filterGroup(this.root);
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
      this.#insertSeparatorItemButton();
      this.menu.addBorder();
      this.#insertAllOpenButton();
      this.#insertAllCloseButton();
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
        const isSeparator = e.target.dataset.type === "separator";

        // ターゲットがタスクの場合、追加・セパレータ・すべて開く・すべて閉じるボタンを無効
        if (isTask) {
          this.menu.setDisabled("add-new-task");
          this.menu.setDisabled("add-new-group");
          this.menu.setDisabled("separator-item");
          this.menu.setDisabled("all-open");
          this.menu.setDisabled("all-close");
        }

        // ターゲットがアイテム以外の場合、すべて開く・すべて閉じる・削除ボタンを無効
        if (!isTask && !isGroup && !isSeparator) {
          this.menu.setDisabled("all-open");
          this.menu.setDisabled("all-close");
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
      this.menu.addEventListener(_constants_event_const__WEBPACK_IMPORTED_MODULE_3__.EventConst.CLOSE_CONTEXT_MENU, () => {
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
      this.menu.addButton(id, title, _constants_svg_const__WEBPACK_IMPORTED_MODULE_4__.SvgConst.squarePlusPaths);

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

        task.classList.add("fade-in");
        root.appendChild(task);
        setTimeout(() => {
          task.classList.add("show");
        }, 100);

        this.#openGroup(root);
        const data = task.querySelector("task-title").getData();
        this.dispatchEvent(
          _utils_event_utils__WEBPACK_IMPORTED_MODULE_2__.EventUtils.createEvent(_constants_event_const__WEBPACK_IMPORTED_MODULE_3__.EventConst.ADD_NEW_TASK_ITEM_EVENT_NAME, data)
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
      this.menu.addButton(id, title, _constants_svg_const__WEBPACK_IMPORTED_MODULE_4__.SvgConst.folderPlusPaths);

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

        group.classList.add("fade-in");
        root.appendChild(group);
        setTimeout(() => {
          group.classList.add("show");
        }, 100);

        this.#openGroup(root);
        const data = group.querySelector("group-title").getData();
        this.dispatchEvent(
          _utils_event_utils__WEBPACK_IMPORTED_MODULE_2__.EventUtils.createEvent(_constants_event_const__WEBPACK_IMPORTED_MODULE_3__.EventConst.ADD_NEW_GROUP_ITEM_EVENT_NAME, data)
        );
      });
    }

    /**
     * アイテムのセパレーターを設置するためのボタンを作成し、メニューに追加します。
     */
    #insertSeparatorItemButton() {
      const id = "separator-item";
      const title = "セパレーター";
      this.menu.addButton(id, title, _constants_svg_const__WEBPACK_IMPORTED_MODULE_4__.SvgConst.LinePaths);

      /**
       * クリックイベント
       * @param {Event} event - クリックイベントオブジェクト
       */
      this.menu.addEventListener(`click-${id}`, (e) => {
        const root = this.#getMenuTarget(this.menu.clickTarget);
        const item = this.#createNewSeparatorItem();

        item.classList.add("fade-in");
        root.appendChild(item);
        setTimeout(() => {
          item.classList.add("show");
        }, 100);

        this.dispatchEvent(
          _utils_event_utils__WEBPACK_IMPORTED_MODULE_2__.EventUtils.createEvent(_constants_event_const__WEBPACK_IMPORTED_MODULE_3__.EventConst.CHANGE_TREEVIEW_EVENT_NAME)
        );
      });
    }

    /**
     * 指定したグループをすべて開くボタンを追加する
     */
    #insertAllOpenButton() {
      const id = "all-open";
      const title = "すべて開く";
      this.menu.addButton(id, title, _constants_svg_const__WEBPACK_IMPORTED_MODULE_4__.SvgConst.treeOpenPaths);

      /**
       * クリックイベント
       * @param {Event} event - クリックイベントオブジェクト
       */
      this.menu.addEventListener(`click-${id}`, (e) => {
        const details = this.menu.clickTarget.closest(".group");
        details.querySelectorAll("details").forEach((d) => (d.open = true));
        details.open = true;
      });
    }

    /**
     * 指定したグループをすべて閉じるボタンを追加する
     */
    #insertAllCloseButton() {
      const id = "all-close";
      const title = "すべて閉じる";
      this.menu.addButton(id, title, _constants_svg_const__WEBPACK_IMPORTED_MODULE_4__.SvgConst.treeClosePaths);

      /**
       * クリックイベント
       * @param {Event} event - クリックイベントオブジェクト
       */
      this.menu.addEventListener(`click-${id}`, (e) => {
        const details = this.menu.clickTarget.closest(".group");
        details.querySelectorAll("details").forEach((d) => (d.open = false));
        details.open = false;
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
      this.menu.addButton(id, title, _constants_svg_const__WEBPACK_IMPORTED_MODULE_4__.SvgConst.trashPaths);

      /**
       * クリックイベント
       * @param {Event} event - クリックイベントオブジェクト
       */
      this.menu.addEventListener(`click-${id}`, (e) => {
        this.#deleteItem(this.menu.clickTarget);
        this.dispatchEvent(
          _utils_event_utils__WEBPACK_IMPORTED_MODULE_2__.EventUtils.createEvent(_constants_event_const__WEBPACK_IMPORTED_MODULE_3__.EventConst.DELETE_TREEVIEW_ITEM_EVENT_NAME)
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
          const isSeparator = node.dataset.type === "separator";

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
          } else if (isSeparator) {
            elements.push({
              id: node.id,
              type: "separator",
            });
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
        if (beforeItem) {
          beforeItem.selected = false;
        }
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
        const item = elm.querySelector("task-title,group-title");
        if (item) {
          const data = item.getData();
          data.id = item.id;
          if (data.type === "task") {
            data.paths = item.paths;
            data.flag = item.flag;
          }
          items.push(data);
        }
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
        const isTask = data.type === "task";
        const isGroup = data.type === "group";
        const isSeparator = data.type === "separator";

        if (isTask) {
          // タスクを追加
          const task = this.#createNewTaskItem(data);
          root.appendChild(task);
        } else if (isGroup) {
          // グループを追加
          const group = this.#createNewGroupItem(data);
          root.appendChild(group);

          // グループの子要素を追加
          const items = getItems(group);
          const children = data.children || data.childlen || [];
          (children || []).forEach((child) => {
            addTreeViewItem(items, child);
          });
        } else if (isSeparator) {
          // セパレーターを追加
          const separator = this.#createNewSeparatorItem(data);
          root.appendChild(separator);
        } else {
          // 何もしない
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
     * セパレータを作成する作成する
     * * @param {Object} [data={}] - アイテムの初期データ
     * @returns {HTMLElement} item - 作成されたセパレータアイテム要素
     */
    #createNewSeparatorItem(data = {}) {
      const separator = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__.ElmUtils.createElm("div", null, [
        "tree-item",
        "separator",
      ]);
      this.#addDragEventListeners(separator);

      separator.setAttribute("draggable", true);
      separator.dataset.type = "separator";

      if (data.id) {
        separator.id = data.id;
      } else {
        separator.id = _utils_id_utils__WEBPACK_IMPORTED_MODULE_1__.IdUtils.getUniqueId();
      }

      return separator;
    }

    /**
     * 指定されたデータを元に新しいタスクアイテムを作成し、クリックイベントを設定します。
     * @param {Object} [data={}] - タスクアイテムの初期データ
     * @returns {HTMLElement} item - 作成されたタスクアイテム要素
     */
    #createNewTaskItem(data = {}) {
      const title = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__.ElmUtils.createElm("task-title");
      title.init(data);

      const item = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__.ElmUtils.createElm("div", null, ["tree-item", "task"]);
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

      const details = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__.ElmUtils.createElm("details", null, [
        "tree-item",
        "group",
      ]);
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

    /**
     * 指定したアイテムを削除する。
     * @param {string} item - 削除対象アイテム
     */
    #deleteItem(item) {
      const id = item.id;
      let name;
      if (item.dataset.type === "separator") {
        name = "セパレータ";
      } else {
        name = item.name;
      }

      if (window.confirm(`${name} を削除しますか？`)) {
        this.shadowRoot.getElementById(id).closest(".tree-item").remove();
      }
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
          if (nowPosition >= 0.85) {
            target.insertAdjacentElement("afterend", draggedElement);
          } else {
            // 子要素に追加
            const items = target.querySelector(".group-items");
            items.insertAdjacentElement("beforeend", draggedElement);
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
        _utils_event_utils__WEBPACK_IMPORTED_MODULE_2__.EventUtils.createEvent(_constants_event_const__WEBPACK_IMPORTED_MODULE_3__.EventConst.CHANGE_TREEVIEW_EVENT_NAME)
      );
    }
  }
  customElements.define("tree-view", TreeView);
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
  border-bottom: 1px solid #afafaf;
}

.fade-in {
  opacity: 0;
  transition: opacity 0.5s ease-in-out;
}

.fade-in.show {
  opacity: 1;
}

#root {
  width: 100%;
  height: 100%;
  padding: 0.5rem;
}
#root .tree-item {
  margin: 1px 0;
}
#root details summary {
  list-style: none;
}
#root details .group-items {
  margin-left: 1.1rem;
}
#root .separator {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 1.25rem;
  position: relative;
  border-radius: 0.15rem;
  cursor: pointer;
}
#root .separator::after {
  content: "";
  position: absolute;
  width: 85%;
  height: 1px;
  background-color: #afafaf;
}
#root .separator:hover, #root .separator.selected {
  background-color: #fff0bd;
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
/* 20 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TaskTitle: () => (/* binding */ TaskTitle)
/* harmony export */ });
/* harmony import */ var _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _utils_svg_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9);
/* harmony import */ var _constants_svg_const__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3);
/* harmony import */ var _utils_id_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(18);
/* harmony import */ var _utils_event_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(12);
/* harmony import */ var _constants_event_const__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(15);
/* harmony import */ var _utils_date_utils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(21);
/* harmony import */ var _style_task_title_css__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(22);










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
      this.root.title = value;
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
/* 21 */
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

.task-title {
  cursor: pointer;
  display: flex;
  align-items: center;
  text-decoration-skip-ink: none;
  border-radius: 0.15rem;
  padding: 0.15rem;
  transition: 0.2s;
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
/* 23 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GroupTitle: () => (/* binding */ GroupTitle)
/* harmony export */ });
/* harmony import */ var _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _utils_svg_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9);
/* harmony import */ var _constants_svg_const__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3);
/* harmony import */ var _utils_id_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(18);
/* harmony import */ var _utils_event_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(12);
/* harmony import */ var _constants_event_const__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(15);
/* harmony import */ var _style_group_title_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(24);









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
      this.root.title = value;

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
/* 24 */
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
  transition: 0.2s;
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
/* 25 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ContentsGroup: () => (/* binding */ ContentsGroup)
/* harmony export */ });
/* harmony import */ var _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _utils_svg_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9);
/* harmony import */ var _constants_svg_const__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3);
/* harmony import */ var _utils_event_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(12);
/* harmony import */ var _constants_event_const__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(15);
/* harmony import */ var _constants_priority_const__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(26);
/* harmony import */ var _style_contents_group_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(27);









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
      this.root = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__.ElmUtils.createElm("div", "root", ["contents-group"]);
      this.property = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__.ElmUtils.createElm("div", "group-property", ["scroll"]);
      this.memo = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__.ElmUtils.createElm("div", "group-memo", ["scroll"]);
      this.list = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__.ElmUtils.createElm("div", "group-list", ["scroll"]);

      this.root.appendChild(this.property);
      this.root.appendChild(this.memo);
      this.root.appendChild(this.list);

      this.#addGroupId();
      this.#addGroupTitle();
      this.#addGroupOverview();
      this.#addFolderpath();

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
      this._folderpath.value = data.folderpath || "";
      this._groupOverview.value = data.overview || "";
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

      this.table.setCaption(
        _utils_svg_utils__WEBPACK_IMPORTED_MODULE_1__.SvgUtils.createIcon(_constants_svg_const__WEBPACK_IMPORTED_MODULE_2__.SvgConst.TablePaths),
        "タスク一覧"
      );

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
          this.table.setTdElment(
            item.duedate !== "3000-12-31" ? item.duedate : "-"
          );
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
          const icon = _utils_svg_utils__WEBPACK_IMPORTED_MODULE_1__.SvgUtils.createIcon(_constants_svg_const__WEBPACK_IMPORTED_MODULE_2__.SvgConst.folderPaths);
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
      dataItem.folderpath = this._folderpath.value || "";
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
      filedset.icon = _utils_svg_utils__WEBPACK_IMPORTED_MODULE_1__.SvgUtils.createIcon(_constants_svg_const__WEBPACK_IMPORTED_MODULE_2__.SvgConst.TagPaths);
      filedset.title = "ID";

      this._groupId = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__.ElmUtils.createElm("form-input", "id");
      this._groupId.title = "ID";
      this._groupId.readOnly = true;

      filedset.addItem(this._groupId);
      this.property.appendChild(filedset);
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
      filedset.icon = _utils_svg_utils__WEBPACK_IMPORTED_MODULE_1__.SvgUtils.createIcon(_constants_svg_const__WEBPACK_IMPORTED_MODULE_2__.SvgConst.BookPaths);
      filedset.title = "グループ名";
      filedset.required = true;

      this._groupTitle = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__.ElmUtils.createElm("form-input", "title");

      filedset.addItem(this._groupTitle);
      this.property.appendChild(filedset);
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
    // * 作業フォルダパス
    // **************************************************

    /**
     * 作業フォルダパスを追加します。
     * @private
     */
    #addFolderpath() {
      const filedset = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__.ElmUtils.createElm("form-fieldset");
      filedset.icon = _utils_svg_utils__WEBPACK_IMPORTED_MODULE_1__.SvgUtils.createIcon(_constants_svg_const__WEBPACK_IMPORTED_MODULE_2__.SvgConst.folderPaths);
      filedset.title = "作業フォルダパス";

      this._folderpath = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__.ElmUtils.createElm("form-textarea", "folderpath");
      this._folderpath.rows = 3;
      this._folderpath.placeholder = "作業フォルダパス(E:\workspace)";
      this._folderpath.isFolderPath = true;

      filedset.addItem(this._folderpath);
      this.property.appendChild(filedset);
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
      filedset.icon = _utils_svg_utils__WEBPACK_IMPORTED_MODULE_1__.SvgUtils.createIcon(_constants_svg_const__WEBPACK_IMPORTED_MODULE_2__.SvgConst.WitingPaths);
      filedset.title = "概要";

      this._groupOverview = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__.ElmUtils.createElm("form-textarea", "overview");
      this._groupOverview.rows = 9;
      this._groupOverview.placeholder = "グループの概要説明";

      filedset.addItem(this._groupOverview);
      this.memo.appendChild(filedset);
    }

    // **************************************************
    // * アイテム
    // **************************************************

    /**
     * 空のアイテム一覧を追加します。
     * @private
     */
    #addEmptyGroupItems() {
      this.table = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__.ElmUtils.createElm("form-table");
      this.list.appendChild(this.table);
    }
  }
  customElements.define("contents-group", ContentsGroup);
}


/***/ }),
/* 26 */
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
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-rows: 1fr;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 350px 1fr;
  gap: 0em 0em;
  grid-template-areas: "group-property group-memo" "group-list group-list";
  height: 100vh;
}
#root #group-property {
  grid-area: group-property;
  padding: 0.75rem;
}
#root #group-memo {
  grid-area: group-memo;
  padding: 0.75rem;
}
#root #group-list {
  grid-area: group-list;
  padding: 0 0.75rem;
}
`, ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 28 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ContentsTask: () => (/* binding */ ContentsTask)
/* harmony export */ });
/* harmony import */ var _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _utils_svg_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9);
/* harmony import */ var _constants_svg_const__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3);
/* harmony import */ var _utils_event_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(12);
/* harmony import */ var _constants_event_const__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(15);
/* harmony import */ var _constants_priority_const__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(26);
/* harmony import */ var _style_contents_task_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(29);









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
      filedset.icon = _utils_svg_utils__WEBPACK_IMPORTED_MODULE_1__.SvgUtils.createIcon(_constants_svg_const__WEBPACK_IMPORTED_MODULE_2__.SvgConst.TagPaths);
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
      filedset.icon = _utils_svg_utils__WEBPACK_IMPORTED_MODULE_1__.SvgUtils.createIcon(_constants_svg_const__WEBPACK_IMPORTED_MODULE_2__.SvgConst.BookPaths);
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
      filedset.icon = _utils_svg_utils__WEBPACK_IMPORTED_MODULE_1__.SvgUtils.createIcon(_constants_svg_const__WEBPACK_IMPORTED_MODULE_2__.SvgConst.DueDatePaths);
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
      filedset.icon = _utils_svg_utils__WEBPACK_IMPORTED_MODULE_1__.SvgUtils.createIcon(_constants_svg_const__WEBPACK_IMPORTED_MODULE_2__.SvgConst.CirclesPaths);
      filedset.title = "担当者";
      filedset.required = true;

      // 担当者の所属
      const fildsetStaffDiv = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__.ElmUtils.createElm("form-fieldset");
      this._staffDiv = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__.ElmUtils.createElm("form-input", "staff-div");

      fildsetStaffDiv.addItem(this._staffDiv);
      fildsetStaffDiv.icon = _utils_svg_utils__WEBPACK_IMPORTED_MODULE_1__.SvgUtils.createIcon(_constants_svg_const__WEBPACK_IMPORTED_MODULE_2__.SvgConst.WallpaperPaths);
      fildsetStaffDiv.title = "所属";
      this._staffDiv.placeholder = "情報システム課";

      // 担当者の氏名
      const fildsetStaffName = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__.ElmUtils.createElm("form-fieldset");
      fildsetStaffName.icon = _utils_svg_utils__WEBPACK_IMPORTED_MODULE_1__.SvgUtils.createIcon(_constants_svg_const__WEBPACK_IMPORTED_MODULE_2__.SvgConst.UserPaths);
      this._staffName = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__.ElmUtils.createElm("form-input", "staff-name");

      fildsetStaffName.addItem(this._staffName);
      fildsetStaffName.title = "氏名";
      this._staffName.placeholder = "日本 太郎";

      // 担当者の電話番号
      const fildsetStaffTel = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__.ElmUtils.createElm("form-fieldset");
      fildsetStaffTel.icon = _utils_svg_utils__WEBPACK_IMPORTED_MODULE_1__.SvgUtils.createIcon(_constants_svg_const__WEBPACK_IMPORTED_MODULE_2__.SvgConst.PhoneCallPaths);
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
      filedset.icon = _utils_svg_utils__WEBPACK_IMPORTED_MODULE_1__.SvgUtils.createIcon(_constants_svg_const__WEBPACK_IMPORTED_MODULE_2__.SvgConst.AntennaPaths);
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
      filedset.icon = _utils_svg_utils__WEBPACK_IMPORTED_MODULE_1__.SvgUtils.createIcon(_constants_svg_const__WEBPACK_IMPORTED_MODULE_2__.SvgConst.PercentagePaths);
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
      filedset.icon = _utils_svg_utils__WEBPACK_IMPORTED_MODULE_1__.SvgUtils.createIcon(_constants_svg_const__WEBPACK_IMPORTED_MODULE_2__.SvgConst.WitingPaths);
      filedset.title = "作業概要";

      this._memo = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__.ElmUtils.createElm("form-textarea", "memo");
      this._memo.rows = 8;
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
      filedset.icon = _utils_svg_utils__WEBPACK_IMPORTED_MODULE_1__.SvgUtils.createIcon(_constants_svg_const__WEBPACK_IMPORTED_MODULE_2__.SvgConst.folderPaths);
      filedset.title = "作業フォルダパス";

      this._folderpath = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__.ElmUtils.createElm("form-textarea", "folderpath");
      this._folderpath.rows = 3;
      this._folderpath.placeholder = "作業フォルダパス(E:\workspace)";
      this._folderpath.isFolderPath = true;

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
      filedset.icon = _utils_svg_utils__WEBPACK_IMPORTED_MODULE_1__.SvgUtils.createIcon(_constants_svg_const__WEBPACK_IMPORTED_MODULE_2__.SvgConst.WebhookPaths);
      filedset.title = "URL";

      this._url = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__.ElmUtils.createElm("form-textarea", "url");
      this._url.rows = 3;
      this._url.placeholder = "https://example.com";
      this._url.isURL = true;

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
      filedset.icon = _utils_svg_utils__WEBPACK_IMPORTED_MODULE_1__.SvgUtils.createIcon(_constants_svg_const__WEBPACK_IMPORTED_MODULE_2__.SvgConst.WitingPaths);
      filedset.title = "自由記述欄";

      this._freenotes = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__.ElmUtils.createElm("form-textarea", "freenotes");
      this._freenotes.rows = 8;
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
/* 30 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ContentsHistory: () => (/* binding */ ContentsHistory)
/* harmony export */ });
/* harmony import */ var _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _utils_svg_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9);
/* harmony import */ var _constants_svg_const__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3);
/* harmony import */ var _utils_event_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(12);
/* harmony import */ var _constants_event_const__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(15);
/* harmony import */ var _style_contents_history_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(31);








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
      const fieldset = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__.ElmUtils.createElm("form-fieldset");
      fieldset.icon = _utils_svg_utils__WEBPACK_IMPORTED_MODULE_1__.SvgUtils.createIcon(_constants_svg_const__WEBPACK_IMPORTED_MODULE_2__.SvgConst.HistoryPaths);
      fieldset.title = "履歴一覧";
      fieldset.itemLess = true;
      this.root.appendChild(fieldset);

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
      addHistoryBtn.tooltip = "履歴を追加";

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

      const isNewItem = !data.id;

      if (isNewItem) {
        historyItem.classList.add("fade-in");
      }

      historyItem.init(data);
      this.root.appendChild(historyItem);

      if (isNewItem) {
        setTimeout(() => {
          historyItem.classList.add("show");
        }, 100);
      }
    }
  }
  customElements.define("contents-history", ContentsHistory);
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

.contents-history {
  padding-bottom: 5rem;
}
.contents-history #contents-title {
  display: flex;
  margin-bottom: 0.3rem;
  font-weight: bold;
  letter-spacing: 1px;
  line-height: 1rem;
}
.contents-history #contents-title .svg-icon {
  height: 1rem;
  width: 1rem;
  margin-right: 0.35rem;
}
.contents-history .fade-in {
  opacity: 0;
  transition: opacity 0.5s ease-in-out;
}
.contents-history .fade-in.show {
  opacity: 1;
}
`, ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 32 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ContentsHistoryItem: () => (/* binding */ ContentsHistoryItem)
/* harmony export */ });
/* harmony import */ var _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _utils_date_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(21);
/* harmony import */ var _utils_id_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(18);
/* harmony import */ var _utils_svg_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9);
/* harmony import */ var _constants_svg_const__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(3);
/* harmony import */ var _utils_event_utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(12);
/* harmony import */ var _constants_event_const__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(15);
/* harmony import */ var _style_contents_history_item_css__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(33);










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
      deleteHistoryBtn.tooltip = "削除";

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
/* 34 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FormFieldset: () => (/* binding */ FormFieldset)
/* harmony export */ });
/* harmony import */ var _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _style_form_fieldset_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(35);




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
      this.titleText = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__.ElmUtils.createElm("p");

      this.legend.appendChild(this.titleText);
      this.fieldset.appendChild(this.legend);
      this.shadowRoot.appendChild(this.fieldset);
    }

    /**
     * Legendにiconを設定する
     * @param {string} val アイコン
     * @return {void}
     */
    set icon(val) {
      this.legend.prepend(val);
    }

    /**
     * Legendに値を設定する
     * @param {string} val 設定値
     * @return {void}
     */
    set title(val) {
      this.titleText.innerText = val;
    }

    /**
     * フィールドセットのlegendに必須クラスを設定します。
     * @param {bool} val - クラスを追加するかどうかのブール値。
     */
    set required(val) {
      this.legend.classList.toggle("isRequired", val);
    }

    /**
     * ネスト項目であるか否かを設定
     * @param {bool} val 設定値
     * @return {void}
     */
    set nested(val) {
      this.fieldset.classList.toggle("nested", val);
    }

    /**
     * アイテムを持たないフィールドであることを設定
     * @param {bool} val 設定値
     * @return {void}
     */
    set itemLess(val) {
      this.fieldset.classList.toggle("item-less", val);
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

fieldset {
  position: relative;
  padding-bottom: 1.25rem;
}
fieldset.item-less {
  padding-bottom: 0;
}
fieldset legend {
  margin-bottom: 0.3rem;
  font-weight: bold;
  letter-spacing: 1px;
  display: flex;
  align-items: center;
  line-height: 1rem;
  color: #4f4f4f;
}
fieldset legend .svg-icon {
  height: 1rem;
  width: 1rem;
  margin-right: 0.2rem;
}
fieldset legend p {
  padding-top: 0.1rem;
}
fieldset legend.isRequired:after {
  content: "*";
  margin-left: 0.05rem;
  color: #fb4141;
  font-size: 0.85rem;
  padding: 0.15rem 0.15rem;
  line-height: 0.75rem;
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
/* 36 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FormInput: () => (/* binding */ FormInput)
/* harmony export */ });
/* harmony import */ var _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _utils_event_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12);
/* harmony import */ var _constants_event_const__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(15);
/* harmony import */ var _style_form_input_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(37);






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
      this.input.spellcheck = false;

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

input[type=text] {
  outline: none;
  background-color: #fffff8;
  border: 1px solid #6f6f6f;
  border-radius: 0.25rem;
  line-height: 1.5rem;
  padding: 0.1rem 0.25rem;
}
input[type=text]:hover, input[type=text]:focus {
  background-color: #fff6da;
}
input[type=text]:read-only {
  background-color: #dfdfdf;
}
`, ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 38 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FormDate: () => (/* binding */ FormDate)
/* harmony export */ });
/* harmony import */ var _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _utils_event_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12);
/* harmony import */ var _constants_event_const__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(15);
/* harmony import */ var _style_form_date_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(39);
/* harmony import */ var _constants_svg_const__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(3);







/**
 * FormDate コンポーネント
 * @class FormDate
 * @extends {HTMLElement}
 */
function FormDate() {
  const OFF_DATE = "3000-12-31";

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

      // 無効ボタンを作成
      this.offButton = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__.ElmUtils.createElm("svg-btn", "calendar-off");
      this.offButton.iconPaths = _constants_svg_const__WEBPACK_IMPORTED_MODULE_4__.SvgConst.CalendarOff;
      this.offButton.size = "1rem";
      this.offButton.color = "red";
      this.offButton.toggle = true;
      this.offButton.toggleOn(false);
      this.#setToolTip();

      this.offButton.addEventListener("click", () => {
        this.value = this.offButton.toggle ? OFF_DATE : "";
        this.input.classList.toggle("off", this.offButton.toggle);
        this.#setToolTip();
        this.dispatchEvent(
          _utils_event_utils__WEBPACK_IMPORTED_MODULE_1__.EventUtils.createEvent(_constants_event_const__WEBPACK_IMPORTED_MODULE_2__.EventConst.CHANGE_FORM_ITEM_EVENT_NAME)
        );
      });

      // 要素追加
      this.shadowRoot.appendChild(this.input);
      this.shadowRoot.appendChild(this.offButton);

      // 変更イベントを伝播
      this.input.addEventListener("change", () => {
        this.dispatchEvent(
          _utils_event_utils__WEBPACK_IMPORTED_MODULE_1__.EventUtils.createEvent(_constants_event_const__WEBPACK_IMPORTED_MODULE_2__.EventConst.CHANGE_FORM_ITEM_EVENT_NAME)
        );
      });
    }

    /**
     * ツールチップメッセージを設定する
     */
    #setToolTip() {
      if (this.offButton.toggle) {
        this.offButton.tooltip = "無効を解除";
      } else {
        this.offButton.tooltip = "無効にする";
      }
    }

    /**
     * Inputに値を設定する
     * @param {string} val 設定値
     * @return {void}
     */
    set value(val) {
      this.input.value = val;
      if (val === OFF_DATE) {
        this.offButton.toggleOn(true);
        this.input.classList.add("off");
        this.#setToolTip();
      }
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

input[type=date] {
  outline: none;
  background-color: #fffff8;
  border: 1px solid #6f6f6f;
  border-radius: 0.25rem;
  line-height: 1.5rem;
  padding: 0.1rem 0.25rem;
}
input[type=date]:hover, input[type=date]:focus {
  background-color: #fff6da;
}
input[type=date].off {
  pointer-events: none;
  color: #ffffff;
}

#calendar-off {
  margin-left: 0.25rem;
}
`, ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 40 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FormTextarea: () => (/* binding */ FormTextarea)
/* harmony export */ });
/* harmony import */ var _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _utils_event_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12);
/* harmony import */ var _constants_event_const__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(15);
/* harmony import */ var _style_form_textarea_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(41);
/* harmony import */ var _utils_svg_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9);
/* harmony import */ var _constants_svg_const__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(3);








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
        this.#updateViewArea();
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
      this.#updateViewArea();
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
     * viewAreaを更新する。
     */
    #updateViewArea() {
      if (!this._isViewArea) {
        return;
      }

      // 既存要素を削除
      this.viewArea.innerHTML = "";

      // 出力判定
      if (!this.textarea.value) {
        return;
      }

      // リスト出力
      const itemList = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__.ElmUtils.createElm("ul");
      this.textarea.value.split("\n").forEach((item) => {
        let icon;
        const li = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__.ElmUtils.createElm("li");

        // クリップボードにコピー
        icon = _utils_svg_utils__WEBPACK_IMPORTED_MODULE_4__.SvgUtils.createIcon(_constants_svg_const__WEBPACK_IMPORTED_MODULE_5__.SvgConst.CopyPaths);
        li.addEventListener("click", (e) => {
          e.preventDefault();
          e.stopPropagation();
          navigator.clipboard.writeText(item);
        });

        li.appendChild(icon);
        li.appendChild(document.createTextNode(item));

        itemList.appendChild(li);
      });
      this.viewArea.appendChild(itemList);
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
        this.#updateViewArea();
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
      this._width = w;
      this.textarea.style = `width:${this._width}`;
    }

    /**
     * テキストエリアの行数を設定します。
     * @param {number} r - 設定する行数
     */
    set rows(r) {
      this.defaultRows = r;
      this.#adjustTextareaHeight(r);
      this.#updateViewArea();
    }

    /**
     * 入力データがフォルダパスであるかを設定する。
     * @param {bool} val - フラグ
     */
    set isFolderPath(val) {
      this._isFolderPath = val;
      this.#addViewArea(val);
    }

    /**
     * 入力データがURLであるかを設定する。
     * @param {bool} val - フラグ
     */
    set isURL(val) {
      this._isURL = val;
      this.#addViewArea(val);
    }

    /**
     * ViewAreaを追加する。
     * @param {bool} val - フラグ
     */
    #addViewArea(val) {
      this._isViewArea = val;

      // 表示エリア
      this.viewArea = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__.ElmUtils.createElm("div", "view-area");
      this.viewArea.style = `width:${this._width}`;

      // 編集ボタン
      this.editBtnArea = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__.ElmUtils.createElm("div", "edit-btn-area");
      this.editBtnArea.style = `width:${this._width}`;

      const editBtn = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__.ElmUtils.createElm("svg-btn", "edit");
      editBtn.iconPaths = _constants_svg_const__WEBPACK_IMPORTED_MODULE_5__.SvgConst.EditPaths;
      editBtn.size = "1.15rem";
      editBtn.color = "blue";
      editBtn.toggle = true;
      editBtn.toggleOn = false;
      editBtn.tooltip = "編集";

      editBtn.addEventListener("click", () => {
        this.textarea.classList.remove("fade-in", "show");
        this.viewArea.classList.remove("fade-in", "show");

        const isEditMode = editBtn.toggle;
        const showItem = isEditMode ? this.textarea : this.viewArea;
        const hideItem = isEditMode ? this.viewArea : this.textarea;

        editBtn.tooltip = editBtn.toggle ? "完了" : "編集";

        showItem.classList.remove("hidden");
        hideItem.classList.add("hidden");

        showItem.classList.add("fade-in");
        setTimeout(() => {
          showItem.classList.add("show");
        }, 100);
        this.#adjustTextareaHeight();
      });

      this.editBtnArea.appendChild(editBtn);

      // 入力エリアを非表示
      this.textarea.classList.add("hidden");

      // 要素追加
      this.shadowRoot.appendChild(this.viewArea);
      this.shadowRoot.appendChild(this.editBtnArea);
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

.hidden {
  display: none;
}

.fade-in {
  opacity: 0;
  transition: opacity 0.5s ease-in-out;
}

.fade-in.show {
  opacity: 1;
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
textarea:hover, textarea:focus {
  background-color: #fff6da;
}
textarea.borderless {
  padding: 0.15rem 0.25rem;
  border: none;
  transition: 0.2s;
}

#view-area {
  padding-top: 0.2rem;
}
#view-area ul {
  width: 100%;
}
#view-area ul li {
  position: relative;
  width: 100%;
  word-break: break-all;
  line-height: 1.1em;
  padding-top: 0.4rem;
  padding-bottom: 0.35rem;
  padding-left: 1.5rem;
  padding-right: 0.25rem;
  margin-bottom: 0.25rem;
  border: 1px solid #6f6f6f;
  border-radius: 0.25rem;
  color: #0078d4;
  background-color: #fffff8;
  cursor: pointer;
  transition: 0.2s;
}
#view-area ul li:hover {
  color: #fffff8;
  background-color: #0078d4;
}
#view-area ul li:active {
  color: #0078d4;
  background-color: #fffff8;
}
#view-area ul li .svg-icon {
  position: absolute;
  left: 0.25rem;
  top: 0.35rem;
  width: 1rem;
  height: 1rem;
}

#edit-btn-area {
  text-align: right;
  margin-top: 0.15rem;
}
`, ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 42 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FormTable: () => (/* binding */ FormTable)
/* harmony export */ });
/* harmony import */ var _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _utils_svg_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9);
/* harmony import */ var _constants_svg_const__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3);
/* harmony import */ var _style_form_table_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(43);






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
     * キャプションを設定します。
     * @param {HTMLElement} icon - アイコン
     * @param {string} val - キャプション
     */
    setCaption(icon, val) {
      this._icon = icon;
      this._caption = val;
    }

    /**
     * ヘッダーを設定します。
     * @param {Array<string>} texts - ヘッダーに表示するテキストの配列。
     */
    set header(texts = []) {
      this.thead.innerHTML = "";

      const tr = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__.ElmUtils.createElm("tr", "header-items");
      texts.forEach((text) => {
        const th = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__.ElmUtils.createElm("th");
        th.innerText = text;
        tr.appendChild(th);
      });

      this.#addCaption(texts.length);
      this.thead.appendChild(tr);
    }

    /**
     * キャプションをテーブルに追加する。
     * @param {integer} col - 列数
     */
    #addCaption(col) {
      if (!this._caption) {
        return;
      }
      const tr = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__.ElmUtils.createElm("tr", "caption");
      const th = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__.ElmUtils.createElm("th");
      const p = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__.ElmUtils.createElm("p");
      p.textContent = this._caption;

      th.setAttribute("colSpan", col);
      th.appendChild(this._icon);
      th.appendChild(p);

      tr.appendChild(th);

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

#root {
  height: 100%;
}
#root table {
  width: 100%;
}
#root table thead {
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  z-index: 1;
}
#root table thead tr#caption {
  background-color: #d4f1ef;
  height: 1.5rem;
}
#root table thead tr#caption th {
  font-weight: bold;
  letter-spacing: 1px;
  line-height: 1rem;
  color: #4f4f4f;
  position: relative;
}
#root table thead tr#caption th .svg-icon {
  position: absolute;
  height: 1rem;
  width: 1rem;
  margin-right: 0.2rem;
}
#root table thead tr#caption th p {
  position: absolute;
  left: 1.15rem;
  padding-top: 0.1rem;
}
#root table thead tr#header-items th {
  background-color: #211c84;
  color: #fffffb;
  font-weight: bold;
  text-align: center;
  padding: 0.5rem;
}
#root table thead tr#header-items th:first-child {
  border-top-left-radius: 0.25rem;
}
#root table thead tr#header-items th:last-child {
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
  transition: 0.2s;
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
/* 44 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FormRadio: () => (/* binding */ FormRadio)
/* harmony export */ });
/* harmony import */ var _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _utils_event_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12);
/* harmony import */ var _constants_event_const__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(15);
/* harmony import */ var _style_form_radio_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(45);






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
/* 45 */
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
  transition: 0.2s;
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