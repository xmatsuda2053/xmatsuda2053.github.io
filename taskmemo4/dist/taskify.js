/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ElmUtils: () => (/* binding */ ElmUtils)
/* harmony export */ });
/* harmony import */ var _style_common_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);


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
    const comStyleSheet = new CSSStyleSheet();
    comStyleSheet.replaceSync(_style_common_css__WEBPACK_IMPORTED_MODULE_0__["default"]);

    const styleSheet = new CSSStyleSheet();
    styleSheet.replaceSync(style);
    return [comStyleSheet, styleSheet];
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

  /**
   * 空のHTMLを作成する。
   * @param {string} title
   * @returns
   */
  static createEmptyHTML = (title) => {
    return `
      <!doctype html>
      <html lang="ja">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>${title}</title>
          <style>
            body {
              -webkit-print-color-adjust: exact;
              margin: 0;
            }
          </style>
        </head>
        <body>
        </body>
      </html>`;
  };
}


/***/ }),
/* 2 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4);
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

.scroll {
  overflow-y: scroll;
}
.scroll::-webkit-scrollbar {
  display: none;
}

.float-area {
  position: absolute;
  display: flex;
  right: 1rem;
  bottom: 1rem;
}
.float-area * {
  display: block;
  padding-left: 0.25rem;
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
`, ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 3 */
/***/ ((module) => {



module.exports = function (i) {
  return i[1];
};

/***/ }),
/* 4 */
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
/* 5 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TaskMemo: () => (/* binding */ TaskMemo)
/* harmony export */ });
/* harmony import */ var _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _constants_svg_const__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6);
/* harmony import */ var _classes_file_manager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7);
/* harmony import */ var _style_task_memo_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8);
/* harmony import */ var _toppage_top_page__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9);
/* harmony import */ var _svg_btn_svg_btn__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(12);
/* harmony import */ var _context_menu_context_menu__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(15);
/* harmony import */ var _constants_event_const__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(16);
/* harmony import */ var _tree_view_tree_view__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(18);
/* harmony import */ var _tree_view_task_title__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(21);
/* harmony import */ var _tree_view_group_title__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(25);
/* harmony import */ var _contents_group_contents_group__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(27);
/* harmony import */ var _contents_task_contents_task__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(29);
/* harmony import */ var _contents_history_contents_hisotry__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(31);
/* harmony import */ var _contents_history_contetns_history_item__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(33);
/* harmony import */ var _biz_card_biz_card__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(35);
/* harmony import */ var _form_form_fieldset__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(37);
/* harmony import */ var _form_form_input__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(39);
/* harmony import */ var _form_form_date__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(41);
/* harmony import */ var _form_form_textarea__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(43);
/* harmony import */ var _form_form_table__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(45);
/* harmony import */ var _form_form_radio__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(47);
/* harmony import */ var _toast_item_toast_item__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(49);
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

      (0,_form_form_fieldset__WEBPACK_IMPORTED_MODULE_16__.FormFieldset)();
      (0,_form_form_input__WEBPACK_IMPORTED_MODULE_17__.FormInput)();
      (0,_form_form_date__WEBPACK_IMPORTED_MODULE_18__.FormDate)();
      (0,_form_form_textarea__WEBPACK_IMPORTED_MODULE_19__.FormTextarea)();
      (0,_form_form_table__WEBPACK_IMPORTED_MODULE_20__.FormTable)();
      (0,_form_form_radio__WEBPACK_IMPORTED_MODULE_21__.FormRadio)();

      (0,_contents_group_contents_group__WEBPACK_IMPORTED_MODULE_11__.ContentsGroup)();
      (0,_contents_task_contents_task__WEBPACK_IMPORTED_MODULE_12__.ContentsTask)();
      (0,_contents_history_contents_hisotry__WEBPACK_IMPORTED_MODULE_13__.ContentsHistory)();
      (0,_contents_history_contetns_history_item__WEBPACK_IMPORTED_MODULE_14__.ContentsHistoryItem)();

      (0,_biz_card_biz_card__WEBPACK_IMPORTED_MODULE_15__.BizCard)();

      (0,_toast_item_toast_item__WEBPACK_IMPORTED_MODULE_22__.ToastItem)();

      this.fileManager = new _classes_file_manager__WEBPACK_IMPORTED_MODULE_2__.FileManager();

      // Shadow DOMをオープンモードでアタッチ
      this.attachShadow({ mode: "open" });

      // CSSを適用
      this.shadowRoot.adoptedStyleSheets = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__.ElmUtils.createStylesheet(_style_task_memo_css__WEBPACK_IMPORTED_MODULE_3__["default"]);

      // オブジェクトを配置
      this.container = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__.ElmUtils.createElm("div", "container");
      this.treeView = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__.ElmUtils.createElm("div", "treeview");
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
      this.#attachChangeBizCardEventListener();
      this.#attachShowDelayTaskEventListener();
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
          this.treeViewRoot.openGroup(item.id);
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
          this.treeViewRoot.closeGroup(item.id);
          this.#addContentsGroup(item.id, item.name);
        }
      );
    }

    /**
     * Treeviewの名刺管理表示イベントを登録
     */
    #attachChangeBizCardEventListener() {
      this.treeViewRoot.addEventListener(
        _constants_event_const__WEBPACK_IMPORTED_MODULE_7__.EventConst.CHANGE_BIZ_CARD_EVENT_NAME,
        () => {
          this.#changeBizCard();
        }
      );
    }

    /**
     * Treeviewの遅延タスク表示イベントを登録
     */
    #attachShowDelayTaskEventListener() {
      this.treeViewRoot.addEventListener(
        _constants_event_const__WEBPACK_IMPORTED_MODULE_7__.EventConst.SHOW_DELAY_TASK_EVENT_NAME,
        () => {
          this.#showDelayTask();
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
            this.treeViewRoot.openGroup(item.id);
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
            task.hasTodo = data.historyData.find((f) => f.todo) !== undefined;

            task.refreshView();
          }
        );

        /**
         * タスク内容を印刷する
         */
        this.contentsTask.addEventListener(
          _constants_event_const__WEBPACK_IMPORTED_MODULE_7__.EventConst.PRINT_TASK_EVENT_NAME,
          () => {
            const data = this.contentsTask.getData();
            sessionStorage.setItem("print", JSON.stringify(data));

            const tab = window.open(
              `./taskify.html?type=print&id=${id}`,
              "_blank"
            );
            setTimeout(() => {
              tab.close();
            }, "100");
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

    // *******************************************************
    // * 名刺管理
    // *******************************************************
    #changeBizCard() {
      const bizCard = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__.ElmUtils.createElm("biz-card");
      this.contents.innerHTML = "";
      this.contents.appendChild(bizCard);
    }

    // *******************************************************
    // * 遅延タスク表示
    // *******************************************************
    #showDelayTask() {
      const delayTask = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__.ElmUtils.createElm("contents-group");

      delayTask.isListOnly = true;
      delayTask.renderItems(
        this.treeViewRoot.getDelayTaskItems(),
        "遅延タスク一覧"
      );

      this.contents.innerHTML = "";
      this.contents.appendChild(delayTask);

      // グループ内のタスクのクリックを検知
      delayTask.addEventListener(
        _constants_event_const__WEBPACK_IMPORTED_MODULE_7__.EventConst.CLICK_CONTENTS_GROUP_TASK_EVENT_NAME,
        (e) => {
          const item = e.detail.item;
          this.#addContentsTask(item.id, item.name);
        }
      );
    }
  }
  customElements.define("task-memo", TaskMemo);
}


