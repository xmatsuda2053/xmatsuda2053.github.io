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
      this.titleText = ElmUtils.createElm("p");

      this.legend.appendChild(this.titleText);
      this.fieldset.appendChild(this.legend);
      this.shadowRoot.appendChild(this.fieldset);
    }

    /**
     * フィールドセットのlegendにheadlessクラスを設定します。
     * @param {bool} val - クラスを追加するかどうかのブール値。
     * @return {void}
     */
    set headLess(val) {
      this.legend.classList.toggle("head-less", val);
    }

    /**
     * Legendにiconを設定する
     * @param {string} val アイコン
     * @return {void}
     */
    set icon(val) {
      this.legend.prepend(val);
    }

    /**
     * Legendに値を設定する
     * @param {string} val 設定値
     * @return {void}
     */
    set title(val) {
      this.titleText.innerText = val;
    }

    /**
     * フィールドセットのlegendに必須クラスを設定します。
     * @param {bool} val - クラスを追加するかどうかのブール値。
     */
    set required(val) {
      this.legend.classList.toggle("isRequired", val);
    }

    /**
     * ネスト項目であるか否かを設定
     * @param {bool} val 設定値
     * @return {void}
     */
    set nested(val) {
      this.fieldset.classList.toggle("nested", val);
    }

    /**
     * アイテムを持たないフィールドであることを設定
     * @param {bool} val 設定値
     * @return {void}
     */
    set itemLess(val) {
      this.fieldset.classList.toggle("item-less", val);
    }

    /**
     * フィールドセットの幅を設定します。
     * @param {string} val - 幅の値（例: "100px", "50%"など）。
     * @return {void}
     */
    set width(val) {
      this.fieldset.style.width = val;
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
