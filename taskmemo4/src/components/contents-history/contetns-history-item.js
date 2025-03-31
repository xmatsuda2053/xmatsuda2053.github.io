import { ElmUtils } from "../../utils/elm-utils";
import { DateUtils } from "../../utils/date-utils";
import { IdUtils } from "../../utils/id-utils";
import { SvgUtils } from "../../utils/svg-utils";
import { SvgConst } from "../../constants/svg-const";
import { EventUtils } from "../../utils/event-utils";
import { EventConst } from "../../constants/event-const";

import styles from "./style/contents-history-item.css";

export function ContentsHistoryItem() {
  class ContentsHistoryItem extends HTMLElement {
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
      this.root = ElmUtils.createElm("div", "root", ["history-item"]);
      this.footer = ElmUtils.createElm("div", "footer");

      this.#addText();
      this.#addToDoButton();
      this.#addDate();
      this.#addDeleteButton();

      this.root.appendChild(this.footer);

      // Shado Domにrootを追加
      this.shadowRoot.innerHTML = "";
      this.shadowRoot.appendChild(this.root);
    }

    /**
     * 履歴内容を初期化する。
     * @param {*} data - 履歴データ
     * @returns {void}
     */
    init(data = {}) {
      this.id = data.id || IdUtils.getUniqueId();
      this._text.value = data.text || "";
      this._date.value =
        data.date ||
        DateUtils.formatDate(new Date(), "{yyyy}-{MM}-{dd}T{HH}:{mm}");
      this._todoBtn.toggleOn(data.todo || false);

      this.root.classList.toggle("todo-flag", this._todoBtn.toggle);
    }

    /**
     * 履歴データを取得する。
     * @returns {object} - 履歴データ
     */
    getData() {
      return {
        id: this.id,
        text: this._text.value,
        date: this._date.value,
        todo: this._todoBtn.toggle,
      };
    }

    // **************************************************
    // * 履歴
    // **************************************************

    /**
     * 履歴入力欄を追加する。
     * @returns {void}
     */
    #addText() {
      this._text = ElmUtils.createElm("form-textarea", "history-text");
      this._text.borderless = true;
      this._text.placeholder = "履歴内容";
      this.root.appendChild(this._text);
    }

    // **************************************************
    // * 日付
    // **************************************************

    /**
     * 日付入力欄を追加する。
     * @returns {void}
     */
    #addDate() {
      this._date = ElmUtils.createElm("input", "history-date");
      this._date.type = "datetime-local";
      this.footer.appendChild(this._date);

      this._date.addEventListener("change", () => {
        this.dispatchEvent(
          EventUtils.createEvent(EventConst.CHANGE_FORM_ITEM_EVENT_NAME)
        );
      });
    }

    // **************************************************
    // * 削除ボタン
    // **************************************************

    /**
     * 削除ボタンを追加する。
     * @returns {void}
     */
    #addDeleteButton() {
      const deleteHistoryBtn = ElmUtils.createElm(
        "svg-btn",
        "delete-history-item"
      );
      deleteHistoryBtn.iconPaths = SvgConst.trashPaths;
      deleteHistoryBtn.size = "1rem";
      deleteHistoryBtn.hover = true;
      deleteHistoryBtn.color = "red";
      deleteHistoryBtn.tooltip = "削除";

      this.footer.appendChild(deleteHistoryBtn);

      deleteHistoryBtn.addEventListener("click", () => {
        this.remove();
        this.dispatchEvent(
          EventUtils.createEvent(EventConst.CHANGE_FORM_ITEM_EVENT_NAME)
        );
      });
    }

    // **************************************************
    // * TODOフラグボタン
    // **************************************************
    #addToDoButton() {
      const todoBtn = ElmUtils.createElm("svg-btn", "todo-item");
      todoBtn.iconPaths = SvgConst.FlagPath;
      todoBtn.size = "1rem";
      todoBtn.toggle = true;
      todoBtn.color = "green";
      todoBtn.tooltip = "TODO";

      this.footer.appendChild(todoBtn);
      this._todoBtn = todoBtn;

      todoBtn.addEventListener("click", () => {
        this.root.classList.toggle("todo-flag", todoBtn.toggle);
        this.dispatchEvent(
          EventUtils.createEvent(EventConst.CHANGE_FORM_ITEM_EVENT_NAME)
        );
      });
    }
  }
  customElements.define("contents-history-item", ContentsHistoryItem);
}
