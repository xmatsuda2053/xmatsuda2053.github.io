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
      const iconName = "file-plus";

      // SVGアイコンを作成する
      const icon = Utils.createSvg(iconName, SvgIcon.filePlustPaths());

      // タスク追加ボタンを作成する
      const btn = Utils.createSvgButton(iconName);
      btn.appendChild(document.createTextNode("新しいタスク"));
      btn.id = "btn-add-task";

      // メニューにボタンを追加する
      contextMenuContainer.appendChild(icon);
      contextMenu.appendChild(btn);

      /**
       * 新しいタスクを追加する処理を追加
       * @return {void}
       */
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();

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
          this.dispatchEvent(Utils.getCustomEvent("addItem"));
        }

        this.#closeMenu();
      });
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
     * @param {Array<string>} [classList=[]] - クラスリスト（省略可能）～
     * @returns {HTMLElement} - 作成されたタスク要素
     */
    #createTask(conf, classList = []) {
      const task = document.createElement("div");
      const { id, name, duedate } = conf;

      // タスクをクリックした際のイベントを設定する
      task.addEventListener("click", (e) => {
        e.preventDefault();
        this.#setSelected(task);
        this.clickTaskEventHandler({ id, name, task });
      });

      // 期限日属性が変更された際のイベントを設定する
      this.#setDueDateChangeHandler(task);

      // パラメータを設定
      task.innerText = name;
      task.dataset.id = id;
      task.dataset.name = name;
      task.dataset.duedate = duedate || "";
      task.dataset.type = "task";
      task.classList.add(...classList);

      return task;
    }

    /**
     * タスクの期日変更イベントハンドラを設定する
     *
     * @param {HTMLElement} task - 期日を持つタスク要素
     */
    #setDueDateChangeHandler(task) {
      /**
       * ミューテーションリストを処理するコールバック関数
       * @param {MutationRecord[]} mutationsList - 監視対象の変化リスト
       */
      const callback = (mutationsList) => {
        for (let m of mutationsList) {
          if (m.type === "attributes" && m.attributeName === "data-duedate") {
            // 期日までの日数を計算する
            const dayCount = Utils.calcDateDiffToday(task.dataset.duedate);
            if (dayCount < 3) {
              task.classList.add("over-deadline");
            } else {
              task.classList.remove("over-deadline");
            }
          }
        }
      };
      const observer = new MutationObserver(callback);
      // 監視対象のタスクにオブザーバを設定し、属性変更のみを監視する
      observer.observe(task, {
        attributes: true,
        attributeFilter: ["data-duedate"],
      });
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
      const iconName = "folder-plus";

      // SVGアイコンを作成する
      const icon = Utils.createSvg(iconName, SvgIcon.folderPlusPaths());

      // グループ追加ボタンを作成する
      const btn = Utils.createSvgButton(iconName);
      btn.appendChild(document.createTextNode("新しいグループ"));
      btn.id = "btn-add-group";

      // メニューにボタンを追加する
      contextMenuContainer.appendChild(icon);
      contextMenu.appendChild(btn);

      /**
       * 新しいグループを追加する処理を追加
       * @return {void}
       */
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();

        const name = prompt("グループ名設定", "新規グループ");

        if (name) {
          // IDを採番し、新規にグループを作成する
          const id = Utils.getUniqueId();
          const group = this.#createGroup(name, id);

          // 作成したグループをTreeViewに追加する
          this.editTarget.appendChild(group);

          // グループを追加したことを外部に通知する
          this.dispatchEvent(Utils.getCustomEvent("addItem"));
        }

        this.#closeMenu();
      });
    }

    //--------------------------------------------------
    //- グループ名を変更
    //--------------------------------------------------

    /**
     * メニューにグループ名を変更するボタンを追加する。
     * @return {void}
     */
    #attachChangeGroupNameButtonToMenu() {
      const iconName = "tabler-writing";

      // SVGアイコンを作成する
      const icon = Utils.createSvg(iconName, SvgIcon.tablerWritingPaths());

      // グループ名変更ボタンを作成する
      const btn = Utils.createSvgButton(iconName);
      btn.appendChild(document.createTextNode("グループ名を変更"));
      btn.id = "btn-change-group-name";

      // メニューにボタンを追加する
      contextMenuContainer.appendChild(icon);
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
            this.dispatchEvent(Utils.getCustomEvent("addItem"));
          }
        }

        this.#closeMenu();
      });
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
    }

    /**
     * Jsonデータを元にTreeViewに項目を追加する（再帰処理）
     * @param {HTMLElement} currentRoot 追加先のルート要素
     * @param {object} data 追加するデータ
     * @returns {void}
     * @private
     */
    #addTreeViewItems(currentRoot, data) {
      const { name, id, duedate, cls } = data;

      if (data.type === "task") {
        // タスクを新規作成
        const task = this.#createTask({ name, id, duedate }, cls || []);
        currentRoot.appendChild(task);
      } else {
        // グループを新規作成
        const group = this.#createGroup(name, id, cls || []);
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
        // 選択中の場合、一時的にクラスを解除
        const hasSelected = node.classList.contains("selected");
        if (hasSelected) {
          node.classList.remove("selected");
        }

        // データ作成
        const dataItem = {
          id: node.dataset.id || null,
          name: node.dataset.name || null,
          type: node.dataset.type || null,
          duedate: node.dataset.duedate || null,
          cls: Array.from(node.classList) || [], // クラスリストを配列として保存
          children: null,
        };

        // 改めて選択中のクラスを付与
        if (hasSelected) {
          node.classList.add("selected");
        }

        // DETAILS タグの場合、子要素を再帰的に取得
        if (node.tagName === "DETAILS") {
          dataItem.children = this.#getAllElement(node.childNodes);
        }

        // データをリストに追加
        if (node.tagName === "DETAILS" || node.tagName === "DIV") {
          elements.push(dataItem);
        }
      });

      return elements;
    }
  }

  // カスタム要素 "tree-view" を定義する
  customElements.define("tree-view", TreeView);
}
