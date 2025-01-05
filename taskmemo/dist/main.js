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
   * 指定したCSSファイルを読み込むリンクタグを生成する。
   * @param {string} filename CSSファイルパス
   * @returns タグ
   */
  static style(filename) {
    const elm = document.createElement("link");
    elm.setAttribute("rel", "stylesheet");
    elm.setAttribute("href", filename);
    return elm;
  }

  /**
   * Shadow DOMに適用するためのスタイルシートを生成する。
   * @param {*} styles
   * @returns スタイルシート
   * @memberof Utils
   * @static
   */
  static createStyle(styles) {
    const styleSheet = new CSSStyleSheet();
    styleSheet.replaceSync(styles);
    return [styleSheet];
  }

  /**
   * SVGアイコンを生成する。
   * @param {object} conf SVG設定内容
   * @returns タグ
   */
  static svg(conf) {
    const svgNS = "http://www.w3.org/2000/svg";
    const xlinkNS = "http://www.w3.org/1999/xlink";

    const createSvg = () => {
      const svg = document.createElementNS(svgNS, "svg");
      svg.setAttribute("aria-hidden", "true");
      svg.setAttribute("version", "1.1");
      svg.setAttribute("xmlns", svgNS);
      svg.setAttribute("xmlns:xlink", xlinkNS);
      svg.classList.add("svg");
      return svg;
    };

    const createDefs = () => {
      return document.createElementNS(svgNS, "defs");
    };

    const createSymbol = () => {
      const symbol = document.createElementNS(svgNS, "symbol");
      symbol.setAttribute("id", `icon-${conf.name}`);
      symbol.setAttribute("viewBox", "0 0 24 24");
      symbol.setAttribute("fill", "none");
      symbol.setAttribute("stroke", "currentColor");
      symbol.setAttribute("stroke-width", "2");
      symbol.setAttribute("stroke-linecap", "round");
      symbol.setAttribute("stroke-linejoin", "round");
      return symbol;
    };

    const createPathFirst = () => {
      const pathFirst = document.createElementNS(svgNS, "path");
      pathFirst.setAttribute("stroke", "none");
      pathFirst.setAttribute("d", "M0 0h24v24H0z");
      pathFirst.setAttribute("fill", "none");
      return pathFirst;
    };

    const createPath = (elm) => {
      const path = document.createElementNS(svgNS, "path");
      path.setAttribute("d", elm.path);

      if (elm.isFill !== undefined && elm.isFill) {
        path.setAttribute("fill", "currentColor");
        path.setAttribute("stroke", "none");
      }

      return path;
    };

    const symbol = createSymbol();
    symbol.appendChild(createPathFirst());
    conf.paths.forEach((elm) => {
      symbol.appendChild(createPath(elm));
    });

    const defs = createDefs();
    defs.appendChild(symbol);

    const svg = createSvg();
    svg.appendChild(defs);

    return svg;
  }

  /**
   * SVGアイコンを使用したボタンを生成する。
   * @param {string} icon アイコン名
   * @returns タグ
   */
  static svgBtn(icon) {
    const svgNS = "http://www.w3.org/2000/svg";
    const xlinkNS = "http://www.w3.org/1999/xlink";

    const svg = document.createElementNS(svgNS, "svg");
    svg.classList.add("icon");

    const use = document.createElementNS(svgNS, "use");
    use.setAttributeNS(xlinkNS, "xlink:href", `#icon-${icon}`);
    svg.appendChild(use);

    const button = document.createElement("button");
    button.appendChild(svg);

    return button;
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
 * ファイルマネージャークラス
 * @class FileManager
 */
class FileManager {
  /**
   * コンストラクタ
   */
  constructor() {}

  /**
   * フォルダを開く
   * @returns {Promise<boolean>}
   * @memberof FileManager
   * @instance
   * @async
   * @public
   */
  async openDirectory() {
    try {
      this.directoryHandler = await window.showDirectoryPicker({
        mode: "readwrite",
      });
      return true;
    } catch (err) {
      // キャンセル時のエラーは無視
      return false;
    }
  }

  /**
   * ファイルに文字列を書き込む
   * @param {string} fileName
   * @param {string} content
   * @returns {Promise<void>}
   * @memberof FileManager
   * @instance
   * @async
   * @public
   */
  async saveFile(fileName, content) {
    const fileHandle = await this.directoryHandler.getFileHandle(fileName, {
      create: true,
    });
    const writable = await fileHandle.createWritable();
    await writable.write(content);
    await writable.close();
  }

  /**
   * ファイルを読み込む
   * @param {string} fileName
   * @returns {Promise<string>}
   * @memberof FileManager
   * @instance
   * @async
   * @public
   */
  async readFile(fileName) {
    try {
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
}


/***/ }),
/* 3 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SearchBar: () => (/* binding */ SearchBar)
/* harmony export */ });
/* harmony import */ var _com_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _style_css_search_bar_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4);



function SearchBar() {
  /**
   * 検索欄
   */
  class SearchBar extends HTMLElement {
    /**
     * コンストラクタ
     */
    constructor() {
      super();

      this.attachShadow({ mode: "open" });
      this.shadowRoot.adoptedStyleSheets = _com_utils__WEBPACK_IMPORTED_MODULE_0__.Utils.createStyle(_style_css_search_bar_css__WEBPACK_IMPORTED_MODULE_1__["default"]);
      this.#addSvgIcon();
      this.#addSearchBar();
    }

    /**
     * SVGアイコン追加
     */
    #addSvgIcon() {
      const svg = _com_utils__WEBPACK_IMPORTED_MODULE_0__.Utils.svg({
        name: "search",
        paths: [
          { path: "M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" },
          { path: "M21 21l-6 -6" },
        ],
      });
      this.shadowRoot.appendChild(svg);
    }

    /**
     * 検索欄を追加
     */
    #addSearchBar() {
      const input = this.#createSearchInput();
      const btn = this.#createButton();

      const container = document.createElement("div");
      container.classList.add("search-bar");
      container.appendChild(input);
      container.appendChild(btn);

      this.shadowRoot.appendChild(container);
    }

    /**
     * 検索内容の入力欄を作成
     * @returns タグ
     */
    #createSearchInput() {
      const input = document.createElement("input");
      input.type = "search";
      input.placeholder = "search";

      /**
       * 検索処理
       */
      input.addEventListener("change", (e) => {
        e.preventDefault();
      });

      return input;
    }

    /**
     * SVGアイコンを使ったボタンを作成
     * @returns タグ
     */
    #createButton() {
      const btn = _com_utils__WEBPACK_IMPORTED_MODULE_0__.Utils.svgBtn("search");
      return btn;
    }
  }

  /**
   * カスタム要素を定義
   */
  customElements.define("search-bar", SearchBar);
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
___CSS_LOADER_EXPORT___.push([module.id, `/*! destyle.css v4.0.1 | MIT License | https://github.com/nicolas-cusan/destyle.css */*,::before,::after{box-sizing:border-box;border-style:solid;border-width:0;min-width:0}html{line-height:1.15;-webkit-text-size-adjust:100%;-webkit-tap-highlight-color:rgba(0,0,0,0)}body{margin:0}main{display:block}p,table,blockquote,address,pre,iframe,form,figure,dl{margin:0}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit;margin:0}ul,ol{margin:0;padding:0;list-style:none}dt{font-weight:bold}dd{margin-left:0}hr{box-sizing:content-box;height:0;overflow:visible;border-top-width:1px;margin:0;clear:both;color:inherit}pre{font-family:monospace,monospace;font-size:inherit}address{font-style:inherit}a{background-color:rgba(0,0,0,0);text-decoration:none;color:inherit}abbr[title]{text-decoration:underline dotted}b,strong{font-weight:bolder}code,kbd,samp{font-family:monospace,monospace;font-size:inherit}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-0.25em}sup{top:-0.5em}svg,img,embed,object,iframe{vertical-align:bottom}button,input,optgroup,select,textarea{-webkit-appearance:none;appearance:none;vertical-align:middle;color:inherit;font:inherit;background:rgba(0,0,0,0);padding:0;margin:0;border-radius:0;text-align:inherit;text-transform:inherit}button,[type=button],[type=reset],[type=submit]{cursor:pointer}button:disabled,[type=button]:disabled,[type=reset]:disabled,[type=submit]:disabled{cursor:default}:-moz-focusring{outline:auto}select:disabled{opacity:inherit}option{padding:0}fieldset{margin:0;padding:0;min-width:0}legend{padding:0}progress{vertical-align:baseline}textarea{overflow:auto}[type=number]::-webkit-inner-spin-button,[type=number]::-webkit-outer-spin-button{height:auto}[type=search]{outline-offset:-2px}[type=search]::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}[type=number]{-moz-appearance:textfield;appearance:textfiled}label[for]{cursor:pointer}details{display:block}summary{display:list-item}[contenteditable]:focus{outline:auto}table{border-color:inherit;border-collapse:collapse}caption{text-align:left}td,th{vertical-align:top;padding:0}th{text-align:left;font-weight:bold}*{font-family:monospace;font-size:.8rem}.svg{position:absolute;width:0;height:0;overflow:hidden}svg.icon{display:block;width:1em;height:1em;stroke-width:0;stroke:currentColor;fill:currentColor;pointer-events:none}svg.icon use{pointer-events:none}.search-bar{position:relative;display:block;width:100%;height:1.2rem}.search-bar input{position:absolute;left:0;right:0;outline:none;border:none;padding-left:1.1rem;line-height:1.2rem}.search-bar input:hover,.search-bar input:focus{border-bottom:1px solid #000}.search-bar button{cursor:default;position:absolute;left:0;padding:0;margin:0;width:1rem;height:1.3rem;border:none;background-color:rgba(0,0,0,0);color:#5f5f5f}`, ""]);
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
/* harmony import */ var _com_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _style_css_tree_view_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8);



