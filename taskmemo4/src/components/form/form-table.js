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
     * ヘッダーを設定します。
     * @param {Array<string>} texts - ヘッダーに表示するテキストの配列。
     */
    set header(texts = []) {
      this.thead.innerHTML = "";
      const tr = ElmUtils.createElm("tr");
      texts.forEach((text) => {
        const th = ElmUtils.createElm("th");
        th.innerText = text;
        tr.appendChild(th);
      });
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
     * td要素を作成し、指定された要素を追加します。
     * @param {Array<string|HTMLElement>} elms - 追加する要素の配列。文字列またはHTMLElement
     * @param {string} align - 水平方向の配置（left|center|right）
     */
    appendTd(elms, width, align) {
      const rootDiv = ElmUtils.createElm("div");
      const div = ElmUtils.createElm("div");
      const td = ElmUtils.createElm("td");

      elms.forEach((elm, index) => {
        if (typeof elm === "string") {
          const p = ElmUtils.createElm("p");
          p.innerText = elm;

          if (width && width[index]) {
            p.style.width = width[index];
          }

          div.appendChild(p);
        } else {
          div.appendChild(elm);
        }
      });

      rootDiv.appendChild(div);
      rootDiv.classList.add("root");
      td.appendChild(rootDiv);
      td.classList.add(align);

      this.tr.appendChild(td);
    }
  }
  customElements.define("form-table", FormTable);
}
