/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Utils: () => (/* binding */ Utils)
/* harmony export */ });
class Utils {
  /**
   * 指定されたファイル名を使用して新しいCSSスタイルシートを作成する
   * @param {string} filepath - CSSスタイルシートのファイルパス
   * @returns {CSSStyleSheet[]} 作成されたCSSスタイルシートの配列
   */
  static createStyleSheetWithFilename = (filepath) => {
    const styleSheet = new CSSStyleSheet();
    styleSheet.replaceSync(filepath);
    return [styleSheet];
  };

  /**
   * SVGアイコンを生成する
   * @param {string} name アイコンの名前
   * @param {Array<{path: string, isFill?: boolean}>} paths SVGのパス配列
   * @returns {SVGElement} 作成されたSVG要素
   */
  static createSvg = (name, paths) => {
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
    symbol.setAttribute("id", `icon-${name}`);
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
   * SVGアイコンを含むボタンを生成する
   * @param {string} iconName アイコンの名前
   * @returns {HTMLButtonElement} SVGアイコンを含むボタン要素
   */
  static createSvgButton = (iconName) => {
    const svgNS = "http://www.w3.org/2000/svg";
    const xlinkNS = "http://www.w3.org/1999/xlink";

    // SVG要素を作成し、クラスを追加する
    const svg = document.createElementNS(svgNS, "svg");
    svg.classList.add("icon");

    // use要素を作成し、SVG要素に追加する
    const use = document.createElementNS(svgNS, "use");
    use.setAttributeNS(xlinkNS, "xlink:href", `#icon-${iconName}`);
    svg.appendChild(use);

    // ボタン要素を作成し、SVG要素を追加する
    const button = document.createElement("button");
    button.appendChild(svg);

    return button;
  };

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
    // "-"で日付を分割し、配列として取得
    const parts = dateString.split("-");

    // 年、月、日が正しく分割されたかを確認
    if (parts.length !== 3) {
      throw new Error("日付文字列の形式が正しくありません。");
    }

    // 配列の要素を数値に変換
    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1; // 月は0-11で表現されるため-1
    const day = parseInt(parts[2], 10);

    // Dateオブジェクトを作成して返す
    return new Date(year, month, day);
  };

  /**
   * 一意のIDを生成する
   * @returns {string} 一意のID
   */
  static getUniqueId = () => {
    // ランダム文字列を生成する
    const randomStr = Math.floor(10000 * Math.random()).toString(16);

    // 日付文字列を生成
    const systemDate = this.formatDate(new Date());

    return `${systemDate}_${randomStr}`;
  };

  /**
   * カスタムイベントを発行用の関数を返す
   * @param {string} eventName
   * @param {string} msg
   * @returns
   */
  static getCustomEvent = (eventName, msg = "CustomEvent") => {
    return new CustomEvent(eventName, {
      detail: { message: msg },
      bubbles: true,
      composed: true,
    });
  };

  /**
   * 指定された要素をクラス"item"を持つdivでラップする。
   *
   * @param {HTMLElement} elm - ラップする要素。
   * @returns {HTMLElement} 指定された要素を含む新しく作成された"item"クラスのdiv要素を返す。
   */
  static wrapElementInItemDiv = (elm) => {
    const item = document.createElement("div");
    item.classList.add("wrap-item");
    item.appendChild(elm);
    return item;
  };

  /**
   * テキストエリアの高さを調整する
   * @param {HTMLTextAreaElement} textarea 高さを調整するテキストエリア要素
   * @param {number} [defaultRows=3] デフォルト行数
   * @param {number} [rows=0] 任意設定行数
   * @returns {string} 調整された高さ（ピクセル単位）
   */
  static adjustTextareaHeight(textarea, defaultRows = 3, rows = 0) {
    // 高さを自動設定に変更
    textarea.style.height = "auto";

    const style = window.getComputedStyle(textarea);
    const lineHeight = parseFloat(style.lineHeight);
    const paddingTop = parseFloat(style.paddingTop);
    const paddingBottom = parseFloat(style.paddingBottom);
    const paddingHeight = paddingTop + paddingBottom;
    const contentHeight = textarea.scrollHeight - paddingHeight;

    if (rows === 0) {
      rows = Math.ceil(contentHeight / lineHeight);
      if (rows < defaultRows) {
        rows = defaultRows;
      }
    }

    // テキストエリアの高さをピクセル単位で計算
    const adjustHeight = lineHeight * rows + paddingHeight;
    return `${adjustHeight}px`;
  }
}


/***/ }),
/* 2 */
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
      console.error("ディレクトリを開くのに失敗しました:", err);
      return false;
    }
  }

  /**
   * ファイルに書き込む
   * @param {string} fileName 保存するファイルの名前
   * @param {string} content ファイルに書き込む内容
   * @throws {Error} ディレクトリが開かれていない場合、またはファイル保存に失敗した場合
   */
  async writeFile(fileName, content) {
    if (!this.directoryHandler) {
      throw new Error("ディレクトリがまだ開かれていません。");
    }
    try {
      // ファイルハンドルを取得または作成し、ファイルに書き込む
      const fileHandle = await this.directoryHandler.getFileHandle(fileName, {
        create: true,
      });
      const writable = await fileHandle.createWritable();
      await writable.write(content);
      await writable.close();
    } catch (err) {
      console.error("ファイルを保存するのに失敗しました:", err);
      throw err;
    }
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
        console.error("ファイルを読むのに失敗しました:", err);
        throw err;
      }
    }
  }
}


/***/ }),
/* 3 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ControlMenu: () => (/* binding */ ControlMenu)
/* harmony export */ });
/* harmony import */ var _common_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _style_css_control_menu_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4);
/**
 * 共通関数
 */


/**
 * ControlMenuコンポーネント用のCSS
 */


/**
 * ControlMenu コンポーネントを作成しカスタム要素として定義する
 */
function ControlMenu() {
  /**
   * ControlMenu コンポーネントのカスタム要素のクラス
   * @extends {HTMLElement}
   */
  class ControlMenu extends HTMLElement {
    /**
     * コンストラクタ
     * @return {void}
     */
    constructor() {
      super();

      this.attachShadow({ mode: "open" });
      this.shadowRoot.adoptedStyleSheets =
        _common_utils__WEBPACK_IMPORTED_MODULE_0__.Utils.createStyleSheetWithFilename(_style_css_control_menu_css__WEBPACK_IMPORTED_MODULE_1__["default"]);

      const container = document.createElement("div");
      const svgIconMenu = this.#createMenu();
      const svgIconSearch = this.#createSearch();
      const svgIconTreeOpen = this.#createTreeOpen();
      const svgIconTreeClose = this.#createTreeClose();
      const btnMenu = this.#createMenuButton();
      const btnSearch = this.#createSearchButton();
      const btnTreeOpen = this.#createTreeOpenButton();
      const btnTreeClose = this.#createTreeCloseButton();

      container.id = "container";
      container.appendChild(svgIconMenu);
      container.appendChild(svgIconSearch);
      container.appendChild(svgIconTreeOpen);
      container.appendChild(svgIconTreeClose);
      container.appendChild(btnMenu);
      container.appendChild(btnSearch);
      container.appendChild(btnTreeOpen);
      container.appendChild(btnTreeClose);

      this.shadowRoot.innerHTML = "";
      this.shadowRoot.appendChild(container);
    }

    /**
     * "menu"アイコンのSVGを作成する
     * @returns {SVGElement} "menu"アイコンを含む生成されたSVG要素
     */
    #createMenu() {
      return _common_utils__WEBPACK_IMPORTED_MODULE_0__.Utils.createSvg("menu", [
        { path: "M0 0h24v24H0z" },
        { path: "M4 6l16 0" },
        { path: "M4 12l16 0" },
        { path: "M4 18l16 0" },
      ]);
    }

    /**
     * "menu"ボタンを作成する
     * @returns {HTMLButtonElement} 生成された"menu"ボタン
     */
    #createMenuButton() {
      const btn = _common_utils__WEBPACK_IMPORTED_MODULE_0__.Utils.createSvgButton("menu");
      btn.id = "menu";
      return btn;
    }

    /**
     * "search"アイコンのSVGを作成する
     * @returns {SVGElement} "search"アイコンを含む生成されたSVG要素
     */
    #createSearch() {
      return _common_utils__WEBPACK_IMPORTED_MODULE_0__.Utils.createSvg("search", [
        { path: "M0 0h24v24H0z" },
        { path: "M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" },
        { path: "M21 21l-6 -6" },
      ]);
    }

    /**
     * "search"ボタンを作成する
     * @returns {HTMLButtonElement} 生成された"search"ボタン
     */
    #createSearchButton() {
      const btn = _common_utils__WEBPACK_IMPORTED_MODULE_0__.Utils.createSvgButton("search");
      btn.id = "search";
      return btn;
    }

    /**
     * "tree-open"アイコンのSVGを作成する
     * @returns {SVGElement} "tree-open"アイコンを含む生成されたSVG要素
     */
    #createTreeOpen() {
      return _common_utils__WEBPACK_IMPORTED_MODULE_0__.Utils.createSvg("tree-open", [
        { path: "M0 0h24v24H0z" },
        { path: "M12 8v-6l3 3m-6 0l3 -3" },
        { path: "M12 16v6l3 -3m-6 0l3 3" },
        { path: "M4 12l1 0" },
        { path: "M9 12l1 0" },
        { path: "M14 12l1 0" },
        { path: "M19 12l1 0" },
      ]);
    }

    /**
     * "tree-open"ボタンを作成する
     * @returns {HTMLButtonElement} 生成された"tree-open"ボタン
     */
    #createTreeOpenButton() {
      const btn = _common_utils__WEBPACK_IMPORTED_MODULE_0__.Utils.createSvgButton("tree-open");
      btn.id = "tree-open";
      return btn;
    }

    /**
     * "tree-close"アイコンのSVGを作成する
     * @returns {SVGElement} "tree-close"アイコンを含む生成されたSVG要素
     */
    #createTreeClose() {
      return _common_utils__WEBPACK_IMPORTED_MODULE_0__.Utils.createSvg("tree-close", [
        { path: "M0 0h24v24H0z" },
        { path: "M12 1v6l3 -3m-6 0l3 3" },
        { path: "M12 23v-6l3 3m-6 0l3 -3" },
        { path: "M4 12l1 0" },
        { path: "M9 12l1 0" },
        { path: "M14 12l1 0" },
        { path: "M19 12l1 0" },
      ]);
    }

    /**
     * "tree-close"ボタンを作成する
     * @returns {HTMLButtonElement} 生成された"tree-close"ボタン
     */
    #createTreeCloseButton() {
      const btn = _common_utils__WEBPACK_IMPORTED_MODULE_0__.Utils.createSvgButton("tree-close");
      btn.id = "tree-close";
      return btn;
    }
  }
  // カスタム要素 "ControlMenu" を定義する
  customElements.define("control-menu", ControlMenu);
}


/***/ }),
/* 4 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `/*! destyle.css v4.0.1 | MIT License | https://github.com/nicolas-cusan/destyle.css */*,::before,::after{box-sizing:border-box;border-style:solid;border-width:0;min-width:0}html{line-height:1.15;-webkit-text-size-adjust:100%;-webkit-tap-highlight-color:rgba(0,0,0,0)}body{margin:0}main{display:block}p,table,blockquote,address,pre,iframe,form,figure,dl{margin:0}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit;margin:0}ul,ol{margin:0;padding:0;list-style:none}dt{font-weight:bold}dd{margin-left:0}hr{box-sizing:content-box;height:0;overflow:visible;border-top-width:1px;margin:0;clear:both;color:inherit}pre{font-family:monospace,monospace;font-size:inherit}address{font-style:inherit}a{background-color:rgba(0,0,0,0);text-decoration:none;color:inherit}abbr[title]{text-decoration:underline dotted}b,strong{font-weight:bolder}code,kbd,samp{font-family:monospace,monospace;font-size:inherit}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-0.25em}sup{top:-0.5em}svg,img,embed,object,iframe{vertical-align:bottom}button,input,optgroup,select,textarea{-webkit-appearance:none;appearance:none;vertical-align:middle;color:inherit;font:inherit;background:rgba(0,0,0,0);padding:0;margin:0;border-radius:0;text-align:inherit;text-transform:inherit}button,[type=button],[type=reset],[type=submit]{cursor:pointer}button:disabled,[type=button]:disabled,[type=reset]:disabled,[type=submit]:disabled{cursor:default}:-moz-focusring{outline:auto}select:disabled{opacity:inherit}option{padding:0}fieldset{margin:0;padding:0;min-width:0}legend{padding:0}progress{vertical-align:baseline}textarea{overflow:auto}[type=number]::-webkit-inner-spin-button,[type=number]::-webkit-outer-spin-button{height:auto}[type=search]{outline-offset:-2px}[type=search]::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}[type=number]{-moz-appearance:textfield;appearance:textfiled}label[for]{cursor:pointer}details{display:block}summary{display:list-item}[contenteditable]:focus{outline:auto}table{border-color:inherit;border-collapse:collapse}caption{text-align:left}td,th{vertical-align:top;padding:0}th{text-align:left;font-weight:bold}.svg{position:absolute;width:0;height:0;overflow:hidden}svg.icon{display:block;width:1em;height:1em;stroke-width:0;stroke:currentColor;fill:currentColor;pointer-events:none}svg.icon use{pointer-events:none}*{font-family:monospace}#container{height:100%;display:flex;align-items:center;justify-content:left}#container button{border-radius:.25rem;color:#8f8f8f;margin-right:.25rem}#container button:hover{color:#3f3f3f}#container button .icon{height:18px;width:18px}`, ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 5 */
/***/ ((module) => {



module.exports = function (i) {
  return i[1];
};

/***/ }),
/* 6 */
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
/* 7 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TreeView: () => (/* binding */ TreeView)
/* harmony export */ });
/* harmony import */ var _common_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _style_css_tree_view_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8);
/**
 * 共通関数
 */