function TreeView() {
  /**
   * TreeView内のコンテンツ
   */
  class TreeView extends HTMLElement {
    /**
     * コンストラクタ
     */
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
      this.shadowRoot.adoptedStyleSheets = _com_utils__WEBPACK_IMPORTED_MODULE_0__.Utils.createStyle(_style_css_tree_view_css__WEBPACK_IMPORTED_MODULE_1__["default"]);
      this.#addContextMenu();
      this.#addTreeView();
    }

    /**
     * タスククリック時の処理を設定
     * @param {method} handler クリック時の処理
     * @returns void
     * @public
     * @memberof TreeView
     */
    setTaskClickHandler(handler) {
      this.taskClickHandler = handler;
    }

    /**
     * ファイルマネージャーを設定
     * @param {*} fileManager
     * @returns void
     * @public
     * @memberof TreeView
     */
    setFileManager(fileManager) {
      this.fileManager = fileManager;
    }

    async readTreeData() {
      await this.fileManager.readFile("tree.json").then((data) => {
        /**
         * ツリービューを再帰的に追加
         * @param {Element} item
         * @returns void
         * @private
         * @memberof TreeView
         */
        const addTreeViewFromData = (item) => {
          if (item.type === "task") {
            this.#addTask(item.name, item.id);
          } else {
            const elm = this.#addGroup(item.name, item.id);
            this.#removeIdTarget();
            elm.id = "target";
          }

          // 子要素がある場合は再帰的に処理を行う
          if (item.childlen !== null) {
            item.childlen.forEach((child) => {
              addTreeViewFromData(child);
            });
          }
        };

        // ファイルが存在しない場合は処理を終了
        if (data === null) {
          return;
        }

        // ツリービューを再帰的に追加する処理を呼び出し
        const treeData = JSON.parse(data);
        treeData.forEach((item) => {
          this.#removeIdTarget();
          addTreeViewFromData(item);
        });
      });

      //ツリービューの変更を検知する処理を設定
      this.#addTreeViewChangeHandler();
    }

    /**
     * TreeViewの変更を検知し、ファイルに保存する
     * @private
     * @returns void
     * @memberof TreeView
     */
    #addTreeViewChangeHandler() {
      const container = this.shadowRoot.getElementById("root");

      /**
       * TreeViewの変更を検知した際の処理
       */
      const callback = () => {
        /**
         * TreeViewの全要素を取得
         * @param {Element} nodes
         * @returns Array
         * @private
         */
        const getAllElement = (nodes) => {
          const elements = [];

          nodes.forEach((node) => {
            const dataItem = {
              id: node.dataset.id || null,
              name: node.dataset.name || null,
              type: node.dataset.type || null,
              childlen: null,
            };

            if (node.tagName === "DETAILS") {
              dataItem.childlen = getAllElement(node.childNodes);
              elements.push(dataItem);
            } else if (node.tagName === "P") {
              elements.push(dataItem);
            }
          });

          return elements;
        };

        // TreeViewの全要素を取得し、JSON形式に変換
        const treeData = getAllElement(container.childNodes);
        const treeDataJson = JSON.stringify(treeData);

        // ファイルに保存
        this.fileManager.saveFile("tree.json", treeDataJson);
      };

      const observer = new MutationObserver(callback);
      const config = {
        attributes: true,
        childList: true,
        subtree: true,
        characterData: true,
      };
      observer.observe(container, config);
    }

    /**
     * ターゲットのIDを削除
     * @private
     * @returns void
     * @memberof TreeView
     */
    #removeIdTarget() {
      const removeTarget = this.shadowRoot.getElementById("target");
      if (removeTarget !== null) {
        removeTarget.id = "";
      }
    }

    /**
     * コンテキストメニューを追加
     */
    #addContextMenu() {
      const btnAddTask = this.#createBtnAddTask();
      const btnAddGroup = this.#createBtnAddGroup();
      const btnChangeGroupName = this.#createChangeGroupName();
      const menu = this.#createMenu([
        btnAddTask,
        btnAddGroup,
        null,
        btnChangeGroupName,
      ]);
      const menuContainer = this.#createMenuContainer(menu);
      this.shadowRoot.appendChild(menuContainer);

      this.shadowRoot.addEventListener("contextmenu", (e) => {
        e.preventDefault();

        this.#removeIdTarget();
        if (e.target.classList.contains("tree-item")) {
          const details = e.target.closest("details");
          if (details !== null) {
            details.id = "target";
          }
        }

        menuContainer.style.display = "block";
        menu.style.left = `${e.pageX + 10}px`;
        menu.style.top = `${e.pageY - 20}px`;
      });
    }

    /**
     * 編集対象のターゲット項目を取得
     * @returns element
     */
    #getTarget() {
      const target =
        this.shadowRoot.getElementById("target") ||
        this.shadowRoot.getElementById("root");

      if (target.tagName === "DETAILS") {
        target.open = true;
      }

      return target;
    }

    /**
     * タスクを識別するためのユニークなIDを取得
     * @returns ID
     */
    #getUniqueId() {
      const randamStr = Math.floor(10000 * Math.random()).toString(16);
      const date = new Date();
      const systemDate =
        date.getFullYear() +
        String(date.getMonth() + 1).padStart(2, "0") +
        String(date.getDate()).padStart(2, "0") +
        String(date.getHours()).padStart(2, "0") +
        String(date.getMinutes()).padStart(2, "0") +
        String(date.getSeconds()).padStart(2, "0") +
        String(date.getMilliseconds()).padStart(3, "0");
      return `${systemDate}_${randamStr}`;
    }

    /**
     * 新規タスクの追加ボタンを作成
     * @returns タグ
     */
    #createBtnAddTask() {
      const btn = document.createElement("button");
      btn.innerText = "新しいタスク";

      btn.addEventListener("click", (e) => {
        e.preventDefault();
        this.#addTask("新規タスク", this.#getUniqueId());
      });

      return btn;
    }

    /**
     * タスクを追加する
     * @param {string} name
     * @param {string} id
     * @returns タグ
     * @private
     */
    #addTask(name, id) {
      const task = document.createElement("p");
      task.dataset.id = id;
      task.dataset.name = name;
      task.dataset.type = "task";

      const span = document.createElement("span");
      span.classList.add("tree-item", "name-text");
      span.innerText = name;

      task.appendChild(span);

      task.addEventListener("click", () => {
        this.taskClickHandler(task);
      });

      const target = this.#getTarget();
      target.appendChild(task);
      this.taskClickHandler(task);

      return task;
    }

    /**
     * 新規グループの追加ボタンを作成
     * @returns タグ
     */
    #createBtnAddGroup() {
      const btn = document.createElement("button");
      btn.innerText = "新しいグループ";

      btn.addEventListener("click", (e) => {
        e.preventDefault();
        this.#addGroup("新規グループ", this.#getUniqueId());
      });

      return btn;
    }

    /**
     * グループを追加する
     * @param {string} name グループ名
     * @param {string} id グループID
     * @returns タグ
     * @private
     */
    #addGroup(name, id) {
      const groupName = document.createElement("summary");
      const span = document.createElement("span");
      span.classList.add("tree-item", "name-text", "group");
      span.innerText = name;
      groupName.appendChild(span);

      const group = document.createElement("details");
      group.appendChild(groupName);

      group.dataset.id = id;
      group.dataset.name = name;
      group.dataset.type = "group";

      const target = this.#getTarget();
      target.appendChild(group);

      return group;
    }

    /**
     * グループ名の変更ボタンを作成
     * @returns
     */
    #createChangeGroupName() {
      const btn = document.createElement("button");
      btn.innerText = "グループ名変更";

      btn.addEventListener("click", (e) => {
        const target = this.#getTarget();
        if (target.tagName !== "DETAILS") {
          return;
        }

        const span = target.children[0].children[0];
        const name = target.dataset.name;

        const inputText = prompt("グループ名変更", name);
        if (inputText !== null) {
          target.dataset.name = inputText;
          span.innerText = inputText;
        }
      });

      return btn;
    }

    /**
     * メニューを作成
     * @returns タグ
     */
    #createMenu(btns) {
      const menu = document.createElement("div");
      menu.classList.add("menu");
      btns.forEach((btn) => {
        if (btn !== null) {
          menu.appendChild(btn);
        } else {
          menu.appendChild(document.createElement("hr"));
        }
      });
      return menu;
    }

    /**
     * メニュー表示の際のコンテナを作成
     * @returns タグ
     */
    #createMenuContainer(menu) {
      const container = document.createElement("div");
      container.classList.add("menu-container");
      container.appendChild(menu);

      container.addEventListener("click", (e) => {
        e.preventDefault();
        container.style.display = "none";
      });

      return container;
    }

    /**
     * TreeViewを追加する
     */
    #addTreeView() {
      const container = document.createElement("div");
      container.classList.add("treeview");
      container.id = "root";

      this.shadowRoot.appendChild(container);
    }
  }

  /**
   * カスタム要素を定義
   */
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
___CSS_LOADER_EXPORT___.push([module.id, `/*! destyle.css v4.0.1 | MIT License | https://github.com/nicolas-cusan/destyle.css */*,::before,::after{box-sizing:border-box;border-style:solid;border-width:0;min-width:0}html{line-height:1.15;-webkit-text-size-adjust:100%;-webkit-tap-highlight-color:rgba(0,0,0,0)}body{margin:0}main{display:block}p,table,blockquote,address,pre,iframe,form,figure,dl{margin:0}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit;margin:0}ul,ol{margin:0;padding:0;list-style:none}dt{font-weight:bold}dd{margin-left:0}hr{box-sizing:content-box;height:0;overflow:visible;border-top-width:1px;margin:0;clear:both;color:inherit}pre{font-family:monospace,monospace;font-size:inherit}address{font-style:inherit}a{background-color:rgba(0,0,0,0);text-decoration:none;color:inherit}abbr[title]{text-decoration:underline dotted}b,strong{font-weight:bolder}code,kbd,samp{font-family:monospace,monospace;font-size:inherit}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-0.25em}sup{top:-0.5em}svg,img,embed,object,iframe{vertical-align:bottom}button,input,optgroup,select,textarea{-webkit-appearance:none;appearance:none;vertical-align:middle;color:inherit;font:inherit;background:rgba(0,0,0,0);padding:0;margin:0;border-radius:0;text-align:inherit;text-transform:inherit}button,[type=button],[type=reset],[type=submit]{cursor:pointer}button:disabled,[type=button]:disabled,[type=reset]:disabled,[type=submit]:disabled{cursor:default}:-moz-focusring{outline:auto}select:disabled{opacity:inherit}option{padding:0}fieldset{margin:0;padding:0;min-width:0}legend{padding:0}progress{vertical-align:baseline}textarea{overflow:auto}[type=number]::-webkit-inner-spin-button,[type=number]::-webkit-outer-spin-button{height:auto}[type=search]{outline-offset:-2px}[type=search]::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}[type=number]{-moz-appearance:textfield;appearance:textfiled}label[for]{cursor:pointer}details{display:block}summary{display:list-item}[contenteditable]:focus{outline:auto}table{border-color:inherit;border-collapse:collapse}caption{text-align:left}td,th{vertical-align:top;padding:0}th{text-align:left;font-weight:bold}*{font-family:monospace;font-size:.8rem}.svg{position:absolute;width:0;height:0;overflow:hidden}svg.icon{display:block;width:1em;height:1em;stroke-width:0;stroke:currentColor;fill:currentColor;pointer-events:none}svg.icon use{pointer-events:none}.menu-container{position:absolute;top:0;bottom:0;left:0;right:0;display:none;background-color:rgba(0,0,0,0)}.menu-container .menu{position:absolute;z-index:100000;border:1px solid #8f8f8f;background-color:#fffff8;border-radius:.25rem;box-shadow:0px 3px 3px 0px rgba(0,0,0,.1);width:fit-content;padding:.2rem}.menu-container .menu button{display:block;line-height:1.5rem;padding:0 1.5rem;padding-left:.75rem;width:100%}.menu-container .menu button:hover{background-color:#0078d4;border-radius:.25rem;color:#fffffb}.menu-container .menu hr{margin:.25rem 0;height:1px;background-color:#afafaf;border:none}.treeview{width:100%;padding-bottom:50px;height:100%;line-height:1.2rem}.treeview p,.treeview summary{width:100%}.treeview p:hover,.treeview summary:hover{color:#0078d4;text-decoration:underline}.treeview p span,.treeview summary span{display:inline-block;width:100%;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.treeview p{cursor:pointer;position:relative;margin-left:1rem}.treeview p::before{content:"";position:absolute;left:-1.05rem;top:.2rem;width:1.1em;height:1.1em;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'  width='24'  height='24'  viewBox='0 0 24 24'  fill='none'  stroke='currentColor'  stroke-width='2'  stroke-linecap='round'  stroke-linejoin='round'  class='icon icon-tabler icons-tabler-outline icon-tabler-sticker-2'%3E%3Cpath stroke='none' d='M0 0h24v24H0z' fill='none'/%3E%3Cpath d='M6 4h12a2 2 0 0 1 2 2v7h-5a2 2 0 0 0 -2 2v5h-7a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2z' /%3E%3Cpath d='M20 13v.172a2 2 0 0 1 -.586 1.414l-4.828 4.828a2 2 0 0 1 -1.414 .586h-.172' /%3E%3C/svg%3E");background-repeat:no-repeat;background-size:contain;background-position:center}.treeview details{cursor:pointer;margin-left:1rem}.treeview details summary{list-style:none;position:relative;outline:none}.treeview details summary::-webkit-details-marker{display:none}.treeview details summary::before{content:"";position:absolute;left:-1rem;top:.35rem;width:8px;height:8px;border-top:solid 2px #2f2f2f;border-right:solid 2px #2f2f2f;transform:rotate(45deg);transition:transform .2s}.treeview details[open]>summary::before{transform:rotate(135deg);left:-0.9rem;top:.15rem}`, ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 9 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TaskContents: () => (/* binding */ TaskContents)
/* harmony export */ });
/* harmony import */ var _com_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _style_css_task_contents_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(10);



