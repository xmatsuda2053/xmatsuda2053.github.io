/**
 * 共通関数
 */
import { Utils } from "../common/utils";

/**
 * tree-viewコンポーネント用のCSS
 */
import style from "../../style/css/tree-view.css";

/**
 * TreeView コンポーネントを作成しカスタム要素として定義する
 */
export function TreeView() {
  /**
   * TreeView コンポーネントのカスタム要素のクラス
   * @extends {HTMLElement}
   */
  class TreeView extends HTMLElement {
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
      this.#addEmptyTreeView();
      this.#addMenu();
    }

    /**
     * 空のTreeViewを作成する
     * @return {void}
     */
    #addEmptyTreeView() {
      const treeViewRoot = document.createElement("div");
      treeViewRoot.id = "root";

      this.shadowRoot.appendChild(treeViewRoot);
    }

    /**
     * TreeViewのコンテキストメニューを追加する
     * @return {void}
     */
    #addMenu() {
      // SVGアイコンを作成する
      const svgIconFilePlus = Utils.createSvg("file-plus", [
        { path: "M0 0h24v24H0z" },
        { path: "M14 3v4a1 1 0 0 0 1 1h4" },
        {
          path: "M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z",
        },
        { path: "M12 11l0 6" },
        { path: "M9 14l6 0" },
      ]);

      const svgIconFolderPlus = Utils.createSvg("folder-plus", [
        { path: "M0 0h24v24H0z" },
        {
          path: "M12 19h-7a2 2 0 0 1 -2 -2v-11a2 2 0 0 1 2 -2h4l3 3h7a2 2 0 0 1 2 2v3.5",
        },
        {
          path: "M16 19h6",
        },
        { path: "M19 16v6" },
      ]);

      const svgIconTablerWriting = Utils.createSvg("tabler-writing", [
        { path: "M0 0h24v24H0z" },
        {
          path: "M20 17v-12c0 -1.121 -.879 -2 -2 -2s-2 .879 -2 2v12l2 2l2 -2z",
        },
        {
          path: "M16 7h4",
        },
        { path: "M18 19h-13a2 2 0 1 1 0 -4h4a2 2 0 1 0 0 -4h-3" },
      ]);

      // メニューを作成する
      const container = document.createElement("div");
      container.id = "context-menu-container";

      const menu = document.createElement("div");
      menu.id = "context-menu";

      const btnAddTask = Utils.createSvgButton("file-plus");
      btnAddTask.appendChild(document.createTextNode("新しいタスク"));
      btnAddTask.id = "btn-add-task";

      const btnAddGroup = Utils.createSvgButton("folder-plus");
      btnAddGroup.appendChild(document.createTextNode("新しいグループ"));
      btnAddGroup.id = "btn-add-group";

      const btnChangeGroupName = Utils.createSvgButton("tabler-writing");
      btnChangeGroupName.appendChild(
        document.createTextNode("グループ名を変更")
      );
      btnChangeGroupName.id = "btn-change-group-name";

      const hr = document.createElement("hr");

      menu.appendChild(btnAddTask);
      menu.appendChild(hr);
      menu.appendChild(btnAddGroup);
      menu.appendChild(btnChangeGroupName);

      container.appendChild(menu);
      container.appendChild(svgIconFilePlus);
      container.appendChild(svgIconFolderPlus);
      container.appendChild(svgIconTablerWriting);

      this.shadowRoot.appendChild(container);

      /**
       * 右クリックメニューを開く
       * @return {void}
       */
      this.shadowRoot.addEventListener("contextmenu", (e) => {
        e.preventDefault();
        e.stopPropagation();

        this.elmEditTarget = e.target.closest("details");
        if (!this.elmEditTarget) {
          this.elmEditTarget = this.shadowRoot.getElementById("root");
        } else {
          this.elmEditTarget.open = true;
        }

        container.style.display = "block";
        menu.style.left = `${e.pageX + 10}px`;
        menu.style.top = `${e.pageY - 20}px`;
      });

      /**
       * 右クリックメニューを閉じる
       * @return {void}
       */
      container.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        container.style.display = "none";
        this.elmEditTarget = "";
      });

      /**
       * 新しいタスクを追加する処理
       * @return {void}
       */
      btnAddTask.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();

        const name = prompt("タスク名設定", "新規タスク");
        if (name) {
          const id = Utils.getUniqueId();
          const task = this.#createTask(name, id);
          this.elmEditTarget.appendChild(task);
          this.addTaskEventHandler(id, name, task);
          this.#setSelected(task);
          this.dispatchEvent(Utils.getCustomEvent("addItem"));
        }

        container.click();
      });

      /**
       * 新しいグループを追加する処理
       * @return {void}
       */
      btnAddGroup.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();

        const name = prompt("グループ名設定", "新規グループ");
        if (name) {
          const id = Utils.getUniqueId();
          const group = this.#createGroup(name, id);
          this.elmEditTarget.appendChild(group);
          this.dispatchEvent(Utils.getCustomEvent("addItem"));
        }

        container.click();
      });

      /**
       * グループ名を変更する処理
       * @return {void}
       */
      btnChangeGroupName.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (this.elmEditTarget.tagName === "DETAILS") {
          const summary = this.elmEditTarget.children[0];
          const inputText = prompt("グループ名変更", summary.innerText);
          if (inputText !== null) {
            this.elmEditTarget.dataset.name = inputText;
            summary.innerText = inputText;
            this.dispatchEvent(Utils.getCustomEvent("addItem"));
          }
        }

        container.click();
      });
    }

    /**
     * タスク要素を作成する
     * @param {string} name タスクの名前
     * @param {string} id タスクのID
     * @param {string[]} classList タスクに追加するクラスリスト
     * @returns {HTMLParagraphElement} 作成されたタスク要素
     * @private
     */
    #createTask(name, id, classList = []) {
      const task = document.createElement("p");
      task.innerText = name;
      task.dataset.id = id;
      task.dataset.name = name;
      task.dataset.type = "task";
      task.classList.add(...classList);

      // タスクを開く処理
      task.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.#setSelected(task);
        this.clickTaskEventHandler(id, task);
      });

      return task;
    }

    /**
     * タスクボタンに選択中を示すクラスを設定
     * @param {HTMLElement} task
     */
    #setSelected(task) {
      const root = this.shadowRoot.getElementById("root");
      const beforeTasks = root.getElementsByClassName("selected");
      if (beforeTasks.length !== 0) {
        beforeTasks[0].classList.remove("selected");
      }
      task.classList.add("selected");
    }

    /**
     * タスクを追加するイベントハンドラーを設定する
     * @param {Function} handler タスク追加時に実行されるイベントハンドラー
     * @returns {void}
     */
    registerAddTaskHandler(handler) {
      this.addTaskEventHandler = handler;
    }

    /**
     * グループ要素を作成する
     * @param {string} name グループの名前
     * @param {string} id グループのID
     * @param {string[]} classList グループに追加するクラスリスト
     * @returns {HTMLElement} 作成されたグループ要素
     * @private
     */
    #createGroup(name, id, classList = []) {
      const details = document.createElement("details");
      const summary = document.createElement("summary");

      details.dataset.id = id;
      details.dataset.name = name;
      details.dataset.type = "group";
      details.classList.add(...classList);

      summary.innerText = name;

      details.appendChild(summary);

      return details;
    }

    /**
     * JSON文字列を元にTreeViewをレンダリングする
     * @param {string} jsonStr JSONデータの文字列
     * @returns {void}
     */
    renderTreeView(jsonStr) {
      const root = this.shadowRoot.getElementById("root");
      const treeData = JSON.parse(jsonStr);

      treeData.forEach((data) => {
        this.#addTreeViewItems(root, data);
      });
    }

    /**
     * Jsonデータを元にTreeViewに項目を追加する
     * @param {HTMLElement} root 追加先のルート要素
     * @param {object} data 追加するデータ
     * @returns {void}
     * @private
     */
    #addTreeViewItems(root, data) {
      if (data.type === "task") {
        const task = this.#createTask(data.name, data.id, data.cls || []);
        root.appendChild(task);
        task.addEventListener("click", () => {
          this.clickTaskEventHandler(data.id, task); // タスクを開く
        });
      } else {
        const group = this.#createGroup(data.name, data.id, data.cls || []);
        root.appendChild(group);

        // TODO: スペルミス対応（JSON修正後に消す）
        const array = data.children || data.childlen || [];

        (array || []).forEach((child) => {
          this.#addTreeViewItems(group, child);
        });
      }
    }

    /**
     * タスククリックのイベントハンドラーを設定する
     * @param {Function} handler タスククリック時に実行されるイベントハンドラー
     * @returns {void}
     */
    registerClickTaskHandler(handler) {
      this.clickTaskEventHandler = handler;
    }

    /**
     * ツリービューのデータを取得する
     *
     * @returns {string} ツリーデータのJSON文字列を返す。
     */
    getTreeViewData() {
      const root = this.shadowRoot.getElementById("root");
      const treeData = this.#getAllElement(root.childNodes);
      return treeData;
    }

    /**
     * ノードリストから全ての要素を再帰的に取得する。
     *
     * @param {NodeList} nodes - 処理するノードリスト。
     * @returns {Array} 処理結果の要素リストを返す。
     */
    #getAllElement(nodes) {
      const elements = [];

      nodes.forEach((node) => {
        const dataItem = {
          id: node.dataset.id || null,
          name: node.dataset.name || null,
          type: node.dataset.type || null,
          cls: Array.from(node.classList) || [], // クラスリストを配列として保存
          children: null, // プロパティ名のスペルを修正
        };

        // DETAILS タグの場合、子要素を再帰的に取得
        if (node.tagName === "DETAILS") {
          dataItem.children = this.#getAllElement(node.childNodes);
        }

        // データをリストに追加
        if (node.tagName === "DETAILS" || node.tagName === "P") {
          elements.push(dataItem);
        }
      });

      return elements;
    }
  }

  // カスタム要素 "tree-view" を定義する
  customElements.define("tree-view", TreeView);
}