/**
 * tree-viewコンポーネント用のCSS
 */


/**
 * TreeView コンポーネントを作成しカスタム要素として定義する
 */
function TreeView() {
  /**
   * TreeView コンポーネントのカスタム要素のクラス
   * @extends {HTMLElement}
   */
  class TreeView extends HTMLElement {
    /**
     * コンストラクタ
     * @return {void}
     */
    constructor() {
      super();

      this.attachShadow({ mode: "open" });
      this.shadowRoot.adoptedStyleSheets =
        _common_utils__WEBPACK_IMPORTED_MODULE_0__.Utils.createStyleSheetWithFilename(_style_css_tree_view_css__WEBPACK_IMPORTED_MODULE_1__["default"]);

      this.shadowRoot.innerHTML = "";
      this.#addEmptyTreeView();
      this.#addMenu();
    }

    /**
     * 空のTreeViewを作成する
     * @return {void}
     */
    #addEmptyTreeView() {
      const treeViewRoot = document.createElement("div");
      treeViewRoot.id = "root";

      this.shadowRoot.appendChild(treeViewRoot);
    }

    /**
     * TreeViewのコンテキストメニューを追加する
     * @return {void}
     */
    #addMenu() {
      // SVGアイコンを作成する
      const svgIconFilePlus = _common_utils__WEBPACK_IMPORTED_MODULE_0__.Utils.createSvg("file-plus", [
        { path: "M0 0h24v24H0z" },
        { path: "M14 3v4a1 1 0 0 0 1 1h4" },
        {
          path: "M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z",
        },
        { path: "M12 11l0 6" },
        { path: "M9 14l6 0" },
      ]);

      const svgIconFolderPlus = _common_utils__WEBPACK_IMPORTED_MODULE_0__.Utils.createSvg("folder-plus", [
        { path: "M0 0h24v24H0z" },
        {
          path: "M12 19h-7a2 2 0 0 1 -2 -2v-11a2 2 0 0 1 2 -2h4l3 3h7a2 2 0 0 1 2 2v3.5",
        },
        {
          path: "M16 19h6",
        },
        { path: "M19 16v6" },
      ]);

      const svgIconTablerWriting = _common_utils__WEBPACK_IMPORTED_MODULE_0__.Utils.createSvg("tabler-writing", [
        { path: "M0 0h24v24H0z" },
        {
          path: "M20 17v-12c0 -1.121 -.879 -2 -2 -2s-2 .879 -2 2v12l2 2l2 -2z",
        },
        {
          path: "M16 7h4",
        },
        { path: "M18 19h-13a2 2 0 1 1 0 -4h4a2 2 0 1 0 0 -4h-3" },
      ]);

      // メニューを作成する
      const container = document.createElement("div");
      container.id = "context-menu-container";

      const menu = document.createElement("div");
      menu.id = "context-menu";

      const btnAddTask = _common_utils__WEBPACK_IMPORTED_MODULE_0__.Utils.createSvgButton("file-plus");
      btnAddTask.appendChild(document.createTextNode("新しいタスク"));
      btnAddTask.id = "btn-add-task";

      const btnAddGroup = _common_utils__WEBPACK_IMPORTED_MODULE_0__.Utils.createSvgButton("folder-plus");
      btnAddGroup.appendChild(document.createTextNode("新しいグループ"));
      btnAddGroup.id = "btn-add-group";

      const btnChangeGroupName = _common_utils__WEBPACK_IMPORTED_MODULE_0__.Utils.createSvgButton("tabler-writing");
      btnChangeGroupName.appendChild(
        document.createTextNode("グループ名を変更")
      );
      btnChangeGroupName.id = "btn-change-group-name";

      const hr = document.createElement("hr");

      menu.appendChild(btnAddTask);
      menu.appendChild(hr);
      menu.appendChild(btnAddGroup);
      menu.appendChild(btnChangeGroupName);

      container.appendChild(menu);
      container.appendChild(svgIconFilePlus);
      container.appendChild(svgIconFolderPlus);
      container.appendChild(svgIconTablerWriting);

      this.shadowRoot.appendChild(container);

      /**
       * 右クリックメニューを開く
       * @return {void}
       */
      this.shadowRoot.addEventListener("contextmenu", (e) => {
        e.preventDefault();
        e.stopPropagation();

        this.elmEditTarget = e.target.closest("details");
        if (!this.elmEditTarget) {
          this.elmEditTarget = this.shadowRoot.getElementById("root");
        } else {
          this.elmEditTarget.open = true;
        }

        container.style.display = "block";
        menu.style.left = `${e.pageX + 10}px`;
        menu.style.top = `${e.pageY - 20}px`;
      });

      /**
       * 右クリックメニューを閉じる
       * @return {void}
       */
      container.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        container.style.display = "none";
        this.elmEditTarget = "";
      });

      /**
       * 新しいタスクを追加する処理
       * @return {void}
       */
      btnAddTask.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();

        const name = prompt("タスク名設定", "新規タスク");
        if (name) {
          const id = _common_utils__WEBPACK_IMPORTED_MODULE_0__.Utils.getUniqueId();
          const task = this.#createTask(name, id);
          this.elmEditTarget.appendChild(task);
          this.addTaskEventHandler(id, name, task);
          this.#setSelected(task);
          this.dispatchEvent(_common_utils__WEBPACK_IMPORTED_MODULE_0__.Utils.getCustomEvent("addItem"));
        }

        container.click();
      });

      /**
       * 新しいグループを追加する処理
       * @return {void}
       */
      btnAddGroup.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();

        const name = prompt("グループ名設定", "新規グループ");
        if (name) {
          const id = _common_utils__WEBPACK_IMPORTED_MODULE_0__.Utils.getUniqueId();
          const group = this.#createGroup(name, id);
          this.elmEditTarget.appendChild(group);
          this.dispatchEvent(_common_utils__WEBPACK_IMPORTED_MODULE_0__.Utils.getCustomEvent("addItem"));
        }

        container.click();
      });

      /**
       * グループ名を変更する処理
       * @return {void}
       */
      btnChangeGroupName.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (this.elmEditTarget.tagName === "DETAILS") {
          const summary = this.elmEditTarget.children[0];
          const inputText = prompt("グループ名変更", summary.innerText);
          if (inputText !== null) {
            this.elmEditTarget.dataset.name = inputText;
            summary.innerText = inputText;
            this.dispatchEvent(_common_utils__WEBPACK_IMPORTED_MODULE_0__.Utils.getCustomEvent("addItem"));
          }
        }

        container.click();
      });
    }

    /**
     * タスク要素を作成する
     * @param {string} name タスクの名前
     * @param {string} id タスクのID
     * @param {string[]} classList タスクに追加するクラスリスト
     * @returns {HTMLParagraphElement} 作成されたタスク要素
     * @private
     */
    #createTask(name, id, classList = []) {
      const task = document.createElement("p");
      task.innerText = name;
      task.dataset.id = id;
      task.dataset.name = name;
      task.dataset.type = "task";
      task.classList.add(...classList);

      // タスクを開く処理
      task.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.#setSelected(task);
        this.clickTaskEventHandler(id, task);
      });

      return task;
    }

    /**
     * タスクボタンに選択中を示すクラスを設定
     * @param {HTMLElement} task
     */
    #setSelected(task) {
      const root = this.shadowRoot.getElementById("root");
      const beforeTasks = root.getElementsByClassName("selected");
      if (beforeTasks.length !== 0) {
        beforeTasks[0].classList.remove("selected");
      }
      task.classList.add("selected");
    }

    /**
     * タスクを追加するイベントハンドラーを設定する
     * @param {Function} handler タスク追加時に実行されるイベントハンドラー
     * @returns {void}
     */
    registerAddTaskHandler(handler) {
      this.addTaskEventHandler = handler;
    }

    /**
     * グループ要素を作成する
     * @param {string} name グループの名前
     * @param {string} id グループのID
     * @param {string[]} classList グループに追加するクラスリスト
     * @returns {HTMLElement} 作成されたグループ要素
     * @private
     */
    #createGroup(name, id, classList = []) {
      const details = document.createElement("details");
      const summary = document.createElement("summary");

      details.dataset.id = id;
      details.dataset.name = name;
      details.dataset.type = "group";
      details.classList.add(...classList);

      summary.innerText = name;

      details.appendChild(summary);

      return details;
    }

    /**
     * JSON文字列を元にTreeViewをレンダリングする
     * @param {string} jsonStr JSONデータの文字列
     * @returns {void}
     */
    renderTreeView(jsonStr) {
      const root = this.shadowRoot.getElementById("root");
      const treeData = JSON.parse(jsonStr);

      treeData.forEach((data) => {
        this.#addTreeViewItems(root, data);
      });
    }

    /**
     * Jsonデータを元にTreeViewに項目を追加する
     * @param {HTMLElement} root 追加先のルート要素
     * @param {object} data 追加するデータ
     * @returns {void}
     * @private
     */
    #addTreeViewItems(root, data) {
      if (data.type === "task") {
        const task = this.#createTask(data.name, data.id, data.cls || []);
        root.appendChild(task);
        task.addEventListener("click", () => {
          this.clickTaskEventHandler(data.id, task); // タスクを開く
        });
      } else {
        const group = this.#createGroup(data.name, data.id, data.cls || []);
        root.appendChild(group);

        // TODO: スペルミス対応（JSON修正後に消す）
        const array = data.children || data.childlen || [];

        (array || []).forEach((child) => {
          this.#addTreeViewItems(group, child);
        });
      }
    }

    /**
     * タスククリックのイベントハンドラーを設定する
     * @param {Function} handler タスククリック時に実行されるイベントハンドラー
     * @returns {void}
     */
    registerClickTaskHandler(handler) {
      this.clickTaskEventHandler = handler;
    }

    /**
     * ツリービューのデータを取得する
     *
     * @returns {string} ツリーデータのJSON文字列を返す。
     */
    getTreeViewData() {
      const root = this.shadowRoot.getElementById("root");
      const treeData = this.#getAllElement(root.childNodes);
      return treeData;
    }

    /**
     * ノードリストから全ての要素を再帰的に取得する。
     *
     * @param {NodeList} nodes - 処理するノードリスト。
     * @returns {Array} 処理結果の要素リストを返す。
     */
    #getAllElement(nodes) {
      const elements = [];

      nodes.forEach((node) => {
        const dataItem = {
          id: node.dataset.id || null,
          name: node.dataset.name || null,
          type: node.dataset.type || null,
          cls: Array.from(node.classList) || [], // クラスリストを配列として保存
          children: null, // プロパティ名のスペルを修正
        };

        // DETAILS タグの場合、子要素を再帰的に取得
        if (node.tagName === "DETAILS") {
          dataItem.children = this.#getAllElement(node.childNodes);
        }

        // データをリストに追加
        if (node.tagName === "DETAILS" || node.tagName === "P") {
          elements.push(dataItem);
        }
      });

      return elements;
    }
  }

  // カスタム要素 "tree-view" を定義する
  customElements.define("tree-view", TreeView);
}


/***/ }),
/* 8 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `/*! destyle.css v4.0.1 | MIT License | https://github.com/nicolas-cusan/destyle.css */*,::before,::after{box-sizing:border-box;border-style:solid;border-width:0;min-width:0}html{line-height:1.15;-webkit-text-size-adjust:100%;-webkit-tap-highlight-color:rgba(0,0,0,0)}body{margin:0}main{display:block}p,table,blockquote,address,pre,iframe,form,figure,dl{margin:0}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit;margin:0}ul,ol{margin:0;padding:0;list-style:none}dt{font-weight:bold}dd{margin-left:0}hr{box-sizing:content-box;height:0;overflow:visible;border-top-width:1px;margin:0;clear:both;color:inherit}pre{font-family:monospace,monospace;font-size:inherit}address{font-style:inherit}a{background-color:rgba(0,0,0,0);text-decoration:none;color:inherit}abbr[title]{text-decoration:underline dotted}b,strong{font-weight:bolder}code,kbd,samp{font-family:monospace,monospace;font-size:inherit}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-0.25em}sup{top:-0.5em}svg,img,embed,object,iframe{vertical-align:bottom}button,input,optgroup,select,textarea{-webkit-appearance:none;appearance:none;vertical-align:middle;color:inherit;font:inherit;background:rgba(0,0,0,0);padding:0;margin:0;border-radius:0;text-align:inherit;text-transform:inherit}button,[type=button],[type=reset],[type=submit]{cursor:pointer}button:disabled,[type=button]:disabled,[type=reset]:disabled,[type=submit]:disabled{cursor:default}:-moz-focusring{outline:auto}select:disabled{opacity:inherit}option{padding:0}fieldset{margin:0;padding:0;min-width:0}legend{padding:0}progress{vertical-align:baseline}textarea{overflow:auto}[type=number]::-webkit-inner-spin-button,[type=number]::-webkit-outer-spin-button{height:auto}[type=search]{outline-offset:-2px}[type=search]::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}[type=number]{-moz-appearance:textfield;appearance:textfiled}label[for]{cursor:pointer}details{display:block}summary{display:list-item}[contenteditable]:focus{outline:auto}table{border-color:inherit;border-collapse:collapse}caption{text-align:left}td,th{vertical-align:top;padding:0}th{text-align:left;font-weight:bold}*{font-family:monospace}#root{position:relative;width:100%;height:100%;padding-bottom:3rem;line-height:1.5rem;font-size:1.1rem;text-decoration-skip-ink:none}#root summary:hover,#root p:hover{color:#0078d4;text-decoration:underline}#root details{cursor:pointer;width:100%}#root details summary{list-style:none;width:100%;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;position:relative;padding-left:1.15em}#root details summary::-webkit-details-marker{display:none}#root details summary::before{content:"";position:absolute;top:.35rem;left:0;width:8px;height:8px;border-top:solid 2px #000;border-right:solid 2px #000;transform:rotate(45deg);transition:transform .2s}#root details[open]>summary::before{transform:rotate(135deg);top:.22rem;left:.18rem}#root details details,#root details p{margin-left:1rem}#root p{width:100%;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;cursor:pointer;position:relative;padding-left:1.15em}#root p::before{content:"";position:absolute;top:.16rem;left:0;width:1.1rem;height:1.1rem;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='icon icon-tabler icons-tabler-outline icon-tabler-clipboard-text'%3E%3Cpath stroke='none' d='M0 0h24v24H0z' fill='none'/%3E%3Cpath d='M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2' /%3E%3Cpath d='M9 3m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z' /%3E%3Cpath d='M9 12h6' /%3E%3Cpath d='M9 16h6' /%3E%3C/svg%3E");background-repeat:no-repeat;background-size:contain;background-position:center}#root p.selected{color:#0078d4;font-weight:bold;text-decoration:underline}#root p.over-deadline{color:red}#root p.task-finished{color:#8f8f8f;text-decoration:line-through}#context-menu-container{position:absolute;top:0;bottom:0;left:0;right:0;display:none;background-color:rgba(0,0,0,0)}#context-menu-container #context-menu{position:absolute;z-index:100000;font-size:1rem;border:1px solid #8f8f8f;border-radius:.25rem;background-color:#fffff8;box-shadow:0px 3px 3px 0px rgba(0,0,0,.1);width:fit-content;padding:.2rem}#context-menu-container #context-menu button{display:block;line-height:1.5rem;padding:.1rem .5rem;padding-right:1rem;width:100%}#context-menu-container #context-menu button .icon{width:1.5rem;height:1.5rem;margin-right:.5rem}#context-menu-container #context-menu button:hover{background-color:#0078d4;border-radius:.25rem;color:#fffffb}#context-menu-container #context-menu hr{margin:.25rem 0;height:1px;background-color:#afafaf;border:none}`, ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 9 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TaskItem: () => (/* binding */ TaskItem)
/* harmony export */ });
/* harmony import */ var _common_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _style_css_task_item_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(10);
/**
 * 共通関数
 */


