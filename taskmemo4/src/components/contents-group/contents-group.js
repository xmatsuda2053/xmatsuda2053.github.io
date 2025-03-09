import { ElmUtils } from "../../utils/elm-utils";
import { SvgUtils } from "../../utils/svg-utils";
import { SvgConst } from "../../constants/svg-const";
import { EventUtils } from "../../utils/event-utils";
import { EventConst } from "../../constants/event-const";
import { PriorityConst } from "../../constants/priority-const";

import styles from "./style/contents-group.css";

/**
 * ContentsGroup コンポーネント
 * @class ContentsGroup
 * @extends {HTMLElement}
 */
export function ContentsGroup() {
  class ContentsGroup extends HTMLElement {
    /**
     * コンストラクタ
     * @return {void}
     */
    constructor() {
      super();

      // Shadow DOMをオープンモードでアタッチ
      this.attachShadow({ mode: "open" });
      this.shadowRoot.innerHTML = "";

      // CSSを適用
      this.shadowRoot.adoptedStyleSheets = ElmUtils.createStylesheet(styles);

      // 空の要素を作成
      this.root = ElmUtils.createElm("div", "root", [
        "contents-group",
        "scroll",
      ]);

      this.#addGroupId();
      this.#addGroupTitle();
      this.#addGroupOverview();

      this.shadowRoot.appendChild(this.root);

      // 変更イベントを伝播
      this.root.addEventListener(EventConst.CHANGE_FORM_ITEM_EVENT_NAME, () => {
        this.dispatchEvent(
          EventUtils.createEvent(EventConst.CHANGE_CONTENTS_GROUP_EVENT_NAME)
        );
      });
    }

    // **************************************************
    // * グループデータの入出力
    // **************************************************
    /**
     * グループのプロパティ情報を画面出力する
     * @param {string} jsonStr
     * @returns {void}
     */
    render(jsonStr) {
      if (!jsonStr) {
        return;
      }
      const data = JSON.parse(jsonStr);
      this._groupTitle.value = data.title;
      this._groupOverview.value = data.overview;
    }

    /**
     * グループ内のコンテンツデータを出力する。
     * @param {array} items
     * @returns {void}
     */
    renderItems(items = []) {
      if (items.length === 0) {
        return;
      }

      this.#addEmptyGroupItems();

      this.table.header = ["ID", "名称", "優先度", "期日", "進捗率"];

      items.forEach((item) => {
        if (item.type === "task") {
          const icon = SvgUtils.createIcon(item.paths);
          const priority = PriorityConst.text(item.priority) || "?";

          this.table.appendTr();
          this.table.appendTd([item.id], ["150px"], "left");
          this.table.appendTd([icon, item.name], [null, "500px"], "left");
          this.table.appendTd([priority], ["50px"], "center");
          this.table.appendTd([item.duedate || "?"], ["80px"], "center");
          this.table.appendTd([`${item.status}%`], ["50px"], "center");
        }
      });
    }

    /**
     * データアイテムを取得します。
     * @returns {Object} dataItem - 取得したデータアイテム。
     * @property {string} dataItem.title - グループタイトルの値。
     * @property {string} dataItem.overview - グループ概要の値。空の場合は空文字列を返します。
     */
    getData() {
      const dataItem = {};
      dataItem.title = this._groupTitle.value;
      dataItem.overview = this._groupOverview.value || "";

      return dataItem;
    }

    // **************************************************
    // * グループID
    // **************************************************

    /**
     * 新しい入力IDを作成し、ルートエレメントに追加するメソッド。
     * `form-input-item`というタグを持つ新しいエレメントを作成し、そのタイトルを「ID」に設定して、ルートエレメントに追加します。
     */
    #addGroupId() {
      const filedset = ElmUtils.createElm("form-fieldset");
      filedset.title = "ID";

      this._groupId = ElmUtils.createElm("form-input", "id");
      this._groupId.title = "ID";
      this._groupId.readOnly = true;
      this._groupId.width = "600px";

      filedset.addItem(this._groupId);
      this.root.appendChild(filedset);
    }

    /**
     * グループIDを設定するセッターメソッド。
     * このメソッドは、指定された値を`groupId`エレメントの値として設定します。
     *
     * @param {string} val - 設定するグループIDの値。
     */
    set groupId(val) {
      this._groupId.value = val;
    }

    // **************************************************
    // * グループ名
    // **************************************************
    /**
     * 新しい入力タイトルを作成し、ルートエレメントに追加するメソッド。
     * `form-input-item`というタグを持つ新しいエレメントを作成し、そのタイトルを「グループ名」に設定して、ルートエレメントに追加します。
     */
    #addGroupTitle() {
      const filedset = ElmUtils.createElm("form-fieldset");
      filedset.title = "グループ名";
      filedset.required = true;

      this._groupTitle = ElmUtils.createElm("form-input", "title");
      this._groupTitle.width = "600px";

      filedset.addItem(this._groupTitle);
      this.root.appendChild(filedset);
    }

    /**
     * グループタイトルを設定するセッターメソッド。
     * このメソッドは、指定された値を`groupTitle`エレメントの値として設定します。
     *
     * @param {string} val - 設定するグループタイトルの値。
     */
    set groupTitle(val) {
      this._groupTitle.value = val;
    }

    // **************************************************
    // * 概要
    // **************************************************

    /**
     * グループの概要を追加します。
     * @private
     */
    #addGroupOverview() {
      const filedset = ElmUtils.createElm("form-fieldset");
      filedset.title = "概要";

      this._groupOverview = ElmUtils.createElm("form-textarea", "overview");
      this._groupOverview.width = "600px";
      this._groupOverview.rows = 5;
      this._groupOverview.placeholder = "グループの概要説明";

      filedset.addItem(this._groupOverview);
      this.root.appendChild(filedset);
    }

    // **************************************************
    // * アイテム
    // **************************************************

    /**
     * 空のアイテム一覧を追加します。
     * @private
     */
    #addEmptyGroupItems() {
      const filedset = ElmUtils.createElm("form-fieldset");
      filedset.title = "タスク一覧";

      this.table = ElmUtils.createElm("form-table");

      filedset.addItem(this.table);
      this.root.appendChild(filedset);
    }
  }
  customElements.define("contents-group", ContentsGroup);
}
