import { ElmUtils } from "../../utils/elm-utils";
import { EventUtils } from "../../utils/event-utils";
import { SvgUtils } from "../../utils/svg-utils";

import styles from "./style/svg-btn.css";

/**
 * SvgBtn コンポーネント
 * @class SvgBtn
 * @extends {HTMLElement}
 */
export function SvgBtn() {
  class SvgBtn extends HTMLElement {
    /**
     * コンストラクタ
     * @constructor
     * @returns {void}
     * @description
     * SvgBtn コンポーネントのインスタンスを初期化するコンストラクタ。
     * Shadow DOM をオープンモードでアタッチし、CSSを適用し、ボタン要素を作成します。
     */
    constructor() {
      super();

      // Shadow DOMをオープンモードでアタッチ
      this.attachShadow({ mode: "open" });
      this.shadowRoot.innerHTML = "";

      // CSSを適用
      this.shadowRoot.adoptedStyleSheets = ElmUtils.createStylesheet(styles);

      // 空のボタンを作成
      this.button = document.createElement("button");
      this.button.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.shadowRoot.dispatchEvent(EventUtils.createEvent("click"));
      });
      this.shadowRoot.appendChild(this.button);
    }

    /**
     * アイコンを設定するセッター
     * @param {HTMLElement} paths - 設定するアイコン要素
     * @returns {void}
     */
    set iconPaths(paths) {
      this._svgIcon = SvgUtils.createSvg(paths);
      this._svgUse = SvgUtils.createSvgUse(this._svgIcon);
      this.button.appendChild(this._svgIcon);
      this.button.appendChild(this._svgUse);
    }

    /**
     * ボタンを円形にするかどうかを設定するプロパティ
     * @param {boolean} flg - 円形にする場合は true、しない場合は false
     * @description 指定された値に応じて、ボタンに "circle" クラスを追加または削除する。
     */
    set isCircle(flg) {
      if (flg) {
        this.button.classList.add("circle");
      } else {
        this.button.classList.remove("circle");
      }
    }

    /**
     * ボタンのサイズを設定するセッター
     * @param {string} value - 設定するサイズ
     */
    set size(value) {
      this._svgUse.style = `font-size: ${value}`;
    }

    /**
     * ボタンのホバーカラーを設定するセッター
     * @param {string} color - 設定するカラー
     */
    set hover(color) {
      this.button.classList.add("hover", color);
    }
  }
  customElements.define("svg-btn", SvgBtn);
}
