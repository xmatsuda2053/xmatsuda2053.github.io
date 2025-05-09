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
      const scrollTopButton = this.#createScrollTopButton();
      const scrollDownButton = this.#createScrollBottomButton();
      const addButton = this.#createAddPartsHistoryItemButton();

      container.id = "container";
      container.appendChild(scrollTopButton);
      container.appendChild(scrollDownButton);
      container.appendChild(addButton);

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
        const marks = item.marks;
        result.push({ text: text, date: date, marks: marks });
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
        piece.marks = item.marks;
      });
    }

    /**
     * 履歴アイテムをフィルタする
     *
     * @param {Object} conf - フィルタ条件の設定オブジェクト
     * @param {string} conf.markIdList - フィルタ対象のマーク
     */
    filterItem(conf) {
      const { markIdList } = conf;
      const container = this.shadowRoot.getElementById("container");
      const parts = container.getElementsByClassName("parts");
      for (let part of parts) {
        const item = part.getElementsByClassName("history-item")[0];
        part.style.display = "block";
        if (markIdList.length !== 0 && !item.isMarked(markIdList)) {
          part.style.display = "none";
        }
      }
    }

    /**
     * 履歴アイテム追加用のボタンを作成する
     *
     * @returns {HTMLButtonElement} 生成された履歴アイテム追加用のボタン
     */
    #createAddPartsHistoryItemButton() {
      const icon = Utils.createSvg("plus", SvgIcon.plusPaths());
      const btn = Utils.createSvgButton("plus", icon);
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
     * 最上部までスクロールするボタンを作成する
     * @returns {HTMLButtonElement} ボタン
     */
    #createScrollTopButton() {
      const icon = Utils.createSvg("up", SvgIcon.chevronsUpPath());
      const btn = Utils.createSvgButton("up", icon);
      btn.id = "scroll-top-button";
      btn.classList.add("float-button");

      btn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.dispatchEvent(Utils.getCustomEvent("clickScrollTop"));
      });

      return btn;
    }

    /**
     * 最下部までスクロールするボタンを作成する
     * @returns {HTMLButtonElement} ボタン
     */
    #createScrollBottomButton() {
      const icon = Utils.createSvg("down", SvgIcon.chevronsDownPath());
      const btn = Utils.createSvgButton("down", icon);
      btn.id = "scroll-bottom-button";
      btn.classList.add("float-button");

      btn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.dispatchEvent(Utils.getCustomEvent("clickScrollBottom"));
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
      piece.classList.add("history-item");

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
