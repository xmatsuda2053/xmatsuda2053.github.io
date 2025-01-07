import { Utils } from "../com/utils";
import styles from "../../style/css/task-history-item.css";

/**
 * タスク履歴コンポーネント
 * @module ./assets/src/component/task-history-item
 */
export function TaskHistoryItem() {
  /**
   * タスク履歴
   * @memberof TaskHistoryItem
   * @extends HTMLElement
   * @class TaskHistoryItem
   */
  class TaskHistoryItem extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
      this.shadowRoot.adoptedStyleSheets = Utils.createStyle(styles);
      this.#addSvgIcon();
      this.#addTaskHistoryItem();
    }

    /**
     *
     * @param {*} historyData
     */
    setTaskHistoryItemData(historyData) {
      const form = this.shadowRoot.getElementById("history-form");

      const $ = (name) => {
        return form.elements[name];
      };

      if (historyData.date && historyData.date.length === 10) {
        historyData.date = `${historyData.date}T09:00`;
      }

      $("historyDate").value = historyData.date || this.#getTodayTime();
      $("historyText").value = historyData.text || "";

      this.#adjustTextAreaRows($("historyText"));
    }

    /**
     * フォーム入力内容を取得する。
     */
    getFormInputData() {
      const form = this.shadowRoot.getElementById("history-form");

      const $ = (name) => {
        return form.elements[name];
      };

      const historyData = {
        date: $("historyDate").value,
        text: $("historyText").value,
      };

      return historyData;
    }

    /**
     * SVGアイコン追加
     * @private
     * @returns {void}
     * @memberof TaskHistory
     */
    #addSvgIcon() {
      const svg = Utils.svg({
        name: "trash",
        paths: [
          { path: "M4 7l16 0" },
          { path: "M10 11l0 6" },
          { path: "M14 11l0 6" },
          { path: "M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" },
          { path: "M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" },
        ],
      });
      this.shadowRoot.appendChild(svg);
    }

    #addTaskHistoryItem() {
      const form = document.createElement("form");
      form.id = "history-form";

      const memo = this.#createMemo();
      const date = this.#createDate();
      const trashButton = this.#createTrashButton();

      const item = document.createElement("fieldset");
      item.appendChild(memo);
      item.appendChild(date);
      item.appendChild(trashButton);

      form.appendChild(item);

      form.addEventListener("change", async (e) => {
        e.preventDefault();

        // カスタムイベントで変更を外部に伝播
        const event = new CustomEvent("formChangeEvent", {
          detail: { message: "Task Change." },
          bubbles: true,
          composed: true,
        });
        this.dispatchEvent(event);
      });

      this.shadowRoot.appendChild(form);
    }

    #createMemo() {
      const textarea = document.createElement("textarea");
      textarea.rows = 3;
      textarea.dataset.rows = 3;
      textarea.placeholder = "作業履歴を入力";
      textarea.spellcheck = false;
      textarea.id = "historyText";
      textarea.name = "historyText";

      textarea.addEventListener("keyup", (e) => {
        e.preventDefault();
        this.#adjustTextAreaRows(textarea);
      });

      return textarea;
    }

    #adjustTextAreaRows(target) {
      const rows = target.dataset.rows;
      target.rows = Math.max(target.value.split("\n").length + 1, rows);
    }

    #createDate() {
      const input = document.createElement("input");
      input.type = "datetime-local";
      input.id = "historyDate";
      input.name = "historyDate";
      input.value = this.#getTodayTime();

      const div = document.createElement("div");
      div.classList.add("date");
      div.appendChild(input);

      return div;
    }

    #getTodayTime() {
      const date = new Date();
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");
      return `${year}-${month}-${day}T${hours}:${minutes}`;
    }

    #createTrashButton() {
      const btn = Utils.svgBtn("trash");
      btn.classList.add("trash-button");

      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const result = confirm("履歴を削除しますか");
        if (result) {
          this.remove();
        }
      });

      return btn;
    }
  }
  customElements.define("task-history-item", TaskHistoryItem);
}
