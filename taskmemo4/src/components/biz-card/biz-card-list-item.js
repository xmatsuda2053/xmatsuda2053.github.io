import styles from "./style/biz-card-list-item.css";

import { ElmUtils } from "../../utils/elm-utils";

/**
 * BizCardListItem コンポーネント
 * @class BizCard
 * @extends {HTMLElement}
 */
export function BizCardListItem() {
  class BizCardListItem extends HTMLElement {
    /**
     * コンストラクタ
     * @return {void}
     */
    constructor() {
      super();

      // Shadow DOMをオープンモードでアタッチ
      this.attachShadow({ mode: "open" });

      // CSSを適用
      this.shadowRoot.adoptedStyleSheets = ElmUtils.createStylesheet(styles);

      this.root = ElmUtils.createElm("div", "root");
      this._company = ElmUtils.createElm("p", "company");
      this._name = ElmUtils.createElm("p", "name");

      this.root.appendChild(this._company);
      this.root.appendChild(this._name);

      this.shadowRoot.innerHTML = "";
      this.shadowRoot.appendChild(this.root);
    }

    /**
     * リストアイテムの内容を設定する
     * @param {object} newData
     */
    rendar(newData = {}) {
      const compareResult = this.#hasDiffSortKey(newData);

      this._name.innerText = newData.kanjiName || "No Name";
      this._company.innerText = newData.company || "No Company";
      this._data = newData;

      return compareResult;
    }

    /**
     * ソート比較用のキーが一致しているか検証する。
     * @param {object} newData
     * @returns 不一致の場合、True
     */
    #hasDiffSortKey(newData) {
      if (!this._data || !newData) {
        return false;
      }
      const oldKanaName = this._data.kanaName || "";
      const oldCompany = this._data.company || "";
      const newKanaName = newData.kanaName || "";
      const newCompany = newData.company || "";

      const kanaNameComp = oldKanaName === newKanaName;
      const companyComp = oldCompany === newCompany;

      return !(kanaNameComp && companyComp);
    }

    /**
     * 検索条件にすべて合致するか否か判定する
     * @param {string} str
     * @returns true/false
     */
    isMatch(str) {
      const strs = str.split(" ");
      const dataStr = JSON.stringify(this._data);

      // 配列内のすべての文字列がdataStrに含まれているかをチェック
      return strs.every((s) => dataStr.includes(s));
    }

    /**
     * 会社名・カナ氏名の順でソート
     */
    compareAsc(dataB) {
      const companyA = this.data.company || "";
      const kanaNameA = this.data.kanaName || "";

      const companyB = dataB.company || "";
      const kanaNameB = dataB.kanaName || "";

      if (companyA < companyB) {
        return -1;
      }
      if (companyA > companyB) {
        return 1;
      }

      if (kanaNameA < kanaNameB) {
        return -1;
      }
      if (kanaNameA > kanaNameB) {
        return 1;
      }

      return 0;
    }

    /**
     * 名刺アイテムの内容を取得する
     * @return {object} 名刺アイテムの内容
     */
    get data() {
      return this._data;
    }

    /**
     * リストアイテムの選択状態を設定する
     * @param {boolean} value 選択状態
     */
    set isSelected(value) {
      this.root.classList.toggle("selected", value);
    }
  }
  customElements.define("biz-card-list-item", BizCardListItem);
}