/**
 * task-itemコンポーネント用のCSS
 */


/**
 * TaskItem コンポーネントを作成しカスタム要素として定義する
 */
function TaskItem() {
  /**
   * TaskItem コンポーネントのカスタム要素のクラス
   * @extends {HTMLElement}
   */
  class TaskItem extends HTMLElement {
    /**
     * コンストラクタ
     * @return {void}
     */
    constructor() {
      super();

      this.attachShadow({ mode: "open" });
      this.shadowRoot.adoptedStyleSheets =
        _common_utils__WEBPACK_IMPORTED_MODULE_0__.Utils.createStyleSheetWithFilename(_style_css_task_item_css__WEBPACK_IMPORTED_MODULE_1__["default"]);

      this.shadowRoot.innerHTML = "";
      this.#addEmptyForm();
    }

    /**
     * 空のフォームを追加する
     * @return {void}
     * @private
     */
    #addEmptyForm() {
      const form = document.createElement("form");
      const title = this.#createTitleInput();
      const dueDate = this.#createDueDate();
      const staff = this.#createStaff();
      const priority = this.#createPriority();
      const status = this.#createStatus();
      const memo = this.#createMemo();
      const folderpath = this.#createFolderPath();
      const url = this.#createURL();
      const option1 = this.#createOptionInput("option1", "任意項目１");
      const option2 = this.#createOptionInput("option2", "任意項目２");
      const option3 = this.#createOptionInput("option3", "任意項目３");
      const option4 = this.#createOptionInput("option4", "任意項目４");
      const option5 = this.#createOptionInput("option5", "任意項目５");
      const freenotes = this.#createFreeNotes();

      form.appendChild(title); // タイトル
      form.appendChild(dueDate); // 期限日
      form.appendChild(staff); // 担当者
      form.appendChild(priority); // 優先度
      form.appendChild(status); // 進捗率
      form.appendChild(memo); // 作業概要
      form.appendChild(folderpath); // 作業フォルダパス
      form.appendChild(url); // URL
      form.appendChild(option1); // 任意項目１
      form.appendChild(option2); // 任意項目２
      form.appendChild(option3); // 任意項目３
      form.appendChild(option4); // 任意項目４
      form.appendChild(option5); // 任意項目５
      form.appendChild(freenotes); // 作業メモ

      form.id = "task-form";
      this.shadowRoot.appendChild(form);
    }

    /**
     * 入力内容の変更を検知するイベントを有効化する
     */
    enableCustomEvent() {
      const form = this.shadowRoot.getElementById("task-form");
      form.addEventListener("changeTaskItem", () => {
        this.dispatchEvent(_common_utils__WEBPACK_IMPORTED_MODULE_0__.Utils.getCustomEvent("changeTask"));
      });
    }

    /**
     * 指定されたIDを持つ要素をshadow DOMから取得する。
     *
     * @param {string} id - 取得したい要素のID。
     * @returns {HTMLElement|null} 指定されたIDを持つ要素、または存在しない場合はnull。
     */
    #getElementById(id) {
      return this.shadowRoot.getElementById(id);
    }

    /**
     * データを元にTaskItemをレンダリングする
     * @param {Object} data taskData
     * @returns {void}
     */
    renderTaskItem(data) {
      // dev -> staffDiv
      // manager -> staffName
      // tel -> staffTel

      data.staffDiv = data.staffDiv || data.dev || "";
      data.staffName = data.staffName || data.manager || "";
      data.staffTel = data.staffTel || data.tel || "";

      this.#getElementById("title").value = data.title || "";
      this.#getElementById("due-date").value = data.dueDate || "";
      this.#getElementById("staff").divValue = data.staffDiv || "";
      this.#getElementById("staff").nameValue = data.staffName || "";
      this.#getElementById("staff").telValue = data.staffTel || "";
      this.#getElementById("priority").value = data.priority || "";
      this.#getElementById("status").value = data.status || "";
      this.#getElementById("memo").value = data.memo || "";
      this.#getElementById("folderpath").value = data.folderpath || "";
      this.#getElementById("url").value = data.url || "";
      this.#getElementById("option1").value = data.option1 || "";
      this.#getElementById("option2").value = data.option2 || "";
      this.#getElementById("option3").value = data.option3 || "";
      this.#getElementById("option4").value = data.option4 || "";
      this.#getElementById("option5").value = data.option5 || "";
      this.#getElementById("freenotes").value = data.freenotes || "";

      this.#setDueDateFinishStatus();
    }

    /**
     * 各フォームフィールドからタスクデータを取得しJSONを返却する
     *
     * @returns {Object} タスクデータオブジェクトを返す。
     */
    getTaskData() {
      // タスクデータのオブジェクトを作成
      const formData = {
        title: this.#getElementById("title").value,
        dueDate: this.#getElementById("due-date").value,
        staffDiv: this.#getElementById("staff").divValue,
        staffName: this.#getElementById("staff").nameValue,
        staffTel: this.#getElementById("staff").telValue,
        priority: this.#getElementById("priority").value,
        status: this.#getElementById("status").value,
        memo: this.#getElementById("memo").value,
        folderpath: this.#getElementById("folderpath").value,
        url: this.#getElementById("url").value,
        option1: this.#getElementById("option1").value,
        option2: this.#getElementById("option2").value,
        option3: this.#getElementById("option3").value,
        option4: this.#getElementById("option4").value,
        option5: this.#getElementById("option5").value,
        freenotes: this.#getElementById("freenotes").value,
      };

      return formData;
    }

    //------------------------------
    //- タイトル
    //------------------------------
    /**
     * タイトル入力フィールドを作成する
     * @returns {HTMLElementPartsInput} タイトル入力フィールドのカスタム要素
     * @private
     */
    #createTitleInput() {
      const title = document.createElement("parts-input");
      title.title = "タイトル";
      title.value = "";
      title.placeholder = "XXXXXの作成";
      title.isRequired();
      title.inputWidth = "100%";

      title.id = "title";

      return _common_utils__WEBPACK_IMPORTED_MODULE_0__.Utils.wrapElementInItemDiv(title);
    }

    /**
     * タイトルフィールドに値を設定する
     * @param {string} name 設定値
     */
    setTitle(name) {
      this.shadowRoot.getElementById("title").value = name;
    }

    /**
     * タイトル変更時に実行する処理を登録する。
     * @param {function} handler
     */
    registerChangeTitleHandler(handler) {
      const title = this.shadowRoot.getElementById("title");
      title.addEventListener("changeTaskItem", () => {
        handler(title.value);
      });
    }

    /**
     * Deadline変更時に実行する処理を登録する。
     * @param {function} handler
     */
    registerChangeDeadlineHandler(handler) {
      const duedate = this.shadowRoot.getElementById("due-date");
      duedate.addEventListener("changeTaskItem", () => {
        handler(duedate.dayCount);
      });
    }

    /**
     * 進捗率変更時に実行する処理を登録する。
     * @param {function} handler
     */
    registerChangeStatusHandler(handler) {
      const status = this.shadowRoot.getElementById("status");
      status.addEventListener("changeTaskItem", () => {
        handler(status.value);
      });
    }

    //------------------------------
    //- 期限日
    //------------------------------
    /**
     * 期限日入力フィールドを作成する
     * @returns {HTMLElementPartsDuDate} 期限日入力フィールドのカスタム要素
     * @private
     */
    #createDueDate() {
      const duedate = document.createElement("parts-due-date");
      duedate.isRequired();
      duedate.id = "due-date";

      return _common_utils__WEBPACK_IMPORTED_MODULE_0__.Utils.wrapElementInItemDiv(duedate);
    }

    //------------------------------
    //- 担当者
    //------------------------------
    /**
     * 担当者入力フィールドを作成する
     * @returns {HTMLElementPartsStaff} 担当者入力フィールドのカスタム要素
     * @private
     */
    #createStaff() {
      const staff = document.createElement("parts-staff");
      staff.isRequired();
      staff.id = "staff";

      return _common_utils__WEBPACK_IMPORTED_MODULE_0__.Utils.wrapElementInItemDiv(staff);
    }

    //------------------------------
    //- 優先度
    //------------------------------
    /**
     * 優先度入力フィールドを作成する
     * @returns {HTMLElementPartsPriority} 優先度入力フィールドのカスタム要素
     * @private
     */
    #createPriority() {
      const priority = document.createElement("parts-radio");
      priority.id = "priority";
      priority.title = "優先度";

      //priority.btnWidth = "3rem";
      priority.item = [
        { value: 5, text: "最低" },
        { value: 4, text: "低" },
        { value: 3, text: "中", isChecked: true },
        { value: 2, text: "高" },
        { value: 1, text: "最高" },
      ];

      return _common_utils__WEBPACK_IMPORTED_MODULE_0__.Utils.wrapElementInItemDiv(priority);
    }

    //------------------------------
    //- 進捗率
    //------------------------------
    /**
     * 進捗率入力フィールドを作成する
     * @returns {HTMLElementPartsStatus} 進捗率入力フィールドのカスタム要素
     * @private
     */
    #createStatus() {
      const status = document.createElement("parts-radio");
      status.id = "status";
      status.title = "進捗率";

      //status.btnWidth = "3rem";
      status.item = [
        { value: 0, text: "0%", isChecked: true },
        { value: 10, text: "10%" },
        { value: 20, text: "20%" },
        { value: 30, text: "30%" },
        { value: 40, text: "40%" },
        { value: 50, text: "50%" },
        { value: 60, text: "60%" },
        { value: 70, text: "70%" },
        { value: 80, text: "80%" },
        { value: 90, text: "90%" },
        { value: 100, text: "100%" },
      ];

      // 進捗率変更時の処理
      status.addEventListener("changeTaskItem", () => {
        this.#setDueDateFinishStatus();
      });

      return _common_utils__WEBPACK_IMPORTED_MODULE_0__.Utils.wrapElementInItemDiv(status);
    }

    /**
     * タスク終了の場合、期限日にその旨を設定する
     */
    #setDueDateFinishStatus() {
      const status = this.shadowRoot.getElementById("status");
      const dueDate = this.shadowRoot.getElementById("due-date");

      if (status.value === "100") {
        dueDate.isFinish = true;
      } else {
        dueDate.isFinish = false;
      }
    }

    //------------------------------
    //- 作業概要
    //------------------------------
    /**
     * 作業概要入力フィールドを作成する
     * @returns {HTMLElementPartsTextarea} 作業概要入力フィールドのカスタム要素
     * @private
     */
    #createMemo() {
      const memo = document.createElement("parts-textarea");
      memo.id = "memo";
      memo.title = "作業概要";
      memo.textareaWidth = "100%";
      memo.textareaRows = "10";
      memo.placeholder = "タスクに関する概要説明";

      return _common_utils__WEBPACK_IMPORTED_MODULE_0__.Utils.wrapElementInItemDiv(memo);
    }

    //------------------------------
    //- 作業フォルダパス
    //------------------------------
    /**
     * 作業フォルダパス入力フィールドを作成する
     * @returns {HTMLElementPartsTextarea} 作業フォルダパス入力フィールドのカスタム要素
     * @private
     */
    #createFolderPath() {
      const folderpath = document.createElement("parts-textarea");
      folderpath.id = "folderpath";
      folderpath.title = "作業フォルダパス";
      folderpath.textareaWidth = "100%";
      folderpath.textareaRows = "3";
      folderpath.placeholder = "作業フォルダパス(E:workspace)";

      return _common_utils__WEBPACK_IMPORTED_MODULE_0__.Utils.wrapElementInItemDiv(folderpath);
    }

    //------------------------------
    //- URL
    //------------------------------
    /**
     * URL入力フィールドを作成する
     * @returns {HTMLElementPartsTextarea} URL入力フィールドのカスタム要素
     * @private
     */
    #createURL() {
      const url = document.createElement("parts-textarea");
      url.id = "url";
      url.title = "URL";
      url.textareaWidth = "100%";
      url.textareaRows = "3";
      url.placeholder = "https://example.com";

      return _common_utils__WEBPACK_IMPORTED_MODULE_0__.Utils.wrapElementInItemDiv(url);
    }

    //------------------------------
    //- 任意項目
    //------------------------------
    /**
     * 任意項目入力フィールドを作成する
     * @param {string} id
     * @param {string} title
     * @returns {HTMLElementPartsInput} 任意項目入力フィールドのカスタム要素
     * @private
     */
    #createOptionInput(id, title) {
      const input = document.createElement("parts-input");
      input.id = id;
      input.title = title;
      input.inputWidth = "75%";
      input.placeholder = "任意入力";

      return _common_utils__WEBPACK_IMPORTED_MODULE_0__.Utils.wrapElementInItemDiv(input);
    }

    //------------------------------
    //- 作業メモ
    //------------------------------
    /**
     * 作業メモ入力フィールドを作成する
     * @returns {HTMLElementPartsTextarea} 作業メモ入力フィールドのカスタム要素
     * @private
     */
    #createFreeNotes() {
      const memo = document.createElement("parts-textarea");
      memo.id = "freenotes";
      memo.title = "作業メモ";
      memo.textareaWidth = "100%";
      memo.textareaRows = "10";
      memo.placeholder = "自由記述欄";

      return _common_utils__WEBPACK_IMPORTED_MODULE_0__.Utils.wrapElementInItemDiv(memo);
    }
  }

  // カスタム要素 "task-item" を定義する
  customElements.define("task-item", TaskItem);
}


