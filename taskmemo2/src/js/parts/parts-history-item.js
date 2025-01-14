/**
 * 共通関数
 */
import { Utils } from "../common/utils";

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
      const input = this.#createDateTime();
      const svgIconGripVertical = this.#createSvgIconGripVertical();
      const moveBtn = this.#createMoveItemButton();
      const svgIconTrash = this.#createSvgIconTrash();
      const trashBtn = this.#createTrashButton();

      container.id = "container";
      container.appendChild(text);
      container.appendChild(input);
      container.appendChild(svgIconGripVertical);
      container.appendChild(moveBtn);
      container.appendChild(svgIconTrash);
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
    // 日付入力
    //--------------------------------------------
    /**
     * DataTimeInputを作成する
     * @returns {HTMLElement}
     */
    #createDateTime() {
      const div = document.createElement("div");
      const input = document.createElement("input");

      div.classList.add("date-box");

      input.id = "datetime";
      input.type = "datetime-local";
      input.value = Utils.formatDate(new Date(), "{yyyy}-{MM}-{dd}T{HH}:{mm}");

      div.appendChild(input);

      return div;
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
     * gripのSVGアイコンを作成する
     * @returns {SVGElement} gripを含む生成されたSVG要素
     */
    #createSvgIconGripVertical() {
      return Utils.createSvg("grip-vertical", [
        { path: "M0 0h24v24H0z" },
        { path: "M9 5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" },
        { path: "M9 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" },
        { path: "M9 19m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" },
        { path: "M15 5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" },
        { path: "M15 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" },
        { path: "M15 19m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" },
      ]);
    }

    /**
     * 履歴移動用のボタンを作成する
     *
     * @returns {HTMLButtonElement} 生成された履歴移動用のボタン
     */
    #createMoveItemButton() {
      const btn = Utils.createSvgButton("grip-vertical");
      btn.id = "move-item";
      return btn;
    }

    //--------------------------------------------
    // 履歴削除
    //--------------------------------------------

    /**
     * SVGアイコン追加
     * @private
     * @returns {void}
     * @memberof TaskHistory
     */
    #createSvgIconTrash() {
      return Utils.createSvg("trash", [
        { path: "M0 0h24v24H0z" },
        { path: "M4 7l16 0" },
        { path: "M10 11l0 6" },
        { path: "M14 11l0 6" },
        { path: "M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" },
        { path: "M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" },
      ]);
    }

    /**
     * 履歴削除用のボタンを作成する
     *
     * @returns {HTMLButtonElement} 生成された履歴削除用のボタン
     */
    #createTrashButton() {
      const btn = Utils.createSvgButton("trash");
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