/**
 * タスク内容コンポーネント
 * @module ./assets/src/component/task-contents
 */
function TaskContents() {
  /**
   * タスク内容
   * @memberof TaskContents
   * @extends HTMLElement
   * @class TaskContents
   */
  class TaskContents extends HTMLElement {
    /**
     * コンストラクタ
     * @returns {void}
     * @memberof TaskContents
     */
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
      this.shadowRoot.adoptedStyleSheets = _com_utils__WEBPACK_IMPORTED_MODULE_0__.Utils.createStyle(_style_css_task_contents_css__WEBPACK_IMPORTED_MODULE_1__["default"]);
      this.#addForm();
    }

    /**
     * ファイルマネージャーを設定
     * @param {*} fileManager
     * @returns void
     * @public
     * @memberof TreeView
     */
    setFileManager(fileManager) {
      this.fileManager = fileManager;
    }

    /**
     * タスクデータを読み込み、画面に表示
     * @param {string} id
     * @returns {void}
     * @memberof TaskContents
     * @public
     * @async
     */
    async readTaskData(id) {
      const form = this.shadowRoot.getElementById("task-form");

      const checkeRadio = (id, value) => {
        const btns = form.elements[id];
        for (let radio of btns) {
          if (radio.value === value) {
            radio.checked = true;
            break;
          }
        }
      };

      const $ = (name) => {
        return form.elements[name];
      };

      // タスクデータを取得して表示
      await this.fileManager.readFile(`${id}.json`).then((data) => {
        if (data === null) {
          this.#setPriority();
          return;
        }

        const taskData = JSON.parse(data).taskData;

        $("title").value = taskData.title;
        $("duedate").value = taskData.dueDate;
        $("dev").value = taskData.dev;
        $("manager").value = taskData.manager;
        checkeRadio("urgency", taskData.urgency);
        checkeRadio("importance", taskData.importance);
        checkeRadio("status", taskData.status);
        $("tel").value = taskData.tel;
        $("folderpath").value = taskData.folderpath;
        $("url").value = taskData.url;
        $("option1").value = taskData.option1;
        $("option2").value = taskData.option2;
        $("option3").value = taskData.option3;
        $("memo").value = taskData.memo;

        this.#setPriority();
      });

      /**
       * フォーム変更時の処理
       * @param {Event} e イベント
       * @returns {void}
       * @memberof TaskContents
       * @private
       */
      form.addEventListener("change", async (e) => {
        // カスタムイベントで変更を外部に伝播
        const event = new CustomEvent("formChangeEvent", {
          detail: { message: "Task Change." },
          bubbles: true,
          composed: true,
        });
        this.dispatchEvent(event);
      });
    }

    /**
     * フォーム入力内容を取得する。
     */
    getFormInputData() {
      const form = this.shadowRoot.getElementById("task-form");

      const $ = (name) => {
        return form.elements[name];
      };

      const formData = {
        title: $("title").value,
        dueDate: $("duedate").value,
        status: $("status").value,
        dev: $("dev").value,
        manager: $("manager").value,
        urgency: $("urgency").value,
        importance: $("importance").value,
        tel: $("tel").value,
        folderpath: $("folderpath").value,
        url: $("url").value,
        option1: $("option1").value,
        option2: $("option2").value,
        option3: $("option3").value,
        memo: $("memo").value,
      };

      return formData;
    }

    /**
     * フォーム追加
     * @private
     * @returns {void}
     * @memberof TaskContents
     */
    #addForm() {
      const title = this.#createTitle();
      const dueDate = this.#createDueDate();
      const status = this.#createStatus();
      const manager = this.#createManger();
      const folderPath = this.#createFolderPath();
      const url = this.#createURL();
      const option1 = this.#createOptionalItem("任意項目1", "option1");
      const option2 = this.#createOptionalItem("任意項目2", "option2");
      const option3 = this.#createOptionalItem("任意項目3", "option3");
      const memo = this.#createFreeMemo();
      const priprity = this.#createTaskPriority();

      const form = document.createElement("form");
      form.id = "task-form";
      form.appendChild(title);
      form.appendChild(dueDate);
      form.appendChild(manager);
      form.appendChild(priprity);
      form.appendChild(status);
      form.appendChild(folderPath);
      form.appendChild(url);
      form.appendChild(option1);
      form.appendChild(option2);
      form.appendChild(option3);
      form.appendChild(memo);

      this.shadowRoot.appendChild(form);
    }

    /**
     * 優先順位の判定結果を出力する
     * @returns {void}
     * @private
     * @memberof TaskContents
     */
    #setPriority() {
      const form = this.shadowRoot.getElementById("task-form");
      const importance = form.elements["importance"].value; // 重要度
      const urgency = form.elements["urgency"].value; // 緊急度
      const point = Number(`${importance}${urgency}`);

      let result = "";
      switch (point) {
        case 44:
        case 43:
        case 34:
        case 33:
          result = "問題・課題のタスク";
          break;
        case 42:
        case 41:
        case 32:
        case 31:
          result = "質の高いタスク";
          break;
        case 24:
        case 23:
        case 14:
        case 13:
          result = "見せかけのタスク";
          break;
        case 22:
        case 21:
        case 12:
        case 11:
          result = "無駄なタスク";
          break;
        default:
          break;
      }
      form.elements["priority"].value = result;
    }

    /**
     * Form部品を格納するBoxを作成
     * @param {string} title タイトル
     * @param {boolean} isRequired 必須項目か否か
     * @returns {HTMLFieldSetElement} Box
     * @private
     * @memberof TaskContents
     */
    #createBox(title, isRequired) {
      const div = document.createElement("fieldset");
      if (title !== undefined) {
        const legend = document.createElement("legend");
        legend.innerText = title;

        if (isRequired) {
          const span = document.createElement("span");
          span.innerText = "必須";
          legend.appendChild(span);
        }

        div.appendChild(legend);
      }
      return div;
    }

    /**
     * ラベルを作成
     * @param {string} id ターゲットID
     * @param {string} lblText ラベルテキスト
     * @returns {HTMLLabelElement} ラベル
     * @private
     * @memberof TaskContents
     */
    #createLabel(id, lblText) {
      const lbl = document.createElement("label");
      lbl.htmlFor = id;
      lbl.innerText = lblText;
      return lbl;
    }

    /**
     * 入力項目を作成
     * @param {string} type 入力タイプ
     * @param {string} name 名前
     * @param {string} id ID
     * @param {string} placeholder プレースホルダ
     * @returns {HTMLInputElement} 入力項目
     * @private
     * @memberof TaskContents
     */
    #createInput(type, name, id, placeholder) {
      const input = document.createElement("input");
      input.type = type;
      input.name = name;
      input.id = id;
      input.placeholder = placeholder;
      input.spellcheck = false;
      return input;
    }

    /**
     * テキストエリアを作成
     * @param {string} id ID
     * @param {number} rows 行数
     * @param {string} placeholder プレースホルダ
     * @returns {HTMLTextAreaElement} テキストエリア
     * @private
     * @memberof TaskContents
     */
    #createTextarea(id, rows, placeholder) {
      const textarea = document.createElement("textarea");
      textarea.id = id;
      textarea.rows = rows;
      textarea.placeholder = placeholder;
      textarea.spellcheck = false;
      return textarea;
    }

    /**
     * タイトルの入力欄を作成
     * @returns {HTMLFieldSetElement} タイトル
     * @private
     * @memberof TaskContents
     */
    #createTitle() {
      const input = this.#createInput("text", "title", "title", "xxxxxの作成");
      input.classList.add("large");

      input.addEventListener("change", (e) => {
        this.titleChangeHandler(e);
      });

      const box = this.#createBox("タイトル", true);
      box.appendChild(input);

      return box;
    }

    /**
     * タイトル変更時の処理を設定
     * @param {method} handler タイトル変更時の処理
     * @returns void
     * @memberof TaskContents
     */
    setTitleChangeHandler(handler) {
      this.titleChangeHandler = handler;
    }

    /**
     * 期限日の入力欄を作成
     * @returns {HTMLFieldSetElement} 期限日
     * @private
     * @memberof TaskContents
     */
    #createDueDate() {
      const input = this.#createInput("date", "duedate", "duedate");
      const box = this.#createBox("期限日", true);
      box.appendChild(input);

      return box;
    }

    /**
     * 進捗状況の入力欄を作成
     * @returns {HTMLFieldSetElement} 進捗状況
     * @private
     * @memberof TaskContents
     */
    #createStatus() {
      const perArray = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

      const box = this.#createBox("進捗率");
      const div = document.createElement("div");
      div.classList.add("radio-button", "large");

      perArray.forEach((per, index) => {
        const lbl = this.#createLabel(`status${per}`, `${per}%`);
        const input = this.#createInput("radio", "status", `status${per}`);
        input.value = per;

        if (index === 0) {
          lbl.classList.add("first");
          input.checked = true;
        } else if (index === perArray.length - 1) {
          lbl.classList.add("last");
        }

        div.appendChild(lbl);
        div.appendChild(input);
      });
      box.appendChild(div);

      return box;
    }

    /**
     * 担当者の入力欄を作成
     * @returns {HTMLFieldSetElement} 担当者
     * @private
     * @memberof TaskContents
     */
    #createManger() {
      const box = this.#createBox("担当者", true);
      const managerArr = [
        {
          id: "dev",
          text: "所属",
          type: "text",
          size: "small",
          placeholder: "情報システム課",
        },
        {
          id: "manager",
          text: "氏名",
          type: "text",
          size: "ex-small",
          placeholder: "山田 太郎",
        },
        {
          id: "tel",
          text: "電話番号",
          type: "tel",
          size: "ex-small",
          placeholder: "03-1234-5678",
        },
      ];
      managerArr.forEach((v) => {
        const div = document.createElement("div");
        div.classList.add("inner-box");
        const lbl = this.#createLabel(v.id, v.text);
        lbl.classList.add("item-name");
        const input = this.#createInput(v.type, v.id, v.id, v.placeholder);
        input.classList.add(v.size);

        div.appendChild(lbl);
        div.appendChild(input);

        box.appendChild(div);
      });

      return box;
    }

    /**
     * タスクの優先順位の入力欄を作成
     * @returns {HTMLFieldSetElement} 優先順位
     * @private
     * @memberof TaskContents
     */
    #createTaskPriority() {
      const box = this.#createBox("タスク優先順位");
      box.appendChild(this.#createImportance()); // 重要度
      box.appendChild(this.#createUrgency()); // 緊急度
      box.appendChild(this.#createPriorityResult());

      box.addEventListener("change", () => {
        this.#setPriority();
      });

      return box;
    }

    /**
     * 緊急度の入力欄を作成
     * @returns {HTMLFieldSetElement} 緊急度
     * @private
     * @memberof TaskContents
     */
    #createUrgency() {
      const radioButton = document.createElement("div");
      radioButton.classList.add("radio-button", "ex-small");

      const urgencyArray = [1, 2, 3, 4];
      urgencyArray.forEach((urgency, index) => {
        const lbl = this.#createLabel(`urgency${urgency}`, `${urgency}`);
        const input = this.#createInput(
          "radio",
          "urgency",
          `urgency${urgency}`
        );
        input.value = urgency;

        if (index === 0) {
          lbl.classList.add("first");
          input.checked = true;
        } else if (index === urgencyArray.length - 1) {
          lbl.classList.add("last");
        }

        radioButton.appendChild(lbl);
        radioButton.appendChild(input);
      });

      const innerBox = document.createElement("div");
      innerBox.classList.add("inner-box");

      const itemName = this.#createLabel("", "緊急度");
      itemName.classList.add("item-name");

      innerBox.appendChild(itemName);
      innerBox.appendChild(radioButton);

      return innerBox;
    }

    /**
     * 重要度の入力欄を作成
     * @returns {HTMLFieldSetElement} 重要度
     * @private
     * @memberof TaskContents
     */
    #createImportance() {
      const radioButton = document.createElement("div");
      radioButton.classList.add("radio-button", "ex-small");

      const importanceArray = [1, 2, 3, 4];
      importanceArray.forEach((importance, index) => {
        const lbl = this.#createLabel(
          `importance${importance}`,
          `${importance}`
        );
        const input = this.#createInput(
          "radio",
          "importance",
          `importance${importance}`
        );
        input.value = importance;

        if (index === 0) {
          lbl.classList.add("first");
          input.checked = true;
        } else if (index === importanceArray.length - 1) {
          lbl.classList.add("last");
        }

        radioButton.appendChild(lbl);
        radioButton.appendChild(input);
      });

      const innerBox = document.createElement("div");
      innerBox.classList.add("inner-box");

      const itemName = this.#createLabel("", "重要度");
      itemName.classList.add("item-name");

      innerBox.appendChild(itemName);
      innerBox.appendChild(radioButton);

      return innerBox;
    }

    /**
     * 優先順位の判定結果の出力欄
     * @returns
     * @private
     * @memberof TaskContents
     */
    #createPriorityResult() {
      const innerBox = document.createElement("div");
      innerBox.classList.add("inner-box");

      const itemName = this.#createLabel("priority", "判定結果");
      itemName.classList.add("item-name");

      const input = this.#createInput("text", "priority", "priority", "");
      input.classList.add("large");
      input.readOnly = true;

      innerBox.appendChild(itemName);
      innerBox.appendChild(input);

      return innerBox;
    }

    /**
     * 作業フォルダの入力欄を作成
     * @returns {HTMLFieldSetElement} 作業フォルダ
     * @private
     * @memberof TaskContents
     */
    #createFolderPath() {
      const box = this.#createBox("作業フォルダ");
      const textarea = this.#createTextarea(
        "folderpath",
        3,
        "作業フォルダパス（E:workhoge)"
      );
      textarea.classList.add("large");

      box.appendChild(textarea);
      return box;
    }

    /**
     * URLの入力欄を作成
     * @returns {HTMLFieldSetElement} URL
     * @private
     * @memberof TaskContents
     */
    #createURL() {
      const box = this.#createBox("URL");
      const input = this.#createInput(
        "url",
        "url",
        "url",
        "https://example.com"
      );
      input.classList.add("large");

      box.appendChild(input);
      return box;
    }

    /**
     * 任意項目の入力欄を作成
     * @param {string} title タイトル
     * @param {string} id ID
     * @returns {HTMLFieldSetElement} 任意項目
     * @private
     * @memberof TaskContents
     */
    #createOptionalItem(title, id) {
      const box = this.#createBox(title);
      const input = this.#createInput("text", id, id, "任意項目");
      input.classList.add("middle");

      box.appendChild(input);
      return box;
    }

    /**
     * 自由記述の入力欄を作成
     * @returns {HTMLFieldSetElement} メモ
     * @private
     * @memberof TaskContents
     */
    #createFreeMemo() {
      const box = this.#createBox("メモ");
      const textarea = this.#createTextarea("memo", 10, "メモ");
      textarea.classList.add("large");

      box.appendChild(textarea);
      return box;
    }
  }
  customElements.define("task-contents", TaskContents);
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
___CSS_LOADER_EXPORT___.push([module.id, `/*! destyle.css v4.0.1 | MIT License | https://github.com/nicolas-cusan/destyle.css */*,::before,::after{box-sizing:border-box;border-style:solid;border-width:0;min-width:0}html{line-height:1.15;-webkit-text-size-adjust:100%;-webkit-tap-highlight-color:rgba(0,0,0,0)}body{margin:0}main{display:block}p,table,blockquote,address,pre,iframe,form,figure,dl{margin:0}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit;margin:0}ul,ol{margin:0;padding:0;list-style:none}dt{font-weight:bold}dd{margin-left:0}hr{box-sizing:content-box;height:0;overflow:visible;border-top-width:1px;margin:0;clear:both;color:inherit}pre{font-family:monospace,monospace;font-size:inherit}address{font-style:inherit}a{background-color:rgba(0,0,0,0);text-decoration:none;color:inherit}abbr[title]{text-decoration:underline dotted}b,strong{font-weight:bolder}code,kbd,samp{font-family:monospace,monospace;font-size:inherit}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-0.25em}sup{top:-0.5em}svg,img,embed,object,iframe{vertical-align:bottom}button,input,optgroup,select,textarea{-webkit-appearance:none;appearance:none;vertical-align:middle;color:inherit;font:inherit;background:rgba(0,0,0,0);padding:0;margin:0;border-radius:0;text-align:inherit;text-transform:inherit}button,[type=button],[type=reset],[type=submit]{cursor:pointer}button:disabled,[type=button]:disabled,[type=reset]:disabled,[type=submit]:disabled{cursor:default}:-moz-focusring{outline:auto}select:disabled{opacity:inherit}option{padding:0}fieldset{margin:0;padding:0;min-width:0}legend{padding:0}progress{vertical-align:baseline}textarea{overflow:auto}[type=number]::-webkit-inner-spin-button,[type=number]::-webkit-outer-spin-button{height:auto}[type=search]{outline-offset:-2px}[type=search]::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}[type=number]{-moz-appearance:textfield;appearance:textfiled}label[for]{cursor:pointer}details{display:block}summary{display:list-item}[contenteditable]:focus{outline:auto}table{border-color:inherit;border-collapse:collapse}caption{text-align:left}td,th{vertical-align:top;padding:0}th{text-align:left;font-weight:bold}*{font-family:monospace;font-size:.8rem}.svg{position:absolute;width:0;height:0;overflow:hidden}svg.icon{display:block;width:1em;height:1em;stroke-width:0;stroke:currentColor;fill:currentColor;pointer-events:none}svg.icon use{pointer-events:none}fieldset{margin-bottom:1rem}fieldset legend{margin-bottom:.3rem;font-weight:bold;letter-spacing:1px;display:flex;align-items:center}fieldset legend span{margin-left:.25rem;border-radius:.25rem;background-color:#fb4141;color:#fffffb;font-size:.5rem;padding:.1rem .25rem}fieldset .item-name{display:block;margin-bottom:.15rem;letter-spacing:1px}fieldset .radio-button{display:flex;flex-direction:row}fieldset .radio-button label{width:100%;line-height:1.5rem;text-align:center;background-color:#fffff8;border:1px solid #3f3f3f;border-right:none}fieldset .radio-button label.first{border-top-left-radius:.25rem;border-bottom-left-radius:.25rem}fieldset .radio-button label.last{border-right:1px solid #3f3f3f;border-top-right-radius:.25rem;border-bottom-right-radius:.25rem}fieldset .radio-button label:has(+input:checked){background-color:#0a5eb0;color:#fffffb}fieldset input{outline:none;background-color:#fffff8;border:1px solid #3f3f3f;border-radius:.25rem;line-height:1.5rem;padding:0 .25rem}fieldset input[type=radio]{display:none}fieldset input:read-only{background-color:#dfdfdf}fieldset textarea{outline:none;background-color:#fffff8;border:1px solid #3f3f3f;border-radius:.25rem;line-height:1.1rem;padding:.25rem;resize:none}fieldset textarea::-webkit-scrollbar{width:4px;border-radius:4px;background-color:#fffff8;border:none}fieldset textarea::-webkit-scrollbar-thumb{border-radius:8px;box-shadow:inset 0 0 10px 10px #0a3981;border:solid 1px rgba(0,0,0,0)}fieldset:has(.inner-box){display:flex}fieldset .inner-box{margin-right:.5rem}fieldset .large{width:100%}fieldset .middle{width:15rem}fieldset .small{width:10rem}fieldset .ex-small{width:7rem}`, ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 11 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TaskHistory: () => (/* binding */ TaskHistory)
/* harmony export */ });
/* harmony import */ var _com_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _style_css_task_history_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12);



