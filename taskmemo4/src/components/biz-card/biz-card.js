import styles from "./style/biz-card.css";

import { ElmUtils } from "../../utils/elm-utils";
import { SvgUtils } from "../../utils/svg-utils";
import { SvgConst } from "../../constants/svg-const";
import { IdUtils } from "../../utils/id-utils";
import { EventConst } from "../../constants/event-const";

const FILE_NAME = "biz_card.json";
const ID_PREFIX = "bz";

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
      this.bcHeadL = ElmUtils.createElm("div", "bc-head-l", ["head-outer"]);
      this.bcHeadC = ElmUtils.createElm("div", "bc-head-c", ["head-outer"]);
      this.bcHeadR = ElmUtils.createElm("div", "bc-head-r", ["head-outer"]);
      this.bcList = ElmUtils.createElm("div", "bc-list", ["scroll"]);
      this.bcMain = ElmUtils.createElm("div", "bc-main", ["scroll"]);

      this.root.appendChild(this.bcHeadL);
      this.root.appendChild(this.bcHeadC);
      this.root.appendChild(this.bcHeadR);
      this.root.appendChild(this.bcList);
      this.root.appendChild(this.bcMain);

      this.shadowRoot.innerHTML = "";
      this.shadowRoot.appendChild(this.root);

      this.#addHeaderSearchInput();
      this.#addMenuRight();

      /**
       * 入力内容変更時
       */
      this.bcMain.addEventListener(
        EventConst.CHANGE_FORM_ITEM_EVENT_NAME,
        () => {
          this.#refreshListItem();
          this.save();
        }
      );
    }

    /**
     * ファイルマネージャーを追加
     * @param {object} obj
     */
    set fileManager(obj) {
      this._fileManager = obj;
    }

    /**
     * 初期表示設定
     */
    async init() {
      const str = await this._fileManager.loadFile(FILE_NAME);
      if (!str) {
        return;
      }

      this.#rendarListItem(JSON.parse(str));
    }

    /**
     * 名刺データを保存
     */
    async save() {
      const dataArray = Array.from(
        this.shadowRoot.querySelectorAll("biz-card-list-item")
      ).map((item) => item.data);

      await this._fileManager.writeFile(FILE_NAME, JSON.stringify(dataArray));
    }

    /**
     * 名刺カード領域を初期化
     * @param {object} data
     */
    #initBcMain(data = {}) {
      this.bcMain.innerHTML = "";
      this.bcMain.dataset.id = data.id;

      this.#addMainCompanyName();
      this.#addMainMember();
      this.#addMainContact();
      this.#addMainMailAddress();
      this.#addMainAddress();
      this.#addMainMemo();

      this._memberNameKanji.value = data.kanjiName || "";
      this._memberNameKane.value = data.kanaName || "";
      this._memberPosition.value = data.position || "";
      this._companyName.value = data.company || "";
      this._phoneNumber.value = data.phoneNumber || "";
      this._mobilephoneNumber.value = data.mobilePhoneNumber || "";
      this._faxNumber.value = data.faxNumber || "";
      this._mailAddress.value = data.mailAddress || "";
      this._postCode.value = data.postCode || "";
      this._address.value = data.address || "";
      this._memo.value = data.memo || "";
    }

    /**
     * 画面入力内容を取得する
     * @return {object} - 入力内容
     */
    #getData() {
      const data = {
        id: this.bcMain.dataset.id,
        kanjiName: this._memberNameKanji.value,
        kanaName: this._memberNameKane.value,
        position: this._memberPosition.value,
        company: this._companyName.value,
        phoneNumber: this._phoneNumber.value,
        mobilePhoneNumber: this._mobilephoneNumber.value,
        faxNumber: this._faxNumber.value,
        mailAddress: this._mailAddress.value,
        postCode: this._postCode.value,
        address: this._address.value,
        memo: this._memo.value,
      };
      return data;
    }

    /**
     * 名刺データを削除する
     */
    #deleteBizCard() {
      const id = this.bcMain.dataset.id;
      const item = this.shadowRoot.getElementById(id);
      const data = this.#getData();
      const msg = `${data.company}) ${data.kanjiName}\nを削除します。よろしいですか？`;

      if (!window.confirm(msg)) {
        return;
      }

      this.bcList.removeChild(item);
      this._selectedListItem = null;
      this.bcMain.innerHTML = "";
      this.bcMain.dataset.id = "";

      const firstListItem = this.shadowRoot.querySelector("biz-card-list-item");
      if (firstListItem) {
        firstListItem.click();
      }

      this.save();
    }

    // **************************************************
    // * ヘッダー
    // **************************************************
    /**
     * 名刺リストの検索入力欄を作成し、ルートエレメントに追加するメソッド。
     */
    #addHeaderSearchInput() {
      const inner = ElmUtils.createElm("div", null, ["head-inner"]);

      this._searchInput = ElmUtils.createElm("form-input", "search-input");
      this._searchInput.placeholder = "search...";
      this._searchInput.isSearch = true;

      inner.appendChild(this._searchInput);

      this.bcHeadC.appendChild(inner);

      /**
       * 名刺データを検索
       */
      this._searchInput.addEventListener(
        EventConst.CHANGE_FORM_ITEM_EVENT_NAME,
        () => {
          const str = this._searchInput.value;
          const listItems =
            this.shadowRoot.querySelectorAll("biz-card-list-item");

          for (let item of listItems) {
            item.classList.toggle("hidden", !item.isMatch(str));
          }
        }
      );

      /**
       * 検索キャンセル
       */
      this._searchInput.addEventListener(
        EventConst.CLICK_SEARCH_CANCEL_EVENT_NAME,
        () => {
          this._searchInput.value = "";
          const listItems =
            this.shadowRoot.querySelectorAll("biz-card-list-item");

          for (let item of listItems) {
            item.classList.toggle("hidden", false);
          }
        }
      );
    }

    /**
     * ヘッダー右側のメニューボタンを追加する。
     */
    #addMenuRight() {
      const inner = ElmUtils.createElm("div", null, ["head-inner"]);

      /**
       * ボタンの基本設定を行う関数
       * @param {string} id
       * @param {string} path - アイコンのパス
       * @returns {HTMLElement} - ボタンの要素
       */
      const baseBtn = (id, path) => {
        const btn = ElmUtils.createElm("svg-btn", id, ["menu-btn"]);
        btn.iconPaths = path;
        btn.size = "1rem";
        btn.isCircle = true;
        return btn;
      };

      /**
       * 新規追加ボタン
       * @returns {HTMLElement} - 新規追加ボタンの要素
       */
      const addBtn = () => {
        const btn = baseBtn("add-btn", SvgConst.plusPaths);
        btn.tooltip = "新規追加";

        /**
         * 名刺アイテムの新規追加
         */
        btn.addEventListener("click", () => {
          const id = ID_PREFIX + IdUtils.getUniqueId();
          const data = { id: id };
          const listItem = this.#addListItem(data);
          listItem.click();
        });

        return btn;
      };

      /**
       * コピーボタン
       * @returns {HTMLElement} - コピー用ボタンの要素
       */
      const copyBtn = () => {
        const btn = baseBtn("copy-btn", SvgConst.CopyPaths);
        btn.tooltip = "コピー";

        /**
         * コピー実行
         */
        btn.addEventListener("click", () => {
          const data = this.#getData();
          data.id = ID_PREFIX + IdUtils.getUniqueId();
          const listItem = this.#addListItem(data);
          listItem.click();
        });

        return btn;
      };

      /**
       * 削除ボタン
       * @returns {HTMLElement} - 削除ボタンの要素
       */
      const deleteBtn = () => {
        const btn = baseBtn("delete-btn", SvgConst.trashPaths);
        btn.tooltip = "削除";
        btn.color = "red";

        /**
         * データ削除
         */
        btn.addEventListener("click", () => {
          this.#deleteBizCard();
        });
        return btn;
      };

      inner.appendChild(addBtn());
      inner.appendChild(copyBtn());
      inner.appendChild(deleteBtn());
      this.bcHeadR.appendChild(inner);
    }

    // **************************************************
    // * 名刺リスト
    // **************************************************
    /**
     * 名刺リストを作成する
     * @param {array} dataList
     */
    #rendarListItem(dataList) {
      this.bcList.innerHTML = "";
      this._selectedListItem = null;

      dataList.forEach((data) => {
        this.#addListItem(data);
      });

      if (dataList.length > 0) {
        this.shadowRoot.getElementById(dataList[0].id).click();
      }

      this.bcList.scrollTo({ top: 0, behavior: "smooth" });
    }

    /**
     * 名刺リストアイテムを追加する
     * @param {object} data - 名刺リストアイテムのデータ
     * @return {HTMLElement} - 名刺リストアイテムの要素
     */
    #addListItem(data) {
      const item = ElmUtils.createElm("biz-card-list-item", data.id);
      item.rendar(data);

      this.bcList.appendChild(item);
      item.addEventListener("click", () => {
        this.#selectListItem(data.id);
        this.#initBcMain(this._selectedListItem.data);
      });

      const bottom = this.bcList.scrollHeight - this.bcList.clientHeight;
      this.bcList.scrollTo({ top: bottom, behavior: "smooth" });

      return item;
    }

    /**
     * リストアイテムを選択中にする。
     * @param {String} id
     */
    #selectListItem(id) {
      const before = this._selectedListItem;
      if (before) {
        before.isSelected = false;
      }

      const target = this.shadowRoot.getElementById(id);
      this._selectedListItem = target;
      target.isSelected = true;
    }

    /**
     * リストアイテムの内容を更新する
     */
    #refreshListItem() {
      const hasDiff = this._selectedListItem.rendar(this.#getData());
      if (hasDiff) {
        this.#sortListItem();
      }
    }

    /**
     * リストアイテムを会社名・氏名の順にソートする
     */
    #sortListItem() {
      const dataArray = Array.from(
        this.shadowRoot.querySelectorAll("biz-card-list-item")
      ).map((item) => item.data);

      dataArray.sort((a, b) => {
        const companyA = a.company || "";
        const kanaNameA = a.kanaName || "";
        const companyB = b.company || "";
        const kanaNameB = b.kanaName || "";

        if (companyA < companyB) return -1;
        if (companyA > companyB) return 1;
        if (kanaNameA < kanaNameB) return -1;
        if (kanaNameA > kanaNameB) return 1;
        return 0;
      });

      const tmpSelectedListItem = this._selectedListItem;
      this.#rendarListItem(dataArray);
      tmpSelectedListItem.click();
    }

    // **************************************************
    // * 担当者
    // **************************************************
    /**
     * 新しい担当者を作成し、ルートエレメントに追加するメソッド。
     */
    #addMainMember() {
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
        filedset.icon = SvgUtils.createIcon(SvgConst.TiePaths);
        filedset.title = "役職";
        filedset.isLastNested = true;

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
      filedset.addItem(kanjiName(), true);
      filedset.addItem(kanaName(), true);
      filedset.addItem(position(), true);

      this.bcMain.appendChild(filedset);
    }

    // **************************************************
    // * 会社名
    // **************************************************
    /**
     * 新しい会社名を作成し、ルートエレメントに追加するメソッド。
     * @return {void}
     */
    #addMainCompanyName() {
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
    #addMainContact() {
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
        const filedset = ElmUtils.createElm("form-fieldset");
        filedset.icon = SvgUtils.createIcon(SvgConst.PrinterPath);
        filedset.title = "FAX";
        filedset.isLastNested = true;

        this._faxNumber = ElmUtils.createElm("form-input", "fax-number");
        this._faxNumber.placeholder = "0123-45-6789";

        filedset.addItem(this._faxNumber);

        return filedset;
      };

      // フィールドセットに登録
      const filedset = ElmUtils.createElm("form-fieldset");
      filedset.headLess = true;
      filedset.addItem(phoneNumber(), true);
      filedset.addItem(mobilePhoneNumber(), true);
      filedset.addItem(faxNumber(), true);

      this.bcMain.appendChild(filedset);
    }

    // **************************************************
    // * メールアドレス
    // **************************************************
    /**
     * 新しいメールアドレス入力欄を作成し、ルートエレメントに追加するメソッド。
     */
    #addMainMailAddress() {
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
    #addMainAddress() {
      /**
       * 郵便番号
       * @returns {HTMLElement} - 郵便番号のフィールドセット
       */
      const postCode = () => {
        const filedset = ElmUtils.createElm("form-fieldset");
        filedset.icon = SvgUtils.createIcon(SvgConst.PostCodePath);
        filedset.title = "郵便番号";
        filedset.width = "100px";

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
        filedset.isLastNested = true;

        this._address = ElmUtils.createElm("form-input", "address");
        this._address.placeholder = "東京都千代田区丸の内1-1-1";

        filedset.addItem(this._address);

        return filedset;
      };

      // フィールドセットに登録
      const filedset = ElmUtils.createElm("form-fieldset");
      filedset.headLess = true;
      filedset.addItem(postCode());
      filedset.addItem(address(), true);

      this.bcMain.appendChild(filedset);
    }

    // **************************************************
    // * メモ
    // **************************************************

    /**
     * メモを追加します。
     * @private
     */
    #addMainMemo() {
      const filedset = ElmUtils.createElm("form-fieldset");
      filedset.icon = SvgUtils.createIcon(SvgConst.WitingPaths);
      filedset.title = "メモ";

      this._memo = ElmUtils.createElm("form-textarea", "memo");
      this._memo.rows = 8;
      this._memo.placeholder = "自由記述";

      filedset.addItem(this._memo);
      this.bcMain.appendChild(filedset);
    }
  }
  customElements.define("biz-card", BizCard);
}
