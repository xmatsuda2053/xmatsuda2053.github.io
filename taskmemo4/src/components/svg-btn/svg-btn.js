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

      // フラグ初期化
      this.isToggle = false;

      // 空のボタンを作成
      this.button = ElmUtils.createElm("button");
      this.button.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (this.isToggle) {
          this.button.classList.toggle("toggle-on");
        }
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
     * ボタンを四角形にするかどうかを設定するプロパティ
     * @param {boolean} flg - 四角形にする場合は true、しない場合は false
     * @description 指定された値に応じて、ボタンに "square" クラスを追加または削除する。
     */
    set isSquare(flg) {
      if (flg) {
        this.button.classList.add("square");
      } else {
        this.button.classList.remove("square");
      }
    }

    /**
     * ボタンの高さを設定するセッター
     * @param {string} value - 設定する高さ
     */
    set height(value) {
      this.button.style = `height: ${value}`;
    }

    /**
     * ボタンのサイズを設定するセッター
     * @param {string} value - 設定するサイズ
     */
    set size(value) {
      this._svgUse.style = `font-size: ${value}`;
    }

    /**
     * ボタンのカラーを設定するセッター
     * @param {string} value - 設定するカラー
     */
    set color(value) {
      this.button.classList.remove("red", "green", "blue", "white", "black");
      this.button.classList.add(value);
    }

    /**
     * ボタンのホバーを設定するセッター
     * @param {bool} flag - ホバーを設定する場合は true、しない場合は false
     */
    set hover(flag) {
      this.button.classList.toggle("hover", flag);
    }

    /**
     * ボタンの静的状態を設定するセッター
     * @param {bool} flag - 静的状態にする場合は true、しない場合は false
     */
    set static(flag) {
      this.button.classList.toggle("static", flag);
    }

    /**
     * トグルボタンの設定を行うセッター
     * @param {bool} flag - トグルボタンにする場合は true、しない場合は false
     */
    set toggle(flag) {
      this.isToggle = flag;
      this.button.classList.toggle("toggle", flag);
    }

    /**
     * トグルボタンの状態を取得するゲッター
     * @returns {bool} トグルボタンがオンの場合は true、オフの場合は false
     */
    get toggle() {
      return this.button.classList.contains("toggle-on");
    }

    /**
     * トグルボタンをオンにするメソッド
     * @param {bool} flag - トグルをオンにする場合は true、しない場合は false
     * @returns {void}
     */
    toggleOn(flag) {
      this.button.classList.toggle("toggle-on", flag);
    }

    /**
     * ツールチップメッセージの設定を行うセッター
     * @param {string} text - ヒントメッセージ
     */
    set tooltip(text) {
      this.button.title = text;
    }
  }
  customElements.define("svg-btn", SvgBtn);
}