/***/ }),
/* 10 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `/*! destyle.css v4.0.1 | MIT License | https://github.com/nicolas-cusan/destyle.css */*,::before,::after{box-sizing:border-box;border-style:solid;border-width:0;min-width:0}html{line-height:1.15;-webkit-text-size-adjust:100%;-webkit-tap-highlight-color:rgba(0,0,0,0)}body{margin:0}main{display:block}p,table,blockquote,address,pre,iframe,form,figure,dl{margin:0}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit;margin:0}ul,ol{margin:0;padding:0;list-style:none}dt{font-weight:bold}dd{margin-left:0}hr{box-sizing:content-box;height:0;overflow:visible;border-top-width:1px;margin:0;clear:both;color:inherit}pre{font-family:monospace,monospace;font-size:inherit}address{font-style:inherit}a{background-color:rgba(0,0,0,0);text-decoration:none;color:inherit}abbr[title]{text-decoration:underline dotted}b,strong{font-weight:bolder}code,kbd,samp{font-family:monospace,monospace;font-size:inherit}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-0.25em}sup{top:-0.5em}svg,img,embed,object,iframe{vertical-align:bottom}button,input,optgroup,select,textarea{-webkit-appearance:none;appearance:none;vertical-align:middle;color:inherit;font:inherit;background:rgba(0,0,0,0);padding:0;margin:0;border-radius:0;text-align:inherit;text-transform:inherit}button,[type=button],[type=reset],[type=submit]{cursor:pointer}button:disabled,[type=button]:disabled,[type=reset]:disabled,[type=submit]:disabled{cursor:default}:-moz-focusring{outline:auto}select:disabled{opacity:inherit}option{padding:0}fieldset{margin:0;padding:0;min-width:0}legend{padding:0}progress{vertical-align:baseline}textarea{overflow:auto}[type=number]::-webkit-inner-spin-button,[type=number]::-webkit-outer-spin-button{height:auto}[type=search]{outline-offset:-2px}[type=search]::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}[type=number]{-moz-appearance:textfield;appearance:textfiled}label[for]{cursor:pointer}details{display:block}summary{display:list-item}[contenteditable]:focus{outline:auto}table{border-color:inherit;border-collapse:collapse}caption{text-align:left}td,th{vertical-align:top;padding:0}th{text-align:left;font-weight:bold}.wrap-item{padding-bottom:1.5rem}`, ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 11 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PartsInput: () => (/* binding */ PartsInput)
/* harmony export */ });
/* harmony import */ var _common_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _style_css_parts_input_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12);
/**
 * 共通関数
 */


/**
 * parts-inputコンポーネント用のCSS
 */


/**
 * PartsInput コンポーネントを作成しカスタム要素として定義する
 */
function PartsInput() {
  /**
   * PartsInput コンポーネントのカスタム要素のクラス
   * @extends {HTMLElement}
   */
  class PartsInput extends HTMLElement {
    /**
     * コンストラクタ
     * @return {void}
     */
    constructor() {
      super();

      this.attachShadow({ mode: "open" });
      this.shadowRoot.adoptedStyleSheets =
        _common_utils__WEBPACK_IMPORTED_MODULE_0__.Utils.createStyleSheetWithFilename(_style_css_parts_input_css__WEBPACK_IMPORTED_MODULE_1__["default"]);

      const fieldset = this.#creteFiledSet();
      const legend = this.#createLegend();
      const input = this.#createInput();

      fieldset.appendChild(legend);
      fieldset.appendChild(input);

      this.shadowRoot.innerHTML = "";
      this.shadowRoot.appendChild(fieldset);

      // 変更イベントを伝播
      fieldset.addEventListener("change", () => {
        // カスタムイベント"changeTaskItem"をディスパッチ
        this.dispatchEvent(_common_utils__WEBPACK_IMPORTED_MODULE_0__.Utils.getCustomEvent("changeTaskItem"));
      });
    }

    /**
     * fieldsetを作成する
     * @returns {HTMLElement}
     */
    #creteFiledSet() {
      const fieldset = document.createElement("fieldset");
      fieldset.id = "container";
      return fieldset;
    }

    /**
     * legendを作成する
     * @returns {HTMLElement}
     */
    #createLegend() {
      const legend = document.createElement("legend");
      legend.id = "title";
      return legend;
    }

    /**
     * TextInputを作成する
     * @returns {HTMLElement}
     */
    #createInput() {
      const input = document.createElement("input");
      input.id = "input";
      input.type = "text";
      return input;
    }

    /**
     * Input横幅を設定する
     * @param {string} width Input横幅
     * @return {void}
     */
    set inputWidth(width) {
      this.shadowRoot.getElementById("input").style.width = width;
    }

    /**
     * Legendに値を設定する
     * @param {string} value 設定値
     * @return {void}
     */
    set title(value) {
      this.shadowRoot.getElementById("title").innerText = value;
    }

    /**
     * 必須項目であることを設定する
     * @return {void}
     */
    isRequired() {
      this.shadowRoot.getElementById("title").classList.add("isRequired");
    }

    /**
     * Inputに値を設定する
     * @param {string} value 設定値
     * @return {void}
     */
    set value(value) {
      this.shadowRoot.getElementById("input").value = value;
    }

    /**
     *  Inputの値を取得する
     * @return {string} 設定値
     */
    get value() {
      return this.shadowRoot.getElementById("input").value;
    }

    /**
     * PlaceHolderに値を設定する。
     * @param {string} placeholder 設定値
     * @return {void}
     */
    set placeholder(placeholder) {
      this.shadowRoot.getElementById("input").placeholder = placeholder;
    }
  }
  // カスタム要素 "parts-input" を定義する
  customElements.define("parts-input", PartsInput);
}


/***/ }),
/* 12 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `/*! destyle.css v4.0.1 | MIT License | https://github.com/nicolas-cusan/destyle.css */*,::before,::after{box-sizing:border-box;border-style:solid;border-width:0;min-width:0}html{line-height:1.15;-webkit-text-size-adjust:100%;-webkit-tap-highlight-color:rgba(0,0,0,0)}body{margin:0}main{display:block}p,table,blockquote,address,pre,iframe,form,figure,dl{margin:0}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit;margin:0}ul,ol{margin:0;padding:0;list-style:none}dt{font-weight:bold}dd{margin-left:0}hr{box-sizing:content-box;height:0;overflow:visible;border-top-width:1px;margin:0;clear:both;color:inherit}pre{font-family:monospace,monospace;font-size:inherit}address{font-style:inherit}a{background-color:rgba(0,0,0,0);text-decoration:none;color:inherit}abbr[title]{text-decoration:underline dotted}b,strong{font-weight:bolder}code,kbd,samp{font-family:monospace,monospace;font-size:inherit}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-0.25em}sup{top:-0.5em}svg,img,embed,object,iframe{vertical-align:bottom}button,input,optgroup,select,textarea{-webkit-appearance:none;appearance:none;vertical-align:middle;color:inherit;font:inherit;background:rgba(0,0,0,0);padding:0;margin:0;border-radius:0;text-align:inherit;text-transform:inherit}button,[type=button],[type=reset],[type=submit]{cursor:pointer}button:disabled,[type=button]:disabled,[type=reset]:disabled,[type=submit]:disabled{cursor:default}:-moz-focusring{outline:auto}select:disabled{opacity:inherit}option{padding:0}fieldset{margin:0;padding:0;min-width:0}legend{padding:0}progress{vertical-align:baseline}textarea{overflow:auto}[type=number]::-webkit-inner-spin-button,[type=number]::-webkit-outer-spin-button{height:auto}[type=search]{outline-offset:-2px}[type=search]::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}[type=number]{-moz-appearance:textfield;appearance:textfiled}label[for]{cursor:pointer}details{display:block}summary{display:list-item}[contenteditable]:focus{outline:auto}table{border-color:inherit;border-collapse:collapse}caption{text-align:left}td,th{vertical-align:top;padding:0}th{text-align:left;font-weight:bold}*{font-family:monospace}fieldset legend{margin-bottom:.3rem;font-weight:bold;letter-spacing:1px;display:flex;align-items:center}fieldset legend.isRequired:after{content:"必須";margin-left:.25rem;border-radius:.25rem;background-color:#fb4141;color:#fffffb;font-size:.6rem;padding:.1rem .25rem}input[type=text]{outline:none;background-color:#fffff8;border:1px solid #6f6f6f;border-radius:.25rem;line-height:1.5rem;padding:.1rem .25rem}input[type=text]:read-only{background-color:#dfdfdf}`, ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 13 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PartsDueDate: () => (/* binding */ PartsDueDate)
/* harmony export */ });
/* harmony import */ var _common_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _style_css_parts_due_date_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(14);
/**
 * 共通関数
 */


/**
 * parts-due-dateコンポーネント用のCSS
 */


/**
 * ミリ秒を1日単位に変換する定数
 */
const MS_PER_DAY = 86400000;

/**
 * PartsDueDate コンポーネントを作成しカスタム要素として定義する
 */
function PartsDueDate() {
  /**
   * PartsDueDate コンポーネントのカスタム要素のクラス
   * @extends {HTMLElement}
   */
  class PartsDueDate extends HTMLElement {
    /**
     * コンストラクタ
     * @return {void}
     */
    constructor() {
      super();

      this.attachShadow({ mode: "open" });
      this.shadowRoot.adoptedStyleSheets =
        _common_utils__WEBPACK_IMPORTED_MODULE_0__.Utils.createStyleSheetWithFilename(_style_css_parts_due_date_css__WEBPACK_IMPORTED_MODULE_1__["default"]);

      const fieldset = this.#creteFiledSet();
      const legend = this.#createLegend();
      const date = this.#createDate();

      fieldset.appendChild(legend);
      fieldset.appendChild(date);

      this.shadowRoot.innerHTML = "";
      this.shadowRoot.appendChild(fieldset);
    }

    /**
     * fieldsetを作成する
     * @returns {HTMLElement}
     */
    #creteFiledSet() {
      const fieldset = document.createElement("fieldset");
      fieldset.id = "container";
      return fieldset;
    }

    /**
     * legendを作成する
     * @returns {HTMLElement}
     */
    #createLegend() {
      const legend = document.createElement("legend");
      legend.id = "title";

      const text = document.createTextNode("期限日");
      const span = document.createElement("span");

      span.id = "deadline";

      legend.appendChild(text);
      legend.appendChild(span);

      return legend;
    }

    /**
     * DueDateInputを作成する
     * @returns {HTMLElement}
     */
    #createDate() {
      const input = document.createElement("input");

      input.id = "due-date";
      input.type = "date";
      input.style.width = "10rem";

      /**
       * 入力日が変更されたときに実行される関数。
       * 日付をパースして残りの日数を計算し、それを表示します。
       */
      input.addEventListener("change", (e) => {
        // デフォルトの動作を防止
        e.preventDefault();
        // イベントのバブリングを防止
        e.stopPropagation();

        this.#setDeadline();

        // カスタムイベント"changeTaskItem"をディスパッチ
        this.dispatchEvent(_common_utils__WEBPACK_IMPORTED_MODULE_0__.Utils.getCustomEvent("changeTaskItem"));
      });

      return input;
    }

    /**
     * Deadlineを設定する
     */
    #setDeadline() {
      const date = this.shadowRoot.getElementById("due-date");
      const deadline = this.shadowRoot.getElementById("deadline");

      if (this.invalidDeadline) {
        deadline.innerText = "";
        return;
      }

      // 入力されている日付が空でないことを確認
      if (date.value !== "") {
        // 残り日数または超過日数を表示
        const dayCount = this.dayCount;

        if (dayCount >= 0) {
          deadline.innerText = `(あと ${dayCount}日)`;
          deadline.classList.remove("reach");
        } else {
          deadline.innerText = `(${Math.abs(dayCount)}日 超過)`;
          deadline.classList.add("reach");
        }
      } else {
        deadline.innerText = "";
      }
    }

    /**
     * deadlineの有効/無効を設定
     * @param {boolean} flg
     */
    set isFinish(flg) {
      this.invalidDeadline = flg;
      this.#setDeadline();
    }

    /**
     * 期限日と当日日付の差分を計算する
     */
    get dayCount() {
      const date = this.shadowRoot.getElementById("due-date");

      // 入力されている日付が空でないことを確認
      if (date.value === "") {
        return 0;
      }

      // 入力された日付をパース
      const duedate = _common_utils__WEBPACK_IMPORTED_MODULE_0__.Utils.parseDate(date.value);
      // 本日の日付を取得してフォーマット
      const today = _common_utils__WEBPACK_IMPORTED_MODULE_0__.Utils.parseDate(
        _common_utils__WEBPACK_IMPORTED_MODULE_0__.Utils.formatDate(new Date(), "{yyyy}-{MM}-{dd}")
      );
      // 残り日数を計算
      const dayCount = Math.floor((duedate - today) / MS_PER_DAY);

      // 残り日数または超過日数を計算
      return dayCount;
    }

    /**
     * 必須項目であることを設定する
     * @return {void}
     */
    isRequired() {
      this.shadowRoot.getElementById("title").classList.add("isRequired");
    }

    /**
     * 期限日に値を設定する
     * @param {string} date 設定値
     * @return {void}
     */
    set value(date) {
      this.shadowRoot.getElementById("due-date").value = date;
      this.#setDeadline();
    }

    /**
     * 期限日の値を取得する
     * @return {string} 設定値
     */
    get value() {
      return this.shadowRoot.getElementById("due-date").value;
    }
  }
  // カスタム要素 "parts-due-date" を定義する
  customElements.define("parts-due-date", PartsDueDate);
}