/***/ }),
/* 6 */
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

  /**
   * プリンタSVGのパスデータを含むオブジェクトの配列を生成する。
   * @returns {Object[]} SVGのパスデータを含むオブジェクトの配列。
   * @returns {string} return.path - SVGのパス情報。
   */
  static PrinterPath = {
    name: "icon-printer",
    paths: [
      { path: "M0 0h24v24H0z" },
      {
        path: "M17 17h2a2 2 0 0 0 2 -2v-4a2 2 0 0 0 -2 -2h-14a2 2 0 0 0 -2 2v4a2 2 0 0 0 2 2h2",
      },
      {
        path: "M17 9v-4a2 2 0 0 0 -2 -2h-6a2 2 0 0 0 -2 2v4",
      },
      {
        path: "M7 13m0 2a2 2 0 0 1 2 -2h6a2 2 0 0 1 2 2v4a2 2 0 0 1 -2 2h-6a2 2 0 0 1 -2 -2z",
      },
    ],
  };

  /**
   * フラグSVGのパスデータを含むオブジェクトの配列を生成する。
   * @returns {Object[]} SVGのパスデータを含むオブジェクトの配列。
   * @returns {string} return.path - SVGのパス情報。
   */
  static FlagPath = {
    name: "icon-flag",
    paths: [
      { path: "M0 0h24v24H0z" },
      {
        path: "M19 4a1 1 0 0 1 .993 .883l.007 .117v9a1 1 0 0 1 -.883 .993l-.117 .007h-13v6a1 1 0 0 1 -.883 .993l-.117 .007a1 1 0 0 1 -.993 -.883l-.007 -.117v-16a1 1 0 0 1 .883 -.993l.117 -.007h14z",
        isFill: true,
      },
    ],
  };

  /**
   * カードSVGのパスデータを含むオブジェクトの配列を生成する。
   * @returns {Object[]} SVGのパスデータを含むオブジェクトの配列。
   * @returns {string} return.path - SVGのパス情報。
   */
  static CardsPath = {
    name: "icon-cards",
    paths: [
      { path: "M0 0h24v24H0z" },
      {
        path: "M3.604 7.197l7.138 -3.109a.96 .96 0 0 1 1.27 .527l4.924 11.902a1 1 0 0 1 -.514 1.304l-7.137 3.109a.96 .96 0 0 1 -1.271 -.527l-4.924 -11.903a1 1 0 0 1 .514 -1.304z",
      },
      {
        path: "M15 4h1a1 1 0 0 1 1 1v3.5",
      },
      {
        path: "M20 6c.264 .112 .52 .217 .768 .315a1 1 0 0 1 .53 1.311l-2.298 5.374",
      },
    ],
  };

  /**
   * ビルディングSVGのパスデータを含むオブジェクトの配列を生成する。
   * @returns {Object[]} SVGのパスデータを含むオブジェクトの配列。
   * @returns {string} return.path - SVGのパス情報。
   */
  static BuildingsPath = {
    name: "icon-buildings",
    paths: [
      { path: "M0 0h24v24H0z" },
      { path: "M4 21v-15c0 -1 1 -2 2 -2h5c1 0 2 1 2 2v15" },
      { path: "M16 8h2c1 0 2 1 2 2v11" },
      { path: "M3 21h18" },
      { path: "M10 12v0" },
      { path: "M10 16v0" },
      { path: "M10 8v0" },
      { path: "M7 12v0" },
      { path: "M7 16v0" },
      { path: "M7 8v0" },
      { path: "M17 12v0" },
      { path: "M17 16v0" },
    ],
  };

  /**
   * アドレス帳SVGのパスデータを含むオブジェクトの配列を生成する。
   * @returns {Object[]} SVGのパスデータを含むオブジェクトの配列。
   * @returns {string} return.path - SVGのパス情報。
   */
  static AddressBookPath = {
    name: "icon-address-book",
    paths: [
      { path: "M0 0h24v24H0z" },
      {
        path: "M20 6v12a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2z",
      },
      { path: "M10 16h6" },
      { path: "M13 11m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" },
      { path: "M4 8h3" },
      { path: "M4 12h3" },
      { path: "M4 16h3" },
    ],
  };

  /**
   * モバイルデバイスSVGのパスデータを含むオブジェクトの配列を生成する。
   * @returns {Object[]} SVGのパスデータを含むオブジェクトの配列。
   * @returns {string} return.path - SVGのパス情報。
   */
  static DeviceMobilePath = {
    name: "icon-device-mobile",
    paths: [
      { path: "M0 0h24v24H0z" },
      {
        path: "M6 5a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2v-14z",
      },
      { path: "M11 4h2" },
      { path: "M12 17v.01" },
    ],
  };

  /**
   * プリンターSVGのパスデータを含むオブジェクトの配列を生成する。
   * @returns {Object[]} SVGのパスデータを含むオブジェクトの配列。
   * @returns {string} return.path - SVGのパス情報。
   */
  static PrinterPath = {
    name: "icon-printer",
    paths: [
      { path: "M0 0h24v24H0z" },
      {
        path: "M17 17h2a2 2 0 0 0 2 -2v-4a2 2 0 0 0 -2 -2h-14a2 2 0 0 0 -2 2v4a2 2 0 0 0 2 2h2",
      },
      { path: "M17 9v-4a2 2 0 0 0 -2 -2h-6a2 2 0 0 0 -2 2v4" },
      {
        path: "M7 13m0 2a2 2 0 0 1 2 -2h6a2 2 0 0 1 2 2v4a2 2 0 0 1 -2 2h-6a2 2 0 0 1 -2 -2z",
      },
    ],
  };

  /**
   * メールSVGのパスデータを含むオブジェクトの配列を生成する。
   * @returns {Object[]} SVGのパスデータを含むオブジェクトの配列。
   * @returns {string} return.path - SVGのパス情報。
   */
  static MailPath = {
    name: "icon-mail",
    paths: [
      { path: "M0 0h24v24H0z" },
      {
        path: "M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10z",
      },
      { path: "M3 7l9 6l9 -6" },
    ],
  };

  /**
   * 郵便番号SVGのパスデータを含むオブジェクトの配列を生成する。
   * @returns {Object[]} SVGのパスデータを含むオブジェクトの配列。
   * @returns {string} return.path - SVGのパス情報。
   */
  static PostCodePath = {
    name: "icon-post-code",
    paths: [
      { path: "M0 0h24v24H0z" },
      {
        path: "M7 7h10",
      },
      { path: "M7 10h10" },
      { path: "M12 10v7" },
    ],
  };

  /**
   * 郵便受けSVGのパスデータを含むオブジェクトの配列を生成する。
   * @returns {Object[]} SVGのパスデータを含むオブジェクトの配列。
   * @returns {string} return.path - SVGのパス情報。
   */
  static MailBoxPath = {
    name: "icon-mail-box",
    paths: [
      { path: "M0 0h24v24H0z" },
      {
        path: "M10 21v-6.5a3.5 3.5 0 0 0 -7 0v6.5h18v-6a4 4 0 0 0 -4 -4h-10.5",
      },
      { path: "M12 11v-8h4l2 2l-2 2h-4" },
      { path: "M6 15h1" },
    ],
  };

  /**
   * Mに四角SVGのパスデータを含むオブジェクトの配列を生成する。
   * @returns {Object[]} SVGのパスデータを含むオブジェクトの配列。
   * @returns {string} return.path - SVGのパス情報。
   */
  static SquareMPath = {
    name: "icon-square-letter-m",
    paths: [
      { path: "M0 0h24v24H0z" },
      {
        path: "M3 3m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z",
      },
      { path: "M9 16v-8l3 5l3 -5v8" },
    ],
  };

  /**
   * ネクタイSVGのパスデータを含むオブジェクトの配列を生成する。
   * @returns {Object[]} SVGのパスデータを含むオブジェクトの配列。
   * @returns {string} return.path - SVGのパス情報。
   */
  static TiePaths = {
    name: "icon-tie",
    paths: [
      { path: "M0 0h24v24H0z" },
      {
        path: "M12 22l4 -4l-2.5 -11l.993 -2.649a1 1 0 0 0 -.936 -1.351h-3.114a1 1 0 0 0 -.936 1.351l.993 2.649l-2.5 11l4 4z",
      },
      { path: "M10.5 7h3l5 5.5" },
    ],
  };
}


/***/ }),
/* 7 */
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
/* 8 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `#container {
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
/* 9 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TopPage: () => (/* binding */ TopPage)
/* harmony export */ });
/* harmony import */ var _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _utils_svg_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(10);
/* harmony import */ var _style_top_page_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(11);





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
      this.box = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__.ElmUtils.createElm("div", "box");
      this.box.appendChild(this.#logomark());
      this.box.appendChild(
        _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__.ElmUtils.createElm("div", null, ["border", "gradient"])
      );
      this.box.appendChild(this.#appName());

      this.root.appendChild(this.box);
      this.shadowRoot.appendChild(this.root);
    }

    /**
     * タイトルロゴ
     * @returns {HTMLElement} logo
     */
    #logomark() {
      const logo = () => {
        return `data:image/png;base64,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`;
      };
      const img = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__.ElmUtils.createElm("img");
      img.src = logo();
      return img;
    }

    /**
     * アプリ名
     * @returns {HTMLElement} name
     */
    #appName() {
      const name = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__.ElmUtils.createElm("p", null, ["gradient"]);
      name.innerHTML = "TASKify.js";
      return name;
    }
  }
  customElements.define("top-page", TopPage);
}


/***/ }),
/* 10 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SvgUtils: () => (/* binding */ SvgUtils)
/* harmony export */ });
/* harmony import */ var _elm_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);


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
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `#root {
  position: relative;
  width: 100%;
  height: 100%;
}
#root #box {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}
#root #box img {
  width: 135px;
  height: 110px;
}
#root #box .border {
  margin-top: 0.35rem;
  height: 3px;
  border-radius: 50%;
}
#root #box p {
  width: 100%;
  font-family: Verdana, Helvetica, Arial, sans-serif;
  font-size: 5rem;
  font-weight: bold;
  display: inline-block;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
#root .gradient {
  background: linear-gradient(270deg, rgb(243, 196, 170), rgb(228, 81, 154) 50%, rgb(77, 84, 224));
}
`, ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 12 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SvgBtn: () => (/* binding */ SvgBtn)
/* harmony export */ });
/* harmony import */ var _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _utils_event_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(13);
/* harmony import */ var _utils_svg_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(10);
/* harmony import */ var _style_svg_btn_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(14);






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
     * ボタンを四角形にするかどうかを設定するプロパティ
     * @param {boolean} flg - 四角形にする場合は true、しない場合は false
     * @description 指定された値に応じて、ボタンに "square" クラスを追加または削除する。
     */
    set isSquare(flg) {
      if (flg) {
        this.button.classList.add("square");
      } else {
        this.button.classList.remove("square");
      }
    }

    /**
     * ボタンの高さを設定するセッター
     * @param {string} value - 設定する高さ
     */
    set height(value) {
      this.button.style = `height: ${value}`;
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
/* 13 */
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
/* 14 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `button {
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
button.square {
  width: 100%;
  border-radius: 0.25rem;
  border: 2px dashed #afafaf;
  color: #afafaf;
  background-color: #fffff8;
  padding: 0.5rem;
  transition: 0.2s;
}
button.square .svg-icon {
  margin: 0 auto;
  font-size: 1.8rem;
  font-weight: bold;
  color: #afafaf;
  background-color: #fffff8;
  border: 2px dashed #afafaf;
  height: 2.5rem;
  width: 2.5rem;
  padding: 0.5rem;
  border-radius: 50%;
  transition: 0.2s;
}
button.square:hover {
  border-color: #0a3981;
}
button.square:hover .svg-icon {
  color: #0a3981;
  border-color: #0a3981;
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
/* 15 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ContextMenu: () => (/* binding */ ContextMenu)
/* harmony export */ });
/* harmony import */ var _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _utils_svg_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(10);
/* harmony import */ var _utils_event_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(13);
/* harmony import */ var _constants_event_const__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(16);
/* harmony import */ var _style_context_menu_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(17);







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
        this.menu.classList.remove("show");

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

      setTimeout(() => {
        this.menu.classList.add("show");
      }, 100);
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
/* 16 */
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

  /**
   * タスク印刷イベント
   */
  static PRINT_TASK_EVENT_NAME = "printTask";

  /**
   * 名刺管理表示イベント
   */
  static CHANGE_BIZ_CARD_EVENT_NAME = "changeBizCard";

  /**
   * 遅延タスク表示イベント
   */
  static SHOW_DELAY_TASK_EVENT_NAME = "showDelayTask";
}


