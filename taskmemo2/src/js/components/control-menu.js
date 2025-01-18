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
      const svgIconTreeOpen = Utils.createSvg("tree-open", SvgIcon.treeOpen());
      const svgIconTreeClose = Utils.createSvg(
        "tree-close",
        SvgIcon.treeClose()
      );
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

    //--------------------------------------------------
    //- TreeViewをすべて開く
    //--------------------------------------------------

    /**
     * "tree-open"ボタンを作成する
     * @returns {HTMLButtonElement} 生成された"tree-open"ボタン
     */
    #createTreeOpenButton() {
      const btn = Utils.createSvgButton("tree-open");
      btn.id = "tree-open";
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
      const btn = Utils.createSvgButton("tree-close");
      btn.id = "tree-close";
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
