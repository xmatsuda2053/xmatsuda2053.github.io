import { ElmUtils } from "../../utils/elm-utils";
import { SvgUtils } from "../../utils/svg-utils";
import { IdUtils } from "../../utils/id-utils";
import { EventUtils } from "../../utils/event-utils";

import { ContextMenu } from "../contextMenu/context-menu";
import { TaskItem } from "./task-item";
import { GroupItem } from "./group-item";

import styles from "./style/tree-view.css";

/**
 * TreeView コンポーネント
 * @class TreeView
 * @extends {HTMLElement}
 */
export function TreeView() {
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
      TaskItem();
      GroupItem();

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
      this.#attachDeleteItemListener();

      this.shadowRoot.appendChild(this.root);
    }

    /**
     * ルート要素の子ノードを読み取り、データを取得します。
     * @returns {Array<Object>} 取得したデータの配列
     */
    getData() {
      return this.#readElement(this.root.childNodes);
    }

    /**
     * 指定されたノードリストを再帰的に読み取り、要素データの配列を作成します。
     * @private
     * @param {NodeList} nodes - 処理対象のノードリスト
     * @returns {Array<Object>} 読み取られた要素データの配列
     */
    #readElement(nodes) {
      const elements = [];

      nodes.forEach((node) => {
        const item = {};

        if (ElmUtils.tagEq(node, "task-item")) {
          // タスク
          item.id = node.id || null;
          item.name = node.name || null;
          item.type = node.type || null;
          item.duedate = node.duedate || null;
          item.priority = node.priority || null;
          item.status = node.status || null;

          elements.push(item);
        } else if (ElmUtils.tagEq(node, "group-item")) {
          // グループ
          item.id = node.id || null;
          item.name = node.name || null;
          item.children = this.#readElement(node.childNodes);

          elements.push(item);
        }
      });

      return elements;
    }

    /**
     * JSON形式のツリービューデータを受け取り、ツリービューをレンダリングします。
     * @param {string} jsonStr - JSON形式のツリービューデータの文字列
     * @returns {void}
     */
    render(jsonStr) {
      if (!jsonStr) {
        return;
      }

      const dataList = JSON.parse(jsonStr);
      dataList.forEach((data) => {
        this.#addItemsRecursively(this.root, data);
      });
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
        rootItem.appendChild(this.#createTaskItem(data));
      } else {
        const groupItem = this.#createGroupItem(data);
        rootItem.appendChild(groupItem);
        (data.children || []).forEach((child) => {
          this.#addItemsRecursively(groupItem, child);
        });
        groupItem.open = false;
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

    /**
     * シャドウルートに `clickDeleteItem` イベントリスナーを追加します。
     * イベントが発生すると、指定されたターゲットアイテムを削除し、削除された場合は `deleteItem` イベントをディスパッチします。
     * @returns {void}
     */
    #attachDeleteItemListener() {
      this.shadowRoot.addEventListener("clickDeleteItem", (e) => {
        const target = e.detail.item.target;
        if (this.#deleteItem(target)) {
          this.dispatchEvent(
            EventUtils.createEvent("deleteItem", { id: target.id })
          );
        }
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

    // *******************************************************
    // * TreeView操作
    // *******************************************************

    /**
     * 新しい `task-item` 要素を作成し、初期化データとコンテキストメニューを設定します。
     * @param {Object} [data={}] - タスクアイテムを初期化するためのデータ
     * @returns {HTMLElement} 作成された `task-item` エレメント
     */
    #createTaskItem(data = {}) {
      const item = ElmUtils.createElm("task-item");
      item.init(data);
      item.setContextMenu(this.menu);

      return item;
    }

    /**
     * 新しい `group-item` 要素を作成し、初期化データとコンテキストメニューを設定します。
     * @param {Object} [data={}] - グループアイテムを初期化するためのデータ
     * @returns {HTMLElement} 作成された `group-item` エレメント
     */
    #createGroupItem(data = {}) {
      const item = ElmUtils.createElm("group-item");
      item.init(data);
      item.setContextMenu(this.menu);

      return item;
    }

    /**
     * 指定されたターゲット要素を削除します。
     * ターゲットが存在しない場合や、ターゲットのIDが 'root' である場合は削除しません。
     * ユーザーの確認を得た後、ターゲットを削除します。
     * @param {HTMLElement} target - 削除対象の要素
     * @returns {boolean} 削除が成功した場合は true、それ以外の場合は false
     */
    #deleteItem(target) {
      if (!target || target.id === "root") {
        return false;
      }

      const typeName = ElmUtils.tagEq(target, "task-item")
        ? "タスク"
        : "グループ";

      const confirmMessage = `${typeName}「${target.name}」を削除しますか？`;
      if (confirm(confirmMessage)) {
        target.remove();
        return true;
      }

      return false;
    }
  }
  customElements.define("tree-view", TreeView);
}
