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
      this.bcHead = ElmUtils.createElm("div", "bc-header");
      this.bcList = ElmUtils.createElm("div", "bc-list", ["scroll"]);
      this.bcMain = ElmUtils.createElm("div", "bc-main");

      this.root.appendChild(this.bcHead);
      this.root.appendChild(this.bcList);
      this.root.appendChild(this.bcMain);

      this.shadowRoot.innerHTML = "";
      this.shadowRoot.appendChild(this.root);

      this.#test();
    }

    #test() {
      this.#addListItem("list-item-1", {
        name: "テスト １郎",
        company: "日本システムズ",
      });
      this.#addListItem("list-item-2", {
        name: "テスト ２郎",
        company: "日本システムズ",
      });
      this.#addListItem("list-item-3", {
        name: "テスト ３郎",
        company: "日本システムズ",
      });
      this.#addListItem("list-item-4", {
        name: "テスト ４郎",
        company: "日本システムズ",
      });
      this.#addListItem("list-item-5", {
        name: "テスト ５郎",
        company: "日本システムズ",
      });
      this.#addListItem("list-item-6", {
        name: "テスト ６郎",
        company: "日本システムズ",
      });
      this.#addListItem("list-item-7", {
        name: "テスト ７郎",
        company: "日本システムズ",
      });
      this.#addListItem("list-item-8", {
        name: "テスト ８郎",
        company: "日本システムズ",
      });
      this.#addListItem("list-item-9", {
        name: "テスト ９郎",
        company: "日本システムズ",
      });
      this.#addListItem("list-item-10", {
        name: "テスト １０郎",
        company: "日本システムズ",
      });

      const listItem = this.shadowRoot.getElementById("list-item-1");
      listItem.classList.add("selected");
    }

    #addListItem(id, data = {}) {
      const item = ElmUtils.createElm("div", null, ["item"]);
      const name = ElmUtils.createElm("p", null, ["name"]);
      const comp = ElmUtils.createElm("p", null, ["company"]);

      item.id = id;
      item.appendChild(name);
      item.appendChild(comp);

      name.innerText = data.name;
      comp.innerText = data.company;

      this.bcList.appendChild(item);
    }
  }
  customElements.define("biz-card", BizCard);
}
