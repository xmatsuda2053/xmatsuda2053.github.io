/**
 * 共通関数
 */
import { Utils } from "../common/utils";

/**
 * PartsTextareaコンポーネント用のCSS
 */
import style from "../../style/css/parts-textarea.css";

/**
 * PartsTextarea コンポーネントを作成しカスタム要素として定義する
 */
export function PartsTextarea() {
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
        Utils.createStyleSheetWithFilename(style);

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
        this.dispatchEvent(Utils.getCustomEvent("changeTaskItem"));
      });
    }

    /**
     * 要素がDOMに追加された後の処理
     */
    connectedCallback() {
      const textarea = this.shadowRoot.getElementById("textarea");
      textarea.style.height = Utils.adjustTextareaHeight(
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
        textarea.style.height = Utils.adjustTextareaHeight(
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
      textarea.style.height = Utils.adjustTextareaHeight(
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
