import { ElmUtils } from "../../utils/elm-utils";
import { SvgUtils } from "../../utils/svg-utils";
import { SvgConst } from "../../constants/svg-const";
import { EventUtils } from "../../utils/event-utils";
import { EventConst } from "../../constants/event-const";

import styles from "./style/contents-history.css";

export function ContentsHistory() {
  class ContentsHistory extends HTMLElement {
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
      this.root = ElmUtils.createElm("div", "root", ["contents-history"]);

      // タイトル追加
      const fieldset = ElmUtils.createElm("form-fieldset");
      fieldset.icon = SvgUtils.createIcon(SvgConst.HistoryPaths);
      fieldset.title = "履歴一覧";
      fieldset.itemLess = true;
      this.root.appendChild(fieldset);

      // ボタン追加
      const floatBtns = ElmUtils.createFloatArea();
      floatBtns.appendChild(this.#createAddPrintButton());

      this.root.appendChild(this.#createAddHisotryButton());

      this.root.appendChild(floatBtns);

      // Shado Domにrootを追加
      this.shadowRoot.innerHTML = "";
      this.shadowRoot.appendChild(this.root);
    }

    /**
     * 履歴追加ボタンを作成する。
     * @returns HTMLElement
     */
    #createAddHisotryButton() {
      const addHistoryBtn = ElmUtils.createElm("svg-btn", "add-hisory");
      addHistoryBtn.iconPaths = SvgConst.plusPaths;
      addHistoryBtn.isSquare = true;
      addHistoryBtn.height = "5rem";
      addHistoryBtn.tooltip = "履歴を追加";

      // クリックイベント
      addHistoryBtn.addEventListener("click", () => {
        this.#addHistoryItem({});
        this.dispatchEvent(
          EventUtils.createEvent(EventConst.ADD_HISTORY_CONTENTS_EVENT_NAME)
        );
      });

      this.addHistoryBtn = addHistoryBtn;

      return addHistoryBtn;
    }

    /**
     * 履歴印刷ボタンを作成する。
     * @returns HTMLElement
     */
    #createAddPrintButton() {
      const addPrintBtn = ElmUtils.createElm("svg-btn", "print-hisory");
      addPrintBtn.iconPaths = SvgConst.PrinterPath;
      addPrintBtn.isCircle = true;
      addPrintBtn.tooltip = "印刷";

      // クリックイベント
      addPrintBtn.addEventListener("click", () => {
        this.dispatchEvent(
          EventUtils.createEvent(EventConst.PRINT_TASK_EVENT_NAME)
        );
      });

      return addPrintBtn;
    }

    /**
     * 履歴内容を取得する。
     * @returns {array} - 履歴データ
     */
    getData() {
      const items = this.root.querySelectorAll("contents-history-item");
      const data = [];
      items.forEach((item) => {
        data.push(item.getData());
      });
      return data;
    }

    /**
     * 履歴アイテムを描画する。
     * @param {object} data
     */
    render(id, data) {
      this.taskId = id;

      data.historyData.forEach((item) => {
        this.#addHistoryItem(item);
      });

      requestAnimationFrame(() => {
        this.dispatchEvent(
          EventUtils.createEvent(EventConst.ADD_HISTORY_CONTENTS_EVENT_NAME)
        );
      });
    }

    // **************************************************
    // * 履歴アイテム操作
    // **************************************************

    /**
     * 履歴アイテムを画面に追加する。
     * @param {object} data
     */
    #addHistoryItem(data) {
      const historyItem = ElmUtils.createElm("contents-history-item");

      const isNewItem = !data.id;

      if (isNewItem) {
        historyItem.classList.add("fade-in");
      }

      historyItem.init(data);
      this.addHistoryBtn.before(historyItem);

      if (isNewItem) {
        setTimeout(() => {
          historyItem.classList.add("show");
        }, 100);
      }
    }
  }
  customElements.define("contents-history", ContentsHistory);
}
