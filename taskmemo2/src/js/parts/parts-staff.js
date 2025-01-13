/**
 * 共通関数
 */
import { Utils } from "../common/utils";

/**
 * PartsStaffコンポーネント用のCSS
 */
import style from "../../style/css/parts-staff.css";

/**
 * PartsStaff コンポーネントを作成しカスタム要素として定義する
 */
export function PartsStaff() {
  /**
   * PartsStaff コンポーネントのカスタム要素のクラス
   * @extends {HTMLElement}
   */
  class PartsStaff extends HTMLElement {
    /**
     * コンストラクタ
     * @return {void}
     */
    constructor() {
      super();

      this.attachShadow({ mode: "open" });
      this.shadowRoot.adoptedStyleSheets =
        Utils.createStyleSheetWithFilename(style);

      const fieldset = this.#creteFiledSet("container");
      const legend = this.#createLegend("担当者", "title");
      const staffDiv = this.#createStaffDiv();
      const staffName = this.#createStaffName();
      const staffTel = this.#createStaffTel();

      fieldset.appendChild(legend);
      fieldset.appendChild(staffDiv);
      fieldset.appendChild(staffName);
      fieldset.appendChild(staffTel);

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
     * @param {string} id
     * @returns {HTMLElement}
     */
    #creteFiledSet(id = "") {
      const fieldset = document.createElement("fieldset");
      fieldset.id = id;
      return fieldset;
    }

    /**
     * legendを作成する
     * @param {string} name
     * @param {string} id
     * @returns {HTMLElement}
     */
    #createLegend(name, id = "") {
      const legend = document.createElement("legend");
      legend.innerText = name;
      legend.id = id;
      return legend;
    }

    /**
     * 必須項目であることを設定する
     * @return {void}
     */
    isRequired() {
      this.shadowRoot.getElementById("title").classList.add("isRequired");
    }

    //------------------------------
    //- 所属
    //------------------------------
    /**
     * StaffDivInputを作成する
     * @returns {HTMLElement}
     */
    #createStaffDiv() {
      const staffDiv = document.createElement("parts-input");
      staffDiv.title = "所属";
      staffDiv.input = "";
      staffDiv.placeholder = "情報システム課";
      staffDiv.inputWidth = "10rem";
      staffDiv.id = "staff-div";

      return Utils.wrapElementInItemDiv(staffDiv);
    }

    /**
     * 所属に値を設定する
     * @param {string} value 設定値
     * @return {void}
     */
    set divValue(value) {
      this.shadowRoot.getElementById("staff-div").value = value;
    }

    /**
     * 所属の値を取得する
     * @return {string} 設定値
     */
    get divValue() {
      return this.shadowRoot.getElementById("staff-div").value;
    }

    //------------------------------
    //- 氏名
    //------------------------------
    /**
     * StaffNameInputを作成する
     * @returns {HTMLElement}
     */
    #createStaffName() {
      const staffName = document.createElement("parts-input");
      staffName.title = "氏名";
      staffName.input = "";
      staffName.placeholder = "日本　太郎";
      staffName.inputWidth = "10rem";
      staffName.id = "staff-name";

      return Utils.wrapElementInItemDiv(staffName);
    }

    /**
     * 氏名に値を設定する
     * @param {string} value 設定値
     * @return {void}
     */
    set nameValue(value) {
      this.shadowRoot.getElementById("staff-name").value = value;
    }

    /**
     * 氏名の値を取得する
     * @return {string} 設定値
     */
    get nameValue() {
      return this.shadowRoot.getElementById("staff-name").value;
    }

    //------------------------------
    //- 電話番号
    //------------------------------
    /**
     * StaffTelInputを作成する
     * @returns {HTMLElement}
     */
    #createStaffTel() {
      const staffTel = document.createElement("parts-input");
      staffTel.title = "電話番号";
      staffTel.input = "";
      staffTel.placeholder = "0123-45-6789";
      staffTel.inputWidth = "10rem";
      staffTel.id = "staff-tel";

      return Utils.wrapElementInItemDiv(staffTel);
    }

    /**
     * 電話番号に値を設定する
     * @param {string} value 設定値
     * @return {void}
     */
    set telValue(value) {
      this.shadowRoot.getElementById("staff-tel").value = value;
    }

    /**
     * 電話番号の値を取得する
     * @return {string} 設定値
     */
    get telValue() {
      return this.shadowRoot.getElementById("staff-tel").value;
    }
  }
  // カスタム要素 "PartsStaff" を定義する
  customElements.define("parts-staff", PartsStaff);
}