/**
 * タスク履歴コンポーネント
 * @module ./assets/src/component/task-history
 */
function TaskHistory() {
  /**
   * タスク履歴
   * @memberof TaskHistory
   * @extends HTMLElement
   * @class TaskHistory
   */
  class TaskHistory extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
      this.shadowRoot.adoptedStyleSheets = _com_utils__WEBPACK_IMPORTED_MODULE_0__.Utils.createStyle(_style_css_task_history_css__WEBPACK_IMPORTED_MODULE_1__["default"]);
      this.#addSvgIcon();
      this.#addFloatButton();

      this.#addHistoryChangeHandler();
    }

    /**
     * ファイルマネージャーを設定
     * @param {*} fileManager
     * @returns void
     * @public
     * @memberof TreeView
     */
    setFileManager(fileManager) {
      this.fileManager = fileManager;
    }

    getHistoryData() {
      const historyItems =
        this.shadowRoot.querySelectorAll("task-history-item");

      const historyData = [];
      for (let item of historyItems) {
        historyData.push(item.getFormInputData());
      }

      return historyData;
    }

    /**
     * 履歴情報の更新を検知
     * @returns void
     * @public
     * @memberof TreeView
     * */
    #addHistoryChangeHandler() {
      const root = this.shadowRoot;
      const callback = () => {
        // カスタムイベントで変更を外部に伝播
        const event = new CustomEvent("formChangeEvent", {
          detail: { message: "History Change." },
          bubbles: true,
          composed: true,
        });
        this.dispatchEvent(event);
      };

      const observer = new MutationObserver(callback);
      const config = {
        attributes: true,
        childList: true,
        subtree: true,
        characterData: true,
      };
      observer.observe(root, config);
    }

    /**
     * SVGアイコン追加
     * @private
     * @returns {void}
     * @memberof TaskHistory
     */
    #addSvgIcon() {
      const svg = _com_utils__WEBPACK_IMPORTED_MODULE_0__.Utils.svg({
        name: "plus",
        paths: [{ path: "M12 5l0 14" }, { path: "M5 12l14 0" }],
      });
      this.shadowRoot.appendChild(svg);
    }

    /**
     * 履歴アイテム作成ボタンを追加
     * @private
     * @returns {void}
     * @memberof TaskHistory
     */
    #addFloatButton() {
      const btn = _com_utils__WEBPACK_IMPORTED_MODULE_0__.Utils.svgBtn("plus");
      btn.classList.add("float-button");

      btn.addEventListener("click", () => {
        const item = document.createElement("task-history-item");
        this.shadowRoot.appendChild(item);
      });

      this.shadowRoot.appendChild(btn);
    }

    /**
     * 履歴データを読み込み、画面に表示
     * @param {string} id
     * @returns {void}
     * @memberof TaskHistory
     * @public
     * @async
     */
    async readTaskHistoryData(id) {
      await this.fileManager.readFile(`${id}.json`).then((data) => {
        if (data === null) {
          return;
        }

        const historyData = JSON.parse(data).historyData;
        for (let history of historyData) {
          const item = document.createElement("task-history-item");
          item.setTaskHistoryItemData(history);
          this.shadowRoot.appendChild(item);
        }
      });
    }
  }
  customElements.define("task-history", TaskHistory);
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
___CSS_LOADER_EXPORT___.push([module.id, `/*! destyle.css v4.0.1 | MIT License | https://github.com/nicolas-cusan/destyle.css */*,::before,::after{box-sizing:border-box;border-style:solid;border-width:0;min-width:0}html{line-height:1.15;-webkit-text-size-adjust:100%;-webkit-tap-highlight-color:rgba(0,0,0,0)}body{margin:0}main{display:block}p,table,blockquote,address,pre,iframe,form,figure,dl{margin:0}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit;margin:0}ul,ol{margin:0;padding:0;list-style:none}dt{font-weight:bold}dd{margin-left:0}hr{box-sizing:content-box;height:0;overflow:visible;border-top-width:1px;margin:0;clear:both;color:inherit}pre{font-family:monospace,monospace;font-size:inherit}address{font-style:inherit}a{background-color:rgba(0,0,0,0);text-decoration:none;color:inherit}abbr[title]{text-decoration:underline dotted}b,strong{font-weight:bolder}code,kbd,samp{font-family:monospace,monospace;font-size:inherit}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-0.25em}sup{top:-0.5em}svg,img,embed,object,iframe{vertical-align:bottom}button,input,optgroup,select,textarea{-webkit-appearance:none;appearance:none;vertical-align:middle;color:inherit;font:inherit;background:rgba(0,0,0,0);padding:0;margin:0;border-radius:0;text-align:inherit;text-transform:inherit}button,[type=button],[type=reset],[type=submit]{cursor:pointer}button:disabled,[type=button]:disabled,[type=reset]:disabled,[type=submit]:disabled{cursor:default}:-moz-focusring{outline:auto}select:disabled{opacity:inherit}option{padding:0}fieldset{margin:0;padding:0;min-width:0}legend{padding:0}progress{vertical-align:baseline}textarea{overflow:auto}[type=number]::-webkit-inner-spin-button,[type=number]::-webkit-outer-spin-button{height:auto}[type=search]{outline-offset:-2px}[type=search]::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}[type=number]{-moz-appearance:textfield;appearance:textfiled}label[for]{cursor:pointer}details{display:block}summary{display:list-item}[contenteditable]:focus{outline:auto}table{border-color:inherit;border-collapse:collapse}caption{text-align:left}td,th{vertical-align:top;padding:0}th{text-align:left;font-weight:bold}*{font-family:monospace;font-size:.8rem}.svg{position:absolute;width:0;height:0;overflow:hidden}svg.icon{display:block;width:1em;height:1em;stroke-width:0;stroke:currentColor;fill:currentColor;pointer-events:none}svg.icon use{pointer-events:none}.float-button{position:fixed;bottom:15px;right:15px;z-index:1000;padding:.5rem;border-radius:50%;box-shadow:0px 3px 3px 0px rgba(0,0,0,.1);background-color:#0a3981;color:#fffffb;border:1px solid #0a3981}.float-button:hover{background-color:#fffff8;color:#0a3981;border-color:#0a3981}.float-button .icon{font-size:1.5rem}`, ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 13 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TaskHistoryItem: () => (/* binding */ TaskHistoryItem)
/* harmony export */ });
/* harmony import */ var _com_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _style_css_task_history_item_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(14);



