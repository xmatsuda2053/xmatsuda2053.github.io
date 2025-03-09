import { ElmUtils } from "../../utils/elm-utils";

import styles from "./style/form-fieldset.css";

/**
 * FormFieldset コンポーネント
 * @class FormFieldset
 * @extends {HTMLElement}
 */
export function FormFieldset() {
  class FormFieldset extends HTMLElement {
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
      this.fieldset = ElmUtils.createElm("fieldset", "root");
      this.legend = ElmUtils.createElm("legend");

      this.fieldset.appendChild(this.legend);
      this.shadowRoot.appendChild(this.fieldset);
    }

    /**
     * Legendに値を設定する
     * @param {string} val 設定値
     * @return {void}
     */
    set title(val) {
      this.legend.innerText = val;
    }

    /**
     * フィールドセットのlegendに必須クラスを設定します。
     * @param {boolean} val - クラスを追加するかどうかのブール値。
     */
    set required(val) {
      this.legend.classList.toggle("isRequired", val);
    }

    /**
     * ネスト項目であるか否かを設定
     * @param {string} val 設定値
     * @return {void}
     */
    set nested(val) {
      this.fieldset.classList.toggle("nested", val);
    }

    /**
     * 指定されたアイテムをフィールドセットに追加します。
     * @param {HTMLElement} item - 追加するアイテム。
     */
    addItem(item) {
      if (item.tagName === "FORM-FIELDSET") {
        this.fieldset.classList.add("nestedRoot");
        item.nested = true;
      }
      this.fieldset.appendChild(item);
    }
  }
  customElements.define("form-fieldset", FormFieldset);
}
