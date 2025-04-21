import { ElmUtils } from "../../utils/elm-utils";
import { EventUtils } from "../../utils/event-utils";
import { SvgUtils } from "../../utils/svg-utils";
import { EventConst } from "../../constants/event-const";
import { SvgConst } from "../../constants/svg-const";

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
      this.root = ElmUtils.createElm("div", "root");

      this.input = ElmUtils.createElm("input");
      this.input.type = "text";
      this.input.spellcheck = false;

      this.root.appendChild(this.input);
      this.shadowRoot.appendChild(this.root);

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
     * 検索用入力欄であるか否かを設定する。
     * @param {string} val 設定値
     */
    set isSearch(val) {
      if (!val) return;

      const searchBtn = ElmUtils.createElm("svg-btn", "search-btn");
      searchBtn.iconPaths = SvgConst.SearchPaths;
      searchBtn.height = "1.25rem";
      searchBtn.size = "1.1rem";

      const cancelBtn = ElmUtils.createElm("svg-btn", "cancel-btn");
      cancelBtn.iconPaths = SvgConst.CircleXPaths;
      cancelBtn.height = "1.25rem";
      cancelBtn.size = "1.1rem";
      cancelBtn.hover = true;
      cancelBtn.color = "black";
      cancelBtn.tooltip = "クリア";

      this.root.classList.add("search-root");
      this.root.appendChild(searchBtn);
      this.root.appendChild(cancelBtn);
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
