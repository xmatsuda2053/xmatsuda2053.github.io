import { ElmUtils } from "../../utils/elm-utils";
import { SvgUtils } from "../../utils/svg-utils";
import { SvgConst } from "../../constants/svg-const";
import { EventUtils } from "../../utils/event-utils";
import { EventConst } from "../../constants/event-const";
import { PriorityConst } from "../../constants/priority-const";

import styles from "./style/contents-task.css";

/**
 * ContentsTask コンポーネント
 * @class ContentsTask
 * @extends {HTMLElement}
 */
export function ContentsTask() {
  class ContentsTask extends HTMLElement {
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
      this.root = ElmUtils.createElm("div", "root", ["contents-task"]);
      this.property = ElmUtils.createElm("div", "task-property", ["scroll"]);
      this.history = ElmUtils.createElm("div", "task-history", ["scroll"]);

      this.root.appendChild(this.property);
      this.root.appendChild(this.history);

      this.#addTaskId();
      this.#addTaskTitle();
      this.#addTaskDueDate();
      this.#addStaff();
      this.#addPriority();
      this.#addStatus();
      this.#addMemo();
      this.#addFolderpath();
      this.#addUrl();
      this.#addFreenotes();
      this.#addHistory();

      this.shadowRoot.appendChild(this.root);

      // 変更イベントを伝播
      this.root.addEventListener(EventConst.CHANGE_FORM_ITEM_EVENT_NAME, () => {
        this.dispatchEvent(
          EventUtils.createEvent(EventConst.CHANGE_CONTENTS_TASK_EVENT_NAME)
        );
      });
    }

    // **************************************************
    // * タスクデータの入出力
    // **************************************************
    /**
     * タスクのプロパティ情報を画面出力する
     * @param {string} jsonStr
     * @returns {void}
     */
    render(jsonStr) {
      if (!jsonStr) {
        return;
      }
      const data = JSON.parse(jsonStr);
      this._taskTitle.value = data.taskData.title;
      this._taskDueDate.value = data.taskData.dueDate;
      this._staffDiv.value = data.taskData.staffDiv;
      this._staffName.value = data.taskData.staffName;
      this._staffTel.value = data.taskData.staffTel;
      this._priority.value = data.taskData.priority;
      this._status.value = data.taskData.status;
      this._memo.value = data.taskData.memo;
      this._folderpath.value = data.taskData.folderpath;
      this._url.value = data.taskData.url;
      this._freenotes.value = data.taskData.freenotes;

      this._historyContents.render(this._taskId.value, data);
    }

    /**
     * タスクのプロパティデータを取得する。
     * @returns {object} - タスクデータ
     */
    getData() {
      return {
        taskData: {
          title: this._taskTitle.value,
          dueDate: this._taskDueDate.value,
          staffDiv: this._staffDiv.value,
          staffName: this._staffName.value,
          staffTel: this._staffTel.value,
          priority: this._priority.value,
          status: this._status.value,
          memo: this._memo.value,
          folderpath: this._folderpath.value,
          url: this._url.value,
          freenotes: this._freenotes.value,
        },
        historyData: this._historyContents.getData(),
      };
    }

    // **************************************************
    // * タスクID
    // **************************************************

    /**
     * 新しい入力IDを作成し、ルートエレメントに追加するメソッド。
     */
    #addTaskId() {
      const filedset = ElmUtils.createElm("form-fieldset");
      filedset.icon = SvgUtils.createIcon(SvgConst.TagPaths);
      filedset.title = "ID";

      this._taskId = ElmUtils.createElm("form-input", "id");
      this._taskId.title = "ID";
      this._taskId.readOnly = true;

      filedset.addItem(this._taskId);
      this.property.appendChild(filedset);
    }

    /**
     * タスクIDを設定するセッターメソッド。
     * このメソッドは、指定された値を`taskId`エレメントの値として設定します。
     *
     * @param {string} val - 設定するタスクIDの値。
     */
    set taskId(val) {
      this._taskId.value = val;
    }

    // **************************************************
    // * タスク名
    // **************************************************
    /**
     * 新しい入力タイトルを作成し、ルートエレメントに追加するメソッド。
     */
    #addTaskTitle() {
      const filedset = ElmUtils.createElm("form-fieldset");
      filedset.icon = SvgUtils.createIcon(SvgConst.BookPaths);
      filedset.title = "タスク名";
      filedset.required = true;

      this._taskTitle = ElmUtils.createElm("form-input", "title");
      this._taskTitle.placeholder = "任意のタスク名";

      filedset.addItem(this._taskTitle);
      this.property.appendChild(filedset);
    }

    /**
     * タスクタイトルを設定するセッターメソッド。
     * このメソッドは、指定された値を`taskTitle`エレメントの値として設定します。
     *
     * @param {string} val - 設定するタスクタイトルの値。
     */
    set taskTitle(val) {
      this._taskTitle.value = val;
    }

    // **************************************************
    // * 期限日
    // **************************************************
    /**
     * 新しい期限日を作成し、ルートエレメントに追加するメソッド。
     */
    #addTaskDueDate() {
      const filedset = ElmUtils.createElm("form-fieldset");
      filedset.icon = SvgUtils.createIcon(SvgConst.DueDatePaths);
      filedset.title = "期限日";
      filedset.required = true;

      this._taskDueDate = ElmUtils.createElm("form-date", "due-date");

      filedset.addItem(this._taskDueDate);
      this.property.appendChild(filedset);
    }

    // **************************************************
    // * 担当者
    // **************************************************
    /**
     * 新しい担当者を作成し、ルートエレメントに追加するメソッド。
     */
    #addStaff() {
      const filedset = ElmUtils.createElm("form-fieldset");
      filedset.icon = SvgUtils.createIcon(SvgConst.CirclesPaths);
      filedset.title = "担当者";
      filedset.required = true;

      // 担当者の所属
      const fildsetStaffDiv = ElmUtils.createElm("form-fieldset");
      this._staffDiv = ElmUtils.createElm("form-input", "staff-div");

      fildsetStaffDiv.addItem(this._staffDiv);
      fildsetStaffDiv.icon = SvgUtils.createIcon(SvgConst.WallpaperPaths);
      fildsetStaffDiv.title = "所属";
      this._staffDiv.placeholder = "情報システム課";

      // 担当者の氏名
      const fildsetStaffName = ElmUtils.createElm("form-fieldset");
      fildsetStaffName.icon = SvgUtils.createIcon(SvgConst.UserPaths);
      this._staffName = ElmUtils.createElm("form-input", "staff-name");

      fildsetStaffName.addItem(this._staffName);
      fildsetStaffName.title = "氏名";
      this._staffName.placeholder = "日本 太郎";

      // 担当者の電話番号
      const fildsetStaffTel = ElmUtils.createElm("form-fieldset");
      fildsetStaffTel.icon = SvgUtils.createIcon(SvgConst.PhoneCallPaths);
      this._staffTel = ElmUtils.createElm("form-input", "staff-tel");

      fildsetStaffTel.addItem(this._staffTel);
      fildsetStaffTel.title = "電話番号";
      this._staffTel.placeholder = "0123-45-6789";

      // プロパティ画面に追加
      filedset.addItem(fildsetStaffDiv);
      filedset.addItem(fildsetStaffName);
      filedset.addItem(fildsetStaffTel);

      this.property.appendChild(filedset);
    }

    // **************************************************
    // * 優先度
    // **************************************************

    /**
     * 新しい優先度を作成し、ルートエレメントに追加するメソッド。
     */
    #addPriority() {
      const filedset = ElmUtils.createElm("form-fieldset");
      filedset.icon = SvgUtils.createIcon(SvgConst.AntennaPaths);
      filedset.title = "優先度";
      filedset.required = true;

      this._priority = ElmUtils.createElm("form-radio", "priority");
      this._priority.items = PriorityConst.PARAM;

      filedset.addItem(this._priority);
      this.property.appendChild(filedset);
    }

    // **************************************************
    // * 進捗率
    // **************************************************
    /**
     * 新しい進捗率を作成し、ルートエレメントに追加するメソッド。
     */
    #addStatus() {
      const filedset = ElmUtils.createElm("form-fieldset");
      filedset.icon = SvgUtils.createIcon(SvgConst.PercentagePaths);
      filedset.title = "進捗率";

      this._status = ElmUtils.createElm("form-radio", "status");
      this._status.items = [
        { value: "0", text: "0%" },
        { value: "10", text: "10%" },
        { value: "20", text: "20%" },
        { value: "30", text: "30%" },
        { value: "40", text: "40%" },
        { value: "50", text: "50%" },
        { value: "60", text: "60%" },
        { value: "70", text: "70%" },
        { value: "80", text: "80%" },
        { value: "90", text: "90%" },
        { value: "100", text: "100%" },
      ];

      this._status.value = "0";

      filedset.addItem(this._status);
      this.property.appendChild(filedset);
    }

    // **************************************************
    // * 概要
    // **************************************************

    /**
     * タスクの概要を追加します。
     * @private
     */
    #addMemo() {
      const filedset = ElmUtils.createElm("form-fieldset");
      filedset.icon = SvgUtils.createIcon(SvgConst.WitingPaths);
      filedset.title = "作業概要";

      this._memo = ElmUtils.createElm("form-textarea", "memo");
      this._memo.rows = 8;
      this._memo.placeholder = "タスクの概要説明";

      filedset.addItem(this._memo);
      this.property.appendChild(filedset);
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
    // * URL
    // **************************************************

    /**
     * URLを追加します。
     * @private
     */
    #addUrl() {
      const filedset = ElmUtils.createElm("form-fieldset");
      filedset.icon = SvgUtils.createIcon(SvgConst.WebhookPaths);
      filedset.title = "URL";

      this._url = ElmUtils.createElm("form-textarea", "url");
      this._url.rows = 3;
      this._url.placeholder = "https://example.com";
      this._url.isURL = true;

      filedset.addItem(this._url);
      this.property.appendChild(filedset);
    }

    // **************************************************
    // * 自由記述欄
    // **************************************************

    /**
     * 自由記述欄を追加します。
     * @private
     */
    #addFreenotes() {
      const filedset = ElmUtils.createElm("form-fieldset");
      filedset.icon = SvgUtils.createIcon(SvgConst.WitingPaths);
      filedset.title = "自由記述欄";

      this._freenotes = ElmUtils.createElm("form-textarea", "freenotes");
      this._freenotes.rows = 8;
      this._freenotes.placeholder = "etc";

      filedset.addItem(this._freenotes);
      this.property.appendChild(filedset);
    }

    // **************************************************
    // * 作業履歴
    // **************************************************
    /**
     * 作業履歴を追加します。
     * @private
     */
    #addHistory() {
      this._historyContents = ElmUtils.createElm("contents-history");
      this.history.appendChild(this._historyContents);

      // 更新イベントを連携
      this._historyContents.addEventListener(
        EventConst.CHANGE_FORM_ITEM_EVENT_NAME,
        (e) => {
          this.dispatchEvent(
            EventUtils.createEvent(EventConst.CHANGE_FORM_ITEM_EVENT_NAME)
          );
        }
      );

      // 履歴追加イベントを連携
      this._historyContents.addEventListener(
        EventConst.ADD_HISTORY_CONTENTS_EVENT_NAME,
        (e) => {
          this.#scrollBottomHistory();
        }
      );
    }

    /**
     * 履歴を末尾までスクロールする。
     */
    #scrollBottomHistory() {
      const bottom = this.history.scrollHeight - this.history.clientHeight;
      this.history.scrollTo({ top: bottom, behavior: "smooth" });
    }
  }
  customElements.define("contents-task", ContentsTask);
}
