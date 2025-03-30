import { ElmUtils } from "../../utils/elm-utils";
import { SvgUtils } from "../../utils/svg-utils";
import { SvgConst } from "../../constants/svg-const";
import { IdUtils } from "../../utils/id-utils";
import { EventUtils } from "../../utils/event-utils";
import { EventConst } from "../../constants/event-const";

import styles from "./style/group-title.css";

/**
 * GroupTitle コンポーネント
 * @class GroupTitle
 * @extends {HTMLElement}
 */
export function GroupTitle() {
  class GroupTitle extends HTMLElement {
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
      this.root = ElmUtils.createElm("div", "root", ["group-title"]);

      this.shadowRoot.appendChild(this.root);
    }

    /**
     * グループの名前セッター
     * @param {string} value - 新しい名前
     */
    set name(value) {
      this._name = value;

      this.#refreshView();
      this.dispatchEvent(
        EventUtils.createEvent(EventConst.CHANGE_TREEVIEW_EVENT_NAME)
      );
    }

    /**
     * グループの名前ゲッター
     * @returns {string} - グループの名前
     */
    get name() {
      return this._name;
    }

    /**
     * グループの開閉状態を設定します。
     * @param {boolean} value - グループを開く場合はtrue、閉じる場合はfalse
     */
    set open(value) {
      this.root.classList.toggle("group-opened", value);
    }

    /**
     * 種類
     * @returns {string} - 種類
     */
    get type() {
      return "group";
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
     * グループを初期化するメソッド
     * @param {Object} data - グループデータのオブジェクト
     * @param {string} data.id - グループのID
     * @param {string} data.name - グループの名前
     * @return {void} - なし
     */
    init(data) {
      const id = IdUtils.getUniqueId();
      this.id = data.id || `g${id}`;
      this.name = data.name || "新規グループ";

      this.#refreshView();

      /**
       * クリックイベントを通知
       */
      this.root.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.shadowRoot.dispatchEvent(
          EventUtils.createEvent(EventConst.CLICK_GROUP_EVENT_NAME, {
            id: this.id,
            name: this.name,
          })
        );
      });

      /**
       * ダブルクリックイベントを追加
       */
      this.root.addEventListener("dblclick", () => {
        this.shadowRoot.dispatchEvent(
          EventUtils.createEvent(EventConst.DBL_CLICK_GROUP_EVENT_NAME, {
            id: this.id,
            name: this.name,
          })
        );
      });
    }

    /**
     * 現在のオブジェクトのデータを収集し、データアイテムとして返します。
     * @returns {Object} dataItem - データアイテムオブジェクト
     * @returns {string|null} dataItem.id - グループのID（存在しない場合はnull）
     * @returns {string} dataItem.name - グループの名前（デフォルトは "新規グループ"）
     */
    getData() {
      const dataItem = {};
      dataItem.id = this.id || null;
      dataItem.name = this.name || "新規グループ";
      dataItem.type = this.type;

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
     * グループの表示状態を更新するメソッド
     * @private
     * @return {void} - なし
     */
    #refreshView() {
      // 初期化
      this.root.innerHTML = "";

      // アイコン設定
      const icon = SvgUtils.createIcon(SvgConst.chevronRightPaths);
      this.root.appendChild(icon);

      // タイトル設定
      const text = ElmUtils.createElm("span", null, ["group-text"]);
      text.innerText = this.name;
      this.root.appendChild(text);

      this.root.title = this.name;
    }
  }
  customElements.define("group-title", GroupTitle);
}
