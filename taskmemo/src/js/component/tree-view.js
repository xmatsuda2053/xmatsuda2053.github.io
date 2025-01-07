import { Utils } from "../com/utils";
import styles from "../../style/css/tree-view.css";

export function TreeView() {
  /**
   * TreeView内のコンテンツ
   */
  class TreeView extends HTMLElement {
    /**
     * コンストラクタ
     */
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
      this.shadowRoot.adoptedStyleSheets = Utils.createStyle(styles);
      this.#addContextMenu();
      this.#addTreeView();
    }

    /**
     * タスククリック時の処理を設定
     * @param {method} handler クリック時の処理
     * @returns void
     * @public
     * @memberof TreeView
     */
    setTaskClickHandler(handler) {
      this.taskClickHandler = handler;
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

    async readTreeData() {
      await this.fileManager.readFile("tree.json").then((data) => {
        /**
         * ツリービューを再帰的に追加
         * @param {Element} item
         * @returns void
         * @private
         * @memberof TreeView
         */
        const addTreeViewFromData = (item) => {
          if (item.type === "task") {
            this.#addTask(item.name, item.id);
          } else {
            const group = this.#addGroup(item.name, item.id);
            // 子要素がある場合は再帰的に処理を行う
            if (item.childlen !== null) {
              item.childlen.forEach((child) => {
                this.#removeIdTarget();
                group.id = "target";
                addTreeViewFromData(child);
              });
            }
            group.open = false;
          }
        };

        // ファイルが存在しない場合は処理を終了
        if (data === null) {
          return;
        }

        // ツリービューを再帰的に追加する処理を呼び出し
        const treeData = JSON.parse(data);
        treeData.forEach((item) => {
          this.#removeIdTarget();
          addTreeViewFromData(item);
        });
      });

      //ツリービューの変更を検知する処理を設定
      this.#addTreeViewChangeHandler();
    }

    /**
     * TreeViewの変更を検知し、ファイルに保存する
     * @private
     * @returns void
     * @memberof TreeView
     */
    #addTreeViewChangeHandler() {
      const container = this.shadowRoot.getElementById("root");

      /**
       * TreeViewの変更を検知した際の処理
       */
      const callback = () => {
        /**
         * TreeViewの全要素を取得
         * @param {Element} nodes
         * @returns Array
         * @private
         */
        const getAllElement = (nodes) => {
          const elements = [];

          nodes.forEach((node) => {
            const dataItem = {
              id: node.dataset.id || null,
              name: node.dataset.name || null,
              type: node.dataset.type || null,
              childlen: null,
            };

            if (node.tagName === "DETAILS") {
              dataItem.childlen = getAllElement(node.childNodes);
              elements.push(dataItem);
            } else if (node.tagName === "P") {
              elements.push(dataItem);
            }
          });

          return elements;
        };

        // TreeViewの全要素を取得し、JSON形式に変換
        const treeData = getAllElement(container.childNodes);
        const treeDataJson = JSON.stringify(treeData);

        // ファイルに保存
        this.fileManager.saveFile("tree.json", treeDataJson);
      };

      const observer = new MutationObserver(callback);
      const config = {
        attributes: true,
        childList: true,
        subtree: true,
        characterData: true,
      };
      observer.observe(container, config);
    }

    /**
     * ターゲットのIDを削除
     * @private
     * @returns void
     * @memberof TreeView
     */
    #removeIdTarget() {
      const removeTarget = this.shadowRoot.getElementById("target");
      if (removeTarget !== null) {
        removeTarget.id = "";
      }
    }

    /**
     * コンテキストメニューを追加
     */
    #addContextMenu() {
      const btnAddTask = this.#createBtnAddTask();
      const btnAddGroup = this.#createBtnAddGroup();
      const btnChangeGroupName = this.#createChangeGroupName();
      const menu = this.#createMenu([
        btnAddTask,
        btnAddGroup,
        null,
        btnChangeGroupName,
      ]);
      const menuContainer = this.#createMenuContainer(menu);
      this.shadowRoot.appendChild(menuContainer);

      this.shadowRoot.addEventListener("contextmenu", (e) => {
        e.preventDefault();

        this.#removeIdTarget();
        if (e.target.classList.contains("tree-item")) {
          const details = e.target.closest("details");
          if (details !== null) {
            details.id = "target";
          }
        }

        menuContainer.style.display = "block";
        menu.style.left = `${e.pageX + 10}px`;
        menu.style.top = `${e.pageY - 20}px`;
      });
    }

    /**
     * 編集対象のターゲット項目を取得
     * @returns element
     */
    #getTarget() {
      const target =
        this.shadowRoot.getElementById("target") ||
        this.shadowRoot.getElementById("root");

      if (target.tagName === "DETAILS") {
        target.open = true;
      }

      return target;
    }

    /**
     * タスクを識別するためのユニークなIDを取得
     * @returns ID
     */
    #getUniqueId() {
      const randamStr = Math.floor(10000 * Math.random()).toString(16);
      const date = new Date();
      const systemDate =
        date.getFullYear() +
        String(date.getMonth() + 1).padStart(2, "0") +
        String(date.getDate()).padStart(2, "0") +
        String(date.getHours()).padStart(2, "0") +
        String(date.getMinutes()).padStart(2, "0") +
        String(date.getSeconds()).padStart(2, "0") +
        String(date.getMilliseconds()).padStart(3, "0");
      return `${systemDate}_${randamStr}`;
    }

    /**
     * 新規タスクの追加ボタンを作成
     * @returns タグ
     */
    #createBtnAddTask() {
      const btn = document.createElement("button");
      btn.innerText = "新しいタスク";

      btn.addEventListener("click", (e) => {
        e.preventDefault();
        this.#addTask("新規タスク", this.#getUniqueId());
      });

      return btn;
    }

    /**
     * タスクを追加する
     * @param {string} name
     * @param {string} id
     * @returns タグ
     * @private
     */
    #addTask(name, id) {
      const task = document.createElement("p");
      task.dataset.id = id;
      task.dataset.name = name;
      task.dataset.type = "task";

      const span = document.createElement("span");
      span.classList.add("tree-item", "name-text");
      span.innerText = name;

      task.appendChild(span);

      task.addEventListener("click", (e) => {
        e.preventDefault();

        this.taskClickHandler(task);
        this.#selectedTask(task);
      });

      const target = this.#getTarget();
      target.appendChild(task);

      this.taskClickHandler(task);
      this.#selectedTask(task);

      return task;
    }

    /**
     * タスク選択状態
     */
    #selectedTask(task) {
      this.removeSelectedTask();
      task.id = "selected-task";
    }

    /**
     * タスク選択状態を解除
     */
    removeSelectedTask() {
      const removeTarget = this.shadowRoot.getElementById("selected-task");
      if (removeTarget !== null) {
        removeTarget.id = "";
      }
    }

    /**
     * 新規グループの追加ボタンを作成
     * @returns タグ
     */
    #createBtnAddGroup() {
      const btn = document.createElement("button");
      btn.innerText = "新しいグループ";

      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const group = this.#addGroup("新規グループ", this.#getUniqueId());

        this.#hiddenMenu();

        this.#removeIdTarget();
        group.id = "target";
        this.#changeGroupName();
        this.#removeIdTarget();
      });

      return btn;
    }

    /**
     * グループを追加する
     * @param {string} name グループ名
     * @param {string} id グループID
     * @returns タグ
     * @private
     */
    #addGroup(name, id) {
      const groupName = document.createElement("summary");
      const span = document.createElement("span");
      span.classList.add("tree-item", "name-text", "group");
      span.innerText = name;
      groupName.appendChild(span);

      const group = document.createElement("details");
      group.appendChild(groupName);

      group.dataset.id = id;
      group.dataset.name = name;
      group.dataset.type = "group";

      const target = this.#getTarget();
      target.appendChild(group);

      return group;
    }

    /**
     * グループ名の変更ボタンを作成
     * @returns
     */
    #createChangeGroupName() {
      const btn = document.createElement("button");
      btn.innerText = "グループ名変更";

      btn.addEventListener("click", (e) => {
        e.preventDefault();
        this.#changeGroupName();
      });

      return btn;
    }

    #changeGroupName() {
      const target = this.#getTarget();
      if (target.tagName !== "DETAILS") {
        return;
      }

      const span = target.children[0].children[0];
      const name = target.dataset.name;

      const inputText = prompt("グループ名変更", name);
      if (inputText !== null) {
        target.dataset.name = inputText;
        span.innerText = inputText;
      }
    }

    /**
     * メニューを作成
     * @returns タグ
     */
    #createMenu(btns) {
      const menu = document.createElement("div");
      menu.classList.add("menu");
      btns.forEach((btn) => {
        if (btn !== null) {
          menu.appendChild(btn);
        } else {
          menu.appendChild(document.createElement("hr"));
        }
      });
      return menu;
    }

    /**
     * メニュー表示の際のコンテナを作成
     * @returns タグ
     */
    #createMenuContainer(menu) {
      const container = document.createElement("div");
      container.id = "menu-container";
      container.classList.add("menu-container");
      container.appendChild(menu);

      container.addEventListener("click", (e) => {
        e.preventDefault();
        this.#hiddenMenu();
      });

      return container;
    }

    #hiddenMenu() {
      const container = this.shadowRoot.getElementById("menu-container");
      container.style.display = "none";
    }

    /**
     * TreeViewを追加する
     */
    #addTreeView() {
      const container = document.createElement("div");
      container.classList.add("treeview");
      container.id = "root";

      this.shadowRoot.appendChild(container);
    }
  }

  /**
   * カスタム要素を定義
   */
  customElements.define("tree-view", TreeView);
}
