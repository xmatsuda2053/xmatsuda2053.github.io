import { ElmUtils } from "../../utils/elm-utils";
import { SvgUtils } from "../../utils/svg-utils";
import { IdUtils } from "../../utils/id-utils";
import { EventUtils } from "../../utils/event-utils";

import styles from "./style/group-item.css";

/**
 * GroupItem コンポーネント
 * @class GroupItem
 * @extends {HTMLElement}
 */
export function GroupItem() {
  class GroupItem extends HTMLElement {
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
      this.summary = ElmUtils.createElm("summary");
      this.items = ElmUtils.createElm("div", "group-items");
      this.root = ElmUtils.createElm("details");
      this.root.appendChild(this.summary);
      this.root.appendChild(this.items);

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

    /**
     * グループの子要素ゲッター
     * @returns {NodeList|Array} グループの子要素リスト
     */
    get childNodes() {
      return this.items.childNodes || [];
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
      this.setAttribute("draggable", true);

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

        this.summary.classList.add("menu-opened");

        this.shadowRoot.addEventListener("closeMenu", () => {
          this.summary.classList.remove("menu-opened");
          menu.remove();
        });
      });
    }

    /**
     * アイテムを追加する
     * @param {HTMLElement} item
     */
    appendChild(item) {
      this.items.appendChild(item);
      this.open = true;
    }

    /**
     * ルート要素の open プロパティを設定します。
     * @param {boolean} value - ルート要素を開く (true) か閉じる (false) かを示すフラグ
     */
    set open(value) {
      this.root.open = value;
    }

    /**
     * グループの表示状態を更新するメソッド
     * @private
     * @return {void} - なし
     */
    #refreshView() {
      // アイコン設定
      const icon = SvgUtils.createIcon(SvgUtils.chevronRightPaths);
      this.summary.appendChild(icon);

      // タイトル設定
      const text = ElmUtils.createElm("span", null, ["group-text"]);
      text.innerText = this.name;
      this.summary.appendChild(text);
    }

    /**
     * クリックイベントを追加する。
     * @returns {void}
     */
    #addClickEvent() {
      this.summary.addEventListener("click", () => {
        this.shadowRoot.dispatchEvent(
          EventUtils.createEvent("clickGroupItem", {
            id: this.id,
          })
        );
      });
    }
  }
  customElements.define("group-item", GroupItem);
}