/***/ }),
/* 17 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `#context-area {
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
  background-color: #2b2b2b;
  border: 1px solid #8f8f8f;
  border-radius: 0.25rem;
  padding: 0.25rem;
  opacity: 0;
  transition: opacity 0.25s ease-in-out;
}
#context-area #context-menu.show {
  opacity: 1;
}
#context-area #context-menu .button-area {
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 0.2rem 0.5rem;
  color: #fffffb;
  transition: 0.2s;
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
  color: #8f8f8f;
}
#context-area #context-menu .button-area.disabled:hover {
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
/* 18 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TreeView: () => (/* binding */ TreeView)
/* harmony export */ });
/* harmony import */ var _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _utils_id_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(19);
/* harmony import */ var _utils_event_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(13);
/* harmony import */ var _constants_event_const__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(16);
/* harmony import */ var _constants_svg_const__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6);
/* harmony import */ var _style_tree_view_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(20);
/* harmony import */ var _utils_svg_utils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(10);
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
      this.bizCard = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__.ElmUtils.createElm("div", "biz-card", ["sub-item"]);
      this.delayTask = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__.ElmUtils.createElm("div", "delay-task", ["sub-item"]);
      this.root = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__.ElmUtils.createElm("div", "root", ["scroll"]);

      this.shadowRoot.appendChild(this.header);
      this.shadowRoot.appendChild(this.bizCard);
      this.shadowRoot.appendChild(this.delayTask);
      this.shadowRoot.appendChild(this.root);

      // 画面機能を追加
      this.#addHeaderMenu();
      this.#addBizCard();
      this.#adddelayTask();
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

    /**
     * 指定したIDのグループを開く
     * @param {string} id
     */
    openGroup(id) {
      this.shadowRoot.getElementById(id).closest("details").open = true;
    }

    /**
     * 指定したIDのグループを閉じる
     * @param {string} id
     */
    closeGroup(id) {
      this.shadowRoot.getElementById(id).closest("details").open = false;
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
      headerMenu.appendChild(this.#createFilterMemo());
      headerMenu.appendChild(this.#createLine());
      headerMenu.appendChild(this.#createFilterTodoButton());
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
     * メモタスクのフィルタ設定ボタンを作成する。
     * @returns ボタン
     */
    #createFilterMemo() {
      this.btnFilterMemo = this.#createToggleButton(
        "filter-memo",
        _constants_svg_const__WEBPACK_IMPORTED_MODULE_4__.SvgConst.SquareMPath
      );
      this.btnFilterMemo.tooltip = "メモ";
      this.btnFilterMemo.addEventListener("click", () => {
        this.#filterTreeViewItem();
      });
      return this.btnFilterMemo;
    }

    /**
     * TODOのフィルタ設定ボタンを作成する。
     * @returns ボタン
     */
    #createFilterTodoButton() {
      this.btnFilterTODO = this.#createToggleButton(
        "filter-todo",
        _constants_svg_const__WEBPACK_IMPORTED_MODULE_4__.SvgConst.FlagPath
      );
      this.btnFilterTODO.tooltip = "TODO only";
      this.btnFilterTODO.color = "green";
      this.btnFilterTODO.toggleOn(false);
      this.btnFilterTODO.addEventListener("click", () => {
        this.#filterTreeViewItem();
      });
      return this.btnFilterTODO;
    }

    /**
     * フィルタボタンを作成する。
     * @returns ボタン
     */
    #createFilterButton() {
      const btn = this.#createToggleButton("item-filter", _constants_svg_const__WEBPACK_IMPORTED_MODULE_4__.SvgConst.FilterPaths);
      btn.color = "green";
      btn.toggleOn(false);
      btn.tooltip = "テキストフィルタ";

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
        } else if (flag.isNotDueDate) {
          isDisabled = !this.btnFilterMemo.toggle;
        } else {
          isDisabled = !this.btnFilterStarted.toggle;
        }

        // TO.DOフィルター
        if (!isDisabled && this.btnFilterTODO.toggle) {
          isDisabled = !task.hasTodo;
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
          // いったん、非表示クラスを削除
          d.classList.remove("disabled");

          // グループにネストされている要素を取得
          const items = d.querySelector(".group-items");

          // ネスト要素のうち、非表示になっていないタスクの数をカウント
          const cnt = Array.from(items.querySelectorAll(".task")).filter(
            (t) => !t.classList.contains("disabled")
          ).length;

          if (cnt === 0) {
            // 有効タスクなしの場合、対象グループ非表示にする
            if (this.searchText) {
              d.classList.add("disabled");
            }
          } else {
            // 有効タスクがある場合、グループを開きネスト要素に対してさらにフィルタをかける
            if (this.searchText) {
              d.open = true;
            }
            filterGroup(items);
          }
        });
      };

      // ルート要素を起点にグループフィルタを実行
      filterGroup(this.root);
    }

    // *******************************************************
    // * 名刺管理
    // *******************************************************
    /**
     * 名刺管理を初期化し、Shadow DOMに追加します。
     * @private
     */
    #addBizCard() {
      const icon = _utils_svg_utils__WEBPACK_IMPORTED_MODULE_6__.SvgUtils.createIcon(_constants_svg_const__WEBPACK_IMPORTED_MODULE_4__.SvgConst.CardsPath);
      const area = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__.ElmUtils.createElm("div");
      const p = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__.ElmUtils.createElm("p");

      p.innerText = "名刺管理";
      area.appendChild(icon);
      area.appendChild(p);

      this.bizCard.appendChild(area);

      area.addEventListener("click", () => {
        this.dispatchEvent(
          _utils_event_utils__WEBPACK_IMPORTED_MODULE_2__.EventUtils.createEvent(_constants_event_const__WEBPACK_IMPORTED_MODULE_3__.EventConst.CHANGE_BIZ_CARD_EVENT_NAME)
        );
      });
    }

    // *******************************************************
    // * 遅延タスク一覧
    // *******************************************************
    #adddelayTask() {
      const icon = _utils_svg_utils__WEBPACK_IMPORTED_MODULE_6__.SvgUtils.createIcon(_constants_svg_const__WEBPACK_IMPORTED_MODULE_4__.SvgConst.squareAlertPaths);
      const area = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__.ElmUtils.createElm("div");
      const p = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__.ElmUtils.createElm("p");

      p.innerText = "遅延タスク一覧";
      area.appendChild(icon);
      area.appendChild(p);

      this.delayTask.appendChild(area);

      area.addEventListener("click", () => {
        this.dispatchEvent(
          _utils_event_utils__WEBPACK_IMPORTED_MODULE_2__.EventUtils.createEvent(_constants_event_const__WEBPACK_IMPORTED_MODULE_3__.EventConst.SHOW_DELAY_TASK_EVENT_NAME)
        );
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
     * @param {number} level - 階層レベル
     * @returns {Array<Object>} - 項目データの配列。
     */
    getGroupItemsById(id, level = 0) {
      const details = this.shadowRoot.getElementById(id).closest("details");
      const childElms = getItems(details).children;

      let items = [];
      for (let elm of childElms) {
        const item = elm.querySelector("task-title,group-title");
        if (item) {
          const data = item.getData();
          data.id = item.id;
          data.level = level;
          if (data.type === "task") {
            data.paths = item.paths;
            data.flag = item.flag;
            items.push(data);
          } else {
            items.push(data);
            items = items.concat(this.getGroupItemsById(item.id, level + 1));
          }
        }
      }

      return items;
    }

    /**
     * 遅延タスクの一覧を返却する。
     * @returns {Array<Object>} - 項目データの配列。
     */
    getDelayTaskItems() {
      const tasks = this.root.querySelectorAll("task-title");

      let items = [];
      for (let task of tasks) {
        if (task.flag.isOverDeadline) {
          const data = task.getData();
          data.id = task.id;
          data.level = 0;
          data.paths = task.paths;
          data.flag = task.flag;
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
/* 19 */
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
/* 20 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4);
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
  display: flex;
  right: 1rem;
  bottom: 1rem;
}
.float-area * {
  display: block;
  padding-left: 0.25rem;
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
  height: 35px;
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

.sub-item {
  height: 1.75rem;
  margin: 0 0.5rem;
  font-weight: bold;
}
.sub-item div {
  display: flex;
  align-items: center;
  height: 1.75rem;
  margin-left: 0.1rem;
  transition: 0.2s;
}
.sub-item div .svg-icon {
  width: 1rem;
  height: 1rem;
}
.sub-item div p {
  margin-left: 0.2em;
}
.sub-item div:hover {
  cursor: pointer;
  color: #1f7d53;
  text-decoration: underline;
}

#root {
  width: 100%;
  height: calc(100% - 35px - 3.5rem);
  padding: 0.5rem;
  padding-top: 0.15rem;
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
/* 21 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TaskTitle: () => (/* binding */ TaskTitle)
/* harmony export */ });
/* harmony import */ var _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _utils_svg_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(10);
/* harmony import */ var _constants_svg_const__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6);
/* harmony import */ var _utils_id_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(19);
/* harmony import */ var _utils_event_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(13);
/* harmony import */ var _constants_event_const__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(16);
/* harmony import */ var _utils_date_utils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(22);
/* harmony import */ var _constants_priority_const__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(23);
/* harmony import */ var _style_task_title_css__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(24);











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
      this.shadowRoot.adoptedStyleSheets = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__.ElmUtils.createStylesheet(_style_task_title_css__WEBPACK_IMPORTED_MODULE_8__["default"]);

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
     * TODOフラグの状態ゲッター
     * @returns {string} - TODOフラグ
     */
    get hasTodo() {
      return this._hasTodo;
    }

    /**
     * TODOフラグの状態セッター
     * @param {string} value - 新しいTODOフラグ
     */
    set hasTodo(value) {
      this._hasTodo = value;
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
     * @param {bool} data.hasTodo - タスクのTODO有無
     * @return {void} - なし
     */
    init(data) {
      this.id = data.id || _utils_id_utils__WEBPACK_IMPORTED_MODULE_3__.IdUtils.getUniqueId();
      this.name = data.name || "新規タスク";
      this.duedate = data.duedate || "";
      this.priority = data.priority || "";
      this.status = data.status || "0";
      this.hasTodo = data.hasTodo || false;

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
     * @returns {bool} dataItem.hasTodo - タスクのTODO有無（デフォルトは false）
     */
    getData() {
      const dataItem = {};
      dataItem.id = this.id;
      dataItem.name = this.name || "新規タスク";
      dataItem.type = this.type;
      dataItem.duedate = this.duedate || "";
      dataItem.priority = this.priority || "";
      dataItem.status = this.status || 0;
      dataItem.hasTodo = this.hasTodo || false;

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
      const isNotDueDate = this.duedate === "3000-12-31";

      this._flag = {
        isComplete: isComplete,
        isNotStarted: isNotStarted,
        isOverDeadline: isOverDeadline,
        isNotDueDate: isNotDueDate,
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

      if (isNotDueDate) {
        paths = _constants_svg_const__WEBPACK_IMPORTED_MODULE_2__.SvgConst.SquareMPath; // メモ
      }

      this._paths = paths;
      this.root.appendChild(_utils_svg_utils__WEBPACK_IMPORTED_MODULE_1__.SvgUtils.createIcon(paths));

      // TO.DOフラグ設定
      if (this.hasTodo) {
        const icon = _utils_svg_utils__WEBPACK_IMPORTED_MODULE_1__.SvgUtils.createIcon(_constants_svg_const__WEBPACK_IMPORTED_MODULE_2__.SvgConst.FlagPath);
        icon.classList.add("todo-flag");
        this.root.appendChild(icon);
      }

      // タスク名設定
      const text = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__.ElmUtils.createElm("p", null, ["task-text"]);
      text.innerText = this.name;
      this.root.appendChild(text);

      // ツールチップ設定
      const tooltip = [];
      const dispDueDate = isNotDueDate ? "なし" : this.duedate;
      const dispPriority = _constants_priority_const__WEBPACK_IMPORTED_MODULE_7__.PriorityConst.text(this.priority) || "?";

      tooltip.push(`${this.name}`);
      tooltip.push(`* 期限日：${dispDueDate}`);
      tooltip.push(`* 優先度：${dispPriority}`);
      tooltip.push(`* 進捗率：${this.status}%`);

      this.root.title = tooltip.join("\n");
    }
  }
  customElements.define("task-title", TaskTitle);
}


/***/ }),
/* 22 */
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
   * 文字列を「yyyy-mm-dd」形式の文字列にフォーマットする
   * @param {string} target
   * @returns {string} - "yyyy-mm-dd"形式の日付文字列。
   */
  static formatDateStr = (target) => {
    if (!target || target.length != 8) {
      return "";
    }

    const y = target.slice(0, 4);
    const m = target.slice(4, 6);
    const d = target.slice(6, 8);

    return `${y}-${m}-${d}`;
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

  /**
   * 日付を曜日に変換する
   * @param {string} strDate
   * @returns 曜日
   */
  static getDaysOfWeek(strDate) {
    const date = new Date(strDate);
    const dayOfWeekNumber = date.getDay();
    const daysOfWeek = ["日", "月", "火", "水", "木", "金", "土"];
    return daysOfWeek[dayOfWeekNumber];
  }
}


