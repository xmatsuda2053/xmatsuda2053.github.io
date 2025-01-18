/**
 * 共通関数
 */
import { Utils } from "../common/utils";
import { SvgIcon } from "../common/svgIcon";

/**
 * HistoryItemコンポーネント用のCSS
 */
import style from "../../style/css/history-item.css";

/**
 * ドラッグ操作中の要素
 */
let draggedElement;

/**
 * HistoryItem コンポーネントを作成しカスタム要素として定義する
 */
export function HistoryItem() {
  /**
   * HistoryItem コンポーネントのカスタム要素のクラス
   * @extends {HTMLElement}
   */
  class HistoryItem extends HTMLElement {
    /**
     * コンストラクタ
     * @return {void}
     */
    constructor() {
      super();

      this.attachShadow({ mode: "open" });
      this.shadowRoot.adoptedStyleSheets =
        Utils.createStyleSheetWithFilename(style);

      const container = document.createElement("div");
      const svgIcon = Utils.createSvg("plus", SvgIcon.plusPaths());
      const addButton = this.#createAddPartsHistoryItemButton();

      container.appendChild(svgIcon);
      container.appendChild(addButton);
      container.id = "container";

      this.shadowRoot.innerHTML = "";
      this.shadowRoot.appendChild(container);
    }

    /**
     * 入力内容の変更を検知するイベントを有効化する
     */
    enableCustomEvent() {
      const container = this.shadowRoot.getElementById("container");
      container.addEventListener("changeHistoryItem", () => {
        this.dispatchEvent(Utils.getCustomEvent("changeHistory"));
      });
    }

    /**
     * container内の全てのparts-history-item要素からデータを取得する
     *
     * @returns {Array.<{ text: string, date: string }>} 取得されたデータの配列
     */
    getHistoryData() {
      const container = this.shadowRoot.getElementById("container");
      const items = container.getElementsByTagName("parts-history-item");

      const result = [];
      for (const item of items) {
        const text = item.text;
        const date = item.date;
        result.push({ text: text, date: date });
      }

      return result;
    }

    /**
     * データを元にHistoryItemをレンダリングする
     * @param {array} itemList historyData
     * @returns {void}
     */
    renderHistoryItem(itemList) {
      itemList.forEach((item) => {
        const piece = this.#addEmptyParts();
        piece.text = item.text;
        piece.date = item.date;
      });
    }

    /**
     * プラス記号のSVGアイコンを作成する
     * @returns {SVGElement} プラスアイコンを含む生成されたSVG要素
     */
    #createSvgIconPlus() {
      return Utils.createSvg("plus", [
        { path: "M0 0h24v24H0z" },
        { path: "M12 5l0 14" },
        { path: "M5 12l14 0" },
      ]);
    }

    /**
     * 履歴アイテム追加用のボタンを作成する
     *
     * @returns {HTMLButtonElement} 生成された履歴アイテム追加用のボタン
     */
    #createAddPartsHistoryItemButton() {
      const btn = Utils.createSvgButton("plus");
      btn.id = "add-parts-history-item";
      btn.classList.add("float-button");

      /**
       * ボタンクリック時、履歴入力欄を追加する
       */
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.#addEmptyParts();
        this.dispatchEvent(Utils.getCustomEvent("addHistory"));
      });
      return btn;
    }

    /**
     * 履歴入力欄を作成し画面に追加する。
     * @returns {HTMLElement} piece
     */
    #addEmptyParts() {
      const container = this.shadowRoot.getElementById("container");
      const piece = document.createElement("parts-history-item");
      piece.id = Utils.getUniqueId();

      const wrapPiece = Utils.wrapElementInItemDiv(piece);
      wrapPiece.classList.add("parts");

      container.appendChild(wrapPiece);

      // ドラッグ操作イベントを追加
      this.#addDragEventListeners(wrapPiece);

      // 要素削除時の処理を追加
      piece.addEventListener("deleteHistoryItem", () => {
        wrapPiece.remove();
        this.dispatchEvent(Utils.getCustomEvent("changeHistory"));
      });

      return piece;
    }

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

      if (draggedElement.isTextareaActive) {
        return;
      }

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

      // ターゲット要素を最も近いdiv要素に設定
      const target = e.target.closest("div");
      if (!target || target === draggedElement) {
        return;
      }

      // ターゲット要素の位置とサイズを取得
      const rect = target.getBoundingClientRect();

      // マウス位置がターゲットのどの位置に来ているかを計算
      const nowPosition = (e.clientY - rect.top) / (rect.bottom - rect.top);

      // 要素の挿入位置を決定
      if (nowPosition > 0.5) {
        target.insertAdjacentElement("afterend", draggedElement);
      } else {
        target.insertAdjacentElement("beforebegin", draggedElement);
      }
    }

    /**
     * ドラッグ終了
     * @param {Event} e
     */
    #handleDragEnd(e) {
      e.target.classList.remove("dragging");
      draggedElement = null;
      this.dispatchEvent(Utils.getCustomEvent("changeHistory"));
    }
  }
  // カスタム要素 "HistoryItem" を定義する
  customElements.define("history-item", HistoryItem);
}