/**
 * タスク履歴コンポーネント
 * @module ./assets/src/component/task-history-item
 */
function TaskHistoryItem() {
  /**
   * タスク履歴
   * @memberof TaskHistoryItem
   * @extends HTMLElement
   * @class TaskHistoryItem
   */
  class TaskHistoryItem extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
      this.shadowRoot.adoptedStyleSheets = _com_utils__WEBPACK_IMPORTED_MODULE_0__.Utils.createStyle(_style_css_task_history_item_css__WEBPACK_IMPORTED_MODULE_1__["default"]);
      this.#addSvgIcon();
      this.#addTaskHistoryItem();
    }

    /**
     *
     * @param {*} historyData
     */
    setTaskHistoryItemData(historyData) {
      const form = this.shadowRoot.getElementById("history-form");

      const $ = (name) => {
        return form.elements[name];
      };

      $("historyDate").value = historyData.date;
      $("historyText").value = historyData.text;
    }

    /**
     * フォーム入力内容を取得する。
     */
    getFormInputData() {
      const form = this.shadowRoot.getElementById("history-form");

      const $ = (name) => {
        return form.elements[name];
      };

      const historyData = {
        date: $("historyDate").value,
        text: $("historyText").value,
      };

      return historyData;
    }

    /**
     * SVGアイコン追加
     * @private
     * @returns {void}
     * @memberof TaskHistory
     */
    #addSvgIcon() {
      const svg = _com_utils__WEBPACK_IMPORTED_MODULE_0__.Utils.svg({
        name: "trash",
        paths: [
          { path: "M4 7l16 0" },
          { path: "M10 11l0 6" },
          { path: "M14 11l0 6" },
          { path: "M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" },
          { path: "M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" },
        ],
      });
      this.shadowRoot.appendChild(svg);
    }

    #addTaskHistoryItem() {
      const form = document.createElement("form");
      form.id = "history-form";

      const memo = this.#createMemo();
      const date = this.#createDate();
      const trashButton = this.#createTrashButton();

      const item = document.createElement("fieldset");
      item.appendChild(memo);
      item.appendChild(date);
      item.appendChild(trashButton);

      form.appendChild(item);

      form.addEventListener("change", async (e) => {
        // カスタムイベントで変更を外部に伝播
        const event = new CustomEvent("formChangeEvent", {
          detail: { message: "Task Change." },
          bubbles: true,
          composed: true,
        });
        this.dispatchEvent(event);
      });

      this.shadowRoot.appendChild(form);
    }

    #createMemo() {
      const textarea = document.createElement("textarea");
      textarea.rows = 5;
      textarea.placeholder = "作業履歴を入力";
      textarea.spellcheck = false;
      textarea.id = "historyText";
      textarea.name = "historyText";
      return textarea;
    }

    #createDate() {
      const date = new Date();
      const y = date.getFullYear();
      const m = String(date.getMonth() + 1).padStart(2, "0");
      const d = String(date.getDate()).padStart(2, "0");

      const input = document.createElement("input");
      input.type = "date";
      input.id = "historyDate";
      input.name = "historyDate";
      input.value = `${y}-${m}-${d}`;

      const div = document.createElement("div");
      div.classList.add("date");
      div.appendChild(input);

      return div;
    }

    #createTrashButton() {
      const btn = _com_utils__WEBPACK_IMPORTED_MODULE_0__.Utils.svgBtn("trash");
      btn.classList.add("trash-button");

      btn.addEventListener("click", () => {
        this.remove();
      });

      return btn;
    }
  }
  customElements.define("task-history-item", TaskHistoryItem);
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
___CSS_LOADER_EXPORT___.push([module.id, `/*! destyle.css v4.0.1 | MIT License | https://github.com/nicolas-cusan/destyle.css */*,::before,::after{box-sizing:border-box;border-style:solid;border-width:0;min-width:0}html{line-height:1.15;-webkit-text-size-adjust:100%;-webkit-tap-highlight-color:rgba(0,0,0,0)}body{margin:0}main{display:block}p,table,blockquote,address,pre,iframe,form,figure,dl{margin:0}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit;margin:0}ul,ol{margin:0;padding:0;list-style:none}dt{font-weight:bold}dd{margin-left:0}hr{box-sizing:content-box;height:0;overflow:visible;border-top-width:1px;margin:0;clear:both;color:inherit}pre{font-family:monospace,monospace;font-size:inherit}address{font-style:inherit}a{background-color:rgba(0,0,0,0);text-decoration:none;color:inherit}abbr[title]{text-decoration:underline dotted}b,strong{font-weight:bolder}code,kbd,samp{font-family:monospace,monospace;font-size:inherit}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-0.25em}sup{top:-0.5em}svg,img,embed,object,iframe{vertical-align:bottom}button,input,optgroup,select,textarea{-webkit-appearance:none;appearance:none;vertical-align:middle;color:inherit;font:inherit;background:rgba(0,0,0,0);padding:0;margin:0;border-radius:0;text-align:inherit;text-transform:inherit}button,[type=button],[type=reset],[type=submit]{cursor:pointer}button:disabled,[type=button]:disabled,[type=reset]:disabled,[type=submit]:disabled{cursor:default}:-moz-focusring{outline:auto}select:disabled{opacity:inherit}option{padding:0}fieldset{margin:0;padding:0;min-width:0}legend{padding:0}progress{vertical-align:baseline}textarea{overflow:auto}[type=number]::-webkit-inner-spin-button,[type=number]::-webkit-outer-spin-button{height:auto}[type=search]{outline-offset:-2px}[type=search]::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}[type=number]{-moz-appearance:textfield;appearance:textfiled}label[for]{cursor:pointer}details{display:block}summary{display:list-item}[contenteditable]:focus{outline:auto}table{border-color:inherit;border-collapse:collapse}caption{text-align:left}td,th{vertical-align:top;padding:0}th{text-align:left;font-weight:bold}*{font-family:monospace;font-size:.8rem}.svg{position:absolute;width:0;height:0;overflow:hidden}svg.icon{display:block;width:1em;height:1em;stroke-width:0;stroke:currentColor;fill:currentColor;pointer-events:none}svg.icon use{pointer-events:none}fieldset{position:relative;background-color:#fffff8;border:1px solid #8f8f8f;border-radius:.25rem;padding:.25rem;margin-bottom:.5rem}fieldset textarea{outline:none;resize:none;width:100%;padding:.25rem;margin-bottom:.25rem;line-height:1rem;border-radius:.25rem}fieldset textarea:hover,fieldset textarea:focus{background-color:#efefef}fieldset textarea::-webkit-scrollbar{width:4px;border-radius:4px;background-color:#fffff8;border:none}fieldset textarea::-webkit-scrollbar-thumb{border-radius:8px;box-shadow:inset 0 0 10px 10px #0a3981;border:solid 1px rgba(0,0,0,0)}fieldset .trash-button{position:absolute;left:.25rem;bottom:.25rem;color:#8f8f8f}fieldset .trash-button:hover{color:#f93827}fieldset .trash-button .icon{font-size:1rem}fieldset .date{text-align:right}fieldset .date input[type=date]{outline:none}`, ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 15 */
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
___CSS_LOADER_EXPORT___.push([module.id, `/*! destyle.css v4.0.1 | MIT License | https://github.com/nicolas-cusan/destyle.css */*,::before,::after{box-sizing:border-box;border-style:solid;border-width:0;min-width:0}html{line-height:1.15;-webkit-text-size-adjust:100%;-webkit-tap-highlight-color:rgba(0,0,0,0)}body{margin:0}main{display:block}p,table,blockquote,address,pre,iframe,form,figure,dl{margin:0}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit;margin:0}ul,ol{margin:0;padding:0;list-style:none}dt{font-weight:bold}dd{margin-left:0}hr{box-sizing:content-box;height:0;overflow:visible;border-top-width:1px;margin:0;clear:both;color:inherit}pre{font-family:monospace,monospace;font-size:inherit}address{font-style:inherit}a{background-color:rgba(0,0,0,0);text-decoration:none;color:inherit}abbr[title]{text-decoration:underline dotted}b,strong{font-weight:bolder}code,kbd,samp{font-family:monospace,monospace;font-size:inherit}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-0.25em}sup{top:-0.5em}svg,img,embed,object,iframe{vertical-align:bottom}button,input,optgroup,select,textarea{-webkit-appearance:none;appearance:none;vertical-align:middle;color:inherit;font:inherit;background:rgba(0,0,0,0);padding:0;margin:0;border-radius:0;text-align:inherit;text-transform:inherit}button,[type=button],[type=reset],[type=submit]{cursor:pointer}button:disabled,[type=button]:disabled,[type=reset]:disabled,[type=submit]:disabled{cursor:default}:-moz-focusring{outline:auto}select:disabled{opacity:inherit}option{padding:0}fieldset{margin:0;padding:0;min-width:0}legend{padding:0}progress{vertical-align:baseline}textarea{overflow:auto}[type=number]::-webkit-inner-spin-button,[type=number]::-webkit-outer-spin-button{height:auto}[type=search]{outline-offset:-2px}[type=search]::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}[type=number]{-moz-appearance:textfield;appearance:textfiled}label[for]{cursor:pointer}details{display:block}summary{display:list-item}[contenteditable]:focus{outline:auto}table{border-color:inherit;border-collapse:collapse}caption{text-align:left}td,th{vertical-align:top;padding:0}th{text-align:left;font-weight:bold}.svg{position:absolute;width:0;height:0;overflow:hidden}svg.icon{display:block;width:1em;height:1em;stroke-width:0;stroke:currentColor;fill:currentColor;pointer-events:none}svg.icon use{pointer-events:none}.container{display:grid;grid-template-columns:280px 1fr 1fr;grid-template-rows:30px 1fr;grid-auto-columns:1fr;grid-auto-rows:1fr;gap:0em 0em;grid-auto-flow:row;grid-template-areas:"grid-area--search grid-area--contents grid-area--history" "grid-area--tree grid-area--contents grid-area--history";height:100vh}.container .float-button{position:fixed;bottom:15px;right:15px;z-index:1000;padding:.5rem;border-radius:50%;box-shadow:0px 3px 3px 0px rgba(0,0,0,.1);background-color:#0a3981;color:#fffffb;border:1px solid #0a3981}.container .float-button:hover{background-color:#fffff8;color:#0a3981;border-color:#0a3981}.container .float-button .icon{font-size:1.5rem}.container .grid-area--search{grid-area:grid-area--search;background-color:#fffffb;padding:1rem .5rem}.container .grid-area--tree{grid-area:grid-area--tree;background-color:#fffffb;padding:1rem .5rem}.container .grid-area--contents{grid-area:grid-area--contents;background-color:#d4f1ef;padding:1rem 1rem}.container .grid-area--history{grid-area:grid-area--history;background-color:#d4f1ef;padding:1rem 1.5rem}.container .scroll{overflow-y:scroll}.container .scroll::-webkit-scrollbar{display:none}`, ""]);
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
/* harmony import */ var _js_com_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _js_com_file_manager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var _js_component_search_bar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3);
/* harmony import */ var _js_component_tree_view__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7);
/* harmony import */ var _js_component_task_contents__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9);
/* harmony import */ var _js_component_task_history__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(11);
/* harmony import */ var _js_component_task_history_item__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(13);
/* harmony import */ var _style_css_index_style_css__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(15);










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

  const svg = _js_com_utils__WEBPACK_IMPORTED_MODULE_0__.Utils.svg({
    name: "folder",
    paths: [
      {
        path: "M5 4h4l3 3h7a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-11a2 2 0 0 1 2 -2",
      },
    ],
  });

  const btn = _js_com_utils__WEBPACK_IMPORTED_MODULE_0__.Utils.svgBtn("folder");
  btn.classList.add("float-button");
  btn.addEventListener("click", async () => {
    fileManager = new _js_com_file_manager__WEBPACK_IMPORTED_MODULE_1__.FileManager();
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

  document.adoptedStyleSheets = _js_com_utils__WEBPACK_IMPORTED_MODULE_0__.Utils.createStyle(_style_css_index_style_css__WEBPACK_IMPORTED_MODULE_7__["default"]);
};

/**
 * ページ読み込み時の処理
 * @returns {void}
 */
window.addEventListener("load", () => {
  // Web Componentを定義
  (0,_js_component_search_bar__WEBPACK_IMPORTED_MODULE_2__.SearchBar)();
  (0,_js_component_tree_view__WEBPACK_IMPORTED_MODULE_3__.TreeView)();
  (0,_js_component_task_contents__WEBPACK_IMPORTED_MODULE_4__.TaskContents)();
  (0,_js_component_task_history__WEBPACK_IMPORTED_MODULE_5__.TaskHistory)();
  (0,_js_component_task_history_item__WEBPACK_IMPORTED_MODULE_6__.TaskHistoryItem)();

  // 初期表示
  addGridArea();
  addBtnFolderOpen();
});

})();

/******/ })()
;