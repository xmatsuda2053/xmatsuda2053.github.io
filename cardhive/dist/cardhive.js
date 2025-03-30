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
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CardHive: () => (/* binding */ CardHive)
/* harmony export */ });
/* harmony import */ var _style_card_hive_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var _utils_elm_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1);
/* harmony import */ var _constants_svg_const__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6);
/* harmony import */ var _classes_file_manager__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7);
/* harmony import */ var _svg_btn_svg_btn__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(8);
/* harmony import */ var _biz_card_biz_card__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(12);









/**
 * CardHive コンポーネント
 * @class CardHive
 * @extends {HTMLElement}
 */
function CardHive() {
  class CardHive extends HTMLElement {
    /**
     * コンストラクタ
     * @return {void}
     */
    constructor() {
      super();

      (0,_svg_btn_svg_btn__WEBPACK_IMPORTED_MODULE_4__.SvgBtn)();
      (0,_biz_card_biz_card__WEBPACK_IMPORTED_MODULE_5__.BizCard)();

      // Shadow DOMをオープンモードでアタッチ
      this.attachShadow({ mode: "open" });

      // CSSを適用
      this.shadowRoot.adoptedStyleSheets = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_1__.ElmUtils.createStylesheet(_style_card_hive_css__WEBPACK_IMPORTED_MODULE_0__["default"]);

      // grid作成
      this.container = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_1__.ElmUtils.createElm("div", "container");
      this.header = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_1__.ElmUtils.createElm("div", "header-area");
      this.contents = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_1__.ElmUtils.createElm("div", "contents-area", ["scroll"]);

      this.container.appendChild(this.#createFolderOpenButton());
      this.container.appendChild(this.header);
      this.container.appendChild(this.contents);

      this.shadowRoot.innerHTML = "";
      this.shadowRoot.appendChild(this.container);
    }

    /**
     * フォルダを開くボタンを作成するメソッド
     * @private
     * @description
     * フォルダを開くためのボタンを作成し、そのアイコンを設定し、円形にする。
     * @returns {HTMLElement} - 作成されたfolderOpenBtn要素
     */
    #createFolderOpenButton() {
      const folderOpenBtn = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_1__.ElmUtils.createElm("svg-btn", "folder-open");
      folderOpenBtn.iconPaths = _constants_svg_const__WEBPACK_IMPORTED_MODULE_2__.SvgConst.folderPaths;
      folderOpenBtn.isCircle = true;

      /**
       * クリックイベント
       */
      folderOpenBtn.addEventListener("click", () => {
        folderOpenBtn.remove();
        this.#initPage();
      });

      /**
       * Floatボタン用の領域でラップ
       */
      this.floatBtns = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_1__.ElmUtils.createFloatArea();
      this.floatBtns.appendChild(folderOpenBtn);

      return this.floatBtns;
    }

    /**
     * 画面初期化
     */
    #initPage() {
      const addItemButton = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_1__.ElmUtils.createElm("svg-btn", "add-item");
      addItemButton.iconPaths = _constants_svg_const__WEBPACK_IMPORTED_MODULE_2__.SvgConst.plusPaths;
      addItemButton.isCircle = true;

      addItemButton.addEventListener("click", () => {
        this.#addBizCard();
      });

      this.floatBtns.appendChild(addItemButton);
    }

    /**
     * 名刺カードコンテンツを追加する。
     * @param {object} data - 名刺データ
     */
    #addBizCard(data = {}) {
      const bizCard = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_1__.ElmUtils.createElm("biz-card");
      this.contents.appendChild(bizCard);
    }
  }
  customElements.define("card-hive", CardHive);
}


/***/ }),
/* 3 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5);
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

#container {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 30px 1fr;
  grid-auto-columns: 1fr;
  grid-auto-rows: 1fr;
  gap: 0em 0em;
  grid-auto-flow: row;
  grid-template-areas: "header-area" "contents-area";
  height: 100vh;
}

#header-area {
  grid-area: header-area;
}

#contents-area {
  grid-area: contents-area;
  padding: 1.5rem;
  margin-bottom: 3rem;
}
`, ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 4 */
/***/ ((module) => {



module.exports = function (i) {
  return i[1];
};

/***/ }),
/* 5 */
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
  v;
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
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SvgBtn: () => (/* binding */ SvgBtn)
/* harmony export */ });
/* harmony import */ var _utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
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
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5);
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
/* 12 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BizCard: () => (/* binding */ BizCard)
/* harmony export */ });
/* harmony import */ var _style_biz_card_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(13);
/* harmony import */ var _utils_elm_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1);




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
      this.root.appendChild(this.#createUserArea());
      this.root.appendChild(this.#createDivArea());
      this.root.appendChild(this.#createContactArea());
      this.root.appendChild(this.#createAddressArea());

      this.shadowRoot.innerHTML = "";
      this.shadowRoot.appendChild(this.root);
    }

    /**
     * ユーザ情報エリアを作成
     * @oaram {HTMLElement} area
     */
    #createUserArea() {
      const area = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_1__.ElmUtils.createElm("div", "user-area");

      this.userArea = area;
      return this.userArea;
    }

    /**
     * 所属情報エリアを作成
     * @oaram {HTMLElement} area
     */
    #createDivArea() {
      const area = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_1__.ElmUtils.createElm("div", "div-area");

      this.divArea = area;
      return this.divArea;
    }

    /**
     * 連絡先情報エリアを作成
     * @oaram {HTMLElement} area
     */
    #createContactArea() {
      const area = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_1__.ElmUtils.createElm("div", "contact-area");

      this.contactArea = area;
      return this.contactArea;
    }

    /**
     * 住所情報エリアを作成
     * @oaram {HTMLElement} area
     */
    #createAddressArea() {
      const area = _utils_elm_utils__WEBPACK_IMPORTED_MODULE_1__.ElmUtils.createElm("div", "address-area");

      this.addressArea = area;
      return this.addressArea;
    }
  }
  customElements.define("biz-card", BizCard);
}


/***/ }),
/* 13 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5);
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

#root {
  border: 1px solid #3f3f3f;
  border-radius: 0.25rem;
  margin-bottom: 1rem;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr;
  grid-auto-columns: 1fr;
  grid-auto-rows: 1fr;
  gap: 0em 0em;
  grid-auto-flow: row;
  grid-template-areas: "user-area div-area contact-area address-area";
}

#user-area {
  grid-area: user-area;
  padding: 0.5rem;
}

#div-area {
  grid-area: div-area;
  padding: 0.5rem;
}

#contact-area {
  grid-area: contact-area;
  padding: 0.5rem;
}

#address-area {
  grid-area: address-area;
  padding: 0.5rem;
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
/* harmony import */ var _components_card_hive_card_hive__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);



/**
 * 画面ロード処理
 */
window.addEventListener("load", () => {
  (0,_components_card_hive_card_hive__WEBPACK_IMPORTED_MODULE_1__.CardHive)();
  document.body.appendChild(_utils_elm_utils__WEBPACK_IMPORTED_MODULE_0__.ElmUtils.createElm("card-hive"));
});

})();

/******/ })()
;