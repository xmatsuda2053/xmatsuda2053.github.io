/**
 * 共通関数
 */
import { Utils } from "../common/utils";
import { SvgIcon } from "../common/svgIcon";

/**
 * PartsHistoryItemコンポーネント用のCSS
 */
import style from "../../style/css/parts-history-item.css";

/**
 * デフォルト行数
 */
const DEFAULT_ROWS = 3;

/**
 * PartsHistoryItem コンポーネントを作成しカスタム要素として定義する
 */
export function PartsHistoryItem() {
  /**
   * PartsHistoryItemコンポーネント用のCSS コンポーネントのカスタム要素のクラス
   * @extends {HTMLElement}
   */
  class PartsHistoryItem extends HTMLElement {
    /**
     * コンストラクタ
     * @return {void}
     */
    constructor() {
      super();

      this.attachShadow({ mode: "open" });
      this.shadowRoot.adoptedStyleSheets =
        Utils.createStyleSheetWithFilename(style);

      const container = document.createElement("div");
      const text = this.#createTextarea();
      const footerRightBox = this.#createFooterRightBox();
      const dateInput = this.#createDateTime();
      const moveBtn = this.#createMoveItemButton();
      const trashBtn = this.#createTrashButton();

      footerRightBox.appendChild(dateInput);

      container.id = "container";
      container.appendChild(text);
      container.appendChild(footerRightBox);
      container.appendChild(moveBtn);
      container.appendChild(trashBtn);

      this.shadowRoot.innerHTML = "";
      this.shadowRoot.appendChild(container);

      // 変更イベントを伝播
      container.addEventListener("change", () => {
        this.dispatchEvent(Utils.getCustomEvent("changeHistoryItem"));
      });
    }

    /**
     * 要素がDOMに追加された後の処理
     */
    connectedCallback() {
      const textarea = this.shadowRoot.getElementById("textarea");

      // 入力値有の場合は、入力内容に合わせて高さを設定する。
      // ドラッグ操作による並べ替えを想定
      let rows = DEFAULT_ROWS;
      if (textarea.value !== "") {
        rows = 0;
      }

      textarea.style.height = Utils.adjustTextareaHeight(
        textarea,
        DEFAULT_ROWS,
        rows
      );
    }

    /**
     * テキストエリアがアクティブかを確認する
     * @returns {boolean} テキストエリアがフォーカスされている場合はtrue、そうでない場合はfalse
     */
    isTextareaActive() {
      const textarea = this.shadowRoot.getElementById("textarea");
      return this.shadowRoot.activeElement === textarea;
    }

    //--------------------------------------------
    // 履歴入力
    //--------------------------------------------
    /**
     * Textareaを作成する
     * @returns {HTMLElement}
     */
    #createTextarea() {
      const textarea = document.createElement("textarea");
      textarea.id = "textarea";
      textarea.spellcheck = false;
      textarea.placeholder = "作業履歴を入力";

      /**
       * 入力内容に連動して高さを変更する
       */
      textarea.addEventListener("input", (e) => {
        e.preventDefault();
        e.stopPropagation();
        textarea.style.height = Utils.adjustTextareaHeight(
          textarea,
          DEFAULT_ROWS
        );
      });

      return textarea;
    }

    /**
     * 履歴内容を取得する
     * @return {string} value
     */
    get text() {
      return this.shadowRoot.getElementById("textarea").value;
    }

    /**
     * 履歴内容を設定する
     * @param {string} value
     */
    set text(value) {
      const textarea = this.shadowRoot.getElementById("textarea");
      textarea.value = value;
      textarea.style.height = Utils.adjustTextareaHeight(
        textarea,
        DEFAULT_ROWS
      );
    }

    //--------------------------------------------
    // フッターボタン群
    //--------------------------------------------
    /**
     * フッターに配置する操作用ボタンのセット
     * @returns {HTMLElement}
     */
    #createFooterRightBox() {
      const div = document.createElement("div");
      div.classList.add("footer-right-box");
      return div;
    }

    //--------------------------------------------
    // 日付入力
    //--------------------------------------------
    /**
     * DataTimeInputを作成する
     * @returns {HTMLElement}
     */
    #createDateTime() {
      const input = document.createElement("input");

      input.id = "datetime";
      input.type = "datetime-local";
      input.value = Utils.formatDate(new Date(), "{yyyy}-{MM}-{dd}T{HH}:{mm}");

      return input;
    }

    /**
     * 日付を取得する
     * @return {string} value
     */
    get date() {
      return this.shadowRoot.getElementById("datetime").value;
    }

    /**
     * 日付を設定する
     * @param {string} value
     */
    set date(value) {
      this.shadowRoot.getElementById("datetime").value = value;
    }

    //--------------------------------------------
    // Drag操作
    //--------------------------------------------

    /**
     * 履歴移動用のボタンを作成する
     *
     * @returns {HTMLButtonElement} 生成された履歴移動用のボタン
     */
    #createMoveItemButton() {
      const icon = Utils.createSvg(
        "grip-vertical",
        SvgIcon.gripVerticalPaths()
      );
      const btn = Utils.createSvgButton("grip-vertical", icon);
      btn.id = "move-item";

      return btn;
    }

    //--------------------------------------------
    // 履歴削除
    //--------------------------------------------

    /**
     * 履歴削除用のボタンを作成する
     *
     * @returns {HTMLButtonElement} 生成された履歴削除用のボタン
     */
    #createTrashButton() {
      const icon = Utils.createSvg("trash", SvgIcon.trashPaths());
      const btn = Utils.createSvgButton("trash", icon);
      btn.id = "trash-item";

      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const result = confirm("履歴を削除しますか");
        if (result) {
          this.remove();
          this.dispatchEvent(Utils.getCustomEvent("deleteHistoryItem"));
        }
      });

      return btn;
    }
  }
  // カスタム要素 "PartsHistoryItem" を定義する
  customElements.define("parts-history-item", PartsHistoryItem);
}