/***/ }),
/* 14 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `/*! destyle.css v4.0.1 | MIT License | https://github.com/nicolas-cusan/destyle.css */*,::before,::after{box-sizing:border-box;border-style:solid;border-width:0;min-width:0}html{line-height:1.15;-webkit-text-size-adjust:100%;-webkit-tap-highlight-color:rgba(0,0,0,0)}body{margin:0}main{display:block}p,table,blockquote,address,pre,iframe,form,figure,dl{margin:0}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit;margin:0}ul,ol{margin:0;padding:0;list-style:none}dt{font-weight:bold}dd{margin-left:0}hr{box-sizing:content-box;height:0;overflow:visible;border-top-width:1px;margin:0;clear:both;color:inherit}pre{font-family:monospace,monospace;font-size:inherit}address{font-style:inherit}a{background-color:rgba(0,0,0,0);text-decoration:none;color:inherit}abbr[title]{text-decoration:underline dotted}b,strong{font-weight:bolder}code,kbd,samp{font-family:monospace,monospace;font-size:inherit}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-0.25em}sup{top:-0.5em}svg,img,embed,object,iframe{vertical-align:bottom}button,input,optgroup,select,textarea{-webkit-appearance:none;appearance:none;vertical-align:middle;color:inherit;font:inherit;background:rgba(0,0,0,0);padding:0;margin:0;border-radius:0;text-align:inherit;text-transform:inherit}button,[type=button],[type=reset],[type=submit]{cursor:pointer}button:disabled,[type=button]:disabled,[type=reset]:disabled,[type=submit]:disabled{cursor:default}:-moz-focusring{outline:auto}select:disabled{opacity:inherit}option{padding:0}fieldset{margin:0;padding:0;min-width:0}legend{padding:0}progress{vertical-align:baseline}textarea{overflow:auto}[type=number]::-webkit-inner-spin-button,[type=number]::-webkit-outer-spin-button{height:auto}[type=search]{outline-offset:-2px}[type=search]::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}[type=number]{-moz-appearance:textfield;appearance:textfiled}label[for]{cursor:pointer}details{display:block}summary{display:list-item}[contenteditable]:focus{outline:auto}table{border-color:inherit;border-collapse:collapse}caption{text-align:left}td,th{vertical-align:top;padding:0}th{text-align:left;font-weight:bold}*{font-family:monospace}fieldset legend{margin-bottom:.3rem;font-weight:bold;letter-spacing:1px;display:flex;align-items:center}fieldset legend.isRequired:after{content:"必須";margin-left:.25rem;border-radius:.25rem;background-color:#fb4141;color:#fffffb;font-size:.6rem;padding:.1rem .25rem}input[type=date]{outline:none;background-color:#fffff8;border:1px solid #6f6f6f;border-radius:.25rem;line-height:1.5rem;padding:.1rem .25rem}#deadline{margin-left:.15rem}#deadline.reach{color:red;font-weight:bold}`, ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 15 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PartsStaff: () => (/* binding */ PartsStaff)
/* harmony export */ });
/* harmony import */ var _common_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _style_css_parts_staff_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(16);
/**
 * 共通関数
 */


/**
 * PartsStaffコンポーネント用のCSS
 */


/**
 * PartsStaff コンポーネントを作成しカスタム要素として定義する
 */
function PartsStaff() {
  /**
   * PartsStaff コンポーネントのカスタム要素のクラス
   * @extends {HTMLElement}
   */
  class PartsStaff extends HTMLElement {
    /**
     * コンストラクタ
     * @return {void}
     */
    constructor() {
      super();

      this.attachShadow({ mode: "open" });
      this.shadowRoot.adoptedStyleSheets =
        _common_utils__WEBPACK_IMPORTED_MODULE_0__.Utils.createStyleSheetWithFilename(_style_css_parts_staff_css__WEBPACK_IMPORTED_MODULE_1__["default"]);

      const fieldset = this.#creteFiledSet("container");
      const legend = this.#createLegend("担当者", "title");
      const staffDiv = this.#createStaffDiv();
      const staffName = this.#createStaffName();
      const staffTel = this.#createStaffTel();

      fieldset.appendChild(legend);
      fieldset.appendChild(staffDiv);
      fieldset.appendChild(staffName);
      fieldset.appendChild(staffTel);

      this.shadowRoot.innerHTML = "";
      this.shadowRoot.appendChild(fieldset);

      // 変更イベントを伝播
      fieldset.addEventListener("change", () => {
        // カスタムイベント"changeTaskItem"をディスパッチ
        this.dispatchEvent(_common_utils__WEBPACK_IMPORTED_MODULE_0__.Utils.getCustomEvent("changeTaskItem"));
      });
    }

    /**
     * fieldsetを作成する
     * @param {string} id
     * @returns {HTMLElement}
     */
    #creteFiledSet(id = "") {
      const fieldset = document.createElement("fieldset");
      fieldset.id = id;
      return fieldset;
    }

    /**
     * legendを作成する
     * @param {string} name
     * @param {string} id
     * @returns {HTMLElement}
     */
    #createLegend(name, id = "") {
      const legend = document.createElement("legend");
      legend.innerText = name;
      legend.id = id;
      return legend;
    }

    /**
     * 必須項目であることを設定する
     * @return {void}
     */
    isRequired() {
      this.shadowRoot.getElementById("title").classList.add("isRequired");
    }

    //------------------------------
    //- 所属
    //------------------------------
    /**
     * StaffDivInputを作成する
     * @returns {HTMLElement}
     */
    #createStaffDiv() {
      const staffDiv = document.createElement("parts-input");
      staffDiv.title = "所属";
      staffDiv.input = "";
      staffDiv.placeholder = "情報システム課";
      staffDiv.inputWidth = "10rem";
      staffDiv.id = "staff-div";

      return _common_utils__WEBPACK_IMPORTED_MODULE_0__.Utils.wrapElementInItemDiv(staffDiv);
    }

    /**
     * 所属に値を設定する
     * @param {string} value 設定値
     * @return {void}
     */
    set divValue(value) {
      this.shadowRoot.getElementById("staff-div").value = value;
    }

    /**
     * 所属の値を取得する
     * @return {string} 設定値
     */
    get divValue() {
      return this.shadowRoot.getElementById("staff-div").value;
    }

    //------------------------------
    //- 氏名
    //------------------------------
    /**
     * StaffNameInputを作成する
     * @returns {HTMLElement}
     */
    #createStaffName() {
      const staffName = document.createElement("parts-input");
      staffName.title = "氏名";
      staffName.input = "";
      staffName.placeholder = "日本　太郎";
      staffName.inputWidth = "10rem";
      staffName.id = "staff-name";

      return _common_utils__WEBPACK_IMPORTED_MODULE_0__.Utils.wrapElementInItemDiv(staffName);
    }

    /**
     * 氏名に値を設定する
     * @param {string} value 設定値
     * @return {void}
     */
    set nameValue(value) {
      this.shadowRoot.getElementById("staff-name").value = value;
    }

    /**
     * 氏名の値を取得する
     * @return {string} 設定値
     */
    get nameValue() {
      return this.shadowRoot.getElementById("staff-name").value;
    }

    //------------------------------
    //- 電話番号
    //------------------------------
    /**
     * StaffTelInputを作成する
     * @returns {HTMLElement}
     */
    #createStaffTel() {
      const staffTel = document.createElement("parts-input");
      staffTel.title = "電話番号";
      staffTel.input = "";
      staffTel.placeholder = "0123-45-6789";
      staffTel.inputWidth = "10rem";
      staffTel.id = "staff-tel";

      return _common_utils__WEBPACK_IMPORTED_MODULE_0__.Utils.wrapElementInItemDiv(staffTel);
    }

    /**
     * 電話番号に値を設定する
     * @param {string} value 設定値
     * @return {void}
     */
    set telValue(value) {
      this.shadowRoot.getElementById("staff-tel").value = value;
    }

    /**
     * 電話番号の値を取得する
     * @return {string} 設定値
     */
    get telValue() {
      return this.shadowRoot.getElementById("staff-tel").value;
    }
  }
  // カスタム要素 "PartsStaff" を定義する
  customElements.define("parts-staff", PartsStaff);
}


/***/ }),
/* 16 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `/*! destyle.css v4.0.1 | MIT License | https://github.com/nicolas-cusan/destyle.css */*,::before,::after{box-sizing:border-box;border-style:solid;border-width:0;min-width:0}html{line-height:1.15;-webkit-text-size-adjust:100%;-webkit-tap-highlight-color:rgba(0,0,0,0)}body{margin:0}main{display:block}p,table,blockquote,address,pre,iframe,form,figure,dl{margin:0}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit;margin:0}ul,ol{margin:0;padding:0;list-style:none}dt{font-weight:bold}dd{margin-left:0}hr{box-sizing:content-box;height:0;overflow:visible;border-top-width:1px;margin:0;clear:both;color:inherit}pre{font-family:monospace,monospace;font-size:inherit}address{font-style:inherit}a{background-color:rgba(0,0,0,0);text-decoration:none;color:inherit}abbr[title]{text-decoration:underline dotted}b,strong{font-weight:bolder}code,kbd,samp{font-family:monospace,monospace;font-size:inherit}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-0.25em}sup{top:-0.5em}svg,img,embed,object,iframe{vertical-align:bottom}button,input,optgroup,select,textarea{-webkit-appearance:none;appearance:none;vertical-align:middle;color:inherit;font:inherit;background:rgba(0,0,0,0);padding:0;margin:0;border-radius:0;text-align:inherit;text-transform:inherit}button,[type=button],[type=reset],[type=submit]{cursor:pointer}button:disabled,[type=button]:disabled,[type=reset]:disabled,[type=submit]:disabled{cursor:default}:-moz-focusring{outline:auto}select:disabled{opacity:inherit}option{padding:0}fieldset{margin:0;padding:0;min-width:0}legend{padding:0}progress{vertical-align:baseline}textarea{overflow:auto}[type=number]::-webkit-inner-spin-button,[type=number]::-webkit-outer-spin-button{height:auto}[type=search]{outline-offset:-2px}[type=search]::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}[type=number]{-moz-appearance:textfield;appearance:textfiled}label[for]{cursor:pointer}details{display:block}summary{display:list-item}[contenteditable]:focus{outline:auto}table{border-color:inherit;border-collapse:collapse}caption{text-align:left}td,th{vertical-align:top;padding:0}th{text-align:left;font-weight:bold}*{font-family:monospace}fieldset legend{margin-bottom:.3rem;font-weight:bold;letter-spacing:1px;display:flex;align-items:center}fieldset legend.isRequired:after{content:"必須";margin-left:.25rem;border-radius:.25rem;background-color:#fb4141;color:#fffffb;font-size:.6rem;padding:.1rem .25rem}.wrap-item{display:inline-block;margin-right:.5rem}`, ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 17 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PartsRadio: () => (/* binding */ PartsRadio)
/* harmony export */ });
/* harmony import */ var _common_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _style_css_parts_radio_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(18);
/**
 * 共通関数
 */


/**
 * PartsRadioコンポーネント用のCSS
 */


/**
 * PartsRadio コンポーネントを作成しカスタム要素として定義する
 */