/***/ }),
/* 23 */
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
/* 24 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4);
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
.task-title .todo-flag {
  color: #0e7405;
}
.task-title:hover .todo-flag, .task-title.selected .todo-flag {
  color: #fffff8;
}
`, ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 25 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GroupTitle: () => (/* binding */ GroupTitle)
/* harmony export */ });
/* harmony import */ var _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _utils_svg_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(10);
/* harmony import */ var _constants_svg_const__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6);
/* harmony import */ var _utils_id_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(19);
/* harmony import */ var _utils_event_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(13);
/* harmony import */ var _constants_event_const__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(16);
/* harmony import */ var _style_group_title_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(26);









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

      this.root.title = this.name;
    }
  }
  customElements.define("group-title", GroupTitle);
}


/***/ }),
/* 26 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `.group-title {
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
/* 27 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ContentsGroup: () => (/* binding */ ContentsGroup)
/* harmony export */ });
/* harmony import */ var _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _utils_svg_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(10);
/* harmony import */ var _constants_svg_const__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6);
/* harmony import */ var _utils_event_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(13);
/* harmony import */ var _constants_event_const__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(16);
/* harmony import */ var _constants_priority_const__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(23);
/* harmony import */ var _style_contents_group_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(28);









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

    /**
     * リスト表示のみとするか設定します。
     * @param {boolean} val - true: リスト表示のみ, false: プロパティとメモを表示
     */
    set isListOnly(val) {
      this.root.classList.toggle("list-only", val);
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
     * @param {string} caption - タイトル
     * @returns {void}
     */
    renderItems(items = [], caption = "タスク一覧") {
      if (items.length === 0) {
        return;
      }

      this.#addEmptyGroupItems();

      this.table.setCaption(_utils_svg_utils__WEBPACK_IMPORTED_MODULE_1__.SvgUtils.createIcon(_constants_svg_const__WEBPACK_IMPORTED_MODULE_2__.SvgConst.TablePaths), caption);

      this.table.header = [
        "ID",
        "ステータス",
        "名称",
        "TODO",
        "優先度",
        "期日",
        "進捗率",
      ];

      const editName = (name, level) => {
        return level == 0 ? name : `+ ${name}`;
      };

      const getNameStyle = (level) => {
        return level == 0 ? "" : `padding-left: ${level}rem`;
      };

      items.forEach((item) => {
        if (item.type === "task") {
          // タスク
          const icon = _utils_svg_utils__WEBPACK_IMPORTED_MODULE_1__.SvgUtils.createIcon(item.paths);
          const priority = _constants_priority_const__WEBPACK_IMPORTED_MODULE_5__.PriorityConst.text(item.priority) || "?";
          const todo = item.hasTodo
            ? _utils_svg_utils__WEBPACK_IMPORTED_MODULE_1__.SvgUtils.createIcon(_constants_svg_const__WEBPACK_IMPORTED_MODULE_2__.SvgConst.FlagPath)
            : "";

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
          this.table.setTdStyle("width: 150px");

          // ステータス
          this.table.addTd();
          this.table.setTdElment(icon);
          this.table.setTdStyle("width: 100px");
          this.table.setTdAlign("center");

          // タスク名
          this.table.addTd();
          this.table.setTdElment(editName(item.name, item.level));
          this.table.setTdStyle(getNameStyle(item.level));
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

          // TO.DO
          this.table.addTd();
          this.table.setTdElment(todo);
          this.table.setTdStyle("width: 80px; color: #0e7405");
          this.table.setTdAlign("center");

          const isNotDueDate = item.duedate !== "3000-12-31" ? false : true;

          // 優先度
          this.table.addTd();
          this.table.setTdElment(isNotDueDate ? "-" : priority);
          this.table.setTdStyle("width: 100px");
          this.table.setTdAlign("center");

          // 期日
          this.table.addTd();
          this.table.setTdElment(isNotDueDate ? "-" : item.duedate);
          this.table.setTdStyle("width: 100px");
          this.table.setTdAlign("center");

          // 進捗率
          this.table.addTd();
          this.table.setTdElment(isNotDueDate ? "-" : `${item.status}%`);
          this.table.setTdStyle("width: 100px");
          this.table.setTdAlign("center");
        } else {
          // グループ
          this.table.appendTr();

          // ID
          this.table.addTd();
          this.table.setTdElment(item.id);
          this.table.setTdStyle("width: 150px");

          // ステータス
          const icon = _utils_svg_utils__WEBPACK_IMPORTED_MODULE_1__.SvgUtils.createIcon(_constants_svg_const__WEBPACK_IMPORTED_MODULE_2__.SvgConst.folderPaths);
          icon.style = "color: #E9762B";

          this.table.addTd();
          this.table.setTdElment(icon);
          this.table.setTdStyle("width: 100px");
          this.table.setTdAlign("center");

          // グループ名
          this.table.addTd();
          this.table.setTdElment(editName(item.name, item.level));
          this.table.setTdStyle(getNameStyle(item.level));
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

          // TO.DO
          this.table.addTd();
          this.table.setTdElment("-");
          this.table.setTdStyle("width: 80px");
          this.table.setTdAlign("center");

          // 優先度
          this.table.addTd();
          this.table.setTdElment("-");
          this.table.setTdStyle("width: 100px");
          this.table.setTdAlign("center");

          // 期日
          this.table.addTd();
          this.table.setTdElment("-");
          this.table.setTdStyle("width: 100px");
          this.table.setTdAlign("center");

          // 進捗率
          this.table.addTd();
          this.table.setTdElment("-");
          this.table.setTdStyle("width: 100px");
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
/* 28 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `#root {
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-rows: 1fr;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 300px 1fr;
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
#root.list-only {
  grid-template-areas: "group-list group-list" "group-list group-list";
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
}
#root.list-only #group-property {
  display: none;
}
#root.list-only #group-memo {
  display: none;
}
#root.list-only #group-list {
  grid-area: group-list;
  margin: 0.75rem;
}
`, ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 29 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ContentsTask: () => (/* binding */ ContentsTask)
/* harmony export */ });
/* harmony import */ var _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _utils_svg_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(10);
/* harmony import */ var _constants_svg_const__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6);
/* harmony import */ var _utils_event_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(13);
/* harmony import */ var _constants_event_const__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(16);
/* harmony import */ var _constants_priority_const__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(23);
/* harmony import */ var _style_contents_task_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(30);









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

      this._historyContents.render(this._taskId.value, data);
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
      this._taskTitle.placeholder = "任意のタスク名";

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
      filedset.headLess = true;

      // 担当者の所属
      const fildsetStaffDiv = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__.ElmUtils.createElm("form-fieldset");
      this._staffDiv = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__.ElmUtils.createElm("form-input", "staff-div");

      fildsetStaffDiv.addItem(this._staffDiv);
      fildsetStaffDiv.icon = _utils_svg_utils__WEBPACK_IMPORTED_MODULE_1__.SvgUtils.createIcon(_constants_svg_const__WEBPACK_IMPORTED_MODULE_2__.SvgConst.WallpaperPaths);
      fildsetStaffDiv.title = "所属";
      fildsetStaffDiv.required = true;
      this._staffDiv.placeholder = "情報システム課";

      // 担当者の氏名
      const fildsetStaffName = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__.ElmUtils.createElm("form-fieldset");
      fildsetStaffName.icon = _utils_svg_utils__WEBPACK_IMPORTED_MODULE_1__.SvgUtils.createIcon(_constants_svg_const__WEBPACK_IMPORTED_MODULE_2__.SvgConst.UserPaths);
      this._staffName = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__.ElmUtils.createElm("form-input", "staff-name");

      fildsetStaffName.addItem(this._staffName);
      fildsetStaffName.title = "氏名";
      fildsetStaffName.required = true;
      this._staffName.placeholder = "日本 太郎";

      // 担当者の連絡先
      const fildsetStaffTel = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__.ElmUtils.createElm("form-fieldset");
      fildsetStaffTel.icon = _utils_svg_utils__WEBPACK_IMPORTED_MODULE_1__.SvgUtils.createIcon(_constants_svg_const__WEBPACK_IMPORTED_MODULE_2__.SvgConst.PhoneCallPaths);
      this._staffTel = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__.ElmUtils.createElm("form-input", "staff-tel");

      fildsetStaffTel.addItem(this._staffTel);
      fildsetStaffTel.title = "連絡先";
      fildsetStaffTel.required = true;
      fildsetStaffTel.isLastNested = true;
      this._staffTel.placeholder = "0123-45-6789";

      // プロパティ画面に追加
      filedset.addItem(fildsetStaffDiv, true);
      filedset.addItem(fildsetStaffName, true);
      filedset.addItem(fildsetStaffTel, true);

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
/* 30 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `#root {
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
/* 31 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ContentsHistory: () => (/* binding */ ContentsHistory)
/* harmony export */ });
/* harmony import */ var _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _utils_svg_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(10);
/* harmony import */ var _constants_svg_const__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6);
/* harmony import */ var _utils_event_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(13);
/* harmony import */ var _constants_event_const__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(16);
/* harmony import */ var _style_contents_history_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(32);








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
      floatBtns.appendChild(this.#createAddPrintButton());

      this.root.appendChild(this.#createAddHisotryButton());

      this.root.appendChild(floatBtns);

      // Shado Domにrootを追加
      this.shadowRoot.innerHTML = "";
      this.shadowRoot.appendChild(this.root);
    }

    /**
     * 履歴追加ボタンを作成する。
     * @returns HTMLElement
     */
    #createAddHisotryButton() {
      const addHistoryBtn = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__.ElmUtils.createElm("svg-btn", "add-hisory");
      addHistoryBtn.iconPaths = _constants_svg_const__WEBPACK_IMPORTED_MODULE_2__.SvgConst.plusPaths;
      addHistoryBtn.isSquare = true;
      addHistoryBtn.height = "5rem";
      addHistoryBtn.tooltip = "履歴を追加";

      // クリックイベント
      addHistoryBtn.addEventListener("click", () => {
        this.#addHistoryItem({});
        this.dispatchEvent(
          _utils_event_utils__WEBPACK_IMPORTED_MODULE_3__.EventUtils.createEvent(_constants_event_const__WEBPACK_IMPORTED_MODULE_4__.EventConst.ADD_HISTORY_CONTENTS_EVENT_NAME)
        );
      });

      this.addHistoryBtn = addHistoryBtn;

      return addHistoryBtn;
    }

    /**
     * 履歴印刷ボタンを作成する。
     * @returns HTMLElement
     */
    #createAddPrintButton() {
      const addPrintBtn = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__.ElmUtils.createElm("svg-btn", "print-hisory");
      addPrintBtn.iconPaths = _constants_svg_const__WEBPACK_IMPORTED_MODULE_2__.SvgConst.PrinterPath;
      addPrintBtn.isCircle = true;
      addPrintBtn.tooltip = "印刷";

      // クリックイベント
      addPrintBtn.addEventListener("click", () => {
        this.dispatchEvent(
          _utils_event_utils__WEBPACK_IMPORTED_MODULE_3__.EventUtils.createEvent(_constants_event_const__WEBPACK_IMPORTED_MODULE_4__.EventConst.PRINT_TASK_EVENT_NAME)
        );
      });

      return addPrintBtn;
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
    render(id, data) {
      this.taskId = id;

      data.historyData.forEach((item) => {
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
      this.addHistoryBtn.before(historyItem);

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
/* 32 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `.contents-history {
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
/* 33 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ContentsHistoryItem: () => (/* binding */ ContentsHistoryItem)
/* harmony export */ });
/* harmony import */ var _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _utils_date_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(22);
/* harmony import */ var _utils_id_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(19);
/* harmony import */ var _utils_svg_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(10);
/* harmony import */ var _constants_svg_const__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6);
/* harmony import */ var _utils_event_utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(13);
/* harmony import */ var _constants_event_const__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(16);
/* harmony import */ var _style_contents_history_item_css__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(34);










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
      this.#addToDoButton();
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
      this._todoBtn.toggleOn(data.todo || false);

      this.root.classList.toggle("todo-flag", this._todoBtn.toggle);
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
        todo: this._todoBtn.toggle,
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
      this._text.placeholder = "履歴内容";
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

    // **************************************************
    // * TODOフラグボタン
    // **************************************************
    #addToDoButton() {
      const todoBtn = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__.ElmUtils.createElm("svg-btn", "todo-item");
      todoBtn.iconPaths = _constants_svg_const__WEBPACK_IMPORTED_MODULE_4__.SvgConst.FlagPath;
      todoBtn.size = "1rem";
      todoBtn.toggle = true;
      todoBtn.color = "green";
      todoBtn.tooltip = "TODO";

      this.footer.appendChild(todoBtn);
      this._todoBtn = todoBtn;

      todoBtn.addEventListener("click", () => {
        this.root.classList.toggle("todo-flag", todoBtn.toggle);
        this.dispatchEvent(
          _utils_event_utils__WEBPACK_IMPORTED_MODULE_5__.EventUtils.createEvent(_constants_event_const__WEBPACK_IMPORTED_MODULE_6__.EventConst.CHANGE_FORM_ITEM_EVENT_NAME)
        );
      });
    }
  }
  customElements.define("contents-history-item", ContentsHistoryItem);
}


