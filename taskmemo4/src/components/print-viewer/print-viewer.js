import { ElmUtils } from "../../utils/elm-utils";
import { DateUtils } from "../../utils/date-utils";

import styles from "./style/print-viewer.css";

/**
 * PrintViewer コンポーネント
 * @class PrintViewer
 * @extends {HTMLElement}
 */
export function PrintViewer() {
  class PrintViewer extends HTMLElement {
    /**
     * コンストラクタ
     * @constructor
     * @returns {void}
     * @description
     * SvgBtn コンポーネントのインスタンスを初期化するコンストラクタ。
     * Shadow DOM をオープンモードでアタッチし、CSSを適用し、ボタン要素を作成します。
     */
    constructor() {
      super();

      // Shadow DOMをオープンモードでアタッチ
      this.attachShadow({ mode: "open" });
      this.shadowRoot.innerHTML = "";

      // CSSを適用
      this.shadowRoot.adoptedStyleSheets = ElmUtils.createStylesheet(styles);

      // 要素作成
      this.root = ElmUtils.createElm("div", "root");
      this.viewer = ElmUtils.createElm("div", "viewer");

      this.root.appendChild(this.viewer);

      this.shadowRoot.appendChild(this.root);

      const tab = window;
      tab.print();
    }

    /**
     * 印刷領域を描画する。
     * @param {object} data
     */
    render(data) {
      const taskData = data.taskData;
      const historyData = data.historyData;
      this.viewer.appendChild(this.#createHeader(1, taskData.title));
      this.viewer.appendChild(this.#createHeader(2, "1.概要説明"));
      this.viewer.appendChild(this.#createMemo(taskData.memo));
      this.viewer.appendChild(this.#createHeader(2, "2.履歴一覧"));

      const ul = ElmUtils.createElm("ul");
      historyData.forEach((item) => {
        const li = ElmUtils.createElm("li");
        li.appendChild(this.#createHistoryContents(item));
        ul.appendChild(li);
      });
      this.viewer.appendChild(ul);
    }

    /**
     * ヘッダを作成する
     * @param {string} level
     * @param {string} text
     * @returns header
     */
    #createHeader(level, text) {
      const h = ElmUtils.createElm(`h${level}`);
      h.innerText = text;
      return h;
    }

    /**
     * メモを作成する。
     * @param {string} text
     * @returns div
     */
    #createMemo(text) {
      const div = ElmUtils.createElm("div", null, ["memo"]);
      div.innerText = text;
      return div;
    }

    /**
     * 履歴アイテムを作成する
     * @param {object} item
     * @returns
     */
    #createHistoryContents(item) {
      const contents = ElmUtils.createElm("div", null, ["history"]);
      const historyText = ElmUtils.createElm("div", null, ["text"]);
      const historyDate = ElmUtils.createElm("div", null, ["date"]);

      const text = item.text;
      const dates = item.date.split("T");

      const date = dates[0];
      const dayOfWeek = DateUtils.getDaysOfWeek(date);
      const time = dates[1];

      historyText.innerText = text;
      historyDate.innerText = `${date}(${dayOfWeek}) ${time}`;

      contents.appendChild(historyDate);
      contents.appendChild(historyText);

      return contents;
    }
  }
  customElements.define("print-viewer", PrintViewer);
}
