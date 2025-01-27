import { ElmUtils } from "../../utils/elm-utils";
import { SvgUtils } from "../../utils/svg-utils";
import { EventUtils } from "../../utils/event-utils";

import styles from "./style/context-menu.css";

/**
 * ContextMenu コンポーネント
 * @class ContextMenu
 * @extends {HTMLElement}
 */
export function ContextMenu() {
  class ContextMenu extends HTMLElement {
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

      // 空のコンテンツを作成
      this.menu = ElmUtils.createElm("div", "context-menu");
      this.area = this.#createArea();
      this.area.appendChild(this.menu);

      // ボタンを追加
      this.#insertAddTaskButton();
      this.#insertAddGroupButton();
      this.#addBorder();
      this.#insertDelItemButton();

      this.shadowRoot.appendChild(this.area);
      this.isTask = false;
    }

    /**
     * メニューを開くメソッド
     * @param {Event} e - クリックイベント
     * @return {void} - なし
     */
    openMenu(e) {
      this.area.classList.add("open");
      this.menu.style.left = `${e.pageX + 10}px`;
      this.menu.style.top = `${e.pageY - 20}px`;
      this.target = e.target;
    }

    /**
     * isTask ゲッターメソッド
     *
     * このメソッドは、タスクの状態を返します。
     *
     * @returns {boolean} タスクの状態（true または false）
     */
    get isTask() {
      return this._isTask;
    }

    /**
     * isTask セッターメソッド
     *
     * このメソッドは、タスクの状態を設定します。
     *
     * @param {boolean} flag - タスクの状態を示すフラグ（true または false ）
     */
    set isTask(flag) {
      this._isTask = flag;

      const taskButton = this.shadowRoot.getElementById("add-new-task");
      const groupButton = this.shadowRoot.getElementById("add-new-group");

      taskButton?.classList.toggle("disabled", this._isTask);
      groupButton?.classList.toggle("disabled", this._isTask);
    }

    /**
     * メニュー開閉を制御するためのエリアを作成
     * @returns {HTMLElement} - 作成されたエリア
     */
    #createArea() {
      const area = ElmUtils.createElm("div", "context-area");
      area.addEventListener("click", () => {
        area.classList.remove("open");
        this.shadowRoot.dispatchEvent(EventUtils.createEvent("closeMenu"));
      });

      return area;
    }

    /**
     * メニューに「タスクを新規追加するボタン」を挿入する
     * @return {void} - なし
     */
    #insertAddTaskButton() {
      const id = "add-new-task";
      const title = "新しいタスク";

      const btn = this.#createButton(id, title, SvgUtils.squarePlusPaths);

      /**
       * クリックイベント
       */
      btn.addEventListener("click", () => {
        if (this.isTask) return;
        this.shadowRoot.dispatchEvent(
          EventUtils.createEvent("clickAddNewTask", {
            target: this.target,
          })
        );
      });

      this.menu.appendChild(btn);
    }

    /**
     * メニューに「グループを追加するボタン」を挿入する
     * @return {void} - なし
     */
    #insertAddGroupButton() {
      const id = "add-new-group";
      const title = "新しいグループ";

      const btn = this.#createButton(id, title, SvgUtils.folderPlusPaths);

      /**
       * クリックイベント
       */
      btn.addEventListener("click", () => {
        if (this.isTask) return;
        this.shadowRoot.dispatchEvent(
          EventUtils.createEvent("clickAddNewGroup", {
            target: this.target,
          })
        );
      });

      this.menu.appendChild(btn);
    }

    /**
     * メニューに「削除ボタン」を挿入する
     * @return {void} - なし
     */
    #insertDelItemButton() {
      const id = "del-item";
      const title = "削除";

      const btn = this.#createButton(id, title, SvgUtils.trashPaths);

      /**
       * クリックイベント
       */
      btn.addEventListener("click", () => {
        this.shadowRoot.dispatchEvent(
          EventUtils.createEvent("clickDeleteItem", {
            target: this.target,
          })
        );
      });

      this.menu.appendChild(btn);
    }

    /**
     * ボタンを作成するメソッド
     * @param {string} id - ボタンのID
     * @param {string} title - ボタンのタイトル
     * @param {object} iconData - アイコン設定情報
     * @return {HTMLElement} - 作成したボタン
     */
    #createButton(id, title, iconData) {
      const icon = SvgUtils.createIcon(iconData);

      const text = ElmUtils.createElm("p");
      text.classList.add("button-text");
      text.innerText = title;

      const btnArea = ElmUtils.createElm("div", id, ["button-area"]);
      btnArea.appendChild(icon);
      btnArea.appendChild(text);

      return btnArea;
    }

    /**
     * 罫線を引く
     */
    #addBorder() {
      this.menu.appendChild(ElmUtils.createElm("hr"));
    }
  }
  customElements.define("context-menu", ContextMenu);
}
