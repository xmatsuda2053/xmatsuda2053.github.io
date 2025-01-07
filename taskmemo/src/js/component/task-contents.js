import { Utils } from "../com/utils";
import styles from "../../style/css/task-contents.css";

/**
 * タスク内容コンポーネント
 * @module ./assets/src/component/task-contents
 */
export function TaskContents() {
  /**
   * タスク内容
   * @memberof TaskContents
   * @extends HTMLElement
   * @class TaskContents
   */
  class TaskContents extends HTMLElement {
    /**
     * コンストラクタ
     * @returns {void}
     * @memberof TaskContents
     */
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
      this.shadowRoot.adoptedStyleSheets = Utils.createStyle(styles);
      this.#addForm();
    }

    /**
     * ファイルマネージャーを設定
     * @param {*} fileManager
     * @returns void
     * @public
     * @memberof TreeView
     */
    setFileManager(fileManager) {
      this.fileManager = fileManager;
    }

    /**
     * タスクデータを読み込み、画面に表示
     * @param {string} id
     * @returns {void}
     * @memberof TaskContents
     * @public
     * @async
     */
    async readTaskData(id) {
      const form = this.shadowRoot.getElementById("task-form");

      const checkeRadio = (id, value) => {
        const btns = form.elements[id];
        for (let radio of btns) {
          if (radio.value === value) {
            radio.checked = true;
            break;
          }
        }
      };

      const $ = (name) => {
        return form.elements[name];
      };

      // タスクデータを取得して表示
      await this.fileManager.readFile(`${id}.json`).then((data) => {
        if (data === null) {
          this.#setPriority();
          return;
        }

        const taskData = JSON.parse(data).taskData;

        $("title").value = taskData.title || "";
        $("duedate").value = taskData.dueDate || "";
        $("dev").value = taskData.dev || "";
        $("manager").value = taskData.manager || "";
        checkeRadio("urgency", taskData.urgency);
        checkeRadio("importance", taskData.importance);
        checkeRadio("status", taskData.status);
        $("tel").value = taskData.tel || "";
        $("folderpath").value = taskData.folderpath || "";
        $("url").value = taskData.url || "";
        $("option1").value = taskData.option1 || "";
        $("option2").value = taskData.option2 || "";
        $("option3").value = taskData.option3 || "";
        $("option4").value = taskData.option4 || "";
        $("option5").value = taskData.option5 || "";
        $("memo").value = taskData.memo || "";

        this.#setPriority();
        this.taskStatusChangeHander($("status").value);
        this.#adjustTextAreaRows($("folderpath"));
        this.#adjustTextAreaRows($("memo"));
        this.#updateDeadline();
      });

      /**
       * フォーム変更時の処理
       * @param {Event} e イベント
       * @returns {void}
       * @memberof TaskContents
       * @private
       */
      form.addEventListener("change", async (e) => {
        e.preventDefault();

        // カスタムイベントで変更を外部に伝播
        const event = new CustomEvent("formChangeEvent", {
          detail: { message: "Task Change." },
          bubbles: true,
          composed: true,
        });
        this.dispatchEvent(event);
      });
    }

    /**
     * フォーム入力内容を取得する。
     */
    getFormInputData() {
      const form = this.shadowRoot.getElementById("task-form");

      const $ = (name) => {
        return form.elements[name];
      };

      const formData = {
        title: $("title").value,
        dueDate: $("duedate").value,
        status: $("status").value,
        dev: $("dev").value,
        manager: $("manager").value,
        urgency: $("urgency").value,
        importance: $("importance").value,
        tel: $("tel").value,
        folderpath: $("folderpath").value,
        url: $("url").value,
        option1: $("option1").value,
        option2: $("option2").value,
        option3: $("option3").value,
        option4: $("option4").value,
        option5: $("option5").value,
        memo: $("memo").value,
      };

      return formData;
    }

    /**
     * フォーム追加
     * @private
     * @returns {void}
     * @memberof TaskContents
     */
    #addForm() {
      const title = this.#createTitle();
      const dueDate = this.#createDueDate();
      const status = this.#createStatus();
      const manager = this.#createManger();
      const folderPath = this.#createFolderPath();
      const url = this.#createURL();
      const option1 = this.#createOptionalItem("任意項目1", "option1");
      const option2 = this.#createOptionalItem("任意項目2", "option2");
      const option3 = this.#createOptionalItem("任意項目3", "option3");
      const option4 = this.#createOptionalItem("任意項目4", "option4");
      const option5 = this.#createOptionalItem("任意項目5", "option5");
      const memo = this.#createFreeMemo();
      const priprity = this.#createTaskPriority();

      const form = document.createElement("form");
      form.id = "task-form";
      form.appendChild(title);
      form.appendChild(dueDate);
      form.appendChild(manager);
      form.appendChild(priprity);
      form.appendChild(status);
      form.appendChild(folderPath);
      form.appendChild(url);
      form.appendChild(option1);
      form.appendChild(option2);
      form.appendChild(option3);
      form.appendChild(option4);
      form.appendChild(option5);
      form.appendChild(memo);

      this.shadowRoot.appendChild(form);
    }

    /**
     * 優先順位の判定結果を出力する
     * @returns {void}
     * @private
     * @memberof TaskContents
     */
    #setPriority() {
      const form = this.shadowRoot.getElementById("task-form");
      const importance = form.elements["importance"].value; // 重要度
      const urgency = form.elements["urgency"].value; // 緊急度
      const point = Number(`${importance}${urgency}`);

      let result = "";
      switch (point) {
        case 44:
        case 43:
        case 34:
        case 33:
          result = "優先順位１";
          break;
        case 42:
        case 41:
        case 32:
        case 31:
          result = "優先順位２";
          break;
        case 24:
        case 23:
        case 14:
        case 13:
          result = "優先順位３";
          break;
        case 22:
        case 21:
        case 12:
        case 11:
          result = "優先順位４";
          break;
        default:
          break;
      }
      form.elements["priority"].value = result;
    }

    /**
     * Form部品を格納するBoxを作成
     * @param {string} title タイトル
     * @param {boolean} isRequired 必須項目か否か
     * @returns {HTMLFieldSetElement} Box
     * @private
     * @memberof TaskContents
     */
    #createBox(title, isRequired) {
      const div = document.createElement("fieldset");
      if (title !== undefined) {
        const legend = document.createElement("legend");
        legend.innerText = title;

        if (isRequired) {
          const span = document.createElement("span");
          span.innerText = "必須";
          legend.appendChild(span);
        }

        div.appendChild(legend);
      }
      return div;
    }

    #createInnerBox() {
      const div = document.createElement("div");
      div.classList.add("inner-box");
      return div;
    }

    /**
     * ラベルを作成
     * @param {string} id ターゲットID
     * @param {string} lblText ラベルテキスト
     * @returns {HTMLLabelElement} ラベル
     * @private
     * @memberof TaskContents
     */
    #createLabel(id, lblText) {
      const lbl = document.createElement("label");
      lbl.htmlFor = id;
      lbl.innerText = lblText;
      lbl.classList.add("item-name");
      return lbl;
    }

    /**
     * 入力項目を作成
     * @param {string} type 入力タイプ
     * @param {string} name 名前
     * @param {string} id ID
     * @param {string} placeholder プレースホルダ
     * @returns {HTMLInputElement} 入力項目
     * @private
     * @memberof TaskContents
     */
    #createInput(type, name, id, placeholder) {
      const input = document.createElement("input");
      input.type = type;
      input.name = name;
      input.id = id;
      input.placeholder = placeholder;
      input.spellcheck = false;
      return input;
    }

    /**
     * テキストエリアを作成
     * @param {string} id ID
     * @param {number} rows 行数
     * @param {string} placeholder プレースホルダ
     * @returns {HTMLTextAreaElement} テキストエリア
     * @private
     * @memberof TaskContents
     */
    #createTextarea(id, rows, placeholder) {
      const textarea = document.createElement("textarea");
      textarea.id = id;
      textarea.rows = rows;
      textarea.dataset.rows = rows;
      textarea.placeholder = placeholder;
      textarea.spellcheck = false;

      textarea.addEventListener("keyup", (e) => {
        e.preventDefault();

        this.#adjustTextAreaRows(textarea);
      });

      return textarea;
    }

    #adjustTextAreaRows(target) {
      const rows = target.dataset.rows;
      target.rows = Math.max(target.value.split("\n").length + 1, rows);
    }

    /**
     * タイトルの入力欄を作成
     * @returns {HTMLFieldSetElement} タイトル
     * @private
     * @memberof TaskContents
     */
    #createTitle() {
      const input = this.#createInput("text", "title", "title", "xxxxxの作成");
      input.classList.add("large");

      input.addEventListener("change", (e) => {
        e.preventDefault();
        this.titleChangeHandler(e);
      });

      const box = this.#createBox("タイトル", true);
      box.appendChild(input);

      return box;
    }

    /**
     * タイトル変更時の処理を設定
     * @param {method} handler タイトル変更時の処理
     * @returns void
     * @memberof TaskContents
     */
    setTitleChangeHandler(handler) {
      this.titleChangeHandler = handler;
    }

    /**
     * 期限日の入力欄を作成
     * @returns {HTMLFieldSetElement} 期限日
     * @private
     * @memberof TaskContents
     */
    #createDueDate() {
      const box = this.#createBox("期限日", true);
      const innerBox1 = this.#createInnerBox();
      const innerbox2 = this.#createInnerBox();
      const input = this.#createInput("date", "duedate", "duedate");
      const deadline = this.#createInput("text", "deadline", "deadline", "");
      deadline.classList.add("ex-small");
      deadline.readOnly = true;

      input.addEventListener("change", () => {
        this.#updateDeadline();
      });

      innerBox1.appendChild(input);
      innerbox2.appendChild(deadline);

      box.appendChild(innerBox1);
      box.appendChild(innerbox2);

      return box;
    }

    /**
     * 残日数を更新
     */
    #updateDeadline() {
      const parseDate = (dateString) => {
        var parts = dateString.split("-");
        return new Date(parts[0], parts[1] - 1, parts[2]);
      };
      const getToday = () => {
        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth()).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return new Date(year, month, day);
      };

      const form = this.shadowRoot.getElementById("task-form");
      const input = form.elements["duedate"];
      const deadline = form.elements["deadline"];

      if (input.value === "") {
        deadline.value = "";
        return;
      }

      const inputData = parseDate(input.value);
      const today = getToday();
      const dayCount = Math.floor((inputData - today) / 86400000);

      if (dayCount >= 0) {
        deadline.value = `あと ${dayCount} 日`;
        deadline.style.color = "#000000";
      } else {
        deadline.value = `${parseInt(dayCount) * -1} 日 超過`;
        deadline.style.color = "#FF0000";
      }
    }

    /**
     * 進捗状況の入力欄を作成
     * @returns {HTMLFieldSetElement} 進捗状況
     * @private
     * @memberof TaskContents
     */
    #createStatus() {
      const perArray = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

      const box = this.#createBox("進捗率");
      const div = document.createElement("div");
      div.classList.add("radio-button", "large");

      perArray.forEach((per, index) => {
        const lbl = this.#createLabel(`status${per}`, `${per}%`);
        const input = this.#createInput("radio", "status", `status${per}`);
        input.value = per;

        if (index === 0) {
          lbl.classList.add("first");
          input.checked = true;
        } else if (index === perArray.length - 1) {
          lbl.classList.add("last");
        }

        input.addEventListener("change", (e) => {
          e.preventDefault();
          this.taskStatusChangeHander(e.target.value);
        });

        div.appendChild(lbl);
        div.appendChild(input);
      });
      box.appendChild(div);

      return box;
    }

    setStatusChangeHandler(handler) {
      this.taskStatusChangeHander = handler;
    }

    /**
     * 担当者の入力欄を作成
     * @returns {HTMLFieldSetElement} 担当者
     * @private
     * @memberof TaskContents
     */
    #createManger() {
      const box = this.#createBox("担当者", true);
      const managerArr = [
        {
          id: "dev",
          text: "所属",
          type: "text",
          size: "small",
          placeholder: "情報システム課",
        },
        {
          id: "manager",
          text: "氏名",
          type: "text",
          size: "ex-small",
          placeholder: "山田 太郎",
        },
        {
          id: "tel",
          text: "電話番号",
          type: "tel",
          size: "ex-small",
          placeholder: "03-1234-5678",
        },
      ];
      managerArr.forEach((v) => {
        const div = this.#createInnerBox();
        const lbl = this.#createLabel(v.id, v.text);
        const input = this.#createInput(v.type, v.id, v.id, v.placeholder);
        input.classList.add(v.size);

        div.appendChild(lbl);
        div.appendChild(input);

        box.appendChild(div);
      });

      return box;
    }

    /**
     * タスクの優先順位の入力欄を作成
     * @returns {HTMLFieldSetElement} 優先順位
     * @private
     * @memberof TaskContents
     */
    #createTaskPriority() {
      const box = this.#createBox("タスク優先順位");
      box.appendChild(this.#createImportance()); // 重要度
      box.appendChild(this.#createUrgency()); // 緊急度
      box.appendChild(this.#createPriorityResult());

      box.addEventListener("change", (e) => {
        e.preventDefault();
        this.#setPriority();
      });

      return box;
    }

    /**
     * 緊急度の入力欄を作成
     * @returns {HTMLFieldSetElement} 緊急度
     * @private
     * @memberof TaskContents
     */
    #createUrgency() {
      const radioButton = document.createElement("div");
      radioButton.classList.add("radio-button", "ex-small");

      const urgencyArray = [1, 2, 3, 4];
      urgencyArray.forEach((urgency, index) => {
        const lbl = this.#createLabel(`urgency${urgency}`, `${urgency}`);
        const input = this.#createInput(
          "radio",
          "urgency",
          `urgency${urgency}`
        );
        input.value = urgency;

        if (index === 0) {
          lbl.classList.add("first");
          input.checked = true;
        } else if (index === urgencyArray.length - 1) {
          lbl.classList.add("last");
        }

        radioButton.appendChild(lbl);
        radioButton.appendChild(input);
      });

      const innerBox = this.#createInnerBox();
      const itemName = this.#createLabel("", "緊急度");

      innerBox.appendChild(itemName);
      innerBox.appendChild(radioButton);

      return innerBox;
    }

    /**
     * 重要度の入力欄を作成
     * @returns {HTMLFieldSetElement} 重要度
     * @private
     * @memberof TaskContents
     */
    #createImportance() {
      const radioButton = document.createElement("div");
      radioButton.classList.add("radio-button", "ex-small");

      const importanceArray = [1, 2, 3, 4];
      importanceArray.forEach((importance, index) => {
        const lbl = this.#createLabel(
          `importance${importance}`,
          `${importance}`
        );
        const input = this.#createInput(
          "radio",
          "importance",
          `importance${importance}`
        );
        input.value = importance;

        if (index === 0) {
          lbl.classList.add("first");
          input.checked = true;
        } else if (index === importanceArray.length - 1) {
          lbl.classList.add("last");
        }

        radioButton.appendChild(lbl);
        radioButton.appendChild(input);
      });

      const innerBox = this.#createInnerBox();
      const itemName = this.#createLabel("", "重要度");

      innerBox.appendChild(itemName);
      innerBox.appendChild(radioButton);

      return innerBox;
    }

    /**
     * 優先順位の判定結果の出力欄
     * @returns
     * @private
     * @memberof TaskContents
     */
    #createPriorityResult() {
      const innerBox = this.#createInnerBox();
      const itemName = this.#createLabel("priority", "判定結果");

      const input = this.#createInput("text", "priority", "priority", "");
      input.classList.add("ex-small");
      input.readOnly = true;

      innerBox.appendChild(itemName);
      innerBox.appendChild(input);

      return innerBox;
    }

    /**
     * 作業フォルダの入力欄を作成
     * @returns {HTMLFieldSetElement} 作業フォルダ
     * @private
     * @memberof TaskContents
     */
    #createFolderPath() {
      const box = this.#createBox("作業フォルダ");
      const textarea = this.#createTextarea(
        "folderpath",
        3,
        "作業フォルダパス（E:workhoge)"
      );
      textarea.classList.add("large");

      box.appendChild(textarea);
      return box;
    }

    /**
     * URLの入力欄を作成
     * @returns {HTMLFieldSetElement} URL
     * @private
     * @memberof TaskContents
     */
    #createURL() {
      const box = this.#createBox("URL");
      const input = this.#createInput(
        "url",
        "url",
        "url",
        "https://example.com"
      );
      input.classList.add("large");

      box.appendChild(input);
      return box;
    }

    /**
     * 任意項目の入力欄を作成
     * @param {string} title タイトル
     * @param {string} id ID
     * @returns {HTMLFieldSetElement} 任意項目
     * @private
     * @memberof TaskContents
     */
    #createOptionalItem(title, id) {
      const box = this.#createBox(title);
      const input = this.#createInput("text", id, id, "任意項目");
      input.classList.add("middle");

      box.appendChild(input);
      return box;
    }

    /**
     * 自由記述の入力欄を作成
     * @returns {HTMLFieldSetElement} メモ
     * @private
     * @memberof TaskContents
     */
    #createFreeMemo() {
      const box = this.#createBox("自由記述");
      const textarea = this.#createTextarea("memo", 10, "その他の補足情報");
      textarea.classList.add("large");

      box.appendChild(textarea);
      return box;
    }
  }
  customElements.define("task-contents", TaskContents);
}
