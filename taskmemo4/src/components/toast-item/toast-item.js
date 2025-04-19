import { ElmUtils } from "../../utils/elm-utils";

import styles from "./style/toast-item.css";

/**
 * TopPage コンポーネント
 * @class TopPage
 * @extends {HTMLElement}
 */
export function ToastItem() {
  class ToastItem extends HTMLElement {
    /**
     * コンストラクタ
     * @constructor
     * @returns {void}
     * @description
     * Shadow DOM をオープンモードでアタッチし、CSSを適用し、要素を作成します。
     */
    constructor() {
      super();

      // Shadow DOMをオープンモードでアタッチ
      this.attachShadow({ mode: "open" });
      this.shadowRoot.innerHTML = "";

      // CSSを適用
      this.shadowRoot.adoptedStyleSheets = ElmUtils.createStylesheet(styles);

      // 要素作成
      this.root = ElmUtils.createElm("div", "root");
      this.msg = ElmUtils.createElm("div", "msg");

      this.root.appendChild(this.msg);

      this.shadowRoot.appendChild(this.root);
    }

    /**
     * トーストを表示する
     * @param {string} messageText - 表示するメッセージ
     */
    show(messageText) {
      this.msg.innerText = messageText;

      // クラスを付与してアニメーションを開始
      requestAnimationFrame(() => {
        this.root.classList.add("show");
      });

      // 一定時間後にクラスを削除して非表示にする
      setTimeout(() => {
        this.root.classList.remove("show");
        setTimeout(() => {
          this.remove();
        }, 300); // CSSのtransition時間と一致させる
      }, 2000); // 表示時間
    }
  }
  customElements.define("toast-item", ToastItem);
}
