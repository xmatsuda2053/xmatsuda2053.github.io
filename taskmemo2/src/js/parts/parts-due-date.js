/**
 * 共通関数
 */
import { Utils } from "../common/utils";

/**
 * parts-due-dateコンポーネント用のCSS
 */
import style from "../../style/css/parts-due-date.css";

/**
 * PartsDueDate コンポーネントを作成しカスタム要素として定義する
 */
export function PartsDueDate() {
  /**
   * PartsDueDate コンポーネントのカスタム要素のクラス
   * @extends {HTMLElement}
   */
  class PartsDueDate extends HTMLElement {
    /**
     * コンストラクタ
     * @return {void}
     */
    constructor() {
      super();

      this.attachShadow({ mode: "open" });
      this.shadowRoot.adoptedStyleSheets =
        Utils.createStyleSheetWithFilename(style);

      const fieldset = this.#creteFiledSet();
      const legend = this.#createLegend();
      const date = this.#createDate();

      fieldset.appendChild(legend);
      fieldset.appendChild(date);

      this.shadowRoot.innerHTML = "";
      this.shadowRoot.appendChild(fieldset);
    }

    /**
     * fieldsetを作成する
     * @returns {HTMLElement}
     */
    #creteFiledSet() {
      const fieldset = document.createElement("fieldset");
      fieldset.id = "container";
      return fieldset;
    }

    /**
     * legendを作成する
     * @returns {HTMLElement}
     */
    #createLegend() {
      const legend = document.createElement("legend");
      legend.id = "title";

      const text = document.createTextNode("期限日");
      const span = document.createElement("span");

      span.id = "deadline";

      legend.appendChild(text);
      legend.appendChild(span);

      return legend;
    }

    /**
     * DueDateInputを作成する
     * @returns {HTMLElement}
     */
    #createDate() {
      const input = document.createElement("input");

      input.id = "due-date";
      input.type = "date";
      input.style.width = "10rem";

      /**
       * 入力日が変更されたときに実行される関数。
       * 日付をパースして残りの日数を計算し、それを表示します。
       */
      input.addEventListener("change", (e) => {
        // デフォルトの動作を防止
        e.preventDefault();
        // イベントのバブリングを防止
        e.stopPropagation();

        this.#setDeadline();

        // カスタムイベント"changeTaskItem"をディスパッチ
        this.dispatchEvent(Utils.getCustomEvent("changeTaskItem"));
      });

      return input;
    }

    /**
     * Deadlineを設定する
     */
    #setDeadline() {
      const date = this.shadowRoot.getElementById("due-date");
      const deadline = this.shadowRoot.getElementById("deadline");

      if (this.invalidDeadline) {
        deadline.innerText = "";
        return;
      }

      // 入力されている日付が空でないことを確認
      if (date.value !== "") {
        // 残り日数または超過日数を表示
        const dayCount = this.dayCount;

        if (dayCount >= 0) {
          deadline.innerText = `(あと ${dayCount}日)`;
          deadline.classList.remove("reach");
        } else {
          deadline.innerText = `(${Math.abs(dayCount)}日 超過)`;
          deadline.classList.add("reach");
        }
      } else {
        deadline.innerText = "";
      }
    }

    /**
     * deadlineの有効/無効を設定
     * @param {boolean} flg
     */
    set isFinish(flg) {
      this.invalidDeadline = flg;
      this.#setDeadline();
    }

    /**
     * 期限日と当日日付の差分を計算する
     */
    get dayCount() {
      const date = this.shadowRoot.getElementById("due-date");
      return Utils.calcDateDiffToday(date.value);
    }

    /**
     * 必須項目であることを設定する
     * @return {void}
     */
    setRequired() {
      this.shadowRoot.getElementById("title").classList.add("isRequired");
    }

    /**
     * 期限日に値を設定する
     * @param {string} date 設定値
     * @return {void}
     */
    set value(date) {
      this.shadowRoot.getElementById("due-date").value = date;
      this.#setDeadline();
    }

    /**
     * 期限日の値を取得する
     * @return {string} 設定値
     */
    get value() {
      return this.shadowRoot.getElementById("due-date").value;
    }
  }
  // カスタム要素 "parts-due-date" を定義する
  customElements.define("parts-due-date", PartsDueDate);
}
