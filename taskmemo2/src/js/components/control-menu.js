/**
 * 共通関数
 */
import { Utils } from "../common/utils";

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
      return Utils.createSvg("menu", [
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
      const btn = Utils.createSvgButton("menu");
      btn.id = "menu";
      return btn;
    }

    /**
     * "search"アイコンのSVGを作成する
     * @returns {SVGElement} "search"アイコンを含む生成されたSVG要素
     */
    #createSearch() {
      return Utils.createSvg("search", [
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
      const btn = Utils.createSvgButton("search");
      btn.id = "search";
      return btn;
    }

    /**
     * "tree-open"アイコンのSVGを作成する
     * @returns {SVGElement} "tree-open"アイコンを含む生成されたSVG要素
     */
    #createTreeOpen() {
      return Utils.createSvg("tree-open", [
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
      const btn = Utils.createSvgButton("tree-open");
      btn.id = "tree-open";
      return btn;
    }

    /**
     * "tree-close"アイコンのSVGを作成する
     * @returns {SVGElement} "tree-close"アイコンを含む生成されたSVG要素
     */
    #createTreeClose() {
      return Utils.createSvg("tree-close", [
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
      const btn = Utils.createSvgButton("tree-close");
      btn.id = "tree-close";
      return btn;
    }
  }
  // カスタム要素 "ControlMenu" を定義する
  customElements.define("control-menu", ControlMenu);
}
