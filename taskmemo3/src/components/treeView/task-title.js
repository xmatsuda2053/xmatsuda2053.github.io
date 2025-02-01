import { ElmUtils } from "../../utils/elm-utils";
import { SvgUtils } from "../../utils/svg-utils";
import { IdUtils } from "../../utils/id-utils";
import { EventUtils } from "../../utils/event-utils";

import styles from "./style/task-title.css";

/**
 * TaskTitle コンポーネント
 * @class TaskTitle
 * @extends {HTMLElement}
 */
export function TaskTitle() {
  class TaskTitle extends HTMLElement {
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
      this.root = ElmUtils.createElm("div", "root", ["task-title"]);

      this.shadowRoot.appendChild(this.root);
    }

    /**
     * タスクの名前ゲッター
     * @returns {string} - タスクの名前
     */
    get name() {
      return this._name;
    }

    /**
     * タスクの名前セッター
     * @param {string} value - 新しい名前
     */
    set name(value) {
      this._name = value;
    }

    /**
     * タスクの期限日ゲッター
     * @returns {string} - 期限日
     */
    get duedate() {
      return this._duedate;
    }

    /**
     * タスクの期限日セッター
     * @param {string} value - 新しい期限日
     */
    set duedate(value) {
      this._duedate = value;
    }

    /**
     * タスクの優先度ゲッター
     * @returns {string} - 優先度
     */
    get priority() {
      return this._priority;
    }

    /**
     * タスクの優先度セッター
     * @param {string} value - 新しい優先度
     */
    set priority(value) {
      this._priority = value;
    }

    /**
     * タスクの状態ゲッター
     * @returns {string} - 状態
     */
    get status() {
      return this._status;
    }

    /**
     * タスクの状態セッター
     * @param {string} value - 新しい状態
     */
    set status(value) {
      this._status = value;
    }

    /**
     * タスクの種類
     * @returns {string} - 種類
     */
    get type() {
      return "task";
    }

    /**
     * タスクを初期化するメソッド
     * @param {Object} data - タスクデータのオブジェクト
     * @param {string} data.id - タスクのID
     * @param {string} data.name - タスクの名前
     * @param {string} data.duedate - タスクの期限日
     * @param {string} data.priority - タスクの優先度
     * @param {string} data.status - タスクの状態
     * @return {void} - なし
     */
    init(data) {
      this.id = data.id || IdUtils.getUniqueId();
      this.name = data.name || "新規タスク";
      this.duedate = data.duedate || "";
      this.priority = data.priority || "";
      this.status = data.status || "0";

      this.classList.add("tree-item");

      this.#refreshView();

      /**
       * クリックイベントを通知
       */
      this.root.addEventListener("click", () => {
        this.shadowRoot.dispatchEvent(
          EventUtils.createEvent("clickTaskItem", {
            id: this.id,
          })
        );
      });
    }

    /**
     * コンテキストメニューを設定する
     * @param {HTMLElement} menu コンテキストメニュー
     */
    setContextMenu(menu) {
      this.shadowRoot.addEventListener("contextmenu", (e) => {
        e.preventDefault();
        e.stopPropagation();

        this.shadowRoot.appendChild(menu);

        menu.isTask = true;
        menu.openMenu({
          target: this,
          pageX: e.pageX,
          pageY: e.pageY,
        });

        this.root.classList.add("menu-opened");

        this.shadowRoot.addEventListener("closeMenu", () => {
          this.root.classList.remove("menu-opened");
          menu.remove();
          menu.isTask = false;
        });
      });
    }

    /**
     * タスクの表示内容を更新するメソッド
     * @private
     * @return {void} - なし
     */
    #refreshView() {
      this.root.innerHTML = "";
      const isComplete = this.status === "100";

      // アイコン設定
      this.root.classList.toggle("complete", isComplete);
      const icon = SvgUtils.createIcon(
        isComplete ? SvgUtils.squareCheckPaths : SvgUtils.squarePaths
      );
      this.root.appendChild(icon);

      // タスク名設定
      const text = ElmUtils.createElm("p", null, ["task-text"]);
      text.innerText = this.name;
      this.root.appendChild(text);
    }
  }
  customElements.define("task-title", TaskTitle);
}