function PartsRadio() {
  /**
   * PartsRadio コンポーネントのカスタム要素のクラス
   * @extends {HTMLElement}
   */
  class PartsRadio extends HTMLElement {
    /**
     * コンストラクタ
     * @return {void}
     */
    constructor() {
      super();

      this.attachShadow({ mode: "open" });
      this.shadowRoot.adoptedStyleSheets =
        _common_utils__WEBPACK_IMPORTED_MODULE_0__.Utils.createStyleSheetWithFilename(_style_css_parts_radio_css__WEBPACK_IMPORTED_MODULE_1__["default"]);

      const fieldset = this.#creteFiledSet();
      const legend = this.#createLegend();

      fieldset.appendChild(legend);

      this.shadowRoot.innerHTML = "";
      this.shadowRoot.appendChild(fieldset);

      // 変更イベントを伝播
      fieldset.addEventListener("change", () => {
        // カスタムイベント"changeTaskItem"をディスパッチ
        this.dispatchEvent(_common_utils__WEBPACK_IMPORTED_MODULE_0__.Utils.getCustomEvent("changeTaskItem"));
      });
    }

    /**
     * fieldsetを作成する
     * @returns {HTMLElement}
     */
    #creteFiledSet() {
      const fieldset = document.createElement("fieldset");
      fieldset.id = "container";
      return fieldset;
    }

    /**
     * legendを作成する
     * @returns {HTMLElement}
     */
    #createLegend() {
      const legend = document.createElement("legend");
      legend.id = "title";
      return legend;
    }

    /**
     * Legendに値を設定する
     * @param {string} value 設定値
     * @return {void}
     */
    set title(value) {
      this.shadowRoot.getElementById("title").innerText = value;
    }

    /**
     * 必須項目であることを設定する
     * @return {void}
     */
    isRequired() {
      this.shadowRoot.getElementById("title").classList.add("isRequired");
    }

    /**
     * ボタン横幅を設定する
     * @param {string} value ボタン横幅
     * @return {void}
     */
    set btnWidth(value) {
      this.width = value;
    }

    /**
     * 渡されたパラメータに基づいて、ラジオボタンと対応するラベルを生成し、コンテナ内に追加します。
     *
     * @param {Array} parameters - ラベルと値を持つオブジェクトの配列。
     */
    set item(parameters) {
      const container = this.shadowRoot.getElementById("container");
      const div = document.createElement("div");
      div.classList.add("radio-buttons");

      // 各パラメータに対して処理
      parameters.forEach((p, index) => {
        const lbl = document.createElement("label");
        lbl.htmlFor = `item${p.value}`;
        lbl.textContent = p.text;
        lbl.style.width = this.width || "30px";

        const radio = document.createElement("input");
        radio.type = "radio";
        radio.name = "radio";
        radio.id = `item${p.value}`;
        radio.value = p.value;
        radio.checked = p.isChecked;

        if (p.isChecked) {
          this.defalutCheckedValue = p.value;
        }

        // 最初と最後の要素にクラスを追加
        if (index === 0) {
          lbl.classList.add("first");
        } else if (index === parameters.length - 1) {
          lbl.classList.add("last");
        }

        div.appendChild(lbl);
        div.appendChild(radio);
      });

      container.appendChild(div);
    }

    /**
     * 選択したラジオボタンのvalueを返す
     * @return {string} value
     */
    get value() {
      const container = this.shadowRoot.getElementById("container");
      return container.querySelector('input[name="radio"]:checked').value;
    }

    /**
     * ラジオボタンを選択する
     * @param {string} v
     */
    set value(v) {
      if (v === "") v = this.defalutCheckedValue;
      const rb = this.shadowRoot.getElementById(`item${v}`);
      rb.checked = true;
    }
  }
  // カスタム要素 "PartsRadio" を定義する
  customElements.define("parts-radio", PartsRadio);
}


/***/ }),
/* 18 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `/*! destyle.css v4.0.1 | MIT License | https://github.com/nicolas-cusan/destyle.css */*,::before,::after{box-sizing:border-box;border-style:solid;border-width:0;min-width:0}html{line-height:1.15;-webkit-text-size-adjust:100%;-webkit-tap-highlight-color:rgba(0,0,0,0)}body{margin:0}main{display:block}p,table,blockquote,address,pre,iframe,form,figure,dl{margin:0}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit;margin:0}ul,ol{margin:0;padding:0;list-style:none}dt{font-weight:bold}dd{margin-left:0}hr{box-sizing:content-box;height:0;overflow:visible;border-top-width:1px;margin:0;clear:both;color:inherit}pre{font-family:monospace,monospace;font-size:inherit}address{font-style:inherit}a{background-color:rgba(0,0,0,0);text-decoration:none;color:inherit}abbr[title]{text-decoration:underline dotted}b,strong{font-weight:bolder}code,kbd,samp{font-family:monospace,monospace;font-size:inherit}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-0.25em}sup{top:-0.5em}svg,img,embed,object,iframe{vertical-align:bottom}button,input,optgroup,select,textarea{-webkit-appearance:none;appearance:none;vertical-align:middle;color:inherit;font:inherit;background:rgba(0,0,0,0);padding:0;margin:0;border-radius:0;text-align:inherit;text-transform:inherit}button,[type=button],[type=reset],[type=submit]{cursor:pointer}button:disabled,[type=button]:disabled,[type=reset]:disabled,[type=submit]:disabled{cursor:default}:-moz-focusring{outline:auto}select:disabled{opacity:inherit}option{padding:0}fieldset{margin:0;padding:0;min-width:0}legend{padding:0}progress{vertical-align:baseline}textarea{overflow:auto}[type=number]::-webkit-inner-spin-button,[type=number]::-webkit-outer-spin-button{height:auto}[type=search]{outline-offset:-2px}[type=search]::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}[type=number]{-moz-appearance:textfield;appearance:textfiled}label[for]{cursor:pointer}details{display:block}summary{display:list-item}[contenteditable]:focus{outline:auto}table{border-color:inherit;border-collapse:collapse}caption{text-align:left}td,th{vertical-align:top;padding:0}th{text-align:left;font-weight:bold}*{font-family:monospace}fieldset legend{margin-bottom:.3rem;font-weight:bold;letter-spacing:1px;display:flex;align-items:center}fieldset legend.isRequired:after{content:"必須";margin-left:.25rem;border-radius:.25rem;background-color:#fb4141;color:#fffffb;font-size:.6rem;padding:.1rem .25rem}input[type=radio]{display:none}.radio-buttons{display:flex;justify-content:space-between}.radio-buttons label{flex:1;line-height:1.9rem;text-align:center;background-color:#fffff8;border:1px solid #6f6f6f;border-right:none}.radio-buttons label.first{border-top-left-radius:.25rem;border-bottom-left-radius:.25rem}.radio-buttons label.last{border-right:1px solid #6f6f6f;border-top-right-radius:.25rem;border-bottom-right-radius:.25rem}.radio-buttons label:has(+input:checked){background-color:#0a5eb0;color:#fffffb}.radio-buttons label:hover{background-color:#0a5eb0;color:#fffffb}`, ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 19 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PartsTextarea: () => (/* binding */ PartsTextarea)
/* harmony export */ });
/* harmony import */ var _common_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _style_css_parts_textarea_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(20);
/**
 * 共通関数
 */


/**
 * PartsTextareaコンポーネント用のCSS
 */


/**
 * PartsTextarea コンポーネントを作成しカスタム要素として定義する
 */
function PartsTextarea() {
  /**
   * PartsTextarea コンポーネントのカスタム要素のクラス
   * @extends {HTMLElement}
   */
  class PartsTextarea extends HTMLElement {
    /**
     * コンストラクタ
     * @return {void}
     */
    constructor() {
      super();

      this.attachShadow({ mode: "open" });
      this.shadowRoot.adoptedStyleSheets =
        _common_utils__WEBPACK_IMPORTED_MODULE_0__.Utils.createStyleSheetWithFilename(_style_css_parts_textarea_css__WEBPACK_IMPORTED_MODULE_1__["default"]);

      const fieldset = this.#creteFiledSet();
      const legend = this.#createLegend();
      const textarea = this.#createTextarea();

      fieldset.appendChild(legend);
      fieldset.appendChild(textarea);

      this.shadowRoot.innerHTML = "";
      this.shadowRoot.appendChild(fieldset);

      // 変更イベントを伝播
      fieldset.addEventListener("change", () => {
        // カスタムイベント"changeTaskItem"をディスパッチ
        this.dispatchEvent(_common_utils__WEBPACK_IMPORTED_MODULE_0__.Utils.getCustomEvent("changeTaskItem"));
      });
    }

    /**
     * 要素がDOMに追加された後の処理
     */
    connectedCallback() {
      const textarea = this.shadowRoot.getElementById("textarea");
      textarea.style.height = _common_utils__WEBPACK_IMPORTED_MODULE_0__.Utils.adjustTextareaHeight(
        textarea,
        this.defaultRows,
        this.defaultRows
      );
    }

    /**
     * fieldsetを作成する
     * @returns {HTMLElement}
     */
    #creteFiledSet() {
      const fieldset = document.createElement("fieldset");
      fieldset.id = "container";
      return fieldset;
    }

    /**
     * legendを作成する
     * @returns {HTMLElement}
     */
    #createLegend() {
      const legend = document.createElement("legend");
      legend.id = "title";
      return legend;
    }

    /**
     * Textareaを作成する
     * @returns {HTMLElement}
     */
    #createTextarea() {
      const textarea = document.createElement("textarea");
      textarea.id = "textarea";
      textarea.spellcheck = false;

      /**
       * 入力内容に連動して高さを変更する
       */
      textarea.addEventListener("input", (e) => {
        e.preventDefault();
        e.stopPropagation();
        textarea.style.height = _common_utils__WEBPACK_IMPORTED_MODULE_0__.Utils.adjustTextareaHeight(
          textarea,
          this.defaultRows
        );
      });

      return textarea;
    }

    /**
     * Legendに値を設定する
     * @param {string} value 設定値
     * @return {void}
     */
    set title(value) {
      this.shadowRoot.getElementById("title").innerText = value;
    }

    /**
     * 必須項目であることを設定する
     * @return {void}
     */
    isRequired() {
      this.shadowRoot.getElementById("title").classList.add("isRequired");
    }

    /**
     * Textarea横幅を設定する
     * @param {string} width Textarea横幅
     * @return {void}
     */
    set textareaWidth(width) {
      this.shadowRoot.getElementById("textarea").style.width = width;
    }

    /**
     * Textarea行数を設定する
     * @param {number} rows Textarea行数
     * @return {void}
     */
    set textareaRows(rows) {
      this.defaultRows = rows;
    }

    /**
     * Textareaに値を設定する
     * @param {string} value 設定値
     * @return {void}
     */
    set value(text) {
      const textarea = this.shadowRoot.getElementById("textarea");

      textarea.value = text;
      textarea.style.height = _common_utils__WEBPACK_IMPORTED_MODULE_0__.Utils.adjustTextareaHeight(
        textarea,
        this.defaultRows
      );
    }

    /**
     * Textareaの値を取得する
     * @return {string} 設定値
     */
    get value() {
      return this.shadowRoot.getElementById("textarea").value;
    }

    /**
     *placeholderを設定する
     * @param {string} placeholder 表示内容
     * @return {void}
     */
    set placeholder(placeholder) {
      this.shadowRoot.getElementById("textarea").placeholder = placeholder;
    }
  }
  // カスタム要素 "PartsTextarea" を定義する
  customElements.define("parts-textarea", PartsTextarea);
}


/***/ }),
/* 20 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `/*! destyle.css v4.0.1 | MIT License | https://github.com/nicolas-cusan/destyle.css */*,::before,::after{box-sizing:border-box;border-style:solid;border-width:0;min-width:0}html{line-height:1.15;-webkit-text-size-adjust:100%;-webkit-tap-highlight-color:rgba(0,0,0,0)}body{margin:0}main{display:block}p,table,blockquote,address,pre,iframe,form,figure,dl{margin:0}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit;margin:0}ul,ol{margin:0;padding:0;list-style:none}dt{font-weight:bold}dd{margin-left:0}hr{box-sizing:content-box;height:0;overflow:visible;border-top-width:1px;margin:0;clear:both;color:inherit}pre{font-family:monospace,monospace;font-size:inherit}address{font-style:inherit}a{background-color:rgba(0,0,0,0);text-decoration:none;color:inherit}abbr[title]{text-decoration:underline dotted}b,strong{font-weight:bolder}code,kbd,samp{font-family:monospace,monospace;font-size:inherit}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-0.25em}sup{top:-0.5em}svg,img,embed,object,iframe{vertical-align:bottom}button,input,optgroup,select,textarea{-webkit-appearance:none;appearance:none;vertical-align:middle;color:inherit;font:inherit;background:rgba(0,0,0,0);padding:0;margin:0;border-radius:0;text-align:inherit;text-transform:inherit}button,[type=button],[type=reset],[type=submit]{cursor:pointer}button:disabled,[type=button]:disabled,[type=reset]:disabled,[type=submit]:disabled{cursor:default}:-moz-focusring{outline:auto}select:disabled{opacity:inherit}option{padding:0}fieldset{margin:0;padding:0;min-width:0}legend{padding:0}progress{vertical-align:baseline}textarea{overflow:auto}[type=number]::-webkit-inner-spin-button,[type=number]::-webkit-outer-spin-button{height:auto}[type=search]{outline-offset:-2px}[type=search]::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}[type=number]{-moz-appearance:textfield;appearance:textfiled}label[for]{cursor:pointer}details{display:block}summary{display:list-item}[contenteditable]:focus{outline:auto}table{border-color:inherit;border-collapse:collapse}caption{text-align:left}td,th{vertical-align:top;padding:0}th{text-align:left;font-weight:bold}*{font-family:monospace}fieldset legend{margin-bottom:.3rem;font-weight:bold;letter-spacing:1px;display:flex;align-items:center}fieldset legend.isRequired:after{content:"必須";margin-left:.25rem;border-radius:.25rem;background-color:#fb4141;color:#fffffb;font-size:.6rem;padding:.1rem .25rem}textarea{outline:none;background-color:#fffff8;border:1px solid #6f6f6f;border-radius:.25rem;line-height:15px;padding:5px;resize:none;overflow-y:hidden;word-break:break-all}`, ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 21 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HistoryItem: () => (/* binding */ HistoryItem)
/* harmony export */ });
/* harmony import */ var _common_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _style_css_history_item_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(22);
/**
 * 共通関数
 */


/**
 * HistoryItemコンポーネント用のCSS
 */


/**
 * ドラッグ操作中の要素
 */
let draggedElement;

/**
 * HistoryItem コンポーネントを作成しカスタム要素として定義する
 */
