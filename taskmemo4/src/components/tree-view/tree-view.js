// CSS
import { ElmUtils } from "../../utils/elm-utils";
import { IdUtils } from "../../utils/id-utils";
import { EventUtils } from "../../utils/event-utils";
import { EventConst } from "../../constants/event-const";
import { SvgConst } from "../../constants/svg-const";

import styles from "./style/tree-view.css";

/**
 * TreeView コンポーネント
 * @class TreeView
 * @extends {HTMLElement}
 */
export function TreeView() {
  /**
   * ドラッグ中の要素
   */
  let draggedElement;

  /**
   * 指定されたエレメント内のグループアイテムを取得する関数。
   * 与えられたエレメント内の`.group-items`クラスを持つ要素を見つけ、返します。
   *
   * @param {Element} element - グループアイテムを取得するエレメント。
   * @returns {Element} - グループアイテムを含むエレメント。
   */
  const getItems = (element) => element.querySelector(".group-items");

  class TreeView extends HTMLElement {
    // *******************************************************
    // * 初期処理
    // *******************************************************

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

      // コンテンツの初期設定
      this.header = ElmUtils.createElm("div", "header");
      this.root = ElmUtils.createElm("div", "root");

      this.shadowRoot.appendChild(this.header);
      this.shadowRoot.appendChild(this.root);

      // コンテキストメニューを追加
      this.#addHeaderMenu();
      this.#addContextMenu();
    }

    /**
     * 検索メソッドを設定する。
     * @param {function} func - 検索メソッド
     */
    set searchHandler(func) {
      this.searchFunction = func;
    }

    /**
     * 指定したIDのグループを開く／閉じる
     * @param {string} id
     */
    toggleGroup(id) {
      const details = this.shadowRoot.getElementById(id).closest("details");
      details.open = !details.open;
    }

    // *******************************************************
    // * ヘッダーメニュー
    // *******************************************************
    #addHeaderMenu() {
      const headerMenu = ElmUtils.createElm("div", "header-menu");
      headerMenu.appendChild(this.#createAllOpenButton());
      headerMenu.appendChild(this.#createAllCloseButton());
      headerMenu.appendChild(this.#createLine());
      headerMenu.appendChild(this.#createFilterNotStartedButton());
      headerMenu.appendChild(this.#createFilterStartedButton());
      headerMenu.appendChild(this.#createFilterCompletButton());
      headerMenu.appendChild(this.#createFilterOverDeadlineButton());
      headerMenu.appendChild(this.#createFilterButton());
      this.header.appendChild(headerMenu);
    }

    /**
     * セパレータを作成する。
     * @returns ボタン
     */
    #createLine() {
      const line = ElmUtils.createElm("svg-btn", "line");
      line.iconPaths = SvgConst.linePaths;
      line.size = "1.15rem";
      return line;
    }

    /**
     * ベースとなるボタンを作成する。
     * @param {string} id - ボタンのID
     * @param {Array} paths - アイコンのパス
     * @returns ボタン
     */
    #createButton(id, paths) {
      const btn = ElmUtils.createElm("svg-btn", id);
      btn.iconPaths = paths;
      btn.size = "1.15rem";
      btn.color = "black";
      btn.hover = true;
      return btn;
    }

    /**
     * トグルボタンを作成する。
     * @param {string} id - ボタンのID
     * @param {Array} paths - アイコンのパス
     * @returns ボタン
     */
    #createToggleButton(id, paths) {
      const btn = this.#createButton(id, paths);
      btn.toggle = true;
      btn.toggleOn(true);
      return btn;
    }

    /**
     * グループをすべて開くボタンを作成する。
     * @returns ボタン
     */
    #createAllOpenButton() {
      const btn = this.#createButton("all-open", SvgConst.treeOpenPaths);
      btn.tooltip = "すべて開く";
      btn.addEventListener("click", () => {
        const details = this.root.querySelectorAll("details");
        details.forEach((detail) => (detail.open = true));
      });

      return btn;
    }

    /**
     * グループをすべて閉じるボタンを作成する。
     * @returns ボタン
     */
    #createAllCloseButton() {
      const btn = this.#createButton("all-close", SvgConst.treeClosePaths);
      btn.tooltip = "すべて閉じる";
      btn.addEventListener("click", () => {
        const details = this.root.querySelectorAll("details");
        details.forEach((detail) => (detail.open = false));
      });

      return btn;
    }

    /**
     * 未開始タスクのフィルタ設定ボタンを作成する。
     * @returns ボタン
     */
    #createFilterNotStartedButton() {
      this.btnFilterNotStarted = this.#createToggleButton(
        "filter-not-started",
        SvgConst.squarePaths
      );
      this.btnFilterNotStarted.tooltip = "未着手";
      this.btnFilterNotStarted.addEventListener("click", () => {
        this.#filterTreeViewItem();
      });
      return this.btnFilterNotStarted;
    }

    /**
     * 実行中タスクのフィルタ設定ボタンを作成する。
     * @returns ボタン
     */
    #createFilterStartedButton() {
      this.btnFilterStarted = this.#createToggleButton(
        "filter-started",
        SvgConst.squareDotPaths
      );
      this.btnFilterStarted.tooltip = "対応中";
      this.btnFilterStarted.addEventListener("click", () => {
        this.#filterTreeViewItem();
      });
      return this.btnFilterStarted;
    }

    /**
     * 完了タスクのフィルタ設定ボタンを作成する。
     * @returns ボタン
     */
    #createFilterCompletButton() {
      this.btnFilterComplet = this.#createToggleButton(
        "filter-completed",
        SvgConst.squareCheckPaths
      );
      this.btnFilterComplet.tooltip = "完了";
      this.btnFilterComplet.addEventListener("click", () => {
        this.#filterTreeViewItem();
      });
      return this.btnFilterComplet;
    }

    /**
     * 遅延タスクのフィルタ設定ボタンを作成する。
     * @returns ボタン
     */
    #createFilterOverDeadlineButton() {
      this.btnFilterOverDeadline = this.#createToggleButton(
        "filter-over-deadline",
        SvgConst.squareAlertPaths
      );
      this.btnFilterOverDeadline.tooltip = "遅延";
      this.btnFilterOverDeadline.color = "red";
      this.btnFilterOverDeadline.addEventListener("click", () => {
        this.#filterTreeViewItem();
      });
      return this.btnFilterOverDeadline;
    }

    /**
     * フィルタボタンを作成する。
     * @returns ボタン
     */
    #createFilterButton() {
      const btn = this.#createToggleButton("item-filter", SvgConst.FilterPaths);
      btn.color = "green";
      btn.toggleOn(false);
      btn.tooltip = "フィルタ";

      this.searchText = "";
      this.searchResult = [];

      // 検索
      btn.addEventListener("click", async () => {
        this.searchText = "";
        this.searchResult = [];

        if (btn.toggle) {
          this.searchText = prompt("検索条件を入力");
          if (this.searchText) {
            this.searchResult = await this.searchFunction(this.searchText);
          } else {
            btn.toggleOn(false);
          }
        }

        this.#filterTreeViewItem();
      });

      return btn;
    }

    /**
     * TreeViewのタスクに対するフィルタを設定する。
     */
    #filterTreeViewItem() {
      this.root.querySelectorAll("task-title").forEach((task) => {
        const flag = task.flag;
        let isDisabled;

        // ステータスフィルター
        if (flag.isComplete) {
          isDisabled = !this.btnFilterComplet.toggle;
        } else if (flag.isOverDeadline) {
          isDisabled = !this.btnFilterOverDeadline.toggle;
        } else if (flag.isNotStarted) {
          isDisabled = !this.btnFilterNotStarted.toggle;
        } else {
          isDisabled = !this.btnFilterStarted.toggle;
        }

        // 検索文字列フィルター
        if (!isDisabled && this.searchText) {
          isDisabled = this.searchResult.indexOf(`${task.id}.json`) === -1;
        }

        task.classList.toggle("disabled", isDisabled);
      });
    }

    // *******************************************************
    // * コンテキストメニュー
    // *******************************************************

    /**
     * コンテキストメニューを初期化し、Shadow DOMに追加します。
     * また、右クリック（コンテキストメニュー）のイベントリスナーを設定します。
     * @private
     */
    #addContextMenu() {
      this.menu = ElmUtils.createElm("context-menu", "menu");
      this.shadowRoot.appendChild(this.menu);

      // ボタンを追加
      this.#insertAddTaskButton();
      this.#insertAddGroupButton();
      this.#insertSeparatorItemButton();
      this.menu.addBorder();
      this.#insertDeleteItemButton();

      /**
       * メニューを開く
       * @param {MouseEvent} e - コンテキストメニューのイベントオブジェクト
       */
      this.shadowRoot.addEventListener("contextmenu", (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.menu.openMenu(e);

        const isTask = e.target.tagName.toLowerCase() === "task-title";
        const isGroup = e.target.tagName.toLowerCase() === "group-title";
        const isSeparator = e.target.dataset.type === "separator";

        // ターゲットがタスクの場合、追加ボタンを無効
        if (isTask) {
          this.menu.setDisabled("add-new-task");
          this.menu.setDisabled("add-new-group");
        }

        // ターゲットがアイテム以外の場合、削除ボタンを無効
        if (!isTask && !isGroup && !isSeparator) {
          this.menu.setDisabled("delete-item");
        }

        // メニューのターゲットを設定する
        this.menu.clickTarget = e.target;

        // メニューを開いている状態を設定
        if (isTask || isGroup) {
          this.menu.clickTarget.menuOpen = true;
        }
      });

      /**
       * メニューの「closeMenu」イベントをリッスンし、メニューのクリックターゲットを更新します。
       * @event closeMenu - メニューが閉じられたときに発生するイベント
       */
      this.menu.addEventListener(EventConst.CLOSE_CONTEXT_MENU, () => {
        this.menu.clickTarget.menuOpen = false;
        this.menu.clickTarget = null;
      });
    }

    /**
     * コンテキストメニューのターゲット要素を取得します。
     * クリックされた要素が特定の条件を満たす場合、その要素に対応するターゲットを返します。
     * デフォルトではルート要素を返します。
     * @param {HtmlElement} target - 対象
     * @returns {Element} - メニューを適用するターゲット要素
     * @private
     */
    #getMenuTarget(target) {
      if (target && target.tagName.toLowerCase() === "group-title") {
        const details = target.closest("details");
        const items = getItems(details);
        return items || this.root;
      }

      return this.root;
    }

    /**
     * 新しいタスクを追加するためのボタンを作成し、メニューに追加します。
     * ボタンがクリックされたときのイベントリスナーを設定します。
     * @private
     */
    #insertAddTaskButton() {
      const id = "add-new-task";
      const title = "新しいタスク";
      this.menu.addButton(id, title, SvgConst.squarePlusPaths);

      /**
       * クリックイベント
       * @param {Event} event - クリックイベントオブジェクト
       */
      this.menu.addEventListener(`click-${id}`, (e) => {
        const name = prompt("新しいタスクを作成", "新規タスク");
        if (!name) {
          return;
        }

        const root = this.#getMenuTarget(this.menu.clickTarget);
        const task = this.#createNewTaskItem({ name: name });

        task.classList.add("fade-in");
        root.appendChild(task);
        setTimeout(() => {
          task.classList.add("show");
        }, 100);

        this.#openGroup(root);
        const data = task.querySelector("task-title").getData();
        this.dispatchEvent(
          EventUtils.createEvent(EventConst.ADD_NEW_TASK_ITEM_EVENT_NAME, data)
        );
      });
    }

    /**
     * 新しいグループを追加するためのボタンを作成し、メニューに追加します。
     * ボタンがクリックされたときのイベントリスナーを設定します。
     * @private
     */
    #insertAddGroupButton() {
      const id = "add-new-group";
      const title = "新しいグループ";
      this.menu.addButton(id, title, SvgConst.folderPlusPaths);

      /**
       * クリックイベント
       * @param {Event} event - クリックイベントオブジェクト
       */
      this.menu.addEventListener(`click-${id}`, (e) => {
        const name = prompt("新しいグループを作成", "新規グループ");
        if (!name) {
          return;
        }

        const root = this.#getMenuTarget(this.menu.clickTarget);
        const group = this.#createNewGroupItem({ name: name });

        group.classList.add("fade-in");
        root.appendChild(group);
        setTimeout(() => {
          group.classList.add("show");
        }, 100);

        this.#openGroup(root);
        const data = group.querySelector("group-title").getData();
        this.dispatchEvent(
          EventUtils.createEvent(EventConst.ADD_NEW_GROUP_ITEM_EVENT_NAME, data)
        );
      });
    }

    /**
     * アイテムのセパレーターを設置するためのボタンを作成し、メニューに追加します。
     */
    #insertSeparatorItemButton() {
      const id = "separator-item";
      const title = "セパレーター";
      this.menu.addButton(id, title, SvgConst.LinePaths);

      /**
       * クリックイベント
       * @param {Event} event - クリックイベントオブジェクト
       */
      this.menu.addEventListener(`click-${id}`, (e) => {
        const root = this.#getMenuTarget(this.menu.clickTarget);
        const item = this.#createNewSeparatorItem();

        item.classList.add("fade-in");
        root.appendChild(item);
        setTimeout(() => {
          item.classList.add("show");
        }, 100);

        this.dispatchEvent(
          EventUtils.createEvent(EventConst.CHANGE_TREEVIEW_EVENT_NAME)
        );
      });
    }

    /**
     * アイテムを削除するためのボタンを作成し、メニューに追加します。
     * ボタンがクリックされたときのイベントリスナーを設定します。
     * @private
     */
    #insertDeleteItemButton() {
      const id = "delete-item";
      const title = "削除";
      this.menu.addButton(id, title, SvgConst.trashPaths);

      /**
       * クリックイベント
       * @param {Event} event - クリックイベントオブジェクト
       */
      this.menu.addEventListener(`click-${id}`, (e) => {
        this.#deleteItem(this.menu.clickTarget.id);
        this.dispatchEvent(
          EventUtils.createEvent(EventConst.DELETE_TREEVIEW_ITEM_EVENT_NAME)
        );
      });
    }

    // *******************************************************
    // * TreeViewのデータ取得
    // *******************************************************

    /**
     * ツリービューのデータを取得する
     *
     * @returns {string} ツリーデータを返す。
     */
    getData() {
      /**
       * ノードリストから全ての要素を再帰的に取得する。
       *
       * @param {NodeList} nodes - 処理するノードリスト。
       * @returns {Array} 処理結果の要素リストを返す。
       */
      const getAllElement = (nodes) => {
        const elements = [];

        nodes.forEach((node) => {
          const isTask = node.dataset.type === "task";
          const isGroup = node.dataset.type === "group";
          const isSeparator = node.dataset.type === "separator";

          if (isTask) {
            const task = node.querySelector("task-title");
            const data = task.getData();
            elements.push(data);
          } else if (isGroup) {
            const group = node.querySelector("group-title");
            const items = getItems(node);
            const data = group.getData();
            data.children = getAllElement(items.childNodes);
            elements.push(data);
          } else if (isSeparator) {
            elements.push({
              id: node.id,
              type: "separator",
            });
          } else {
            // 何もしない
          }
        });

        return elements;
      };

      return getAllElement(this.root.childNodes);
    }

    /**
     * 指定されたIDに対応する要素を取得します。
     * @param {string} id - 取得する要素のID。
     * @returns {HTMLElement|null} - 指定されたIDに対応する要素。存在しない場合はnullを返します。
     */
    getItemById(id) {
      return this.shadowRoot.getElementById(id);
    }

    /**
     * 指定されたIDの要素を選択中の状態にします。
     * @param {string} id - 取得する要素のID。
     */
    selectItemById(id) {
      if (this.selectedItemId) {
        const beforeItem = this.shadowRoot.getElementById(this.selectedItemId);
        beforeItem.selected = false;
      }
      const item = this.getItemById(id);
      item.selected = true;

      this.selectedItemId = id;
    }

    /**
     * 指定されたIDに対応するグループの項目データを取得します。
     * @param {string} id - グループのID。
     * @returns {Array<Object>} - 項目データの配列。
     */
    getGroupItemsById(id) {
      const details = this.shadowRoot.getElementById(id).closest("details");
      const childElms = getItems(details).children;

      const items = [];
      for (let elm of childElms) {
        const item = elm.querySelectorAll("task-title,group-title")[0];
        const data = item.getData();
        data.id = item.id;
        if (data.type === "task") {
          data.paths = item.paths;
          data.flag = item.flag;
        }
        items.push(data);
      }

      return items;
    }

    // *******************************************************
    // * TreeViewの作成
    // *******************************************************
    /**
     * JSON文字列を元にツリービューをレンダリングします。
     * @param {string} jsonStr - JSON形式の文字列データ。
     */
    renderTreeView(jsonStr) {
      if (!jsonStr) {
        return;
      }

      /**
       * Jsonデータを元にTreeViewに項目を追加する（再帰処理）
       * @param {HTMLElement} currentRoot 追加先のルート要素
       * @param {object} data 追加するデータ
       * @returns {void}
       * @private
       */
      const addTreeViewItem = (root, data) => {
        const isTask = data.type === "task";
        const isGroup = data.type === "group";
        const isSeparator = data.type === "separator";

        if (isTask) {
          // タスクを追加
          const task = this.#createNewTaskItem(data);
          root.appendChild(task);
        } else if (isGroup) {
          // グループを追加
          const group = this.#createNewGroupItem(data);
          root.appendChild(group);

          // グループの子要素を追加
          const items = getItems(group);
          const children = data.children || data.childlen || [];
          (children || []).forEach((child) => {
            addTreeViewItem(items, child);
          });
        } else if (isSeparator) {
          // セパレーターを追加
          const separator = this.#createNewSeparatorItem(data);
          root.appendChild(separator);
        } else {
          // 何もしない
        }
      };

      JSON.parse(jsonStr).forEach((data) => {
        addTreeViewItem(this.root, data);
      });
    }

    // *******************************************************
    // * TreeView要素の作成／削除
    // *******************************************************

    /**
     * セパレータを作成する作成する
     * * @param {Object} [data={}] - アイテムの初期データ
     * @returns {HTMLElement} item - 作成されたセパレータアイテム要素
     */
    #createNewSeparatorItem(data = {}) {
      const separator = ElmUtils.createElm("div", null, [
        "tree-item",
        "separator",
      ]);
      this.#addDragEventListeners(separator);

      separator.setAttribute("draggable", true);
      separator.dataset.type = "separator";

      if (data.id) {
        separator.id = data.id;
      } else {
        separator.id = IdUtils.getUniqueId();
      }

      return separator;
    }

    /**
     * 指定されたデータを元に新しいタスクアイテムを作成し、クリックイベントを設定します。
     * @param {Object} [data={}] - タスクアイテムの初期データ
     * @returns {HTMLElement} item - 作成されたタスクアイテム要素
     */
    #createNewTaskItem(data = {}) {
      const title = ElmUtils.createElm("task-title");
      title.init(data);

      const item = ElmUtils.createElm("div", null, ["tree-item"]);
      item.appendChild(title);
      item.setAttribute("draggable", true);
      item.dataset.type = "task";

      this.#addDragEventListeners(item);

      return item;
    }

    /**
     * 指定されたデータを元に新しいグループアイテムを作成します。
     * グループアイテムには、タイトル、詳細、および子アイテムのコンテナが含まれます。
     * @param {Object} [data={}] - グループアイテムの初期データ
     * @returns {HTMLElement} details - 作成されたグループアイテム要素
     * @private
     */
    #createNewGroupItem(data = {}) {
      const title = ElmUtils.createElm("group-title");
      title.init(data);

      const details = ElmUtils.createElm("details", null, ["tree-item"]);
      const summary = ElmUtils.createElm("summary", null);
      const items = ElmUtils.createElm("div", null, ["group-items"]);

      details.setAttribute("draggable", true);
      details.dataset.type = "group";
      details.addEventListener("toggle", () => {
        title.open = details.open;
      });

      summary.appendChild(title);

      details.appendChild(summary);
      details.appendChild(items);

      this.#addDragEventListeners(details);

      return details;
    }

    /**
     * 指定された要素の最も近い`<details>`要素を開きます。
     * @param {Element} element - `<details>`要素を検索する基点となる要素
     * @private
     */
    #openGroup(element) {
      const details = element.closest("details");
      if (details) details.open = true;
    }

    #deleteItem(id) {
      this.shadowRoot.getElementById(id).closest(".tree-item").remove();
    }

    // *******************************************************
    // * TreeViewのドラッグ＆ドロップ
    // *******************************************************
    /**
     * ドラッグイベントリスナーを追加
     * @param {HTMLElement} element ドラッグイベントリスナーを追加する要素
     */
    #addDragEventListeners(element) {
      element.addEventListener("dragstart", this.#handleDragStart);
      element.addEventListener("dragover", this.#handleDragOver, true);
      element.addEventListener("dragend", this.#handleDragEnd);
    }

    /**
     * ドラッグ操作開始
     * @param {Event} e
     */
    #handleDragStart(e) {
      draggedElement = e.target;
      draggedElement.classList.add("dragging");
      e.dataTransfer.effectAllowed = "move";
    }

    /**
     * ドラッグ中
     * @param {Event} e
     */
    #handleDragOver(e) {
      e.preventDefault();
      e.dataTransfer.dropEffect = "move";

      // タスクまたはグループのルート要素を取得
      const target = e.target.closest(".tree-item");

      // 自分自身と被っている場合
      if (!target || target === draggedElement) {
        return;
      }

      // draggedElement が target の中に含まれている場合
      if (draggedElement.contains(target)) {
        return;
      }

      // マウス位置が位置に来ているかを計算
      const rect = target.getBoundingClientRect();
      const nowPosition = (e.clientY - rect.top) / (rect.bottom - rect.top);

      // 要素の挿入位置を決定
      const targetIsTask = e.target.tagName.toLowerCase() === "task-title";

      if (targetIsTask) {
        if (nowPosition > 0.5) {
          target.insertAdjacentElement("afterend", draggedElement);
        } else {
          target.insertAdjacentElement("beforebegin", draggedElement);
        }
      } else {
        if (nowPosition > 0.5) {
          if (nowPosition >= 0.85) {
            target.insertAdjacentElement("afterend", draggedElement);
          } else {
            // 子要素に追加
            const items = target.querySelector(".group-items");
            items.insertAdjacentElement("beforeend", draggedElement);
          }
        } else {
          target.insertAdjacentElement("beforebegin", draggedElement);
        }
      }
    }

    /**
     * ドラッグ終了
     * @param {Event} e
     */
    #handleDragEnd(e) {
      if (!draggedElement) return;
      draggedElement.classList.remove("dragging");
      draggedElement = null;
      this.dispatchEvent(
        EventUtils.createEvent(EventConst.CHANGE_TREEVIEW_EVENT_NAME)
      );
    }
  }
  customElements.define("tree-view", TreeView);
}
