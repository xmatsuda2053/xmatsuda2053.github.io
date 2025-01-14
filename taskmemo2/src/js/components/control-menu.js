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
      const svgIconTreeOpen = this.#createTreeOpen();
      const svgIconTreeClose = this.#createTreeClose();
      const btnTreeOpen = this.#createTreeOpenButton();
      const btnTreeClose = this.#createTreeCloseButton();

      container.id = "container";
      container.appendChild(svgIconTreeOpen);
      container.appendChild(svgIconTreeClose);
      container.appendChild(btnTreeOpen);
      container.appendChild(btnTreeClose);

      this.shadowRoot.innerHTML = "";
      this.shadowRoot.appendChild(container);
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
        { path: "M12 2v6l3 -3m-6 0l3 3" },
        { path: "M12 22v-6l3 3m-6 0l3 -3" },
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
