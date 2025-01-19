/**
 * 共通関数
 */
import { Utils } from "../common/utils";
import { SvgIcon } from "../common/svgIcon";

/**
 * ControlMenuコンポーネント用のCSS
 */
import style from "../../style/css/control-menu.css";

/**
 * ControlMenu コンポーネントを作成しカスタム要素として定義する
 */
export function ControlMenu() {
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

    //--------------------------------------------------
    //- タスクを追加
    //--------------------------------------------------

    /**
     * "clipbord-plus"ボタンを作成する
     * @returns {HTMLButtonElement} 生成された"clipbord-plus"ボタン
     */
    #createAddNewTaksButton() {
      const icon = Utils.createSvg(
        "clipbord-plus",
        SvgIcon.clipbordPlusPaths()
      );
      const btn = Utils.createSvgButton("clipbord-plus", icon);

      btn.id = "btn-clipbord-plus";

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
      const icon = Utils.createSvg(
        "category-plus",
        SvgIcon.categoryPlusPaths()
      );
      const btn = Utils.createSvgButton("category-plus", icon);

      btn.id = "btn-category-plus";

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
      const icon = Utils.createSvg("tree-open", SvgIcon.treeOpen());
      const btn = Utils.createSvgButton("tree-open", icon);

      btn.id = "btn-tree-open";

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
      const icon = Utils.createSvg("tree-close", SvgIcon.treeClose());
      const btn = Utils.createSvgButton("tree-close", icon);

      btn.id = "btn-tree-close";

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
  // カスタム要素 "ControlMenu" を定義する
  customElements.define("control-menu", ControlMenu);
}
