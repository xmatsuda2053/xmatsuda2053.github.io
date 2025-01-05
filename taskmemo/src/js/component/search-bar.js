import { Utils } from "../com/utils";
import styles from "../../style/css/search-bar.css";

export function SearchBar() {
  /**
   * 検索欄
   */
  class SearchBar extends HTMLElement {
    /**
     * コンストラクタ
     */
    constructor() {
      super();

      this.attachShadow({ mode: "open" });
      this.shadowRoot.adoptedStyleSheets = Utils.createStyle(styles);
      this.#addSvgIcon();
      this.#addSearchBar();
    }

    /**
     * SVGアイコン追加
     */
    #addSvgIcon() {
      const svg = Utils.svg({
        name: "search",
        paths: [
          { path: "M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" },
          { path: "M21 21l-6 -6" },
        ],
      });
      this.shadowRoot.appendChild(svg);
    }

    /**
     * 検索欄を追加
     */
    #addSearchBar() {
      const input = this.#createSearchInput();
      const btn = this.#createButton();

      const container = document.createElement("div");
      container.classList.add("search-bar");
      container.appendChild(input);
      container.appendChild(btn);

      this.shadowRoot.appendChild(container);
    }

    /**
     * 検索内容の入力欄を作成
     * @returns タグ
     */
    #createSearchInput() {
      const input = document.createElement("input");
      input.type = "search";
      input.placeholder = "search";

      /**
       * 検索処理
       */
      input.addEventListener("change", (e) => {
        e.preventDefault();
      });

      return input;
    }

    /**
     * SVGアイコンを使ったボタンを作成
     * @returns タグ
     */
    #createButton() {
      const btn = Utils.svgBtn("search");
      return btn;
    }
  }

  /**
   * カスタム要素を定義
   */
  customElements.define("search-bar", SearchBar);
}
