import { ElmUtils } from "../../utils/elm-utils";
import { EventUtils } from "../../utils/event-utils";
import { EventConst } from "../../constants/event-const";

import styles from "./style/form-textarea.css";

/**
 * FormTextarea コンポーネント
 * @class FormTextarea
 * @extends {HTMLElement}
 */
export function FormTextarea() {
  class FormTextarea extends HTMLElement {
    /**
     * コンストラクタ
     * @return {void}
     */
    constructor() {
      super();

      // Shadow DOMをオープンモードでアタッチ
      this.attachShadow({ mode: "open" });
      this.shadowRoot.innerHTML = "";

      // CSSを適用
      this.shadowRoot.adoptedStyleSheets = ElmUtils.createStylesheet(styles);

      // 空の要素を作成
      this.textarea = ElmUtils.createElm("textarea");
      this.textarea.style = "width:100%";
      this.textarea.spellcheck = false;

      /**
       * 入力内容に連動して高さを変更する
       */
      this.defaultRows = 3;
      this.textarea.addEventListener("input", (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.#adjustTextareaHeight();
      });

      this.shadowRoot.appendChild(this.textarea);

      // 変更イベントを伝播
      this.textarea.addEventListener("change", () => {
        this.dispatchEvent(
          EventUtils.createEvent(EventConst.CHANGE_FORM_ITEM_EVENT_NAME)
        );
      });
    }

    /**
     * 要素がDOMに追加された後の処理
     */
    connectedCallback() {
      this.#adjustTextareaHeight(this.defaultRows);
    }

    /**
     * テキストエリアの高さを調整します。
     * @param {number} [rows=0] - 設定する行数。0の場合は内容に基づいて行数を自動的に設定します。
     */
    #adjustTextareaHeight(rows = 0) {
      this.textarea.style.height = "auto";

      const style = window.getComputedStyle(this.textarea);
      const lineHeight = parseFloat(style.lineHeight);
      const paddingTop = parseFloat(style.paddingTop);
      const paddingBottom = parseFloat(style.paddingBottom);
      const paddingHeight = paddingTop + paddingBottom;
      const contentHeight = this.textarea.scrollHeight - paddingHeight;

      if (rows === 0) {
        rows = Math.ceil(contentHeight / lineHeight);
        if (rows < this.defaultRows) {
          rows = this.defaultRows;
        }
      }

      // テキストエリアの高さをピクセル単位で計算
      const adjustHeight = lineHeight * rows + paddingHeight;
      this.textarea.style.height = `${adjustHeight}px`;
    }

    /**
     * Textareaに値を設定する
     * @param {string} val 設定値
     * @return {void}
     */
    set value(val) {
      this.textarea.value = val;
      requestAnimationFrame(() => {
        this.#adjustTextareaHeight();
      });
    }

    /**
     *  Textareaの値を取得する
     * @return {string} 設定値
     */
    get value() {
      return this.textarea.value;
    }

    /**
     * Textareaにプレースホルダーを設定する
     * @param {string} val 設定値
     * @return {void}
     */
    set placeholder(val) {
      this.textarea.placeholder = val;
    }

    /**
     * 幅を設定します。
     * @param {string} w - 設定する幅の値（例：'100px'）。
     */
    set width(w) {
      this.textarea.style = `width:${w}`;
    }

    /**
     * テキストエリアの行数を設定します。
     * @param {number} r - 設定する行数
     */
    set rows(r) {
      this.defaultRows = r;
      this.#adjustTextareaHeight(r);
    }

    /**
     * ボーダーの有無を設定します。
     * @param {boolean} isBorderLess - ボーダーを表示しない場合はtrueを指定します。
     */
    set borderless(isBorderLess) {
      this.textarea.classList.toggle("borderless", isBorderLess);
    }
  }
  customElements.define("form-textarea", FormTextarea);
}
