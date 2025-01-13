/**
 * 共通関数
 */
import { Utils } from "../common/utils";

/**
 * xxxxコンポーネント用のCSS
 */
import style from "../../style/css/xxxxxxx.css";

/**
 * xxxxxxx コンポーネントを作成しカスタム要素として定義する
 */
export function xxxxx() {
  /**
   * xxxxx コンポーネントのカスタム要素のクラス
   * @extends {HTMLElement}
   */
  class xxxxx extends HTMLElement {
    /**
     * コンストラクタ
     * @return {void}
     */
    constructor() {
      super();

      this.attachShadow({ mode: "open" });
      this.shadowRoot.adoptedStyleSheets =
        Utils.createStyleSheetWithFilename(style);

      const fieldset = this.#creteFiledSet();
      const legend = this.#createLegend();

      fieldset.appendChild(legend);

      this.shadowRoot.innerHTML = "";
      this.shadowRoot.appendChild(fieldset);

      // 変更イベントを伝播
      fieldset.addEventListener("change", () => {
        this.dispatchEvent(Utils.getCustomEvent("changeTask"));
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
  }
  // カスタム要素 "xxxxxxx" を定義する
  customElements.define("xxxxxxx", PartsInput);
}
