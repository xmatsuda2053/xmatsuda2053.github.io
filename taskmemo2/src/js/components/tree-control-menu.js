/**
 * 共通関数
 */
import { Utils } from "../common/utils";
import { SvgIcon } from "../common/svgIcon";

/**
 * TreeControlMenuコンポーネント用のCSS
 */
import style from "../../style/css/tree-control-menu.css";

/**
 * TreeControlMenu コンポーネントを作成しカスタム要素として定義する
 */
export function TreeControlMenu() {
  /**
   * TreeControlMenu コンポーネントのカスタム要素のクラス
   * @extends {HTMLElement}
   */
  class TreeControlMenu extends HTMLElement {
    /**
     * コンストラクタ
     * @return {void}
     */
    constructor() {
      super();

      this.attachShadow({ mode: "open" });
      this.shadowRoot.adoptedStyleSheets =
        Utils.createStyleSheetWithFilename(style);

      const container = document.createElement("div");

      const btnAddNewTask = this.#createAddNewTaksButton();
      const btnAddNewGroup = this.#createAddNewGroupButton();
      const btnTreeOpen = this.#createTreeOpenButton();
      const btnTreeClose = this.#createTreeCloseButton();

      container.id = "container";
      container.appendChild(btnAddNewTask);
      container.appendChild(btnAddNewGroup);
      container.appendChild(btnTreeOpen);
      container.appendChild(btnTreeClose);

      this.shadowRoot.innerHTML = "";
      this.shadowRoot.appendChild(container);
    }

    /**
     * 新しいボタンを作成する
     *
     * @param {string} iconName - アイコンの名前。
     * @param {Array} paths - アイコンのパスの配列。
     * @returns {HTMLElement} - 作成されたボタン要素。
     */
    #createNewButton(iconName, paths) {
      const icon = Utils.createSvg(iconName, paths);
      const btn = Utils.createSvgButton(iconName, icon);
      btn.id = `btn-${iconName}`;
      return btn;
    }

    //--------------------------------------------------
    //- タスクを追加
    //--------------------------------------------------

    /**
     * "clipbord-plus"ボタンを作成する
     * @returns {HTMLButtonElement} 生成された"clipbord-plus"ボタン
     */
    #createAddNewTaksButton() {
      const btn = this.#createNewButton(
        "clipbord-plus",
        SvgIcon.clipbordPlusPaths()
      );
      btn.addEventListener("click", () => {
        this.addNewTaksClickHandler();
      });
      return btn;
    }

    /**
     * タスクを追加するボタンのクリックイベントハンドラを設定する
     *
     * @param {function} handler - クリックイベント時に実行される関数
     */
    setAddNewTaksClickEventHandler(handler) {
      this.addNewTaksClickHandler = handler;
    }

    //--------------------------------------------------
    //- グループを追加
    //--------------------------------------------------

    /**
     * "category-plus"ボタンを作成する
     * @returns {HTMLButtonElement} 生成された"category-plus"ボタン
     */
    #createAddNewGroupButton() {
      const btn = this.#createNewButton(
        "category-plus",
        SvgIcon.categoryPlusPaths()
      );
      btn.addEventListener("click", () => {
        this.addNewGroupClickHandler();
      });
      return btn;
    }

    /**
     * グループを追加するボタンのクリックイベントハンドラを設定する
     *
     * @param {function} handler - クリックイベント時に実行される関数
     */
    setAddNewGroupClickEventHandler(handler) {
      this.addNewGroupClickHandler = handler;
    }

    //--------------------------------------------------
    //- TreeViewをすべて開く
    //--------------------------------------------------

    /**
     * "tree-open"ボタンを作成する
     * @returns {HTMLButtonElement} 生成された"tree-open"ボタン
     */
    #createTreeOpenButton() {
      const btn = this.#createNewButton("tree-open", SvgIcon.treeOpen());
      btn.addEventListener("click", () => {
        this.treeOpenClickHandler();
      });
      return btn;
    }

    /**
     * ツリービューを開くボタンのクリックイベントハンドラを設定する
     *
     * @param {function} handler - クリックイベント時に実行される関数
     */
    setTreeOpenClickEventHandler(handler) {
      this.treeOpenClickHandler = handler;
    }

    //--------------------------------------------------
    //- TreeViewをすべて閉じる
    //--------------------------------------------------

    /**
     * "tree-close"ボタンを作成する
     * @returns {HTMLButtonElement} 生成された"tree-close"ボタン
     */
    #createTreeCloseButton() {
      const btn = this.#createNewButton("tree-close", SvgIcon.treeClose());
      btn.addEventListener("click", () => {
        this.treeCloseClickHandler();
      });
      return btn;
    }

    /**
     * ツリービューを閉じるボタンのクリックイベントハンドラを設定する
     *
     * @param {function} handler - クリックイベント時に実行される関数
     */
    setTreeCloseClickEventHandler(handler) {
      this.treeCloseClickHandler = handler;
    }
  }
  // カスタム要素 "TreeControlMenu" を定義する
  customElements.define("tree-control-menu", TreeControlMenu);
}
