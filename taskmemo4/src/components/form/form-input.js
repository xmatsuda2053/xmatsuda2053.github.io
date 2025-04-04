import { ElmUtils } from "../../utils/elm-utils";
import { EventUtils } from "../../utils/event-utils";
import { EventConst } from "../../constants/event-const";

import styles from "./style/form-input.css";

/**
 * FormInput コンポーネント
 * @class FormInput
 * @extends {HTMLElement}
 */
export function FormInput() {
  class FormInput extends HTMLElement {
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
      this.input = ElmUtils.createElm("input");
      this.input.type = "text";
      this.input.spellcheck = false;

      this.shadowRoot.appendChild(this.input);

      // 変更イベントを伝播
      this.input.addEventListener("change", () => {
        this.dispatchEvent(
          EventUtils.createEvent(EventConst.CHANGE_FORM_ITEM_EVENT_NAME)
        );
      });
    }

    /**
     * Inputに値を設定する
     * @param {string} val 設定値
     * @return {void}
     */
    set value(val) {
      this.input.value = val;
    }

    /**
     *  Inputの値を取得する
     * @return {string} 設定値
     */
    get value() {
      return this.input.value;
    }

    /**
     * Inputにプレースホルダーを設定する
     * @param {string} val 設定値
     * @return {void}
     */
    set placeholder(val) {
      this.input.placeholder = val;
    }

    /**
     * 入力フィールドに「read-only」クラスを設定または解除します。
     * @param {boolean} val - クラスを追加するかどうかのブール値。
     */
    set readOnly(val) {
      this.input.readOnly = val;
    }
  }
  customElements.define("form-input", FormInput);
}