/***/ }),
/* 34 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `.history-item {
  background-color: #fffff8;
  border-radius: 0.35rem;
  border: 1px solid #6f6f6f;
  padding: 0.35rem;
  margin-bottom: 0.6rem;
}
.history-item.todo-flag {
  color: #0e7405;
  border-left: 0.35rem solid #0e7405;
}
.history-item #footer {
  position: relative;
  margin-top: 0.25rem;
  height: 1rem;
}
.history-item #footer #todo-item {
  position: absolute;
  left: 0.1rem;
  outline: none;
}
.history-item #footer #history-date {
  position: absolute;
  top: 0.05;
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
/* 35 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BizCard: () => (/* binding */ BizCard)
/* harmony export */ });
/* harmony import */ var _style_biz_card_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(36);
/* harmony import */ var _utils_elm_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1);
/* harmony import */ var _utils_svg_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(10);
/* harmony import */ var _constants_svg_const__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6);






/**
 * BizCard コンポーネント
 * @class BizCard
 * @extends {HTMLElement}
 */
function BizCard() {
  class BizCard extends HTMLElement {
    /**
     * コンストラクタ
     * @return {void}
     */
    constructor() {
      super();

      // Shadow DOMをオープンモードでアタッチ
      this.attachShadow({ mode: "open" });

      // CSSを適用
      this.shadowRoot.adoptedStyleSheets = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_1__.ElmUtils.createStylesheet(_style_biz_card_css__WEBPACK_IMPORTED_MODULE_0__["default"]);

      // grid作成
      this.root = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_1__.ElmUtils.createElm("div", "root");
      this.bcHead = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_1__.ElmUtils.createElm("div", "bc-header");
      this.bcList = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_1__.ElmUtils.createElm("div", "bc-list", ["scroll"]);
      this.bcMain = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_1__.ElmUtils.createElm("div", "bc-main", ["scroll"]);

      this.root.appendChild(this.bcHead);
      this.root.appendChild(this.bcList);
      this.root.appendChild(this.bcMain);

      this.shadowRoot.innerHTML = "";
      this.shadowRoot.appendChild(this.root);

      this.#addMember();
      this.#addContact();
      this.#addMailAddress();
      this.#addCompanyName();
      this.#addAddress();
      this.#addMemo();

      this.#test();
    }

    // **************************************************
    // * 担当者
    // **************************************************
    /**
     * 新しい担当者を作成し、ルートエレメントに追加するメソッド。
     */
    #addMember() {
      /**
       * 担当者の漢字氏名
       * @returns {HTMLElement} - 漢字氏名のフィールドセット
       */
      const kanjiName = () => {
        const filedset = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_1__.ElmUtils.createElm("form-fieldset");
        filedset.icon = _utils_svg_utils__WEBPACK_IMPORTED_MODULE_2__.SvgUtils.createIcon(_constants_svg_const__WEBPACK_IMPORTED_MODULE_3__.SvgConst.UserPaths);
        filedset.required = true;
        filedset.title = "漢字氏名";

        this._memberNameKanji = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_1__.ElmUtils.createElm(
          "form-input",
          "member-name-kanji"
        );
        this._memberNameKanji.placeholder = "日本 太郎";

        filedset.addItem(this._memberNameKanji);

        return filedset;
      };

      /**
       * 担当者のカナ氏名
       * @returns {HTMLElement} - カナ氏名のフィールドセット
       */
      const kanaName = () => {
        const filedset = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_1__.ElmUtils.createElm("form-fieldset");
        filedset.icon = _utils_svg_utils__WEBPACK_IMPORTED_MODULE_2__.SvgUtils.createIcon(_constants_svg_const__WEBPACK_IMPORTED_MODULE_3__.SvgConst.UserPaths);
        filedset.required = true;
        filedset.title = "カナ氏名";

        this._memberNameKane = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_1__.ElmUtils.createElm(
          "form-input",
          "member-name-kana"
        );
        this._memberNameKane.placeholder = "ニホン タロウ";

        filedset.addItem(this._memberNameKane);

        return filedset;
      };

      /**
       * 担当者の役職
       * @returns {HTMLElement} - 役職のフィールドセット
       */
      const position = () => {
        const filedset = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_1__.ElmUtils.createElm("form-fieldset");
        filedset.icon = _utils_svg_utils__WEBPACK_IMPORTED_MODULE_2__.SvgUtils.createIcon(_constants_svg_const__WEBPACK_IMPORTED_MODULE_3__.SvgConst.TiePaths);
        filedset.title = "役職";
        filedset.isLastNested = true;

        this._memberPosition = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_1__.ElmUtils.createElm(
          "form-input",
          "member-position"
        );
        this._memberPosition.placeholder = "係員";

        filedset.addItem(this._memberPosition);

        return filedset;
      };

      // フィールドセットに登録
      const filedset = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_1__.ElmUtils.createElm("form-fieldset");
      filedset.headLess = true;
      filedset.addItem(kanjiName(), true);
      filedset.addItem(kanaName(), true);
      filedset.addItem(position(), true);

      this.bcMain.appendChild(filedset);
    }

    // **************************************************
    // * 会社名
    // **************************************************
    /**
     * 新しい会社名を作成し、ルートエレメントに追加するメソッド。
     * @return {void}
     */
    #addCompanyName() {
      const filedset = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_1__.ElmUtils.createElm("form-fieldset");
      filedset.icon = _utils_svg_utils__WEBPACK_IMPORTED_MODULE_2__.SvgUtils.createIcon(_constants_svg_const__WEBPACK_IMPORTED_MODULE_3__.SvgConst.BuildingsPath);
      filedset.title = "会社名";
      filedset.required = true;

      this._companyName = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_1__.ElmUtils.createElm("form-input", "company-name");
      this._companyName.placeholder = "株式会社ｘｘｘｘ";

      filedset.addItem(this._companyName);
      this.bcMain.appendChild(filedset);
    }

    // **************************************************
    // * 連絡先
    // **************************************************
    /**
     * 新しい連絡先を作成し、ルートエレメントに追加するメソッド。
     */
    #addContact() {
      /**
       * 固定電話
       * @returns {HTMLElement} - 固定電話のフィールドセット
       */
      const phoneNumber = () => {
        const filedset = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_1__.ElmUtils.createElm("form-fieldset");
        filedset.icon = _utils_svg_utils__WEBPACK_IMPORTED_MODULE_2__.SvgUtils.createIcon(_constants_svg_const__WEBPACK_IMPORTED_MODULE_3__.SvgConst.PhoneCallPaths);
        filedset.required = true;
        filedset.title = "固定電話";

        this._phoneNumber = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_1__.ElmUtils.createElm("form-input", "phone-number");
        this._phoneNumber.placeholder = "0123-45-6789";

        filedset.addItem(this._phoneNumber);

        return filedset;
      };

      /**
       * 携帯電話
       * @returns {HTMLElement} - 携帯電話のフィールドセット
       */
      const mobilePhoneNumber = () => {
        const filedset = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_1__.ElmUtils.createElm("form-fieldset");
        filedset.icon = _utils_svg_utils__WEBPACK_IMPORTED_MODULE_2__.SvgUtils.createIcon(_constants_svg_const__WEBPACK_IMPORTED_MODULE_3__.SvgConst.DeviceMobilePath);
        filedset.title = "携帯電話";

        this._mobilephoneNumber = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_1__.ElmUtils.createElm(
          "form-input",
          "mobile-phone-number"
        );
        this._mobilephoneNumber.placeholder = "090-1234-5678";

        filedset.addItem(this._mobilephoneNumber);

        return filedset;
      };

      /**
       * FAX
       * @returns {HTMLElement} - FAXのフィールドセット
       */
      const faxNumber = () => {
        const filedset = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_1__.ElmUtils.createElm("form-fieldset");
        filedset.icon = _utils_svg_utils__WEBPACK_IMPORTED_MODULE_2__.SvgUtils.createIcon(_constants_svg_const__WEBPACK_IMPORTED_MODULE_3__.SvgConst.PrinterPath);
        filedset.title = "FAX";
        filedset.isLastNested = true;

        this._faxNumber = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_1__.ElmUtils.createElm("form-input", "fax-number");
        this._faxNumber.placeholder = "0123-45-6789";

        filedset.addItem(this._faxNumber);

        return filedset;
      };

      // フィールドセットに登録
      const filedset = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_1__.ElmUtils.createElm("form-fieldset");
      filedset.headLess = true;
      filedset.addItem(phoneNumber(), true);
      filedset.addItem(mobilePhoneNumber(), true);
      filedset.addItem(faxNumber(), true);

      this.bcMain.appendChild(filedset);
    }

    // **************************************************
    // * メールアドレス
    // **************************************************
    /**
     * 新しいメールアドレス入力欄を作成し、ルートエレメントに追加するメソッド。
     */
    #addMailAddress() {
      const filedset = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_1__.ElmUtils.createElm("form-fieldset");
      filedset.icon = _utils_svg_utils__WEBPACK_IMPORTED_MODULE_2__.SvgUtils.createIcon(_constants_svg_const__WEBPACK_IMPORTED_MODULE_3__.SvgConst.MailPath);
      filedset.title = "メールアドレス";
      filedset.required = true;

      this._mailAddress = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_1__.ElmUtils.createElm("form-input", "mail-address");
      this._mailAddress.placeholder = "xxxxxx@hoge.co.jp";

      filedset.addItem(this._mailAddress);
      this.bcMain.appendChild(filedset);
    }

    // **************************************************
    // * 住所
    // **************************************************
    #addAddress() {
      /**
       * 郵便番号
       * @returns {HTMLElement} - 郵便番号のフィールドセット
       */
      const postCode = () => {
        const filedset = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_1__.ElmUtils.createElm("form-fieldset");
        filedset.icon = _utils_svg_utils__WEBPACK_IMPORTED_MODULE_2__.SvgUtils.createIcon(_constants_svg_const__WEBPACK_IMPORTED_MODULE_3__.SvgConst.PostCodePath);
        filedset.title = "郵便番号";
        filedset.width = "100px";

        this._postCode = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_1__.ElmUtils.createElm("form-input", "post-code");
        this._postCode.placeholder = "123-4567";

        filedset.addItem(this._postCode);

        return filedset;
      };

      /**
       * 住所
       * @returns {HTMLElement} - 住所のフィールドセット
       */
      const address = () => {
        const filedset = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_1__.ElmUtils.createElm("form-fieldset");
        filedset.icon = _utils_svg_utils__WEBPACK_IMPORTED_MODULE_2__.SvgUtils.createIcon(_constants_svg_const__WEBPACK_IMPORTED_MODULE_3__.SvgConst.MailBoxPath);
        filedset.title = "住所";
        filedset.isLastNested = true;

        this._address = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_1__.ElmUtils.createElm("form-input", "address");
        this._address.placeholder = "東京都千代田区丸の内1-1-1";

        filedset.addItem(this._address);

        return filedset;
      };

      // フィールドセットに登録
      const filedset = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_1__.ElmUtils.createElm("form-fieldset");
      filedset.headLess = true;
      filedset.addItem(postCode());
      filedset.addItem(address(), true);

      this.bcMain.appendChild(filedset);
    }

    // **************************************************
    // * メモ
    // **************************************************

    /**
     * メモを追加します。
     * @private
     */
    #addMemo() {
      const filedset = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_1__.ElmUtils.createElm("form-fieldset");
      filedset.icon = _utils_svg_utils__WEBPACK_IMPORTED_MODULE_2__.SvgUtils.createIcon(_constants_svg_const__WEBPACK_IMPORTED_MODULE_3__.SvgConst.WitingPaths);
      filedset.title = "メモ";

      this._memo = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_1__.ElmUtils.createElm("form-textarea", "memo");
      this._memo.rows = 8;
      this._memo.placeholder = "自由記述";

      filedset.addItem(this._memo);
      this.bcMain.appendChild(filedset);
    }

    #test() {
      this.#addListItem("list-item-1", {
        name: "テスト １郎",
        company: "日本システムズ",
      });
      this.#addListItem("list-item-2", {
        name: "テスト ２郎",
        company: "日本システムズ",
      });
      this.#addListItem("list-item-3", {
        name: "テスト ３郎",
        company: "日本システムズ",
      });
      this.#addListItem("list-item-4", {
        name: "テスト ４郎",
        company: "日本システムズ",
      });
      this.#addListItem("list-item-5", {
        name: "テスト ５郎",
        company: "日本システムズ",
      });
      this.#addListItem("list-item-6", {
        name: "テスト ６郎",
        company: "日本システムズ",
      });
      this.#addListItem("list-item-7", {
        name: "テスト ７郎",
        company: "日本システムズ",
      });
      this.#addListItem("list-item-8", {
        name: "テスト ８郎",
        company: "日本システムズ",
      });
      this.#addListItem("list-item-9", {
        name: "テスト ９郎",
        company: "日本システムズ",
      });
      this.#addListItem("list-item-10", {
        name: "テスト １０郎",
        company: "日本システムズ",
      });

      const listItem = this.shadowRoot.getElementById("list-item-1");
      listItem.classList.add("selected");
    }

    /**
     * 名刺リストアイテムを追加する
     * @param {string} id - 名刺リストアイテムのID
     * @param {object} data - 名刺リストアイテムのデータ
     * @return {void}
     */
    #addListItem(id, data = {}) {
      const item = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_1__.ElmUtils.createElm("div", null, ["item"]);
      const name = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_1__.ElmUtils.createElm("p", null, ["name"]);
      const comp = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_1__.ElmUtils.createElm("p", null, ["company"]);

      item.id = id;
      item.appendChild(name);
      item.appendChild(comp);

      name.innerText = data.name;
      comp.innerText = data.company;

      this.bcList.appendChild(item);
    }
  }
  customElements.define("biz-card", BizCard);
}


