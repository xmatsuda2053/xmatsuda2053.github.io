import styles from "./style/biz-card.css";

import { ElmUtils } from "../../utils/elm-utils";

/**
 * BizCard コンポーネント
 * @class BizCard
 * @extends {HTMLElement}
 */
export function BizCard() {
  class BizCard extends HTMLElement {
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

      // grid作成
      this.root = ElmUtils.createElm("div", "root");
      this.root.appendChild(this.#createUserArea());
      this.root.appendChild(this.#createDivArea());
      this.root.appendChild(this.#createContactArea());
      this.root.appendChild(this.#createAddressArea());

      this.shadowRoot.innerHTML = "";
      this.shadowRoot.appendChild(this.root);
    }

    /**
     * ユーザ情報エリアを作成
     * @oaram {HTMLElement} area
     */
    #createUserArea() {
      const area = ElmUtils.createElm("div", "user-area");

      this.userArea = area;
      return this.userArea;
    }

    /**
     * 所属情報エリアを作成
     * @oaram {HTMLElement} area
     */
    #createDivArea() {
      const area = ElmUtils.createElm("div", "div-area");

      this.divArea = area;
      return this.divArea;
    }

    /**
     * 連絡先情報エリアを作成
     * @oaram {HTMLElement} area
     */
    #createContactArea() {
      const area = ElmUtils.createElm("div", "contact-area");

      this.contactArea = area;
      return this.contactArea;
    }

    /**
     * 住所情報エリアを作成
     * @oaram {HTMLElement} area
     */
    #createAddressArea() {
      const area = ElmUtils.createElm("div", "address-area");

      this.addressArea = area;
      return this.addressArea;
    }
  }
  customElements.define("biz-card", BizCard);
}
