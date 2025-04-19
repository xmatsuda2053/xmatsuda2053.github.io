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
      this.root = ElmUtils.createElm("div", "root", ["contents-group"]);
      this.property = ElmUtils.createElm("div", "group-property", ["scroll"]);
      this.memo = ElmUtils.createElm("div", "group-memo", ["scroll"]);
      this.list = ElmUtils.createElm("div", "group-list", ["scroll"]);

      this.root.appendChild(this.property);
      this.root.appendChild(this.memo);
      this.root.appendChild(this.list);

      this.#addGroupId();
      this.#addGroupTitle();
      this.#addGroupOverview();
      this.#addFolderpath();

      this.shadowRoot.appendChild(this.root);

      // 変更イベントを伝播
      this.root.addEventListener(EventConst.CHANGE_FORM_ITEM_EVENT_NAME, () => {
        this.dispatchEvent(
          EventUtils.createEvent(EventConst.CHANGE_CONTENTS_GROUP_EVENT_NAME)
        );
      });
    }

    /**
     * リスト表示のみとするか設定します。
     * @param {boolean} val - true: リスト表示のみ, false: プロパティとメモを表示
     */
    set isListOnly(val) {
      this.root.classList.toggle("list-only", val);
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
      this._folderpath.value = data.folderpath || "";
      this._groupOverview.value = data.overview || "";
    }

    /**
     * グループ内のコンテンツデータを出力する。
     * @param {array} items
     * @param {string} caption - タイトル
     * @returns {void}
     */
    renderItems(items = [], caption = "タスク一覧") {
      if (items.length === 0) {
        return;
      }

      this.#addEmptyGroupItems();

      this.table.setCaption(SvgUtils.createIcon(SvgConst.TablePaths), caption);

      this.table.header = [
        "ID",
        "ステータス",
        "名称",
        "TODO",
        "優先度",
        "期日",
        "進捗率",
      ];

      const editName = (name, level) => {
        return level == 0 ? name : `+ ${name}`;
      };

      const getNameStyle = (level) => {
        return level == 0 ? "" : `padding-left: ${level}rem`;
      };

      items.forEach((item) => {
        if (item.type === "task") {
          // タスク
          const icon = SvgUtils.createIcon(item.paths);
          const priority = PriorityConst.text(item.priority) || "?";
          const todo = item.hasTodo
            ? SvgUtils.createIcon(SvgConst.FlagPath)
            : "";

          this.table.appendTr();

          // タスクの状態クラスを設定
          if (item.flag.isComplete) {
            this.table.setTrClass("complete");
          } else if (item.flag.isOverDeadline) {
            this.table.setTrClass("alert");
          }

          // ID
          this.table.addTd();
          this.table.setTdElment(item.id);
          this.table.setTdStyle("width: 150px");

          // ステータス
          this.table.addTd();
          this.table.setTdElment(icon);
          this.table.setTdStyle("width: 100px");
          this.table.setTdAlign("center");

          // タスク名
          this.table.addTd();
          this.table.setTdElment(editName(item.name, item.level));
          this.table.setTdStyle(getNameStyle(item.level));
          this.table.setTdClickEvent(() => {
            this.shadowRoot.dispatchEvent(
              EventUtils.createEvent(
                EventConst.CLICK_CONTENTS_GROUP_TASK_EVENT_NAME,
                {
                  id: item.id,
                  name: item.name,
                }
              )
            );
          });

          // TO.DO
          this.table.addTd();
          this.table.setTdElment(todo);
          this.table.setTdStyle("width: 80px; color: #0e7405");
          this.table.setTdAlign("center");

          const isNotDueDate = item.duedate !== "3000-12-31" ? false : true;

          // 優先度
          this.table.addTd();
          this.table.setTdElment(isNotDueDate ? "-" : priority);
          this.table.setTdStyle("width: 100px");
          this.table.setTdAlign("center");

          // 期日
          this.table.addTd();
          this.table.setTdElment(isNotDueDate ? "-" : item.duedate);
          this.table.setTdStyle("width: 100px");
          this.table.setTdAlign("center");

          // 進捗率
          this.table.addTd();
          this.table.setTdElment(isNotDueDate ? "-" : `${item.status}%`);
          this.table.setTdStyle("width: 100px");
          this.table.setTdAlign("center");
        } else {
          // グループ
          this.table.appendTr();

          // ID
          this.table.addTd();
          this.table.setTdElment(item.id);
          this.table.setTdStyle("width: 150px");

          // ステータス
          const icon = SvgUtils.createIcon(SvgConst.folderPaths);
          icon.style = "color: #E9762B";

          this.table.addTd();
          this.table.setTdElment(icon);
          this.table.setTdStyle("width: 100px");
          this.table.setTdAlign("center");

          // グループ名
          this.table.addTd();
          this.table.setTdElment(editName(item.name, item.level));
          this.table.setTdStyle(getNameStyle(item.level));
          this.table.setTdClickEvent(() => {
            this.shadowRoot.dispatchEvent(
              EventUtils.createEvent(
                EventConst.CLICK_CONTENTS_GROUP_GROUP_EVENT_NAME,
                {
                  id: item.id,
                  name: item.name,
                }
              )
            );
          });

          // TO.DO
          this.table.addTd();
          this.table.setTdElment("-");
          this.table.setTdStyle("width: 80px");
          this.table.setTdAlign("center");

          // 優先度
          this.table.addTd();
          this.table.setTdElment("-");
          this.table.setTdStyle("width: 100px");
          this.table.setTdAlign("center");

          // 期日
          this.table.addTd();
          this.table.setTdElment("-");
          this.table.setTdStyle("width: 100px");
          this.table.setTdAlign("center");

          // 進捗率
          this.table.addTd();
          this.table.setTdElment("-");
          this.table.setTdStyle("width: 100px");
          this.table.setTdAlign("center");
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
      dataItem.folderpath = this._folderpath.value || "";
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
      filedset.icon = SvgUtils.createIcon(SvgConst.TagPaths);
      filedset.title = "ID";

      this._groupId = ElmUtils.createElm("form-input", "id");
      this._groupId.title = "ID";
      this._groupId.readOnly = true;

      filedset.addItem(this._groupId);
      this.property.appendChild(filedset);
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
      filedset.icon = SvgUtils.createIcon(SvgConst.BookPaths);
      filedset.title = "グループ名";
      filedset.required = true;

      this._groupTitle = ElmUtils.createElm("form-input", "title");

      filedset.addItem(this._groupTitle);
      this.property.appendChild(filedset);
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
    // * 作業フォルダパス
    // **************************************************

    /**
     * 作業フォルダパスを追加します。
     * @private
     */
    #addFolderpath() {
      const filedset = ElmUtils.createElm("form-fieldset");
      filedset.icon = SvgUtils.createIcon(SvgConst.folderPaths);
      filedset.title = "作業フォルダパス";

      this._folderpath = ElmUtils.createElm("form-textarea", "folderpath");
      this._folderpath.rows = 3;
      this._folderpath.placeholder = "作業フォルダパス(E:\workspace)";
      this._folderpath.isFolderPath = true;

      filedset.addItem(this._folderpath);
      this.property.appendChild(filedset);
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
      filedset.icon = SvgUtils.createIcon(SvgConst.WitingPaths);
      filedset.title = "概要";

      this._groupOverview = ElmUtils.createElm("form-textarea", "overview");
      this._groupOverview.rows = 9;
      this._groupOverview.placeholder = "グループの概要説明";

      filedset.addItem(this._groupOverview);
      this.memo.appendChild(filedset);
    }

    // **************************************************
    // * アイテム
    // **************************************************

    /**
     * 空のアイテム一覧を追加します。
     * @private
     */
    #addEmptyGroupItems() {
      this.table = ElmUtils.createElm("form-table");
      this.list.appendChild(this.table);
    }
  }
  customElements.define("contents-group", ContentsGroup);
}