/***/ }),
/* 36 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `#root {
  display: grid;
  grid-template-columns: 250px 1fr;
  grid-template-rows: 40px 1fr;
  grid-auto-columns: 1fr;
  grid-auto-rows: 1fr;
  gap: 0em 0em;
  grid-auto-flow: row;
  grid-template-areas: "bc-head bc-head" "bc-list bc-main";
  height: 100vh;
  padding: 1.5rem 2rem;
  transform: 0.2s;
}
#root #bc-header {
  grid-area: bc-head;
  background-color: #3c3c3c;
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
}
#root #bc-list {
  grid-area: bc-list;
  background-color: #cfcfcf;
  border-bottom-left-radius: 0.5rem;
}
#root #bc-list .item {
  padding: 0.5rem 0.5rem;
  padding-bottom: 0.85rem;
  border-left: 0.5rem solid transparent;
  color: #8f8f8f;
  cursor: pointer;
}
#root #bc-list .item.selected {
  border-color: #ffb200;
  background-color: #fffff8;
  color: #1f1f1f;
}
#root #bc-list .item:hover {
  border-color: #ffb200;
  background-color: #dfdfdf;
  color: #1f1f1f;
}
#root #bc-list .item .name {
  font-size: 1rem;
  font-weight: bold;
}
#root #bc-list .item .company {
  font-size: 0.85rem;
  padding-top: 0.25rem;
}
#root #bc-main {
  grid-area: bc-main;
  background-color: #fffff8;
  border-bottom-right-radius: 0.5rem;
  padding: 1rem 2rem;
}
`, ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 37 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FormFieldset: () => (/* binding */ FormFieldset)
/* harmony export */ });
/* harmony import */ var _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _style_form_fieldset_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(38);




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
     * フィールドセットのlegendにheadlessクラスを設定します。
     * @param {bool} val - クラスを追加するかどうかのブール値。
     * @return {void}
     */
    set headLess(val) {
      this.legend.classList.toggle("head-less", val);
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
     * ネスト項目の最終項目であるか否かを設定
     * @param {bool} val 設定値
     */
    set isLastNested(val) {
      this.fieldset.classList.toggle("is-last-nested", val);
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
     * フィールドセットの幅を設定します。
     * @param {string} val - 幅の値（例: "100px", "50%"など）。
     * @return {void}
     */
    set width(val) {
      this.fieldset.style.width = val;
    }

    /**
     * 指定されたアイテムをフィールドセットに追加します。
     * @param {HTMLElement} item - 追加するアイテム。
     * @param {boolean} isFlex1 - アイテムをflex1として追加するかどうか。
     */
    addItem(item, isFlex1 = false) {
      if (item.tagName === "FORM-FIELDSET") {
        this.fieldset.classList.add("nestedRoot");
        item.nested = true;
        if (isFlex1) {
          item.style = "flex: 1;";
        }
      }
      this.fieldset.appendChild(item);
    }
  }
  customElements.define("form-fieldset", FormFieldset);
}


