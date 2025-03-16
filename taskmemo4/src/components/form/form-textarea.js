import { ElmUtils } from "../../utils/elm-utils";
import { EventUtils } from "../../utils/event-utils";
import { EventConst } from "../../constants/event-const";

import styles from "./style/form-textarea.css";
import { SvgUtils } from "../../utils/svg-utils";
import { SvgConst } from "../../constants/svg-const";

/**
 * FormTextarea コンポーネント
 * @class FormTextarea
 * @extends {HTMLElement}
 */
export function FormTextarea() {
  class FormTextarea extends HTMLElement {
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

      // 空の要素を作成
      this.textarea = ElmUtils.createElm("textarea");
      this.textarea.style = "width:100%";
      this.textarea.spellcheck = false;

      /**
       * 入力内容に連動して高さを変更する
       */
      this.defaultRows = 3;
      this.textarea.addEventListener("input", (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.#adjustTextareaHeight();
        this.#updateViewArea();
      });

      this.shadowRoot.appendChild(this.textarea);

      // 変更イベントを伝播
      this.textarea.addEventListener("change", () => {
        this.dispatchEvent(
          EventUtils.createEvent(EventConst.CHANGE_FORM_ITEM_EVENT_NAME)
        );
      });
    }

    /**
     * 要素がDOMに追加された後の処理
     */
    connectedCallback() {
      this.#adjustTextareaHeight(this.defaultRows);
      this.#updateViewArea();
    }

    /**
     * テキストエリアの高さを調整します。
     * @param {number} [rows=0] - 設定する行数。0の場合は内容に基づいて行数を自動的に設定します。
     */
    #adjustTextareaHeight(rows = 0) {
      this.textarea.style.height = "auto";

      const style = window.getComputedStyle(this.textarea);
      const lineHeight = parseFloat(style.lineHeight);
      const paddingTop = parseFloat(style.paddingTop);
      const paddingBottom = parseFloat(style.paddingBottom);
      const paddingHeight = paddingTop + paddingBottom;
      const contentHeight = this.textarea.scrollHeight;

      if (rows === 0) {
        rows = Math.max(
          this.defaultRows,
          Math.round(contentHeight / lineHeight)
        );
      }

      const adjustHeight = lineHeight * rows + paddingHeight;
      this.textarea.style.height = `${adjustHeight}px`;
    }

    /**
     * viewAreaを更新する。
     */
    #updateViewArea() {
      if (!this._isViewArea) {
        return;
      }

      // 既存要素を削除
      this.viewArea.innerHTML = "";

      // 出力判定
      if (!this.textarea.value) {
        return;
      }

      // リスト出力
      const itemList = ElmUtils.createElm("ul");
      this.textarea.value.split("\n").forEach((item) => {
        let icon;
        const li = ElmUtils.createElm("li");

        if (this._isURL) {
          // 新しいタブ
          icon = SvgUtils.createIcon(SvgConst.LinkPaths);
          li.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();
            open(item, "_blank");
          });
        } else {
          // クリップボードにコピー
          icon = SvgUtils.createIcon(SvgConst.CopyPaths);
          li.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();
            navigator.clipboard.writeText(item);
          });
        }

        li.appendChild(icon);
        li.appendChild(document.createTextNode(item));

        itemList.appendChild(li);
      });
      this.viewArea.appendChild(itemList);
    }

    /**
     * Textareaに値を設定する
     * @param {string} val 設定値
     * @return {void}
     */
    set value(val) {
      this.textarea.value = val;
      requestAnimationFrame(() => {
        this.#adjustTextareaHeight();
        this.#updateViewArea();
      });
    }

    /**
     *  Textareaの値を取得する
     * @return {string} 設定値
     */
    get value() {
      return this.textarea.value;
    }

    /**
     * Textareaにプレースホルダーを設定する
     * @param {string} val 設定値
     * @return {void}
     */
    set placeholder(val) {
      this.textarea.placeholder = val;
    }

    /**
     * 幅を設定します。
     * @param {string} w - 設定する幅の値（例：'100px'）。
     */
    set width(w) {
      this.textarea.style = `width:${w}`;
    }

    /**
     * テキストエリアの行数を設定します。
     * @param {number} r - 設定する行数
     */
    set rows(r) {
      this.defaultRows = r;
      this.#adjustTextareaHeight(r);
      this.#updateViewArea();
    }

    /**
     * 入力データがフォルダパスであるかを設定する。
     * @param {bool} val - フラグ
     */
    set isFolderPath(val) {
      this._isFolderPath = val;
      this.#addViewArea(val);
    }

    /**
     * 入力データがURLであるかを設定する。
     * @param {bool} val - フラグ
     */
    set isURL(val) {
      this._isURL = val;
      this.#addViewArea(val);
    }

    /**
     * ViewAreaを追加する。
     * @param {bool} val - フラグ
     */
    #addViewArea(val) {
      this._isViewArea = val;

      // 表示エリア
      this.viewArea = ElmUtils.createElm("div", "view-area");

      // 編集エリア
      this.editBtnArea = ElmUtils.createElm("div", "edit-btn-area");

      const editBtn = ElmUtils.createElm("svg-btn", "edit");
      editBtn.iconPaths = SvgConst.EditPaths;
      editBtn.size = "1.5rem";
      editBtn.color = "red";
      editBtn.hover = true;
      editBtn.toggle = true;
      editBtn.toggleOn = false;

      editBtn.addEventListener("click", () => {
        this.textarea.classList.toggle("hidden", !editBtn.toggle);
        this.viewArea.classList.toggle("hidden", editBtn.toggle);
        this.#adjustTextareaHeight();
      });

      this.editBtnArea.appendChild(editBtn);

      // 入力エリアを非表示
      this.textarea.classList.add("hidden");

      // 要素追加
      this.shadowRoot.appendChild(this.viewArea);
      this.shadowRoot.appendChild(this.editBtnArea);
    }

    /**
     * ボーダーの有無を設定します。
     * @param {boolean} isBorderLess - ボーダーを表示しない場合はtrueを指定します。
     */
    set borderless(isBorderLess) {
      this.textarea.classList.toggle("borderless", isBorderLess);
    }
  }
  customElements.define("form-textarea", FormTextarea);
}
