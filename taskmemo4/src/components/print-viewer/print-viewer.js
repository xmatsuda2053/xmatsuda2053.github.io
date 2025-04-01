import { ElmUtils } from "../../utils/elm-utils";
import { DateUtils } from "../../utils/date-utils";
import { PriorityConst } from "../../constants/priority-const";

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

      this.root.appendChild(ElmUtils.createElm("div", "border"));
      this.root.appendChild(this.viewer);
      this.shadowRoot.appendChild(this.root);

      window.print();
    }

    /**
     * 印刷領域を描画する。
     * @param {object} data
     * @param {string} id
     */
    render(data, id) {
      const taskData = data.taskData;
      const historyData = data.historyData;
      this.viewer.appendChild(this.#createHeader(1, taskData.title));

      this.viewer.appendChild(this.#createHeader(2, "1.説明"));
      this.viewer.appendChild(this.#createMemo(taskData.memo));

      this.viewer.appendChild(this.#createHeader(2, "2.タスク情報"));
      this.viewer.appendChild(this.#createProperty(id, taskData));

      this.viewer.appendChild(this.#createHeader(2, "3.履歴"));
      this.viewer.appendChild(this.#createHistoryContents(historyData));
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
     * リストコンテンツを作成する
     * @param {string} index
     * @param {object} text
     */
    #createItem(index, text) {
      const contents = ElmUtils.createElm("tr", null, ["item"]);
      const indexItem = ElmUtils.createElm("td", null, ["index"]);
      const contentItem = ElmUtils.createElm("td", null, ["content"]);

      indexItem.innerText = index;

      if (typeof text === "string") {
        contentItem.innerText = text;
      } else {
        contentItem.appendChild(text);
      }

      contents.appendChild(indexItem);
      contents.appendChild(contentItem);

      return contents;
    }

    /**
     * タスク情報を作成する
     * @param {string} id
     * @param {object} taskData
     */
    #createProperty(id, taskData) {
      /**
       * 開始日
       * @returns {object}
       * */
      const startDate = () => {
        const str = DateUtils.formatDateStr(id.substring(0, 8));
        const date = DateUtils.parseDate(str);
        const dispDate = DateUtils.formatDate(date, "{yyyy}-{MM}-{dd}");
        const weekday = DateUtils.getDaysOfWeek(date);

        return this.#createItem("作成日", `${dispDate}(${weekday})`);
      };

      /**
       * 期限日
       * @returns {object}
       */
      const dueDate = () => {
        const dispDate = taskData.dueDate;
        const weekday = DateUtils.getDaysOfWeek(dispDate);

        return this.#createItem("期限日", `${dispDate}(${weekday})`);
      };

      /**
       * 担当者
       * @returns {object}
       */
      const staff = () => {
        return this.#createItem(
          "担当者",
          `[${taskData.staffDiv}] ${taskData.staffName} (${taskData.staffTel})`
        );
      };

      /**
       * 優先度
       * @returns {object}
       */
      const priority = () => {
        return this.#createItem(
          "優先度",
          PriorityConst.text(taskData.priority) || "?"
        );
      };

      /**
       * 進捗率
       * @returns {object}
       */
      const status = () => {
        return this.#createItem("進捗率", `${taskData.status}%`);
      };

      /**
       * 配列を箇条書きアイテムに変換する
       * @param {*} items
       * @returns
       */
      const convertUL = (items) => {
        const ul = ElmUtils.createElm("ul");
        items.forEach((item) => {
          const li = ElmUtils.createElm("li");
          li.innerText = item;
          ul.appendChild(li);
        });
        return ul;
      };

      /**
       * フォルダパス
       * @returns {object}
       */
      const folderpath = () => {
        return this.#createItem(
          "作業フォルダ",
          convertUL(taskData.folderpath.split("\n"))
        );
      };

      /**
       * URL
       * @returns {object}
       */
      const url = () => {
        return this.#createItem("関連URL", convertUL(taskData.url.split("\n")));
      };

      const table = ElmUtils.createElm("table");
      const tbody = ElmUtils.createElm("tbody");

      tbody.appendChild(startDate());
      tbody.appendChild(dueDate());
      tbody.appendChild(staff());
      tbody.appendChild(priority());
      tbody.appendChild(status());
      tbody.appendChild(folderpath());
      tbody.appendChild(url());

      table.appendChild(tbody);
      return table;
    }

    /**
     * 履歴アイテムを作成する
     * @param {object} historyData
     * @returns
     */
    #createHistoryContents(historyData) {
      const table = ElmUtils.createElm("table");
      const tbody = ElmUtils.createElm("tbody");

      historyData.forEach((item) => {
        const date = item.date.split("T");
        const datetime = `${date[0]}(${DateUtils.getDaysOfWeek(date[0])}) ${date[1]}`;

        const tr = this.#createItem(datetime, item.text);
        tr.classList.add("list");

        tbody.appendChild(tr);
      });

      table.appendChild(tbody);
      return table;
    }
  }
  customElements.define("print-viewer", PrintViewer);
}