/***/ }),
/* 38 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `fieldset {
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
fieldset legend.head-less {
  display: none;
}
fieldset.nestedRoot {
  display: flex;
}
fieldset.nested {
  margin-top: 0.25rem;
  margin-right: 0.35rem;
  padding-bottom: 0;
}
fieldset.nested.is-last-nested {
  margin-right: 0;
}
`, ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 39 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FormInput: () => (/* binding */ FormInput)
/* harmony export */ });
/* harmony import */ var _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _utils_event_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(13);
/* harmony import */ var _constants_event_const__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(16);
/* harmony import */ var _style_form_input_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(40);






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
  }
  customElements.define("form-input", FormInput);
}


/***/ }),
/* 40 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `input[type=text] {
  outline: none;
  background-color: #fffff8;
  border: 1px solid #6f6f6f;
  border-radius: 0.25rem;
  line-height: 1.5rem;
  padding: 0.1rem 0.25rem;
  width: 100%;
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
/* 41 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FormDate: () => (/* binding */ FormDate)
/* harmony export */ });
/* harmony import */ var _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _utils_event_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(13);
/* harmony import */ var _constants_event_const__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(16);
/* harmony import */ var _style_form_date_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(42);
/* harmony import */ var _constants_svg_const__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6);







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
/* 42 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `input[type=date] {
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
/* 43 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FormTextarea: () => (/* binding */ FormTextarea)
/* harmony export */ });
/* harmony import */ var _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _utils_event_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(13);
/* harmony import */ var _constants_event_const__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(16);
/* harmony import */ var _style_form_textarea_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(44);
/* harmony import */ var _utils_svg_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(10);
/* harmony import */ var _constants_svg_const__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(6);








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
        li.title = "copy to clipboard";

        const regex = /\(([^)]+)\)\[([^\]]+)\]/;
        const match = item.match(regex);
        let dispStr;
        let codeStr;

        // 正規表現にマッチした場合、表示文字列とコードを取得
        if (match) {
          dispStr = match[1].trim();
          codeStr = match[2].trim();
        } else {
          codeStr = item.trim();
          dispStr = item.trim();
        }

        // クリップボードにコピー
        icon = _utils_svg_utils__WEBPACK_IMPORTED_MODULE_4__.SvgUtils.createIcon(_constants_svg_const__WEBPACK_IMPORTED_MODULE_5__.SvgConst.CopyPaths);
        li.addEventListener("click", (e) => {
          e.preventDefault();
          e.stopPropagation();
          navigator.clipboard.writeText(codeStr);

          const toast = document.createElement("toast-item");
          this.shadowRoot.appendChild(toast);
          toast.show("Copied to Clipboard");
        });

        li.appendChild(icon);
        li.appendChild(document.createTextNode(dispStr));
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
/* 44 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `.hidden {
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
/* 45 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FormTable: () => (/* binding */ FormTable)
/* harmony export */ });
/* harmony import */ var _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _utils_svg_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(10);
/* harmony import */ var _constants_svg_const__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6);
/* harmony import */ var _style_form_table_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(46);






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
     * Td要素のスタイルを設定します。
     * @param {string} style
     */
    setTdStyle(style) {
      this.td.style = style;
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
/* 46 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `#root {
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
#root table tbody tr {
  transition: 0.1s;
}
#root table tbody tr:nth-child(even) td {
  background-color: #eeeeee;
}
#root table tbody tr:hover td {
  background-color: #fcb87a;
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
/* 47 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FormRadio: () => (/* binding */ FormRadio)
/* harmony export */ });
/* harmony import */ var _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _utils_event_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(13);
/* harmony import */ var _constants_event_const__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(16);
/* harmony import */ var _style_form_radio_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(48);






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
/* 48 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `input[type=radio] {
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


/***/ }),
/* 49 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ToastItem: () => (/* binding */ ToastItem)
/* harmony export */ });
/* harmony import */ var _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _style_toast_item_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(50);




/**
 * TopPage コンポーネント
 * @class TopPage
 * @extends {HTMLElement}
 */
function ToastItem() {
  class ToastItem extends HTMLElement {
    /**
     * コンストラクタ
     * @constructor
     * @returns {void}
     * @description
     * Shadow DOM をオープンモードでアタッチし、CSSを適用し、要素を作成します。
     */
    constructor() {
      super();

      // Shadow DOMをオープンモードでアタッチ
      this.attachShadow({ mode: "open" });
      this.shadowRoot.innerHTML = "";

      // CSSを適用
      this.shadowRoot.adoptedStyleSheets = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__.ElmUtils.createStylesheet(_style_toast_item_css__WEBPACK_IMPORTED_MODULE_1__["default"]);

      // 要素作成
      this.root = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__.ElmUtils.createElm("div", "root");
      this.msg = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__.ElmUtils.createElm("div", "msg");

      this.root.appendChild(this.msg);

      this.shadowRoot.appendChild(this.root);
    }

    /**
     * トーストを表示する
     * @param {string} messageText - 表示するメッセージ
     */
    show(messageText) {
      this.msg.innerText = messageText;

      // クラスを付与してアニメーションを開始
      requestAnimationFrame(() => {
        this.root.classList.add("show");
      });

      // 一定時間後にクラスを削除して非表示にする
      setTimeout(() => {
        this.root.classList.remove("show");
        setTimeout(() => {
          this.remove();
        }, 300); // CSSのtransition時間と一致させる
      }, 2000); // 表示時間
    }
  }
  customElements.define("toast-item", ToastItem);
}


