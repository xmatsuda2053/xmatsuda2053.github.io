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
 * マークの種類
 */
const marks = [
  { name: "flag", path: SvgIcon.flagFillPaths() },
  { name: "star", path: SvgIcon.starFillPaths() },
  { name: "flame", path: SvgIcon.flameFillPaths() },
  { name: "pin", path: SvgIcon.pinFillPaths() },
];

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
      const dateInput = this.#createDateTime();
      const moveBtn = this.#createMoveItemButton();
      const trashBtn = this.#createTrashButton();

      container.id = "container";
      container.appendChild(text);
      container.appendChild(dateInput);
      container.appendChild(moveBtn);
      container.appendChild(trashBtn);
      marks.forEach((mark) => {
        container.appendChild(this.#createMakButton(mark));
      });

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

    //--------------------------------------------
    // マーカー
    //--------------------------------------------
    /**
     * アイコン付きのボタンを作成する
     *
     * @param {Object} mark - アイコンとボタンの設定オブジェクト
     * @param {string} mark.name - アイコンとボタンの名前
     * @param {string} mark.path - アイコンのパス
     * @returns {HTMLElement} 作成されたボタン要素
     * @private
     */
    #createMakButton(mark) {
      const { name, path } = mark;
      const icon = Utils.createSvg(name, path);
      const btn = Utils.createSvgButton(name, icon);
      btn.id = `${name}-item`;
      btn.dataset.mark = "false";

      btn.addEventListener("click", (e) => {
        e.preventDefault();
        // 現在のデータ属性 "mark" を取得し、true/false を切り替える
        const mark = btn.dataset.mark === "true";
        btn.dataset.mark = !mark;
        this.dispatchEvent(Utils.getCustomEvent("changeHistoryItem"));
      });

      return btn;
    }

    /**
     * 指定されたIDのリストからいずれかがマークされているかを確認する
     *
     * @param {Array<string>} markIdList - チェックする要素のIDのリスト。
     * @returns {boolean} - いずれかの要素がマークされている場合は true、そうでない場合は false。
     */
    isMarked(markIdList) {
      for (const id of markIdList) {
        const btn = this.shadowRoot.getElementById(id);
        if (btn && btn.dataset.mark === "true") {
          return true;
        }
      }
      return false;
    }

    /**
     * マークされたアイテムの配列を取得する
     *
     * @returns {Array<Object>} マークされたアイテムの配列
     */
    get marks() {
      // marks 配列内の各要素に対して map メソッドを適用する
      // 各要素はオブジェクトで、そのキーはマークの名前、値は該当する要素となる
      return marks.map((m) => ({
        // mark.name をキーとして、対応する要素を shadowRoot から取得し、data-markの値を設定する。
        [m.name]:
          this.shadowRoot.getElementById(`${m.name}-item`).dataset.mark ||
          false,
      }));
    }

    /**
     * マークされたアイテムの配列を設定する
     *
     * @param {Array<Object>} newMarks - 新しいマークされたアイテムの配列
     */
    set marks(newMarks) {
      if (newMarks) {
        newMarks.forEach((m) => {
          const key = Object.keys(m)[0];
          const target = this.shadowRoot.getElementById(`${key}-item`);
          target.dataset.mark = m[key] || false;
        });
      }
    }
  }
  // カスタム要素 "PartsHistoryItem" を定義する
  customElements.define("parts-history-item", PartsHistoryItem);
}
