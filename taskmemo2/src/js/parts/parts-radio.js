/**
 * 共通関数
 */
import { Utils } from "../common/utils";

/**
 * PartsRadioコンポーネント用のCSS
 */
import style from "../../style/css/parts-radio.css";

/**
 * PartsRadio コンポーネントを作成しカスタム要素として定義する
 */
export function PartsRadio() {
  /**
   * PartsRadio コンポーネントのカスタム要素のクラス
   * @extends {HTMLElement}
   */
  class PartsRadio extends HTMLElement {
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

      fieldset.appendChild(legend);

      this.shadowRoot.innerHTML = "";
      this.shadowRoot.appendChild(fieldset);

      // 変更イベントを伝播
      fieldset.addEventListener("change", () => {
        // カスタムイベント"changeTaskItem"をディスパッチ
        this.dispatchEvent(Utils.getCustomEvent("changeTaskItem"));
      });
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
      return legend;
    }

    /**
     * Legendに値を設定する
     * @param {string} value 設定値
     * @return {void}
     */
    set title(value) {
      this.shadowRoot.getElementById("title").innerText = value;
    }

    /**
     * 必須項目であることを設定する
     * @return {void}
     */
    isRequired() {
      this.shadowRoot.getElementById("title").classList.add("isRequired");
    }

    /**
     * ボタン横幅を設定する
     * @param {string} value ボタン横幅
     * @return {void}
     */
    set btnWidth(value) {
      this.width = value;
    }

    /**
     * 渡されたパラメータに基づいて、ラジオボタンと対応するラベルを生成し、コンテナ内に追加します。
     *
     * @param {Array} parameters - ラベルと値を持つオブジェクトの配列。
     */
    set item(parameters) {
      const container = this.shadowRoot.getElementById("container");
      const div = document.createElement("div");
      div.classList.add("radio-buttons");

      // 各パラメータに対して処理
      parameters.forEach((p, index) => {
        const lbl = document.createElement("label");
        lbl.htmlFor = `item${p.value}`;
        lbl.textContent = p.text;
        lbl.style.width = this.width || "30px";

        const radio = document.createElement("input");
        radio.type = "radio";
        radio.name = "radio";
        radio.id = `item${p.value}`;
        radio.value = p.value;
        radio.checked = p.isChecked;

        if (p.isChecked) {
          this.defalutCheckedValue = p.value;
        }

        // 最初と最後の要素にクラスを追加
        if (index === 0) {
          lbl.classList.add("first");
        } else if (index === parameters.length - 1) {
          lbl.classList.add("last");
        }

        div.appendChild(lbl);
        div.appendChild(radio);
      });

      container.appendChild(div);
    }

    /**
     * 選択したラジオボタンのvalueを返す
     * @return {string} value
     */
    get value() {
      const container = this.shadowRoot.getElementById("container");
      return container.querySelector('input[name="radio"]:checked').value;
    }

    /**
     * ラジオボタンを選択する
     * @param {string} v
     */
    set value(v) {
      if (v === "") v = this.defalutCheckedValue;
      const rb = this.shadowRoot.getElementById(`item${v}`);
      rb.checked = true;
    }
  }
  // カスタム要素 "PartsRadio" を定義する
  customElements.define("parts-radio", PartsRadio);
}