function HistoryItem() {
  /**
   * HistoryItem コンポーネントのカスタム要素のクラス
   * @extends {HTMLElement}
   */
  class HistoryItem extends HTMLElement {
    /**
     * コンストラクタ
     * @return {void}
     */
    constructor() {
      super();

      this.attachShadow({ mode: "open" });
      this.shadowRoot.adoptedStyleSheets =
        _common_utils__WEBPACK_IMPORTED_MODULE_0__.Utils.createStyleSheetWithFilename(_style_css_history_item_css__WEBPACK_IMPORTED_MODULE_1__["default"]);

      const container = document.createElement("div");
      const svgIcon = this.#createSvgIconPlus();
      const addButton = this.#createAddPartsHistoryItemButton();

      container.appendChild(svgIcon);
      container.appendChild(addButton);
      container.id = "container";

      this.shadowRoot.innerHTML = "";
      this.shadowRoot.appendChild(container);
    }

    /**
     * 入力内容の変更を検知するイベントを有効化する
     */
    enableCustomEvent() {
      const container = this.shadowRoot.getElementById("container");
      container.addEventListener("changeHistoryItem", () => {
        this.dispatchEvent(_common_utils__WEBPACK_IMPORTED_MODULE_0__.Utils.getCustomEvent("changeHistory"));
      });
    }

    /**
     * container内の全てのparts-history-item要素からデータを取得する
     *
     * @returns {Array.<{ text: string, date: string }>} 取得されたデータの配列
     */
    getHistoryData() {
      const container = this.shadowRoot.getElementById("container");
      const items = container.getElementsByTagName("parts-history-item");

      const result = [];
      for (const item of items) {
        const text = item.text;
        const date = item.date;
        result.push({ text: text, date: date });
      }

      return result;
    }

    /**
     * データを元にHistoryItemをレンダリングする
     * @param {array} itemList historyData
     * @returns {void}
     */
    renderHistoryItem(itemList) {
      itemList.forEach((item) => {
        const piece = this.#addEmptyParts();
        piece.text = item.text;
        piece.date = item.date;
      });
    }

    /**
     * プラス記号のSVGアイコンを作成する
     * @returns {SVGElement} プラスアイコンを含む生成されたSVG要素
     */
    #createSvgIconPlus() {
      return _common_utils__WEBPACK_IMPORTED_MODULE_0__.Utils.createSvg("plus", [
        { path: "M0 0h24v24H0z" },
        { path: "M12 5l0 14" },
        { path: "M5 12l14 0" },
      ]);
    }

    /**
     * 履歴アイテム追加用のボタンを作成する
     *
     * @returns {HTMLButtonElement} 生成された履歴アイテム追加用のボタン
     */
    #createAddPartsHistoryItemButton() {
      const btn = _common_utils__WEBPACK_IMPORTED_MODULE_0__.Utils.createSvgButton("plus");
      btn.id = "add-parts-history-item";
      btn.classList.add("float-button");

      /**
       * ボタンクリック時、履歴入力欄を追加する
       */
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.#addEmptyParts();
        this.dispatchEvent(_common_utils__WEBPACK_IMPORTED_MODULE_0__.Utils.getCustomEvent("addHistory"));
      });
      return btn;
    }

    /**
     * 履歴入力欄を作成し画面に追加する。
     * @returns {HTMLElement} piece
     */
    #addEmptyParts() {
      const container = this.shadowRoot.getElementById("container");
      const piece = document.createElement("parts-history-item");
      piece.id = _common_utils__WEBPACK_IMPORTED_MODULE_0__.Utils.getUniqueId();

      const wrapPiece = _common_utils__WEBPACK_IMPORTED_MODULE_0__.Utils.wrapElementInItemDiv(piece);
      wrapPiece.classList.add("parts");

      container.appendChild(wrapPiece);

      // ドラッグ操作イベントを追加
      this.#addDragEventListeners(wrapPiece);

      // 要素削除時の処理を追加
      piece.addEventListener("deleteHistoryItem", () => {
        wrapPiece.remove();
        this.dispatchEvent(_common_utils__WEBPACK_IMPORTED_MODULE_0__.Utils.getCustomEvent("changeHistory"));
      });

      return piece;
    }

    /**
     * ドラッグイベントリスナーを追加
     * @param {HTMLElement} element ドラッグイベントリスナーを追加する要素
     */
    #addDragEventListeners(element) {
      element.setAttribute("draggable", true);
      element.addEventListener("dragstart", this.#handleDragStart);
      element.addEventListener("dragover", this.#handleDragOver);
      element.addEventListener("dragend", this.#handleDragEnd);
    }

    /**
     * ドラッグ操作開始
     * @param {Event} e
     */
    #handleDragStart(e) {
      draggedElement = e.target;

      if (draggedElement.isTextareaActive) {
        return;
      }

      e.dataTransfer.effectAllowed = "move";
      e.dataTransfer.setData("text/html", e.target.innerHTML);
      e.target.classList.add("dragging");
    }
    /**
     * ドラッグ中
     * @param {Event} e
     */
    #handleDragOver(e) {
      e.preventDefault();
      e.dataTransfer.dropEffect = "move";

      // ターゲット要素を最も近いdiv要素に設定
      const target = e.target.closest("div");
      if (!target || target === draggedElement) {
        return;
      }

      // ターゲット要素の位置とサイズを取得
      const rect = target.getBoundingClientRect();

      // マウス位置がターゲットのどの位置に来ているかを計算
      const nowPosition = (e.clientY - rect.top) / (rect.bottom - rect.top);

      // 要素の挿入位置を決定
      if (nowPosition > 0.5) {
        target.insertAdjacentElement("afterend", draggedElement);
      } else {
        target.insertAdjacentElement("beforebegin", draggedElement);
      }
    }

    /**
     * ドラッグ終了
     * @param {Event} e
     */
    #handleDragEnd(e) {
      e.target.classList.remove("dragging");
      draggedElement = null;
      this.dispatchEvent(_common_utils__WEBPACK_IMPORTED_MODULE_0__.Utils.getCustomEvent("changeHistory"));
    }
  }
  // カスタム要素 "HistoryItem" を定義する
  customElements.define("history-item", HistoryItem);
}


/***/ }),
/* 22 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `/*! destyle.css v4.0.1 | MIT License | https://github.com/nicolas-cusan/destyle.css */*,::before,::after{box-sizing:border-box;border-style:solid;border-width:0;min-width:0}html{line-height:1.15;-webkit-text-size-adjust:100%;-webkit-tap-highlight-color:rgba(0,0,0,0)}body{margin:0}main{display:block}p,table,blockquote,address,pre,iframe,form,figure,dl{margin:0}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit;margin:0}ul,ol{margin:0;padding:0;list-style:none}dt{font-weight:bold}dd{margin-left:0}hr{box-sizing:content-box;height:0;overflow:visible;border-top-width:1px;margin:0;clear:both;color:inherit}pre{font-family:monospace,monospace;font-size:inherit}address{font-style:inherit}a{background-color:rgba(0,0,0,0);text-decoration:none;color:inherit}abbr[title]{text-decoration:underline dotted}b,strong{font-weight:bolder}code,kbd,samp{font-family:monospace,monospace;font-size:inherit}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-0.25em}sup{top:-0.5em}svg,img,embed,object,iframe{vertical-align:bottom}button,input,optgroup,select,textarea{-webkit-appearance:none;appearance:none;vertical-align:middle;color:inherit;font:inherit;background:rgba(0,0,0,0);padding:0;margin:0;border-radius:0;text-align:inherit;text-transform:inherit}button,[type=button],[type=reset],[type=submit]{cursor:pointer}button:disabled,[type=button]:disabled,[type=reset]:disabled,[type=submit]:disabled{cursor:default}:-moz-focusring{outline:auto}select:disabled{opacity:inherit}option{padding:0}fieldset{margin:0;padding:0;min-width:0}legend{padding:0}progress{vertical-align:baseline}textarea{overflow:auto}[type=number]::-webkit-inner-spin-button,[type=number]::-webkit-outer-spin-button{height:auto}[type=search]{outline-offset:-2px}[type=search]::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}[type=number]{-moz-appearance:textfield;appearance:textfiled}label[for]{cursor:pointer}details{display:block}summary{display:list-item}[contenteditable]:focus{outline:auto}table{border-color:inherit;border-collapse:collapse}caption{text-align:left}td,th{vertical-align:top;padding:0}th{text-align:left;font-weight:bold}.svg{position:absolute;width:0;height:0;overflow:hidden}svg.icon{display:block;width:1em;height:1em;stroke-width:0;stroke:currentColor;fill:currentColor;pointer-events:none}svg.icon use{pointer-events:none}*{font-family:monospace}.float-button{position:absolute;right:1rem;bottom:1rem;z-index:1000;padding:.5rem;border-radius:50%;color:#fffffb;background-color:#0a3981;border:1px solid #0a3981;box-shadow:0px 3px 3px 0px rgba(0,0,0,.1)}.float-button:hover{color:#0a3981;background-color:#fffff8;border-color:#0a3981}.float-button .icon{font-size:2rem}.wrap-item{padding-bottom:.75rem}.wrap-item.dragging{opacity:.5}`, ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 23 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PartsHistoryItem: () => (/* binding */ PartsHistoryItem)
/* harmony export */ });
/* harmony import */ var _common_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _style_css_parts_history_item_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(24);
/**
 * 共通関数
 */


/**
 * PartsHistoryItemコンポーネント用のCSS
 */


/**
 * デフォルト行数
 */
const DEFAULT_ROWS = 3;

/**
 * PartsHistoryItem コンポーネントを作成しカスタム要素として定義する
 */
function PartsHistoryItem() {
  /**
   * PartsHistoryItemコンポーネント用のCSS コンポーネントのカスタム要素のクラス
   * @extends {HTMLElement}
   */
  class PartsHistoryItem extends HTMLElement {
    /**
     * コンストラクタ
     * @return {void}
     */
    constructor() {
      super();

      this.attachShadow({ mode: "open" });
      this.shadowRoot.adoptedStyleSheets =
        _common_utils__WEBPACK_IMPORTED_MODULE_0__.Utils.createStyleSheetWithFilename(_style_css_parts_history_item_css__WEBPACK_IMPORTED_MODULE_1__["default"]);

      const container = document.createElement("div");
      const text = this.#createTextarea();
      const input = this.#createDateTime();
      const svgIconGripVertical = this.#createSvgIconGripVertical();
      const moveBtn = this.#createMoveItemButton();
      const svgIconTrash = this.#createSvgIconTrash();
      const trashBtn = this.#createTrashButton();

      container.id = "container";
      container.appendChild(text);
      container.appendChild(input);
      container.appendChild(svgIconGripVertical);
      container.appendChild(moveBtn);
      container.appendChild(svgIconTrash);
      container.appendChild(trashBtn);

      this.shadowRoot.innerHTML = "";
      this.shadowRoot.appendChild(container);

      // 変更イベントを伝播
      container.addEventListener("change", () => {
        this.dispatchEvent(_common_utils__WEBPACK_IMPORTED_MODULE_0__.Utils.getCustomEvent("changeHistoryItem"));
      });
    }

    /**
     * 要素がDOMに追加された後の処理
     */
    connectedCallback() {
      const textarea = this.shadowRoot.getElementById("textarea");

      // 入力値有の場合は、入力内容に合わせて高さを設定する。
      // ドラッグ操作による並べ替えを想定
      let rows = DEFAULT_ROWS;
      if (textarea.value !== "") {
        rows = 0;
      }

      textarea.style.height = _common_utils__WEBPACK_IMPORTED_MODULE_0__.Utils.adjustTextareaHeight(
        textarea,
        DEFAULT_ROWS,
        rows
      );
    }

    /**
     * テキストエリアがアクティブかを確認する
     * @returns {boolean} テキストエリアがフォーカスされている場合はtrue、そうでない場合はfalse
     */
    isTextareaActive() {
      const textarea = this.shadowRoot.getElementById("textarea");
      return this.shadowRoot.activeElement === textarea;
    }

    //--------------------------------------------
    // 履歴入力
    //--------------------------------------------
    /**
     * Textareaを作成する
     * @returns {HTMLElement}
     */
    #createTextarea() {
      const textarea = document.createElement("textarea");
      textarea.id = "textarea";
      textarea.spellcheck = false;
      textarea.placeholder = "作業履歴を入力";

      /**
       * 入力内容に連動して高さを変更する
       */
      textarea.addEventListener("input", (e) => {
        e.preventDefault();
        e.stopPropagation();
        textarea.style.height = _common_utils__WEBPACK_IMPORTED_MODULE_0__.Utils.adjustTextareaHeight(
          textarea,
          DEFAULT_ROWS
        );
      });

      return textarea;
    }

    /**
     * 履歴内容を取得する
     * @return {string} value
     */
    get text() {
      return this.shadowRoot.getElementById("textarea").value;
    }

    /**
     * 履歴内容を設定する
     * @param {string} value
     */
    set text(value) {
      const textarea = this.shadowRoot.getElementById("textarea");
      textarea.value = value;
      textarea.style.height = _common_utils__WEBPACK_IMPORTED_MODULE_0__.Utils.adjustTextareaHeight(
        textarea,
        DEFAULT_ROWS
      );
    }

    //--------------------------------------------
    // 日付入力
    //--------------------------------------------
    /**
     * DataTimeInputを作成する
     * @returns {HTMLElement}
     */
    #createDateTime() {
      const div = document.createElement("div");
      const input = document.createElement("input");

      div.classList.add("date-box");

      input.id = "datetime";
      input.type = "datetime-local";
      input.value = _common_utils__WEBPACK_IMPORTED_MODULE_0__.Utils.formatDate(new Date(), "{yyyy}-{MM}-{dd}T{HH}:{mm}");

      div.appendChild(input);

      return div;
    }

    /**
     * 日付を取得する
     * @return {string} value
     */
    get date() {
      return this.shadowRoot.getElementById("datetime").value;
    }

    /**
     * 日付を設定する
     * @param {string} value
     */
    set date(value) {
      this.shadowRoot.getElementById("datetime").value = value;
    }

    //--------------------------------------------
    // Drag操作
    //--------------------------------------------

    /**
     * gripのSVGアイコンを作成する
     * @returns {SVGElement} gripを含む生成されたSVG要素
     */
    #createSvgIconGripVertical() {
      return _common_utils__WEBPACK_IMPORTED_MODULE_0__.Utils.createSvg("grip-vertical", [
        { path: "M0 0h24v24H0z" },
        { path: "M9 5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" },
        { path: "M9 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" },
        { path: "M9 19m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" },
        { path: "M15 5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" },
        { path: "M15 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" },
        { path: "M15 19m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" },
      ]);
    }

    /**
     * 履歴移動用のボタンを作成する
     *
     * @returns {HTMLButtonElement} 生成された履歴移動用のボタン
     */
    #createMoveItemButton() {
      const btn = _common_utils__WEBPACK_IMPORTED_MODULE_0__.Utils.createSvgButton("grip-vertical");
      btn.id = "move-item";
      return btn;
    }

    //--------------------------------------------
    // 履歴削除
    //--------------------------------------------

    /**
     * SVGアイコン追加
     * @private
     * @returns {void}
     * @memberof TaskHistory
     */
    #createSvgIconTrash() {
      return _common_utils__WEBPACK_IMPORTED_MODULE_0__.Utils.createSvg("trash", [
        { path: "M0 0h24v24H0z" },
        { path: "M4 7l16 0" },
        { path: "M10 11l0 6" },
        { path: "M14 11l0 6" },
        { path: "M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" },
        { path: "M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" },
      ]);
    }

    /**
     * 履歴削除用のボタンを作成する
     *
     * @returns {HTMLButtonElement} 生成された履歴削除用のボタン
     */
    #createTrashButton() {
      const btn = _common_utils__WEBPACK_IMPORTED_MODULE_0__.Utils.createSvgButton("trash");
      btn.id = "trash-item";

      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const result = confirm("履歴を削除しますか");
        if (result) {
          this.remove();
          this.dispatchEvent(_common_utils__WEBPACK_IMPORTED_MODULE_0__.Utils.getCustomEvent("deleteHistoryItem"));
        }
      });

      return btn;
    }
  }
  // カスタム要素 "PartsHistoryItem" を定義する
  customElements.define("parts-history-item", PartsHistoryItem);
}


