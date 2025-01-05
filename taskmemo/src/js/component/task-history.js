import { Utils } from "../com/utils";
import styles from "../../style/css/task-history.css";

/**
 * タスク履歴コンポーネント
 * @module ./assets/src/component/task-history
 */
export function TaskHistory() {
  /**
   * タスク履歴
   * @memberof TaskHistory
   * @extends HTMLElement
   * @class TaskHistory
   */
  class TaskHistory extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
      this.shadowRoot.adoptedStyleSheets = Utils.createStyle(styles);
      this.#addSvgIcon();
      this.#addFloatButton();

      this.#addHistoryChangeHandler();
    }

    /**
     * ファイルマネージャーを設定
     * @param {*} fileManager
     * @returns void
     * @public
     * @memberof TreeView
     */
    setFileManager(fileManager) {
      this.fileManager = fileManager;
    }

    getHistoryData() {
      const historyItems =
        this.shadowRoot.querySelectorAll("task-history-item");

      const historyData = [];
      for (let item of historyItems) {
        historyData.push(item.getFormInputData());
      }

      return historyData;
    }

    /**
     * 履歴情報の更新を検知
     * @returns void
     * @public
     * @memberof TreeView
     * */
    #addHistoryChangeHandler() {
      const root = this.shadowRoot;
      const callback = () => {
        // カスタムイベントで変更を外部に伝播
        const event = new CustomEvent("formChangeEvent", {
          detail: { message: "History Change." },
          bubbles: true,
          composed: true,
        });
        this.dispatchEvent(event);
      };

      const observer = new MutationObserver(callback);
      const config = {
        attributes: true,
        childList: true,
        subtree: true,
        characterData: true,
      };
      observer.observe(root, config);
    }

    /**
     * SVGアイコン追加
     * @private
     * @returns {void}
     * @memberof TaskHistory
     */
    #addSvgIcon() {
      const svg = Utils.svg({
        name: "plus",
        paths: [{ path: "M12 5l0 14" }, { path: "M5 12l14 0" }],
      });
      this.shadowRoot.appendChild(svg);
    }

    /**
     * 履歴アイテム作成ボタンを追加
     * @private
     * @returns {void}
     * @memberof TaskHistory
     */
    #addFloatButton() {
      const btn = Utils.svgBtn("plus");
      btn.classList.add("float-button");

      btn.addEventListener("click", () => {
        const item = document.createElement("task-history-item");
        this.shadowRoot.appendChild(item);
      });

      this.shadowRoot.appendChild(btn);
    }

    /**
     * 履歴データを読み込み、画面に表示
     * @param {string} id
     * @returns {void}
     * @memberof TaskHistory
     * @public
     * @async
     */
    async readTaskHistoryData(id) {
      await this.fileManager.readFile(`${id}.json`).then((data) => {
        if (data === null) {
          return;
        }

        const historyData = JSON.parse(data).historyData;
        for (let history of historyData) {
          const item = document.createElement("task-history-item");
          item.setTaskHistoryItemData(history);
          this.shadowRoot.appendChild(item);
        }
      });
    }
  }
  customElements.define("task-history", TaskHistory);
}
