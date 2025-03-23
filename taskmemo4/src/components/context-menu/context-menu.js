import { ElmUtils } from "../../utils/elm-utils";
import { SvgUtils } from "../../utils/svg-utils";
import { EventUtils } from "../../utils/event-utils";
import { EventConst } from "../../constants/event-const";

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
      this.area = ElmUtils.createElm("div", "context-area");
      this.area.addEventListener("click", () => {
        this.area.classList.remove("open");
        this.menu.classList.remove("show");

        const disabledItems = this.menu.querySelectorAll(".disabled");
        for (let item of disabledItems) {
          item.classList.remove("disabled");
        }

        this.shadowRoot.dispatchEvent(
          EventUtils.createEvent(EventConst.CLOSE_CONTEXT_MENU)
        );
      });

      this.menu = ElmUtils.createElm("div", "context-menu");

      this.area.appendChild(this.menu);
      this.shadowRoot.appendChild(this.area);
    }

    /**
     * コンテキストメニューを指定された位置に開きます。
     * @param {MouseEvent} e - コンテキストメニューを開く際のマウスイベント
     */
    openMenu(e) {
      this.area.classList.add("open");
      this.menu.style.left = `${e.pageX + 10}px`;
      this.menu.style.top = `${e.pageY - 20}px`;

      setTimeout(() => {
        this.menu.classList.add("show");
      }, 100);
    }

    /**
     * クリックターゲットを取得します。
     * @returns {Element} _clickTarget - 現在のクリックターゲット要素
     */
    get clickTarget() {
      return this._clickTarget;
    }

    /**
     * クリックターゲットを設定します。
     * @param {Element} value - 新しいクリックターゲット要素
     */
    set clickTarget(value) {
      this._clickTarget = value;
    }

    /**
     * ボタンを追加するメソッド
     * @param {string} id - ボタンのID
     * @param {string} title - ボタンのタイトル
     * @param {object} iconData - アイコン設定情報
     * @return {void}
     */
    addButton(id, title, iconData) {
      const icon = SvgUtils.createIcon(iconData);

      const text = ElmUtils.createElm("p");
      text.classList.add("button-text");
      text.innerText = title;

      const btn = ElmUtils.createElm("div", id, ["button-area"]);
      btn.appendChild(icon);
      btn.appendChild(text);

      /**
       * クリックイベント
       */
      btn.addEventListener("click", () => {
        if (btn.classList.contains("disabled")) {
          return;
        }
        this.shadowRoot.dispatchEvent(EventUtils.createEvent(`click-${id}`));
      });

      this.menu.appendChild(btn);
    }

    /**
     * 指定されたIDを持つボタン要素を無効化します。
     * @param {string} id - 無効化するボタン要素のID
     */
    setDisabled(id) {
      const btn = this.shadowRoot.getElementById(id);
      btn.classList.add("disabled");
    }

    /**
     * 罫線を引く
     */
    addBorder() {
      this.menu.appendChild(ElmUtils.createElm("hr"));
    }
  }
  customElements.define("context-menu", ContextMenu);
}
