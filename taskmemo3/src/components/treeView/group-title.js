import { ElmUtils } from "../../utils/elm-utils";
import { SvgUtils } from "../../utils/svg-utils";
import { IdUtils } from "../../utils/id-utils";
import { EventUtils } from "../../utils/event-utils";

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
     * グループの名前ゲッター
     * @returns {string} - グループの名前
     */
    get name() {
      return this._name;
    }

    /**
     * グループの名前セッター
     * @param {string} value - 新しい名前
     */
    set name(value) {
      this._name = value;
    }

    set open(value) {
      this.root.classList.toggle("group-opened", value);
    }

    /**
     * グループを初期化するメソッド
     * @param {Object} data - グループデータのオブジェクト
     * @param {string} data.id - グループのID
     * @param {string} data.name - グループの名前
     * @return {void} - なし
     */
    init(data) {
      this.id = data.id || IdUtils.getUniqueId();
      this.name = data.name || "新規グループ";
      this.classList.add("tree-item");

      this.#refreshView();
      this.#addClickEvent();
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
        menu.openMenu({
          target: this,
          pageX: e.pageX,
          pageY: e.pageY,
        });

        this.root.classList.add("menu-opened");

        this.shadowRoot.addEventListener("closeMenu", () => {
          this.root.classList.remove("menu-opened");
          menu.remove();
        });
      });
    }

    /**
     * グループの表示状態を更新するメソッド
     * @private
     * @return {void} - なし
     */
    #refreshView() {
      // アイコン設定
      const icon = SvgUtils.createIcon(SvgUtils.chevronRightPaths);
      this.root.appendChild(icon);

      // タイトル設定
      const text = ElmUtils.createElm("span", null, ["group-text"]);
      text.innerText = this.name;
      this.root.appendChild(text);
    }

    /**
     * クリックイベントを追加する。
     * @returns {void}
     */
    #addClickEvent() {
      this.root.addEventListener("click", () => {
        this.shadowRoot.dispatchEvent(
          EventUtils.createEvent("clickGroupItem", {
            id: this.id,
          })
        );
      });
    }
  }
  customElements.define("group-title", GroupTitle);
}
