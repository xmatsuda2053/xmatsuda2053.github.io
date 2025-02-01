import { ElmUtils } from "../../utils/elm-utils";
import { EventUtils } from "../../utils/event-utils";

import { ContextMenu } from "../contextMenu/context-menu";
import { TaskTitle } from "./task-title";
import { GroupTitle } from "./group-title";

import styles from "./style/tree-view.css";

/**
 * TreeView コンポーネント
 * @class TreeView
 * @extends {HTMLElement}
 */
export function TreeView() {
  let draggedElement;
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
      ContextMenu();
      TaskTitle();
      GroupTitle();

      // Shadow DOMをオープンモードでアタッチ
      this.attachShadow({ mode: "open" });
      this.shadowRoot.innerHTML = "";

      // CSSを適用
      this.shadowRoot.adoptedStyleSheets = ElmUtils.createStylesheet(styles);

      // コンテンツの初期設定
      this.root = ElmUtils.createElm("div", "root");

      this.menu = ElmUtils.createElm("context-menu", "menu");
      this.#attachContextMenuListener();
      this.#attachAddNewTaskListener();
      this.#attachAddNewGroupListener();

      this.shadowRoot.appendChild(this.root);
    }

    // *******************************************************
    // * TreeViewデータ取得
    // *******************************************************

    /**
     * ルート要素の子ノードを読み取り、データを取得します。
     * @returns {Array<Object>} 取得したデータの配列
     */
    getData() {
      return "";
    }

    // *******************************************************
    // * TreeView描画
    // *******************************************************

    /**
     * JSON形式のツリービューデータを受け取り、ツリービューをレンダリングします。
     * @param {string} jsonStr - JSON形式のツリービューデータの文字列
     * @returns {void}
     */
    render(jsonStr) {
      if (!jsonStr) {
        return;
      }

      /*
      const dataList = JSON.parse(jsonStr);
      dataList.forEach((data) => {
        this.#addItemsRecursively(this.root, data);
      });
      */
    }

    /**
     * 指定されたルートアイテムに基づいてツリービューアイテムを再帰的に追加します。
     * @private
     * @param {HTMLElement} rootItem - 追加先のルートアイテム
     * @param {Object} data - 追加するツリービューアイテムのデータ
     * @returns {void}
     */
    #addItemsRecursively(rootItem, data) {
      if (data.type === "task") {
      } else {
      }
    }

    // *******************************************************
    // * コンテキストメニュー
    // *******************************************************

    /**
     * シャドウルートのコンテキストメニューイベントを追加します。
     * 右クリックでメニューを開き、`closeMenu` イベントが発生したときにメニューを削除します。
     * @returns {void}
     */
    #attachContextMenuListener() {
      this.shadowRoot.addEventListener("contextmenu", (e) => {
        e.preventDefault();
        e.stopPropagation();

        this.shadowRoot.appendChild(this.menu);
        this.menu.openMenu(e);

        const closeMenuHandler = () => {
          this.menu.remove();
          this.shadowRoot.removeEventListener("closeMenu", closeMenuHandler);
        };

        this.shadowRoot.addEventListener("closeMenu", closeMenuHandler);
      });
    }

    /**
     * 指定された要素が `group-item` タグを持つかどうかを確認し、持つ場合はその要素を返します。
     * 持たない場合は、最も近い `group-item` 要素を返し、もし見つからなければルート要素を返します。
     * @param {HTMLElement} element - 処理対象の要素
     * @returns {HTMLElement} 指定された要素が `group-item` である場合、その要素。
     *                        そうでない場合は最も近い `group-item` 要素、またはルート要素。
     */
    #getAddRoot(element) {
      if (ElmUtils.tagEq(element, "group-item")) {
        return element;
      } else {
        return element?.closest("group-item") || this.root;
      }
    }

    /**
     * シャドウルートに `clickAddNewTask` イベントリスナーを追加します。
     * イベントが発生すると、新しいタスクアイテムを作成し、指定された親要素に追加します。
     * @returns {void}
     */
    #attachAddNewTaskListener() {
      this.shadowRoot.addEventListener("clickAddNewTask", (e) => {
        const addRoot = this.#getAddRoot(e.detail.item.target);
        const item = this.#createTaskItem();
        addRoot.appendChild(item);

        this.dispatchEvent(
          EventUtils.createEvent("addTaskItem", { id: item.id })
        );
      });
    }

    /**
     * シャドウルートに `clickAddNewGroup` イベントリスナーを追加します。
     * イベントが発生すると、新しいグループアイテムを作成し、指定された親要素に追加します。
     * @returns {void}
     */
    #attachAddNewGroupListener() {
      this.shadowRoot.addEventListener("clickAddNewGroup", (e) => {
        const addRoot = this.#getAddRoot(e.detail.item.target);
        const item = this.#createGroupItem();
        addRoot.appendChild(item);

        this.dispatchEvent(
          EventUtils.createEvent("addGroupItem", { id: item.id })
        );
      });
    }

    // *******************************************************
    // * TreeView操作
    // *******************************************************

    /**
     * 指定した要素をドラッグ可能なdiv要素でラップします。
     *
     * @param {HTMLElement} element - ラップする要素。
     * @returns {HTMLDivElement} ドラッグ可能なdiv要素を含む要素。
     */
    #wrapDraggableDiv(element, className) {
      const div = ElmUtils.createElm("div", null, [
        "draggable-item",
        className,
      ]);
      div.setAttribute("draggable", true);
      div.appendChild(element);

      return div;
    }

    /**
     * タスクアイテムを作成します。
     *
     * @param {Object} data - タスクのデータ。
     * @param {string} data.title - タスクのタイトル。
     * @param {string} data.description - タスクの説明。
     * @param {boolean} data.completed - タスクの完了状態。
     * @returns {HTMLDivElement} 作成されたタスクアイテムを含むdiv要素。
     */
    #createTaskItem(data = {}) {
      const item = ElmUtils.createElm("task-title");
      item.init(data);
      item.setContextMenu(this.menu);

      const wrapedItem = this.#wrapDraggableDiv(item, "task-item");
      this.#addDragEventListeners(wrapedItem);
      return wrapedItem;
    }

    /**
     * グループアイテムを作成します。
     *
     * @param {Object} data - グループのデータ。
     * @param {string} data.title - グループのタイトル。
     * @param {string} data.description - グループの説明。
     * @param {boolean} data.completed - グループの完了状態。
     * @returns {HTMLDivElement} 作成されたグループアイテムを含むdiv要素。
     */
    #createGroupItem(data = {}) {
      // グループタイトル要素を作成し、データを初期化
      const item = ElmUtils.createElm("group-title");
      item.init(data);
      item.setContextMenu(this.menu);

      // details要素を作成
      const details = ElmUtils.createElm("details");

      // summary要素を作成
      const summary = ElmUtils.createElm("summary");
      summary.addEventListener("click", () => {
        item.open = !details.open;
      });

      // グループ内のアイテムを格納するdiv要素を作成
      const items = ElmUtils.createElm("div", null, ["group-items"]);

      // タイトル要素をsummary要素に追加
      summary.appendChild(item);

      // summary要素とitems要素をdetails要素に追加
      details.appendChild(summary);
      details.appendChild(items);

      const wrapedItem = this.#wrapDraggableDiv(details, "group-item");
      this.#addDragEventListeners(wrapedItem);
      return wrapedItem;
    }

    // *******************************************************
    // * Drag&Drop
    // *******************************************************

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
      e.dataTransfer.setData("text/html", e.target);
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
      const target = e.target.closest(".draggable-item");
      if (!target || target === draggedElement) {
        return;
      }

      // draggedElement が target の中に含まれていないことを確認
      if (this.draggedElement && draggedElement.contains(target)) {
        return;
      }

      // ターゲット要素の位置とサイズを取得
      const rect = target.getBoundingClientRect();

      // マウス位置がターゲットのどの位置に来ているかを計算
      const nowPosition = (e.clientY - rect.top) / (rect.bottom - rect.top);

      // ------------------------------
      // 要素の挿入位置を決定
      // ------------------------------

      /**
       * 要素がタスクであるか判定する。
       * @param {HTMLElement} elm 判定対象
       * @returns {boolean} 判定結果
       */
      const isTaskItem = (elm) => elm.classList.contains("task-item");

      /**
       * マウスターゲットが要素から見て上半分にあるか否か判定する。
       * @param {number} pos マウス位置
       * @returns {boolean} 判定結果
       */
      const isBefore = (pos) => pos <= 0.5;

      /**
       * ドラッグ中の要素を指定要素の前に挿入する。
       *  @param {HTMLElement} elm 挿入基点となる要素
       * @returns
       */
      const insertBefore = (elm) =>
        elm.insertAdjacentElement("beforebegin", draggedElement);

      /**
       * ドラッグ中の要素を指定要素の後ろに挿入する。
       * @param {*} elm
       * @returns
       */
      const insertAfter = (elm) =>
        elm.insertAdjacentElement("afterend", draggedElement);

      // 要素の位置を決定する
      if (isTaskItem(target)) {
        // タスク要素を起点とする場合
        if (isBefore(nowPosition)) {
          insertBefore(target); // 前に追加
        } else {
          insertAfter(target); // 後ろに追加
        }
      }
    }

    /**
     * ドラッグ終了
     * @param {Event} e
     */
    #handleDragEnd(e) {
      e.target.classList.remove("dragging");
      draggedElement = null;
      this.dispatchEvent(EventUtils.createEvent("changeTreeViewItem"));
    }
  }
  customElements.define("tree-view", TreeView);
}
