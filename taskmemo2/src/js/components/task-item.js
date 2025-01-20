/**
 * 共通関数
 */
import { Utils } from "../common/utils";

/**
 * task-itemコンポーネント用のCSS
 */
import style from "../../style/css/task-item.css";

/**
 * TaskItem コンポーネントを作成しカスタム要素として定義する
 */
export function TaskItem() {
  /**
   * TaskItem コンポーネントのカスタム要素のクラス
   * @extends {HTMLElement}
   */
  class TaskItem extends HTMLElement {
    /**
     * コンストラクタ
     * @return {void}
     */
    constructor() {
      super();

      this.attachShadow({ mode: "open" });
      this.shadowRoot.adoptedStyleSheets =
        Utils.createStyleSheetWithFilename(style);

      this.shadowRoot.innerHTML = "";
      this.#addEmptyForm();
    }

    /**
     * 空のフォームを追加する
     * @return {void}
     * @private
     */
    #addEmptyForm() {
      const form = document.createElement("form");
      const id = this.#createIdViewer();
      const title = this.#createTitleInput();
      const dueDate = this.#createDueDate();
      const staff = this.#createStaff();
      const priority = this.#createPriority();
      const status = this.#createStatus();
      const memo = this.#createMemo();
      const folderpath = this.#createFolderPath();
      const url = this.#createURL();
      const option1 = this.#createOptionInput("option1", "任意項目１");
      const option2 = this.#createOptionInput("option2", "任意項目２");
      const option3 = this.#createOptionInput("option3", "任意項目３");
      const option4 = this.#createOptionInput("option4", "任意項目４");
      const option5 = this.#createOptionInput("option5", "任意項目５");
      const freenotes = this.#createFreeNotes();

      form.append(id); // 表示専用
      form.appendChild(title); // タイトル
      form.appendChild(dueDate); // 期限日
      form.appendChild(staff); // 担当者
      form.appendChild(priority); // 優先度
      form.appendChild(status); // 進捗率
      form.appendChild(memo); // 作業概要
      form.appendChild(folderpath); // 作業フォルダパス
      form.appendChild(url); // URL
      form.appendChild(option1); // 任意項目１
      form.appendChild(option2); // 任意項目２
      form.appendChild(option3); // 任意項目３
      form.appendChild(option4); // 任意項目４
      form.appendChild(option5); // 任意項目５
      form.appendChild(freenotes); // 作業メモ

      form.id = "task-form";
      this.shadowRoot.appendChild(form);
    }

    /**
     * 入力内容の変更を検知するイベントを有効化する
     */
    enableCustomEvent() {
      const form = this.#getElementById("task-form");
      form.addEventListener("changeTaskItem", () => {
        this.dispatchEvent(Utils.getCustomEvent("changeTask"));
      });
    }

    /**
     * 指定されたIDを持つ要素をshadow DOMから取得する。
     *
     * @param {string} id - 取得したい要素のID。
     * @returns {HTMLElement|null} 指定されたIDを持つ要素、または存在しない場合はnull。
     */
    #getElementById(id) {
      return this.shadowRoot.getElementById(id);
    }

    /**
     * データを元にTaskItemをレンダリングする
     * @param {Object} data taskData
     * @returns {void}
     */
    renderTaskItem(data) {
      // dev -> staffDiv
      // manager -> staffName
      // tel -> staffTel

      data.staffDiv = data.staffDiv || data.dev || "";
      data.staffName = data.staffName || data.manager || "";
      data.staffTel = data.staffTel || data.tel || "";

      this.#getElementById("title").value = data.title || "";
      this.#getElementById("due-date").value = data.dueDate || "";
      this.#getElementById("staff").divValue = data.staffDiv || "";
      this.#getElementById("staff").nameValue = data.staffName || "";
      this.#getElementById("staff").telValue = data.staffTel || "";
      this.#getElementById("priority").value = data.priority || "";
      this.#getElementById("status").value = data.status || "0";
      this.#getElementById("memo").value = data.memo || "";
      this.#getElementById("folderpath").value = data.folderpath || "";
      this.#getElementById("url").value = data.url || "";
      this.#getElementById("option1").value = data.option1 || "";
      this.#getElementById("option2").value = data.option2 || "";
      this.#getElementById("option3").value = data.option3 || "";
      this.#getElementById("option4").value = data.option4 || "";
      this.#getElementById("option5").value = data.option5 || "";
      this.#getElementById("freenotes").value = data.freenotes || "";

      this.#setDueDateFinishStatus();
    }

    /**
     * 各フォームフィールドからタスクデータを取得しJSONを返却する
     *
     * @returns {Object} タスクデータオブジェクトを返す。
     */
    getTaskData() {
      // タスクデータのオブジェクトを作成
      const formData = {
        title: this.#getElementById("title").value,
        dueDate: this.#getElementById("due-date").value,
        staffDiv: this.#getElementById("staff").divValue,
        staffName: this.#getElementById("staff").nameValue,
        staffTel: this.#getElementById("staff").telValue,
        priority: this.#getElementById("priority").value,
        status: this.#getElementById("status").value,
        memo: this.#getElementById("memo").value,
        folderpath: this.#getElementById("folderpath").value,
        url: this.#getElementById("url").value,
        option1: this.#getElementById("option1").value,
        option2: this.#getElementById("option2").value,
        option3: this.#getElementById("option3").value,
        option4: this.#getElementById("option4").value,
        option5: this.#getElementById("option5").value,
        freenotes: this.#getElementById("freenotes").value,
      };

      return formData;
    }

    //------------------------------
    //- ID
    //------------------------------
    #createIdViewer() {
      const id = document.createElement("parts-input");
      id.title = "管理番号";
      id.value = "";
      id.isReadOnly();
      id.inputWidth = "100%";

      id.id = "id";

      return Utils.wrapElementInItemDiv(id);
    }

    /**
     * IDフィールドに値を設定する
     * @param {string} value 設定値
     */
    setId(value) {
      this.#getElementById("id").value = value;
    }

    //------------------------------
    //- タイトル
    //------------------------------
    /**
     * タイトル入力フィールドを作成する
     * @returns {HTMLElementPartsInput} タイトル入力フィールドのカスタム要素
     * @private
     */
    #createTitleInput() {
      const title = document.createElement("parts-input");
      title.title = "タイトル";
      title.value = "";
      title.placeholder = "XXXXXの作成";
      title.setRequired();
      title.inputWidth = "100%";

      title.id = "title";

      return Utils.wrapElementInItemDiv(title);
    }

    /**
     * タイトルフィールドに値を設定する
     * @param {string} name 設定値
     */
    setTitle(name) {
      this.#getElementById("title").value = name;
    }

    /**
     * タイトル変更時に実行する処理を登録する。
     * @param {function} handler
     */
    setTitleChangeHandler(handler) {
      const title = this.#getElementById("title");
      title.addEventListener("changeTaskItem", () => {
        handler(title.value);
      });
    }

    /**
     * 期限日変更時に実行する処理を登録する。
     * @param {function} handler
     */
    setDueDateChangeHandler(handler) {
      const duedate = this.#getElementById("due-date");
      duedate.addEventListener("changeTaskItem", () => {
        handler(duedate.value);
      });
    }

    /**
     * 優先度変更時に実行する処理を登録する。
     * @param {function} handler
     */
    setPriorityChangeHandler(handler) {
      const priority = this.#getElementById("priority");
      priority.addEventListener("changeTaskItem", () => {
        handler(priority.value);
      });
    }

    /**
     * 進捗率変更時に実行する処理を登録する。
     * @param {function} handler
     */
    setStatusChangeHandler(handler) {
      const status = this.#getElementById("status");
      status.addEventListener("changeTaskItem", () => {
        handler(status.value);
      });
    }

    //------------------------------
    //- 期限日
    //------------------------------
    /**
     * 期限日入力フィールドを作成する
     * @returns {HTMLElementPartsDuDate} 期限日入力フィールドのカスタム要素
     * @private
     */
    #createDueDate() {
      const duedate = document.createElement("parts-due-date");
      duedate.setRequired();
      duedate.id = "due-date";

      return Utils.wrapElementInItemDiv(duedate);
    }

    //------------------------------
    //- 担当者
    //------------------------------
    /**
     * 担当者入力フィールドを作成する
     * @returns {HTMLElementPartsStaff} 担当者入力フィールドのカスタム要素
     * @private
     */
    #createStaff() {
      const staff = document.createElement("parts-staff");
      staff.setRequired();
      staff.id = "staff";

      return Utils.wrapElementInItemDiv(staff);
    }

    //------------------------------
    //- 優先度
    //------------------------------
    /**
     * 優先度入力フィールドを作成する
     * @returns {HTMLElementPartsPriority} 優先度入力フィールドのカスタム要素
     * @private
     */
    #createPriority() {
      const priority = document.createElement("parts-radio");
      priority.id = "priority";
      priority.title = "優先度";
      priority.setRequired();

      //priority.btnWidth = "3rem";
      priority.item = [
        { value: 5, text: "最低" },
        { value: 4, text: "低" },
        { value: 3, text: "中" },
        { value: 2, text: "高" },
        { value: 1, text: "最高" },
      ];

      return Utils.wrapElementInItemDiv(priority);
    }

    //------------------------------
    //- 進捗率
    //------------------------------
    /**
     * 進捗率入力フィールドを作成する
     * @returns {HTMLElementPartsStatus} 進捗率入力フィールドのカスタム要素
     * @private
     */
    #createStatus() {
      const status = document.createElement("parts-radio");
      status.id = "status";
      status.title = "進捗率";

      //status.btnWidth = "3rem";
      status.item = [
        { value: 0, text: "0%", isChecked: true },
        { value: 10, text: "10%" },
        { value: 20, text: "20%" },
        { value: 30, text: "30%" },
        { value: 40, text: "40%" },
        { value: 50, text: "50%" },
        { value: 60, text: "60%" },
        { value: 70, text: "70%" },
        { value: 80, text: "80%" },
        { value: 90, text: "90%" },
        { value: 100, text: "100%" },
      ];

      // 進捗率変更時の処理
      status.addEventListener("changeTaskItem", () => {
        this.#setDueDateFinishStatus();
      });

      return Utils.wrapElementInItemDiv(status);
    }

    /**
     * タスク終了の場合、期限日にその旨を設定する
     */
    #setDueDateFinishStatus() {
      const status = this.#getElementById("status");
      const dueDate = this.#getElementById("due-date");

      if (status.value === "100") {
        dueDate.isFinish = true;
      } else {
        dueDate.isFinish = false;
      }
    }

    //------------------------------
    //- 作業概要
    //------------------------------
    /**
     * 作業概要入力フィールドを作成する
     * @returns {HTMLElementPartsTextarea} 作業概要入力フィールドのカスタム要素
     * @private
     */
    #createMemo() {
      const memo = document.createElement("parts-textarea");
      memo.id = "memo";
      memo.title = "作業概要";
      memo.textareaWidth = "100%";
      memo.textareaRows = "10";
      memo.placeholder = "タスクに関する概要説明";

      return Utils.wrapElementInItemDiv(memo);
    }

    //------------------------------
    //- 作業フォルダパス
    //------------------------------
    /**
     * 作業フォルダパス入力フィールドを作成する
     * @returns {HTMLElementPartsTextarea} 作業フォルダパス入力フィールドのカスタム要素
     * @private
     */
    #createFolderPath() {
      const folderpath = document.createElement("parts-textarea");
      folderpath.id = "folderpath";
      folderpath.title = "作業フォルダパス";
      folderpath.textareaWidth = "100%";
      folderpath.textareaRows = "3";
      folderpath.placeholder = "作業フォルダパス(E:workspace)";

      return Utils.wrapElementInItemDiv(folderpath);
    }

    //------------------------------
    //- URL
    //------------------------------
    /**
     * URL入力フィールドを作成する
     * @returns {HTMLElementPartsTextarea} URL入力フィールドのカスタム要素
     * @private
     */
    #createURL() {
      const url = document.createElement("parts-textarea");
      url.id = "url";
      url.title = "URL";
      url.textareaWidth = "100%";
      url.textareaRows = "3";
      url.placeholder = "https://example.com";

      return Utils.wrapElementInItemDiv(url);
    }

    //------------------------------
    //- 任意項目
    //------------------------------
    /**
     * 任意項目入力フィールドを作成する
     * @param {string} id
     * @param {string} title
     * @returns {HTMLElementPartsInput} 任意項目入力フィールドのカスタム要素
     * @private
     */
    #createOptionInput(id, title) {
      const input = document.createElement("parts-input");
      input.id = id;
      input.title = title;
      input.inputWidth = "75%";
      input.placeholder = "任意入力";

      return Utils.wrapElementInItemDiv(input);
    }

    //------------------------------
    //- 作業メモ
    //------------------------------
    /**
     * 作業メモ入力フィールドを作成する
     * @returns {HTMLElementPartsTextarea} 作業メモ入力フィールドのカスタム要素
     * @private
     */
    #createFreeNotes() {
      const memo = document.createElement("parts-textarea");
      memo.id = "freenotes";
      memo.title = "作業メモ";
      memo.textareaWidth = "100%";
      memo.textareaRows = "10";
      memo.placeholder = "自由記述欄";

      return Utils.wrapElementInItemDiv(memo);
    }
  }

  // カスタム要素 "task-item" を定義する
  customElements.define("task-item", TaskItem);
}