/***/ }),
/* 24 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `/*! destyle.css v4.0.1 | MIT License | https://github.com/nicolas-cusan/destyle.css */*,::before,::after{box-sizing:border-box;border-style:solid;border-width:0;min-width:0}html{line-height:1.15;-webkit-text-size-adjust:100%;-webkit-tap-highlight-color:rgba(0,0,0,0)}body{margin:0}main{display:block}p,table,blockquote,address,pre,iframe,form,figure,dl{margin:0}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit;margin:0}ul,ol{margin:0;padding:0;list-style:none}dt{font-weight:bold}dd{margin-left:0}hr{box-sizing:content-box;height:0;overflow:visible;border-top-width:1px;margin:0;clear:both;color:inherit}pre{font-family:monospace,monospace;font-size:inherit}address{font-style:inherit}a{background-color:rgba(0,0,0,0);text-decoration:none;color:inherit}abbr[title]{text-decoration:underline dotted}b,strong{font-weight:bolder}code,kbd,samp{font-family:monospace,monospace;font-size:inherit}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-0.25em}sup{top:-0.5em}svg,img,embed,object,iframe{vertical-align:bottom}button,input,optgroup,select,textarea{-webkit-appearance:none;appearance:none;vertical-align:middle;color:inherit;font:inherit;background:rgba(0,0,0,0);padding:0;margin:0;border-radius:0;text-align:inherit;text-transform:inherit}button,[type=button],[type=reset],[type=submit]{cursor:pointer}button:disabled,[type=button]:disabled,[type=reset]:disabled,[type=submit]:disabled{cursor:default}:-moz-focusring{outline:auto}select:disabled{opacity:inherit}option{padding:0}fieldset{margin:0;padding:0;min-width:0}legend{padding:0}progress{vertical-align:baseline}textarea{overflow:auto}[type=number]::-webkit-inner-spin-button,[type=number]::-webkit-outer-spin-button{height:auto}[type=search]{outline-offset:-2px}[type=search]::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}[type=number]{-moz-appearance:textfield;appearance:textfiled}label[for]{cursor:pointer}details{display:block}summary{display:list-item}[contenteditable]:focus{outline:auto}table{border-color:inherit;border-collapse:collapse}caption{text-align:left}td,th{vertical-align:top;padding:0}th{text-align:left;font-weight:bold}.svg{position:absolute;width:0;height:0;overflow:hidden}svg.icon{display:block;width:1em;height:1em;stroke-width:0;stroke:currentColor;fill:currentColor;pointer-events:none}svg.icon use{pointer-events:none}*{font-family:monospace}#container{position:relative;padding:.35rem;padding-right:2rem;padding-bottom:1.5rem;background-color:#fffff8;border:1px solid #8f8f8f;border-radius:.25rem}#container #textarea{outline:none;width:100%;background-color:#fffff8;border-radius:.25rem;line-height:15px;padding:5px;margin-bottom:.35rem;resize:none;overflow-y:hidden;word-break:break-all}#container #textarea:hover,#container #textarea:focus{background-color:#efefef}#container .date-box{position:absolute;bottom:.25rem;right:2rem}#container .date-box #datetime{font-size:.9rem;line-height:1.2rem}#container #move-item{cursor:move;position:absolute;right:0;top:0;bottom:0;color:#8f8f8f;border-left:1px solid #8f8f8f;border-top-right-radius:.25rem;border-bottom-right-radius:.25rem}#container #move-item .icon{height:1.25rem;width:1.25rem}#container #move-item:hover{color:#3f3f3f;background-color:#fff6b3}#container #trash-item{position:absolute;bottom:.25rem;left:.35rem;color:#8f8f8f}#container #trash-item .icon{height:1.25rem;width:1.25rem}#container #trash-item:hover{color:red}`, ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 25 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `/*! destyle.css v4.0.1 | MIT License | https://github.com/nicolas-cusan/destyle.css */*,::before,::after{box-sizing:border-box;border-style:solid;border-width:0;min-width:0}html{line-height:1.15;-webkit-text-size-adjust:100%;-webkit-tap-highlight-color:rgba(0,0,0,0)}body{margin:0}main{display:block}p,table,blockquote,address,pre,iframe,form,figure,dl{margin:0}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit;margin:0}ul,ol{margin:0;padding:0;list-style:none}dt{font-weight:bold}dd{margin-left:0}hr{box-sizing:content-box;height:0;overflow:visible;border-top-width:1px;margin:0;clear:both;color:inherit}pre{font-family:monospace,monospace;font-size:inherit}address{font-style:inherit}a{background-color:rgba(0,0,0,0);text-decoration:none;color:inherit}abbr[title]{text-decoration:underline dotted}b,strong{font-weight:bolder}code,kbd,samp{font-family:monospace,monospace;font-size:inherit}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-0.25em}sup{top:-0.5em}svg,img,embed,object,iframe{vertical-align:bottom}button,input,optgroup,select,textarea{-webkit-appearance:none;appearance:none;vertical-align:middle;color:inherit;font:inherit;background:rgba(0,0,0,0);padding:0;margin:0;border-radius:0;text-align:inherit;text-transform:inherit}button,[type=button],[type=reset],[type=submit]{cursor:pointer}button:disabled,[type=button]:disabled,[type=reset]:disabled,[type=submit]:disabled{cursor:default}:-moz-focusring{outline:auto}select:disabled{opacity:inherit}option{padding:0}fieldset{margin:0;padding:0;min-width:0}legend{padding:0}progress{vertical-align:baseline}textarea{overflow:auto}[type=number]::-webkit-inner-spin-button,[type=number]::-webkit-outer-spin-button{height:auto}[type=search]{outline-offset:-2px}[type=search]::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}[type=number]{-moz-appearance:textfield;appearance:textfiled}label[for]{cursor:pointer}details{display:block}summary{display:list-item}[contenteditable]:focus{outline:auto}table{border-color:inherit;border-collapse:collapse}caption{text-align:left}td,th{vertical-align:top;padding:0}th{text-align:left;font-weight:bold}.svg{position:absolute;width:0;height:0;overflow:hidden}svg.icon{display:block;width:1em;height:1em;stroke-width:0;stroke:currentColor;fill:currentColor;pointer-events:none}svg.icon use{pointer-events:none}*{font-family:monospace}.float-button{position:absolute;right:1rem;bottom:1rem;z-index:1000;padding:.5rem;border-radius:50%;color:#fffffb;background-color:#0a3981;border:1px solid #0a3981;box-shadow:0px 3px 3px 0px rgba(0,0,0,.1)}.float-button:hover{color:#0a3981;background-color:#fffff8;border-color:#0a3981}.float-button .icon{font-size:2rem}#container{display:grid;grid-auto-columns:1fr;grid-auto-rows:1fr;grid-template-columns:300px 1fr 1fr;grid-template-rows:30px 30px 1fr;gap:0em 0em;grid-template-areas:"grid-header grid-header grid-header" "grid-control grid-task grid-history" "grid-tree grid-task grid-history";height:100vh}#container #grid-header{grid-area:grid-header;background-color:#3c3c3c}#container #grid-control{grid-area:grid-control;background-color:#fffffb;padding:0 .5rem}#container #grid-tree{grid-area:grid-tree;background-color:#fffffb;padding:.5rem}#container #grid-task{grid-area:grid-task;background-color:#d4f1ef;padding:1rem}#container #grid-history{grid-area:grid-history;background-color:#d4f1ef;padding:1rem;padding-bottom:4.5rem}#container .scroll{overflow-y:scroll}#container .scroll::-webkit-scrollbar{display:none}`, ""]);
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
/* harmony import */ var _js_common_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _js_common_file_manager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var _js_components_control_menu__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3);
/* harmony import */ var _js_components_tree_view__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7);
/* harmony import */ var _js_components_task_item__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9);
/* harmony import */ var _js_parts_parts_input__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(11);
/* harmony import */ var _js_parts_parts_due_date__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(13);
/* harmony import */ var _js_parts_parts_staff__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(15);
/* harmony import */ var _js_parts_parts_radio__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(17);
/* harmony import */ var _js_parts_parts_textarea__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(19);
/* harmony import */ var _js_components_history_item__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(21);
/* harmony import */ var _js_parts_parts_history_item__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(23);
/* harmony import */ var _style_css_index_css__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(25);
/**
 * 共通関数
 */



/**
 * Web Components
 */











/**
 * スタイルシート
 */


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
   * @param {number} dayCount
   */
  const changeDeadlineHandler = (dayCount) => {
    if (dayCount >= 0) {
      btn.classList.remove("over-deadline");
    } else {
      btn.classList.add("over-deadline");
    }
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
  document.adoptedStyleSheets = _js_common_utils__WEBPACK_IMPORTED_MODULE_0__.Utils.createStyleSheetWithFilename(_style_css_index_css__WEBPACK_IMPORTED_MODULE_12__["default"]);

  const container = document.getElementById("container");
  container.innerHTML = "";
  container.appendChild(createGrid("grid-header", []));
  container.appendChild(createGrid("grid-control", []));
  container.appendChild(createGrid("grid-tree", ["scroll"]));
  container.appendChild(createGrid("grid-task", ["scroll"]));
  container.appendChild(createGrid("grid-history", ["scroll"]));

  // フォルダを開くボタンを追加する
  const svgIcon = _js_common_utils__WEBPACK_IMPORTED_MODULE_0__.Utils.createSvg("folder", [
    {
      path: "M0 0h24v24H0z",
    },
    {
      path: "M5 4h4l3 3h7a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-11a2 2 0 0 1 2 -2",
    },
  ]);

  const folderOpenButton = _js_common_utils__WEBPACK_IMPORTED_MODULE_0__.Utils.createSvgButton("folder");
  folderOpenButton.id = "folder-open-button";
  folderOpenButton.classList.add("float-button");

  container.appendChild(svgIcon);
  container.appendChild(folderOpenButton);

  // フォルダを開くイベントを追加する
  folderOpenButton.addEventListener("click", async (e) => {
    e.preventDefault();
    e.stopPropagation();

    fileManager = new _js_common_file_manager__WEBPACK_IMPORTED_MODULE_1__.FileManager();
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
  (0,_js_components_control_menu__WEBPACK_IMPORTED_MODULE_2__.ControlMenu)();
  (0,_js_components_tree_view__WEBPACK_IMPORTED_MODULE_3__.TreeView)();
  (0,_js_components_task_item__WEBPACK_IMPORTED_MODULE_4__.TaskItem)();
  (0,_js_parts_parts_input__WEBPACK_IMPORTED_MODULE_5__.PartsInput)();
  (0,_js_parts_parts_due_date__WEBPACK_IMPORTED_MODULE_6__.PartsDueDate)();
  (0,_js_parts_parts_staff__WEBPACK_IMPORTED_MODULE_7__.PartsStaff)();
  (0,_js_parts_parts_radio__WEBPACK_IMPORTED_MODULE_8__.PartsRadio)();
  (0,_js_parts_parts_textarea__WEBPACK_IMPORTED_MODULE_9__.PartsTextarea)();

  (0,_js_components_history_item__WEBPACK_IMPORTED_MODULE_10__.HistoryItem)();
  (0,_js_parts_parts_history_item__WEBPACK_IMPORTED_MODULE_11__.PartsHistoryItem)();

  // 画面初期表示
  init();
});

})();

/******/ })()
;