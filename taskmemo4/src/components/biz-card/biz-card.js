import styles from "./style/biz-card.css";

import { ElmUtils } from "../../utils/elm-utils";
import { SvgUtils } from "../../utils/svg-utils";
import { SvgConst } from "../../constants/svg-const";

/**
 * BizCard コンポーネント
 * @class BizCard
 * @extends {HTMLElement}
 */
export function BizCard() {
  class BizCard extends HTMLElement {
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

      // grid作成
      this.root = ElmUtils.createElm("div", "root");
      this.bcHead = ElmUtils.createElm("div", "bc-header");
      this.bcList = ElmUtils.createElm("div", "bc-list", ["scroll"]);
      this.bcMain = ElmUtils.createElm("div", "bc-main", ["scroll"]);

      this.root.appendChild(this.bcHead);
      this.root.appendChild(this.bcList);
      this.root.appendChild(this.bcMain);

      this.shadowRoot.innerHTML = "";
      this.shadowRoot.appendChild(this.root);

      this.#addMember();
      this.#addContact();
      this.#addMailAddress();
      this.#addCompanyName();
      this.#addAddress();
      this.#addMemo();

      this.#test();
    }

    // **************************************************
    // * 担当者
    // **************************************************
    /**
     * 新しい担当者を作成し、ルートエレメントに追加するメソッド。
     */
    #addMember() {
      /**
       * 担当者の漢字氏名
       * @returns {HTMLElement} - 漢字氏名のフィールドセット
       */
      const kanjiName = () => {
        const filedset = ElmUtils.createElm("form-fieldset");
        filedset.icon = SvgUtils.createIcon(SvgConst.UserPaths);
        filedset.required = true;
        filedset.title = "漢字氏名";

        this._memberNameKanji = ElmUtils.createElm(
          "form-input",
          "member-name-kanji"
        );
        this._memberNameKanji.placeholder = "日本 太郎";

        filedset.addItem(this._memberNameKanji);

        return filedset;
      };

      /**
       * 担当者のカナ氏名
       * @returns {HTMLElement} - カナ氏名のフィールドセット
       */
      const kanaName = () => {
        const filedset = ElmUtils.createElm("form-fieldset");
        filedset.icon = SvgUtils.createIcon(SvgConst.UserPaths);
        filedset.required = true;
        filedset.title = "カナ氏名";

        this._memberNameKane = ElmUtils.createElm(
          "form-input",
          "member-name-kana"
        );
        this._memberNameKane.placeholder = "ニホン タロウ";

        filedset.addItem(this._memberNameKane);

        return filedset;
      };

      /**
       * 担当者の役職
       * @returns {HTMLElement} - 役職のフィールドセット
       */
      const position = () => {
        const filedset = ElmUtils.createElm("form-fieldset");
        filedset.icon = SvgUtils.createIcon(SvgConst.UserPaths);
        filedset.title = "役職";

        this._memberPosition = ElmUtils.createElm(
          "form-input",
          "member-position"
        );
        this._memberPosition.placeholder = "係員";

        filedset.addItem(this._memberPosition);

        return filedset;
      };

      // フィールドセットに登録
      const filedset = ElmUtils.createElm("form-fieldset");
      filedset.headLess = true;
      filedset.addItem(kanjiName());
      filedset.addItem(kanaName());
      filedset.addItem(position());

      this.bcMain.appendChild(filedset);
    }

    // **************************************************
    // * 会社名
    // **************************************************
    /**
     * 新しい会社名を作成し、ルートエレメントに追加するメソッド。
     * @return {void}
     */
    #addCompanyName() {
      const filedset = ElmUtils.createElm("form-fieldset");
      filedset.icon = SvgUtils.createIcon(SvgConst.BuildingsPath);
      filedset.title = "会社名";
      filedset.required = true;

      this._companyName = ElmUtils.createElm("form-input", "company-name");
      this._companyName.placeholder = "株式会社ｘｘｘｘ";

      filedset.addItem(this._companyName);
      this.bcMain.appendChild(filedset);
    }

    // **************************************************
    // * 連絡先
    // **************************************************
    /**
     * 新しい連絡先を作成し、ルートエレメントに追加するメソッド。
     */
    #addContact() {
      /**
       * 固定電話
       * @returns {HTMLElement} - 固定電話のフィールドセット
       */
      const phoneNumber = () => {
        const filedset = ElmUtils.createElm("form-fieldset");
        filedset.icon = SvgUtils.createIcon(SvgConst.PhoneCallPaths);
        filedset.required = true;
        filedset.title = "固定電話";

        this._phoneNumber = ElmUtils.createElm("form-input", "phone-number");
        this._phoneNumber.placeholder = "0123-45-6789";

        filedset.addItem(this._phoneNumber);

        return filedset;
      };

      /**
       * 携帯電話
       * @returns {HTMLElement} - 携帯電話のフィールドセット
       */
      const mobilePhoneNumber = () => {
        const filedset = ElmUtils.createElm("form-fieldset");
        filedset.icon = SvgUtils.createIcon(SvgConst.DeviceMobilePath);
        filedset.title = "携帯電話";

        this._mobilephoneNumber = ElmUtils.createElm(
          "form-input",
          "mobile-phone-number"
        );
        this._mobilephoneNumber.placeholder = "090-1234-5678";

        filedset.addItem(this._mobilephoneNumber);

        return filedset;
      };

      /**
       * FAX
       * @returns {HTMLElement} - FAXのフィールドセット
       */
      const faxNumber = () => {
        const filedsetFaxNumber = ElmUtils.createElm("form-fieldset");
        filedsetFaxNumber.icon = SvgUtils.createIcon(SvgConst.PrinterPath);
        filedsetFaxNumber.title = "FAX";

        this._faxNumber = ElmUtils.createElm("form-input", "fax-number");
        this._faxNumber.placeholder = "0123-45-6789";

        filedsetFaxNumber.addItem(this._faxNumber);

        return filedsetFaxNumber;
      };

      // フィールドセットに登録
      const filedset = ElmUtils.createElm("form-fieldset");
      filedset.headLess = true;
      filedset.addItem(phoneNumber());
      filedset.addItem(mobilePhoneNumber());
      filedset.addItem(faxNumber());

      this.bcMain.appendChild(filedset);
    }

    // **************************************************
    // * メールアドレス
    // **************************************************
    /**
     * 新しいメールアドレス入力欄を作成し、ルートエレメントに追加するメソッド。
     */
    #addMailAddress() {
      const filedset = ElmUtils.createElm("form-fieldset");
      filedset.icon = SvgUtils.createIcon(SvgConst.MailPath);
      filedset.title = "メールアドレス";
      filedset.required = true;

      this._mailAddress = ElmUtils.createElm("form-input", "mail-address");
      this._mailAddress.placeholder = "xxxxxx@hoge.co.jp";

      filedset.addItem(this._mailAddress);
      this.bcMain.appendChild(filedset);
    }

    // **************************************************
    // * 住所
    // **************************************************
    #addAddress() {
      /**
       * 郵便番号
       * @returns {HTMLElement} - 郵便番号のフィールドセット
       */
      const postCode = () => {
        const filedset = ElmUtils.createElm("form-fieldset");
        filedset.icon = SvgUtils.createIcon(SvgConst.PostCodePath);
        filedset.title = "郵便番号";
        filedset.width = "80px";

        this._postCode = ElmUtils.createElm("form-input", "post-code");
        this._postCode.placeholder = "123-4567";

        filedset.addItem(this._postCode);

        return filedset;
      };

      /**
       * 住所
       * @returns {HTMLElement} - 住所のフィールドセット
       */
      const address = () => {
        const filedset = ElmUtils.createElm("form-fieldset");
        filedset.icon = SvgUtils.createIcon(SvgConst.MailBoxPath);
        filedset.title = "住所";
        filedset.width = "450px";

        this._address = ElmUtils.createElm("form-input", "address");
        this._address.placeholder = "東京都千代田区丸の内1-1-1";

        filedset.addItem(this._address);

        return filedset;
      };

      // フィールドセットに登録
      const filedset = ElmUtils.createElm("form-fieldset");
      filedset.headLess = true;
      filedset.addItem(postCode());
      filedset.addItem(address());

      this.bcMain.appendChild(filedset);
    }

    // **************************************************
    // * メモ
    // **************************************************

    /**
     * メモを追加します。
     * @private
     */
    #addMemo() {
      const filedset = ElmUtils.createElm("form-fieldset");
      filedset.icon = SvgUtils.createIcon(SvgConst.WitingPaths);
      filedset.title = "メモ";

      this._memo = ElmUtils.createElm("form-textarea", "memo");
      this._memo.rows = 8;
      this._memo.placeholder = "自由記述";

      filedset.addItem(this._memo);
      this.bcMain.appendChild(filedset);
    }

    #test() {
      this.#addListItem("list-item-1", {
        name: "テスト １郎",
        company: "日本システムズ",
      });
      this.#addListItem("list-item-2", {
        name: "テスト ２郎",
        company: "日本システムズ",
      });
      this.#addListItem("list-item-3", {
        name: "テスト ３郎",
        company: "日本システムズ",
      });
      this.#addListItem("list-item-4", {
        name: "テスト ４郎",
        company: "日本システムズ",
      });
      this.#addListItem("list-item-5", {
        name: "テスト ５郎",
        company: "日本システムズ",
      });
      this.#addListItem("list-item-6", {
        name: "テスト ６郎",
        company: "日本システムズ",
      });
      this.#addListItem("list-item-7", {
        name: "テスト ７郎",
        company: "日本システムズ",
      });
      this.#addListItem("list-item-8", {
        name: "テスト ８郎",
        company: "日本システムズ",
      });
      this.#addListItem("list-item-9", {
        name: "テスト ９郎",
        company: "日本システムズ",
      });
      this.#addListItem("list-item-10", {
        name: "テスト １０郎",
        company: "日本システムズ",
      });

      const listItem = this.shadowRoot.getElementById("list-item-1");
      listItem.classList.add("selected");
    }

    /**
     * 名刺リストアイテムを追加する
     * @param {string} id - 名刺リストアイテムのID
     * @param {object} data - 名刺リストアイテムのデータ
     * @return {void}
     */
    #addListItem(id, data = {}) {
      const item = ElmUtils.createElm("div", null, ["item"]);
      const name = ElmUtils.createElm("p", null, ["name"]);
      const comp = ElmUtils.createElm("p", null, ["company"]);

      item.id = id;
      item.appendChild(name);
      item.appendChild(comp);

      name.innerText = data.name;
      comp.innerText = data.company;

      this.bcList.appendChild(item);
    }
  }
  customElements.define("biz-card", BizCard);
}
