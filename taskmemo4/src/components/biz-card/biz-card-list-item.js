import styles from "./style/biz-card-list-item.css";

import { ElmUtils } from "../../utils/elm-utils";

/**
 * BizCardListItem コンポーネント
 * @class BizCard
 * @extends {HTMLElement}
 */
export function BizCardListItem() {
  class BizCardListItem extends HTMLElement {
    /**
     * コンストラクタ
     * @return {void}
     */
    constructor() {
      super();

      // Shadow DOMをオープンモードでアタッチ
      this.attachShadow({ mode: "open" });

      // CSSを適用
      this.shadowRoot.adoptedStyleSheets = ElmUtils.createStylesheet(styles);

      this.root = ElmUtils.createElm("div", "root");
      this._name = ElmUtils.createElm("p", "name");
      this._company = ElmUtils.createElm("p", "company");

      this.root.appendChild(this._name);
      this.root.appendChild(this._company);

      this.shadowRoot.innerHTML = "";
      this.shadowRoot.appendChild(this.root);
    }

    /**
     * リストアイテムの内容を設定する
     * @param {object} data
     */
    rendar(data = {}) {
      this._name.innerText = data.kanjiName || "No Name";
      this._company.innerText = data.company || "No Company";
      this._data = data;
    }

    /**
     * 名刺アイテムの内容を取得する
     * @return {object} 名刺アイテムの内容
     */
    get data() {
      return this._data;
    }

    /**
     * リストアイテムの選択状態を設定する
     * @param {boolean} value 選択状態
     */
    set isSelected(value) {
      this.root.classList.toggle("selected", value);
    }
  }
  customElements.define("biz-card-list-item", BizCardListItem);
}
