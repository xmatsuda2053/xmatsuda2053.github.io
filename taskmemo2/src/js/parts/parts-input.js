/**
 * 共通関数
 */
import { Utils } from "../common/utils";
import { SvgIcon } from "../common/svgIcon";

/**
 * parts-inputコンポーネント用のCSS
 */
import style from "../../style/css/parts-input.css";

/**
 * PartsInput コンポーネントを作成しカスタム要素として定義する
 */
export function PartsInput() {
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
        Utils.createStyleSheetWithFilename(style);

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
        this.dispatchEvent(Utils.getCustomEvent("changeTaskItem"));
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
     * 読み取り専用であることを設定する
     */
    isReadOnly() {
      const input = this.shadowRoot.getElementById("input");
      input.readOnly = true;
      input.classList.add("copyable");

      input.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        navigator.clipboard.writeText(input.value).then();
      });

      const container = this.shadowRoot.getElementById("container");
      const tooltip = Utils.createElm("div", "tooltip");
      const icon = Utils.createSvg("copy", SvgIcon.copyPaths());
      const btn = Utils.createSvgButton("copy");

      tooltip.appendChild(icon);
      tooltip.appendChild(btn);
      tooltip.appendChild(document.createTextNode("copy"));

      container.appendChild(tooltip);
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
