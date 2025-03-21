import { ElmUtils } from "../../utils/elm-utils";
import { SvgUtils } from "../../utils/svg-utils";
import { SvgConst } from "../../constants/svg-const";

import styles from "./style/form-table.css";

/**
 * FormTable コンポーネント
 * @class FormTable
 * @extends {HTMLElement}
 */
export function FormTable() {
  class FormTable extends HTMLElement {
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
      this.root = ElmUtils.createElm("div", "root");
      this.table = ElmUtils.createElm("table");
      this.thead = ElmUtils.createElm("thead");
      this.tbody = ElmUtils.createElm("tbody");

      this.table.appendChild(this.thead);
      this.table.appendChild(this.tbody);
      this.root.appendChild(this.table);

      this.shadowRoot.appendChild(this.root);
    }

    /**
     * 幅を設定します。
     * @param {string} w - 設定する幅の値（例：'100px'）。
     */
    set width(w) {
      this.table.style = `width:${w}`;
    }

    /**
     * キャプションを設定します。
     * @param {HTMLElement} icon - アイコン
     * @param {string} val - キャプション
     */
    setCaption(icon, val) {
      this._icon = icon;
      this._caption = val;
    }

    /**
     * ヘッダーを設定します。
     * @param {Array<string>} texts - ヘッダーに表示するテキストの配列。
     */
    set header(texts = []) {
      this.thead.innerHTML = "";

      const tr = ElmUtils.createElm("tr", "header-items");
      texts.forEach((text) => {
        const th = ElmUtils.createElm("th");
        th.innerText = text;
        tr.appendChild(th);
      });

      this.#addCaption(texts.length);
      this.thead.appendChild(tr);
    }

    /**
     * キャプションをテーブルに追加する。
     * @param {integer} col - 列数
     */
    #addCaption(col) {
      if (!this._caption) {
        return;
      }
      const tr = ElmUtils.createElm("tr", "caption");
      const th = ElmUtils.createElm("th");
      const p = ElmUtils.createElm("p");
      p.textContent = this._caption;

      th.setAttribute("colSpan", col);
      th.appendChild(this._icon);
      th.appendChild(p);

      tr.appendChild(th);

      this.thead.appendChild(tr);
    }

    /**
     * 新しいtr要素を作成してtbodyに追加します。
     */
    appendTr() {
      this.tr = ElmUtils.createElm("tr");
      this.tbody.appendChild(this.tr);
    }

    /**
     * Tr要素にクラスを設定します。
     * @param {string} className
     */
    setTrClass(className) {
      this.tr.classList.add(className);
    }

    /**
     * 新しいtd要素を作成してtrに追加します。
     */
    addTd() {
      this.td = ElmUtils.createElm("td");
      this.tr.appendChild(this.td);
    }

    /**
     * Td要素にエレメントを追加します。
     * @param {element} elm
     */
    setTdElment(elm) {
      if (typeof elm === "string") {
        const div = ElmUtils.createElm("div");
        div.innerText = elm;
        this.td.appendChild(div);
      } else {
        this.td.appendChild(elm);
      }
    }

    /**
     * Td要素の横幅を設定します。
     * @param {string} width
     */
    setTdWidth(width) {
      this.td.style = `width:${width}`;
    }

    /**
     * Td要素の文字の位置を設定します。
     * @param {string} align
     */
    setTdAlign(align) {
      this.td.classList.add(align);
    }

    /**
     * セルクリック時の処理を設定する。
     * @param {function} func
     */
    setTdClickEvent(func) {
      this.td.classList.add("clickable");
      this.td.addEventListener("click", func);
    }
  }
  customElements.define("form-table", FormTable);
}
