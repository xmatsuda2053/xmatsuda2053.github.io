import { ElmUtils } from "../../utils/elm-utils";
import { EventUtils } from "../../utils/event-utils";
import { EventConst } from "../../constants/event-const";

import styles from "./style/form-radio.css";

/**
 * FormRadio コンポーネント
 * @class FormRadio
 * @extends {HTMLElement}
 */
export function FormRadio() {
  class FormRadio extends HTMLElement {
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
      this.shadowRoot.appendChild(this.root);

      // 変更イベントを伝播
      this.root.addEventListener("change", () => {
        this.dispatchEvent(
          EventUtils.createEvent(EventConst.CHANGE_FORM_ITEM_EVENT_NAME)
        );
      });
    }

    /**
     * 選択肢を設定する
     * @param {map} param 設定値
     * @return {void}
     */
    set items(param) {
      param.forEach((p, index) => {
        const itemName = `item${p.value}`;

        // ラベルとラジオボタンを作成
        const lbl = document.createElement("label");
        lbl.htmlFor = itemName;
        lbl.textContent = p.text;

        const radio = document.createElement("input");
        radio.type = "radio";
        radio.name = "radio";
        radio.id = itemName;
        radio.value = p.value;

        // 最初と最後の要素にクラスを追加
        if (index === 0) {
          lbl.classList.add("first");
        } else if (index === param.length - 1) {
          lbl.classList.add("last");
        }

        this.root.appendChild(lbl);
        this.root.appendChild(radio);
      });
    }

    /**
     * 選択したラジオボタンのvalueを返す
     * @return {string} value
     */
    get value() {
      const checked = this.shadowRoot.querySelector(
        'input[name="radio"]:checked'
      );
      if (!checked) {
        return null;
      }
      return checked.value;
    }

    /**
     * ラジオボタンを選択する
     * @param {string} v
     */
    set value(v) {
      if (v) {
        if (v === "") {
          return;
        }
        const rb = this.shadowRoot.getElementById(`item${v}`);
        rb.checked = true;
      }
    }
  }
  customElements.define("form-radio", FormRadio);
}
