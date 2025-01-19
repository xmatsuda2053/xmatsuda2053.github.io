/**
 * 共通関数
 */
import { Utils } from "../common/utils";
import { SvgIcon } from "../common/svgIcon";

/**
 * tree-viewコンポーネント用のCSS
 */
import style from "../../style/css/tree-view.css";

/**
 * TreeViewの基点
 */
const treeViewRoot = Utils.createElm("div", "root");

/**
 * メニュー起動時の背景要素（メニューを閉じるイベント起動用）
 */
const contextMenuContainer = Utils.createElm("div", "context-menu-container");

/**
 * メニュー本体
 */
const contextMenu = Utils.createElm("div", "context-menu");

/**
 * ドラッグ操作中の要素
 */
let draggedElement;

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
      this.shadowRoot.appendChild(treeViewRoot);

      this.#addEmptyMenu();
      this.#attachAddTaskButtonToMenu();
      this.#attachBorderToMenu();
      this.#attachAddGroupButtonToMenu();
      this.#attachChangeGroupNameButtonToMenu();
    }

    //--------------------------------------------------
    //- メニューのベース
    //--------------------------------------------------

    /**
     * 空のコンテキストメニューを追加する。
     * @return {void}
     */
    #addEmptyMenu() {
      contextMenuContainer.appendChild(contextMenu);
      this.shadowRoot.appendChild(contextMenuContainer);

      /**
       * メニューを開く処理を追加
       * @return {void}
       */
      this.shadowRoot.addEventListener("contextmenu", (e) => {
        e.preventDefault();
        e.stopPropagation();

        // メニューを開いた際の対象を取得
        this.editTarget = e.target.closest("details");

        if (this.editTarget) {
          // グループ上でメニューを開いた場合、グループを開く
          this.editTarget.open = true;
        } else {
          // グループ以外の場合は、TreeViewの基点を取得
          this.editTarget = treeViewRoot;
        }

        // メニューを開く
        contextMenuContainer.style.display = "block";
        contextMenu.style.left = `${e.pageX + 10}px`;
        contextMenu.style.top = `${e.pageY - 20}px`;
      });

      /**
       * メニューを閉じる処理を追加
       * @return {void}
       */
      contextMenuContainer.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        contextMenuContainer.style.display = "none";
        this.editTarget = "";
      });
    }

    /**
     * メニューを閉じる。
     * @return {void}
     */
    #closeMenu() {
      contextMenuContainer.click();
    }

    /**
     * メニューに境界線を追加する。
     * @return {void}
     */
    #attachBorderToMenu() {
      contextMenu.appendChild(document.createElement("hr"));
    }

    //--------------------------------------------------
    //- タスク追加
    //--------------------------------------------------

    /**
     * メニューにタスクを新規追加するボタンを追加する。
     * @return {void}
     */
    #attachAddTaskButtonToMenu() {
      // タスク追加ボタンを作成する
      const icon = Utils.createSvg("file-plus", SvgIcon.filePlustPaths());
      const btn = Utils.createSvgButton("file-plus", icon);
      btn.appendChild(document.createTextNode("新しいタスク"));
      btn.id = "btn-add-task";

      // メニューにボタンを追加する
      contextMenu.appendChild(btn);

      /**
       * 新しいタスクを追加する処理を追加
       * @return {void}
       */
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.#addNewTask();
        this.#closeMenu();
      });
    }

    /**
     * 新規タスクを追加する
     */
    #addNewTask() {
      const name = prompt("タスク名設定", "新規タスク");

      if (name) {
        // IDを採番し、新規にタスクを作成する
        const id = Utils.getUniqueId();
        const task = this.#createTask({ name, id });

        // 作成したタスクをTreeViewに追加する
        this.editTarget.appendChild(task);

        // 対象のタスクを選択状態にする
        this.#setSelected(task);

        // タスク追加時のイベントを起動する
        this.addTaskEventHandler({ id, name, task });

        // タスクを追加したことを外部に通知する
        this.dispatchEvent(Utils.getCustomEvent("editTreeViewItem"));
      }
    }

    /**
     * タスクを追加するイベントハンドラーを設定する
     * @param {Function} handler タスク追加時に実行されるイベントハンドラー
     * @returns {void}
     */
    setAddTaskHandler(handler) {
      this.addTaskEventHandler = handler;
    }

    /**
     * タスクを作成する関数
     * @param {Object} conf - タスクの設定オブジェクト～
     * @param {string} conf.id - タスクの識別用ID～
     * @param {string} conf.name - タスク名～
     * @param {string} [conf.duedate] - タスクの期日。省略可能～
     * @param {string} [conf.status] - タスクの進捗率。省略可能～
     * @returns {HTMLElement} - 作成されたタスク要素
     */
    #createTask(conf) {
      const task = document.createElement("div");
      const { id, name, duedate, status, priority } = conf;

      // タスクをクリックした際のイベントを設定する
      task.addEventListener("click", (e) => {
        e.preventDefault();
        this.#setSelected(task);
        this.clickTaskEventHandler({ id, name, task });
      });

      // 期限日属性が変更された際の処理を設定する
      this.#setDueDateChangeHandler(task);

      // 進捗率が変更された際の処理を設定する
      this.#setStatusChangeHandler(task);

      // パラメータを設定
      task.innerText = name;
      task.dataset.id = id;
      task.dataset.name = name;
      task.dataset.type = "task";
      task.dataset.duedate = duedate || "";
      task.dataset.priority = priority || "";
      task.dataset.status = status || "";

      // Drag&Drop
      this.#addDragEventListeners(task);

      return task;
    }

    /**
     * タスクの期日変更イベントハンドラを設定する
     *
     * @param {HTMLElement} task - 期日を持つタスク要素
     */
    #setDueDateChangeHandler(task) {
      Utils.setDatasetChangeHandler(task, "data-duedate", () => {
        task.classList.remove("over-deadline");
        if (Utils.calcDateDiffToday(task.dataset.duedate) < 3) {
          task.classList.add("over-deadline");
        }
      });
    }

    /**
     * タスクの進捗率変更イベントハンドラを設定する
     *
     * @param {HTMLElement} task - 進捗率を持つタスク要素
     */
    #setStatusChangeHandler(task) {
      Utils.setDatasetChangeHandler(task, "data-status", () => {
        task.classList.remove("task-finished");
        if (parseInt(task.dataset.status) === 100) {
          task.classList.add("task-finished");
        }
      });
    }

    /**
     * 選択中を示すクラスを設定
     * @param {HTMLElement} target - 選択対象の要素
     */
    #setSelected(target) {
      const root = this.shadowRoot.getElementById("root");
      this.#clearSelected(root, target.tagName);

      target.classList.add("selected");

      if (target.tagName === "DIV") {
        const details = target.closest("details");
        if (details) {
          this.#setSelected(details.querySelector("summary"));
        } else {
          this.#clearSelected(root, "SUMMARY");
        }
      }
    }

    /**
     * 指定されたタグ名を持つすべての選択クラスをクリア
     * @param {HTMLElement} root - 親要素
     * @param {string} tagName - クリア対象のタグ名
     */
    #clearSelected(root, tagName) {
      const items = root.getElementsByClassName("selected");
      for (let item of items) {
        if (item.tagName === tagName.toUpperCase()) {
          item.classList.remove("selected");
        }
      }
    }

    /**
     * タスククリックのイベントハンドラーを設定する
     * @param {Function} handler タスククリック時に実行されるイベントハンドラー
     * @returns {void}
     */
    setClickTaskHandler(handler) {
      this.clickTaskEventHandler = handler;
    }

    //--------------------------------------------------
    //- グループ追加
    //--------------------------------------------------

    /**
     * メニューにグループを新規追加するボタンを追加する。
     * @return {void}
     */
    #attachAddGroupButtonToMenu() {
      // グループ追加ボタンを作成する
      const icon = Utils.createSvg("folder-plus", SvgIcon.folderPlusPaths());
      const btn = Utils.createSvgButton("folder-plus", icon);
      btn.appendChild(document.createTextNode("新しいグループ"));
      btn.id = "btn-add-group";

      // メニューにボタンを追加する
      contextMenu.appendChild(btn);

      /**
       * 新しいグループを追加する処理を追加
       * @return {void}
       */
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.#addNewGroup();
        this.#closeMenu();
      });
    }

    /**
     * 新規グループを追加する
     */
    #addNewGroup() {
      const name = prompt("グループ名設定", "新規グループ");

      if (name) {
        // IDを採番し、新規にグループを作成する
        const id = Utils.getUniqueId();
        const group = this.#createGroup({ name, id });

        // 作成したグループをTreeViewに追加する
        this.editTarget.appendChild(group);

        // グループを追加したことを外部に通知する
        this.dispatchEvent(Utils.getCustomEvent("editTreeViewItem"));
      }
    }

    /**
     * グループ要素を作成する
     * @param {Object} conf - グループの設定オブジェクト
     * @param {string} conf.name - グループの名前
     * @param {string} conf.id - グループのID
     * @returns {HTMLElement} 作成されたグループ要素
     * @private
     */
    #createGroup(conf) {
      const { name, id } = conf;
      const details = document.createElement("details");
      const summary = document.createElement("summary");

      details.dataset.id = id;
      details.dataset.name = name;
      details.dataset.type = "group";

      summary.innerText = name;
      summary.addEventListener("click", () => {
        this.#setSelected(summary);
      });
      this.#setSelected(summary);

      details.open = true;
      details.appendChild(summary);

      // Drag&Drop
      this.#addDragEventListeners(details);

      return details;
    }

    //--------------------------------------------------
    //- グループ名を変更
    //--------------------------------------------------

    /**
     * メニューにグループ名を変更するボタンを追加する。
     * @return {void}
     */
    #attachChangeGroupNameButtonToMenu() {
      // グループ名変更ボタンを作成する
      const icon = Utils.createSvg(
        "tabler-writing",
        SvgIcon.tablerWritingPaths()
      );

      const btn = Utils.createSvgButton("tabler-writing", icon);
      btn.appendChild(document.createTextNode("グループ名を変更"));
      btn.id = "btn-change-group-name";

      // メニューにボタンを追加する
      contextMenu.appendChild(btn);

      /**
       * グループ名を変更する処理
       * @return {void}
       */
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (this.editTarget.tagName === "DETAILS") {
          // 変更前の名称を取得し、グループ名変更画面を表示する
          const summary = this.editTarget.children[0];
          const inputText = prompt("グループ名変更", summary.innerText);

          if (inputText !== null) {
            // 変更後の名称を設定する
            this.editTarget.dataset.name = inputText;
            summary.innerText = inputText;

            // グループ名を変更したことを外部に通知する
            this.dispatchEvent(Utils.getCustomEvent("editTreeViewItem"));
          }
        }

        this.#closeMenu();
      });
    }

    //--------------------------------------------------
    //- TreeViewを描画
    //--------------------------------------------------

    /**
     * JSON文字列を元にTreeViewをレンダリングする
     * @param {string} jsonStr JSONデータの文字列
     * @returns {void}
     */
    renderTreeView(jsonStr) {
      if (!jsonStr) {
        return;
      }

      JSON.parse(jsonStr).forEach((data) => {
        this.#addTreeViewItems(treeViewRoot, data);
      });

      this.#clearSelected(treeViewRoot, "div");
      this.#clearSelected(treeViewRoot, "summary");
      this.closeTreeViewAll();
    }

    /**
     * Jsonデータを元にTreeViewに項目を追加する（再帰処理）
     * @param {HTMLElement} currentRoot 追加先のルート要素
     * @param {object} data 追加するデータ
     * @returns {void}
     * @private
     */
    #addTreeViewItems(currentRoot, data) {
      if (data.type === "task") {
        // タスクを新規作成
        const task = this.#createTask(data);
        currentRoot.appendChild(task);
      } else {
        // グループを新規作成
        const group = this.#createGroup(data);
        currentRoot.appendChild(group);
        const array = data.children || data.childlen || [];
        (array || []).forEach((child) => {
          this.#addTreeViewItems(group, child);
        });
      }
    }

    //--------------------------------------------------
    //- TreeViewのデータ取得
    //--------------------------------------------------

    /**
     * ツリービューのデータを取得する
     *
     * @returns {string} ツリーデータを返す。
     */
    getTreeViewData() {
      return this.#getAllElement(treeViewRoot.childNodes);
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
        const dataItem = {};
        if (node.tagName === "DIV") {
          // タスク
          dataItem.id = node.dataset.id || null;
          dataItem.name = node.dataset.name || null;
          dataItem.type = node.dataset.type || null;
          dataItem.duedate = node.dataset.duedate || null;
          dataItem.priority = node.dataset.priority || null;
          dataItem.status = node.dataset.status || null;
          elements.push(dataItem);
        } else if (node.tagName === "DETAILS") {
          // グループ
          dataItem.id = node.dataset.id || null;
          dataItem.name = node.dataset.name || null;
          dataItem.children = this.#getAllElement(node.childNodes);
          elements.push(dataItem);
        } else {
          // 対象外
        }
      });

      return elements;
    }

    //--------------------------------------------------
    //- Drag&Drop
    //--------------------------------------------------

    /**
     * ドラッグイベントリスナーを追加
     * @param {HTMLElement} element ドラッグイベントリスナーを追加する要素
     */
    #addDragEventListeners(element) {
      element.setAttribute("draggable", true);
      element.addEventListener("dragstart", this.#handleDragStart);
      element.addEventListener("dragover", this.#handleDragOver);
      element.addEventListener("dragend", this.#handleDragEnd);
    }

    /**
     * ドラッグ操作開始
     * @param {Event} e
     */
    #handleDragStart(e) {
      draggedElement = e.target;
      e.dataTransfer.effectAllowed = "move";
      e.dataTransfer.setData("text/html", e.target.innerHTML);
      e.target.classList.add("dragging");
    }

    /**
     * ドラッグ中
     * @param {Event} e
     */
    #handleDragOver(e) {
      e.preventDefault();
      e.dataTransfer.dropEffect = "move";

      // ターゲット要素を設定
      const target = e.target;
      if (!target || target === draggedElement) {
        return;
      }

      // ターゲット要素の親がdetailsの場合、detailsを開く
      if (target.parentNode.tagName === "DETAILS") {
        target.parentNode.open = true;
      }

      // draggedElement が target の中に含まれていないことを確認
      if (draggedElement.contains(target)) {
        return;
      }

      // ターゲット要素の位置とサイズを取得
      const rect = target.getBoundingClientRect();

      // マウス位置がターゲットのどの位置に来ているかを計算
      const nowPosition = (e.clientY - rect.top) / (rect.bottom - rect.top);

      // 要素の挿入位置を決定
      if (nowPosition > 0.5) {
        target.parentNode.insertBefore(draggedElement, target.nextSibling);
      } else {
        target.parentNode.insertBefore(draggedElement, target);
      }
    }

    /**
     * ドラッグ終了
     * @param {Event} e
     */
    #handleDragEnd(e) {
      e.target.classList.remove("dragging");
      draggedElement = null;
      this.dispatchEvent(Utils.getCustomEvent("editTreeViewItem"));
    }

    //--------------------------------------------------
    //- TreeViewを操作
    //--------------------------------------------------

    /**
     * 指定されたタグを持つ選択されたアイテムを取得します。
     *
     * @returns {Element} - 選択されたアイテムが属するdetails、または見つからない場合は `treeViewRoot`。
     */
    #getAddTarget() {
      const root = this.shadowRoot.getElementById("root");
      const items = root.getElementsByClassName("selected");
      for (let item of items) {
        if (item.tagName === "SUMMARY") {
          return item.closest("details");
        }
      }
      return treeViewRoot;
    }

    /**
     * 新規タスクを追加する（コンポーネント外からの操作用）
     */
    addNewTask() {
      this.editTarget = this.#getAddTarget();
      this.#addNewTask();
    }

    /**
     * 新規グループを追加する（コンポーネント外からの操作用）
     */
    addNewGroup() {
      this.editTarget = this.#getAddTarget();
      this.#addNewGroup();
    }

    /**
     * ツリービュー内のすべてのグループを開く
     */
    openTreeViewAll() {
      const groups = treeViewRoot.getElementsByTagName("details");
      for (let group of groups) {
        group.open = true;
      }
    }

    /**
     * ツリービュー内のすべてのグループを閉じる
     */
    closeTreeViewAll() {
      const groups = treeViewRoot.getElementsByTagName("details");
      for (let group of groups) {
        group.open = false;
      }
    }
  }

  // カスタム要素 "tree-view" を定義する
  customElements.define("tree-view", TreeView);
}
