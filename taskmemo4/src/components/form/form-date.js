import { ElmUtils } from "../../utils/elm-utils";
import { EventUtils } from "../../utils/event-utils";
import { EventConst } from "../../constants/event-const";

import styles from "./style/form-date.css";
import { SvgConst } from "../../constants/svg-const";

/**
 * FormDate コンポーネント
 * @class FormDate
 * @extends {HTMLElement}
 */
export function FormDate() {
  const OFF_DATE = "3000-12-31";

  class FormDate extends HTMLElement {
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
      this.input.type = "date";

      // 無効ボタンを作成
      this.offButton = ElmUtils.createElm("svg-btn", "calendar-off");
      this.offButton.iconPaths = SvgConst.CalendarOff;
      this.offButton.size = "1rem";
      this.offButton.color = "red";
      this.offButton.hover = true;
      this.offButton.toggle = true;
      this.offButton.toggleOn(false);

      this.offButton.addEventListener("click", () => {
        this.value = this.offButton.toggle ? OFF_DATE : "";
        this.input.classList.toggle("off", this.offButton.toggle);
        this.dispatchEvent(
          EventUtils.createEvent(EventConst.CHANGE_FORM_ITEM_EVENT_NAME)
        );
      });

      // 要素追加
      this.shadowRoot.appendChild(this.input);
      this.shadowRoot.appendChild(this.offButton);

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
      if (val === OFF_DATE) {
        this.offButton.toggleOn(true);
        this.input.classList.add("off");
      }
    }

    /**
     *  Inputの値を取得する
     * @return {string} 設定値
     */
    get value() {
      return this.input.value;
    }
  }
  customElements.define("form-date", FormDate);
}