/***/ }),
/* 50 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `#root {
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  z-index: calc(infinity);
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
  pointer-events: none;
  background-color: #333;
  color: #fffffb;
  font-size: 0.9rem;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
}
#root.show {
  opacity: 1;
  transform: translateY(0);
}
`, ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 51 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PrintViewer: () => (/* binding */ PrintViewer)
/* harmony export */ });
/* harmony import */ var _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _utils_date_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(22);
/* harmony import */ var _constants_priority_const__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(23);
/* harmony import */ var _style_print_viewer_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(52);






/**
 * PrintViewer コンポーネント
 * @class PrintViewer
 * @extends {HTMLElement}
 */
function PrintViewer() {
  class PrintViewer extends HTMLElement {
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
      this.shadowRoot.adoptedStyleSheets = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__.ElmUtils.createStylesheet(_style_print_viewer_css__WEBPACK_IMPORTED_MODULE_3__["default"]);

      // 要素作成
      this.root = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__.ElmUtils.createElm("div", "root");
      this.viewer = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__.ElmUtils.createElm("div", "viewer");

      this.root.appendChild(this.viewer);
      this.shadowRoot.appendChild(this.root);

      window.print();
    }

    /**
     * 印刷領域を描画する。
     * @param {object} data
     * @param {string} id
     */
    render(data, id) {
      const taskData = data.taskData;
      const historyData = data.historyData;
      this.viewer.appendChild(this.#createHeader(1, taskData.title));

      this.viewer.appendChild(this.#createHeader(2, "1.説明"));
      this.viewer.appendChild(this.#createMemo(taskData.memo));

      this.viewer.appendChild(this.#createHeader(2, "2.タスク情報"));
      this.viewer.appendChild(this.#createProperty(id, taskData));

      this.viewer.appendChild(this.#createHeader(2, "3.履歴"));
      this.viewer.appendChild(this.#createHistoryContents(historyData));
    }

    /**
     * ヘッダを作成する
     * @param {string} level
     * @param {string} text
     * @returns header
     */
    #createHeader(level, text) {
      const h = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__.ElmUtils.createElm(`h${level}`);
      h.innerText = text;
      return h;
    }

    /**
     * メモを作成する。
     * @param {string} text
     * @returns div
     */
    #createMemo(text) {
      const div = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__.ElmUtils.createElm("div", null, ["memo"]);
      div.innerText = text;
      return div;
    }

    /**
     * リストコンテンツを作成する
     * @param {string} index
     * @param {object} text
     */
    #createItem(index, text) {
      const contents = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__.ElmUtils.createElm("tr", null, ["item"]);
      const indexItem = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__.ElmUtils.createElm("td", null, ["index"]);
      const contentItem = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__.ElmUtils.createElm("td", null, ["content"]);

      indexItem.innerText = index;

      if (typeof text === "string") {
        contentItem.innerText = text;
      } else {
        contentItem.appendChild(text);
      }

      contents.appendChild(indexItem);
      contents.appendChild(contentItem);

      return contents;
    }

    /**
     * タスク情報を作成する
     * @param {string} id
     * @param {object} taskData
     */
    #createProperty(id, taskData) {
      /**
       * 開始日
       * @returns {object}
       * */
      const startDate = () => {
        const str = _utils_date_utils__WEBPACK_IMPORTED_MODULE_1__.DateUtils.formatDateStr(id.substring(0, 8));
        const date = _utils_date_utils__WEBPACK_IMPORTED_MODULE_1__.DateUtils.parseDate(str);
        const dispDate = _utils_date_utils__WEBPACK_IMPORTED_MODULE_1__.DateUtils.formatDate(date, "{yyyy}-{MM}-{dd}");
        const weekday = _utils_date_utils__WEBPACK_IMPORTED_MODULE_1__.DateUtils.getDaysOfWeek(date);

        return this.#createItem("作成日", `${dispDate}(${weekday})`);
      };

      /**
       * 期限日
       * @returns {object}
       */
      const dueDate = () => {
        const dispDate = taskData.dueDate;
        const weekday = _utils_date_utils__WEBPACK_IMPORTED_MODULE_1__.DateUtils.getDaysOfWeek(dispDate);

        return this.#createItem("期限日", `${dispDate}(${weekday})`);
      };

      /**
       * 担当者
       * @returns {object}
       */
      const staff = () => {
        return this.#createItem(
          "担当者",
          `[${taskData.staffDiv}] ${taskData.staffName} (${taskData.staffTel})`
        );
      };

      /**
       * 優先度
       * @returns {object}
       */
      const priority = () => {
        return this.#createItem(
          "優先度",
          _constants_priority_const__WEBPACK_IMPORTED_MODULE_2__.PriorityConst.text(taskData.priority) || "?"
        );
      };

      /**
       * 進捗率
       * @returns {object}
       */
      const status = () => {
        return this.#createItem("進捗率", `${taskData.status}%`);
      };

      /**
       * 配列を箇条書きアイテムに変換する
       * @param {*} items
       * @returns
       */
      const convertUL = (items) => {
        const ul = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__.ElmUtils.createElm("ul");
        items.forEach((item) => {
          const li = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__.ElmUtils.createElm("li");
          li.innerText = item;
          ul.appendChild(li);
        });
        return ul;
      };

      /**
       * フォルダパス
       * @returns {object}
       */
      const folderpath = () => {
        return this.#createItem(
          "作業フォルダ",
          convertUL(taskData.folderpath.split("\n"))
        );
      };

      /**
       * URL
       * @returns {object}
       */
      const url = () => {
        return this.#createItem("関連URL", convertUL(taskData.url.split("\n")));
      };

      const table = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__.ElmUtils.createElm("table");
      const tbody = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__.ElmUtils.createElm("tbody");

      tbody.appendChild(startDate());
      tbody.appendChild(dueDate());
      tbody.appendChild(staff());
      tbody.appendChild(priority());
      tbody.appendChild(status());
      tbody.appendChild(folderpath());
      tbody.appendChild(url());

      table.appendChild(tbody);
      return table;
    }

    /**
     * 履歴アイテムを作成する
     * @param {object} historyData
     * @returns
     */
    #createHistoryContents(historyData) {
      const table = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__.ElmUtils.createElm("table");
      const tbody = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__.ElmUtils.createElm("tbody");

      historyData.forEach((item) => {
        const date = item.date.split("T");
        const datetime = `${date[0]}(${_utils_date_utils__WEBPACK_IMPORTED_MODULE_1__.DateUtils.getDaysOfWeek(date[0])}) ${date[1]}`;

        const tr = this.#createItem(datetime, item.text);
        tr.classList.add("list");

        tbody.appendChild(tr);
      });

      table.appendChild(tbody);
      return table;
    }
  }
  customElements.define("print-viewer", PrintViewer);
}


/***/ }),
/* 52 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `#root {
  position: relative;
  background-color: #d4f1ef;
  height: 100vh;
  width: 100%;
}
#root #viewer {
  display: none;
}

@media print {
  #root {
    background-color: #ffffff;
  }
  #root #border {
    display: none;
  }
  #root #viewer {
    display: block;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
    width: 210mm;
    margin: 0 auto;
  }
  #root #viewer h1 {
    font-size: 1.5rem;
    font-weight: bold;
    word-break: break-all;
    width: 100%;
    padding-left: 5px;
    border-left: 10px solid #003092;
  }
  #root #viewer h2 {
    font-size: 1.25rem;
    font-weight: bold;
    word-break: break-all;
    padding-left: 5px;
    border-left: 10px solid #003092;
    margin-top: 1.35rem;
    margin-bottom: 0.75rem;
  }
  #root #viewer .memo {
    word-break: break-all;
    width: 210mm;
  }
  #root #viewer tbody tr {
    border-bottom: 1px solid #8f8f8f;
  }
  #root #viewer tbody tr.list:nth-of-type(even) {
    background-color: #fff5e4 !important;
  }
  #root #viewer tbody tr td {
    padding: 0.5rem;
  }
  #root #viewer tbody tr td.index {
    width: 50mm;
  }
  #root #viewer tbody tr td.content {
    word-break: break-all;
    width: 170mm;
    line-height: 1rem;
  }
  #root #viewer tbody tr td ul {
    margin-left: 1rem;
  }
  #root #viewer tbody tr td ul li {
    list-style-type: circle;
  }
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
/* harmony import */ var _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _components_task_memo_task_memo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5);
/* harmony import */ var _components_print_viewer_print_viewer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(51);




(0,_components_task_memo_task_memo__WEBPACK_IMPORTED_MODULE_1__.TaskMemo)();
(0,_components_print_viewer_print_viewer__WEBPACK_IMPORTED_MODULE_2__.PrintViewer)();

/**
 * HTMLElementを作成する。
 * @param {string} tagName
 * @returns HTMLElement
 */
const createElm = (tagName) => {
  const elm = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__.ElmUtils.createElm(tagName);
  document.body.appendChild(elm);
  return elm;
};

/**
 * SessionStorageからデータを取得する。
 * @param {string} key
 * @returns Object
 */
const getSessionData = (key) => {
  const data = JSON.parse(sessionStorage.getItem(key));
  sessionStorage.removeItem(key);
  return data;
};

/**
 * URLから指定したパラメータを取得する
 * @param {string} name
 * @returns
 */
const getParamFromURL = (name) => {
  const url = new URL(window.location.href);
  const params = url.searchParams;
  if (params.get(name)) {
    return params.get(name);
  } else {
    return null;
  }
};

/**
 * 画面ロード処理
 */
window.addEventListener("load", () => {
  const type = getParamFromURL("type");

  switch (type) {
    case "print":
      const id = getParamFromURL("id");
      createElm("print-viewer").render(getSessionData("print"), id); // 印刷
      break;

    default:
      createElm("task-memo"); // 初期表示
  }
});

})();

/******/ })()
;