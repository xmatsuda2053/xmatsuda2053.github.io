import { ElmUtils } from "../../utils/elm-utils";
import { SvgUtils } from "../../utils/svg-utils";
import { SvgConst } from "../../constants/svg-const";
import { IdUtils } from "../../utils/id-utils";
import { EventUtils } from "../../utils/event-utils";
import { EventConst } from "../../constants/event-const";
import { DateUtils } from "../../utils/date-utils";
import { PriorityConst } from "../../constants/priority-const";

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
     * TODOフラグの状態ゲッター
     * @returns {string} - TODOフラグ
     */
    get hasTodo() {
      return this._hasTodo;
    }

    /**
     * TODOフラグの状態セッター
     * @param {string} value - 新しいTODOフラグ
     */
    set hasTodo(value) {
      this._hasTodo = value;
    }

    /**
     * 種類
     * @returns {string} - 種類
     */
    get type() {
      return "task";
    }

    /**
     * アイコンパス
     * @returns {string} - アイコンパス
     */
    get paths() {
      return this._paths;
    }

    /**
     * フラグ
     * @returns {Object} - フラグ
     */
    get flag() {
      return this._flag;
    }

    /**
     * メニューを開いている状態
     * @param {bool} value - 状態
     */
    set menuOpen(value) {
      this.root.classList.toggle("menu-opened", value);
    }

    /**
     * 選択状態の切り替え
     * @param {bool} value - 状態
     */
    set selected(value) {
      this.root.classList.toggle("selected", value);
    }

    /**
     * タスクを初期化するメソッド
     * @param {Object} data - タスクデータのオブジェクト
     * @param {string} data.id - タスクのID
     * @param {string} data.name - タスクの名前
     * @param {string} data.duedate - タスクの期限日
     * @param {string} data.priority - タスクの優先度
     * @param {string} data.status - タスクの状態
     * @param {bool} data.hasTodo - タスクのTODO有無
     * @return {void} - なし
     */
    init(data) {
      this.id = data.id || IdUtils.getUniqueId();
      this.name = data.name || "新規タスク";
      this.duedate = data.duedate || "";
      this.priority = data.priority || "";
      this.status = data.status || "0";
      this.hasTodo = data.hasTodo || false;

      this.#refreshView();

      /**
       * クリックイベントを通知
       */
      this.root.addEventListener("click", () => {
        this.shadowRoot.dispatchEvent(
          EventUtils.createEvent(EventConst.CLICK_TASK_EVENT_NAME, {
            id: this.id,
          })
        );
      });
    }

    /**
     * 現在のオブジェクトのデータを収集し、データアイテムとして返します。
     * @returns {Object} dataItem - データアイテムオブジェクト
     * @returns {string} dataItem.id - タスクのID
     * @returns {string} dataItem.name - タスクの名前（デフォルトは "新規タスク"）
     * @returns {string} dataItem.type - タスクのタイプ
     * @returns {string} dataItem.duedate - タスクの期限日
     * @returns {string} dataItem.priority - タスクの優先度
     * @returns {number} dataItem.status - タスクのステータス（デフォルトは 0）
     * @returns {bool} dataItem.hasTodo - タスクのTODO有無（デフォルトは false）
     */
    getData() {
      const dataItem = {};
      dataItem.id = this.id;
      dataItem.name = this.name || "新規タスク";
      dataItem.type = this.type;
      dataItem.duedate = this.duedate || "";
      dataItem.priority = this.priority || "";
      dataItem.status = this.status || 0;
      dataItem.hasTodo = this.hasTodo || false;

      return dataItem;
    }

    /**
     * タスクの表示内容を更新するメソッド
     * @return {void} - なし
     */
    refreshView() {
      this.#refreshView();
      this.dispatchEvent(
        EventUtils.createEvent(EventConst.CHANGE_TREEVIEW_EVENT_NAME)
      );
    }

    /**
     * タスクの表示内容を更新するメソッド
     * @private
     * @return {void} - なし
     */
    #refreshView() {
      this.root.innerHTML = "";
      const isComplete = this.status === "100";
      const isNotStarted = this.status === "0";
      const isOverDeadline = DateUtils.calcDateDiffToday(this.duedate) < 3;
      const isNotDueDate = this.duedate === "3000-12-31";

      this._flag = {
        isComplete: isComplete,
        isNotStarted: isNotStarted,
        isOverDeadline: isOverDeadline,
      };

      // アイコン設定
      this.root.classList.toggle("complete", isComplete);
      this.root.classList.toggle("over-deadline", isOverDeadline);

      let paths;
      if (isComplete) {
        paths = SvgConst.squareCheckPaths; // 完了
      } else if (isOverDeadline) {
        paths = SvgConst.squareAlertPaths; // 注意
      } else if (isNotStarted) {
        paths = SvgConst.squarePaths; // 未着手
      } else {
        paths = SvgConst.squareDotPaths; // 進行中
      }

      if (isNotDueDate) {
        paths = SvgConst.SquareMPath; // メモ
      }

      this._paths = paths;
      this.root.appendChild(SvgUtils.createIcon(paths));

      // TO.DOフラグ設定
      if (this.hasTodo) {
        const icon = SvgUtils.createIcon(SvgConst.FlagPath);
        icon.classList.add("todo-flag");
        this.root.appendChild(icon);
      }

      // タスク名設定
      const text = ElmUtils.createElm("p", null, ["task-text"]);
      text.innerText = this.name;
      this.root.appendChild(text);

      // ツールチップ設定
      const tooltip = [];
      const dispDueDate = isNotDueDate ? "なし" : this.duedate;
      const dispPriority = PriorityConst.text(this.priority) || "?";

      tooltip.push(`${this.name}`);
      tooltip.push(`* 期限日：${dispDueDate}`);
      tooltip.push(`* 優先度：${dispPriority}`);
      tooltip.push(`* 進捗率：${this.status}%`);

      this.root.title = tooltip.join("\n");
    }
  }
  customElements.define("task-title", TaskTitle);
}
