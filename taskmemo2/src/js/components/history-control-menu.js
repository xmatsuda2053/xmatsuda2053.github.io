/**
 * 共通関数
 */
import { Utils } from "../common/utils";
import { SvgIcon } from "../common/svgIcon";

/**
 * HistoryControlMenuコンポーネント用のCSS
 */
import style from "../../style/css/history-control-menu.css";

/**
 * HistoryControlMenuコンポーネント用のCSS コンポーネントを作成しカスタム要素として定義する
 */
export function HistoryControlMenu() {
  /**
   * HistoryControlMenuコンポーネント用のCSS コンポーネントのカスタム要素のクラス
   * @extends {HTMLElement}
   */
  class HistoryControlMenu extends HTMLElement {
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
      const menu = this.#createMenuList();

      container.id = "container";
      container.appendChild(menu);

      this.shadowRoot.innerHTML = "";
      this.shadowRoot.appendChild(container);
    }

    /**
     * メニューリストを作成する
     *
     * @returns {HTMLElement} - メニューコンテナ要素。
     */
    #createMenuList() {
      const div = Utils.createElm("div", "menu-container");

      const marks = [
        { name: "flag", path: SvgIcon.flagFillPaths() },
        { name: "star", path: SvgIcon.starFillPaths() },
        { name: "flame", path: SvgIcon.flameFillPaths() },
        { name: "pin", path: SvgIcon.pinFillPaths() },
      ];

      marks.forEach((mark) => {
        div.appendChild(this.#createMarkButton(mark));
      });

      return div;
    }

    /**
     * アイコン付きのボタンを作成する
     *
     * @param {Object} mark - アイコンとボタンの設定オブジェクト
     * @param {string} mark.name - アイコンとボタンの名前
     * @param {string} mark.path - アイコンのパス
     * @returns {HTMLElement} 作成されたボタン要素
     * @private
     */
    #createMarkButton(mark) {
      const { name, path } = mark;
      const icon = Utils.createSvg(name, path);
      const btn = Utils.createSvgButton(name, icon);
      btn.id = `${name}-item`;
      btn.classList.add("mark-button");
      btn.dataset.mark = "false";

      btn.addEventListener("click", (e) => {
        e.preventDefault();
        // 現在のデータ属性 "mark" を取得し、true/false を切り替える
        const mark = btn.dataset.mark === "true";
        btn.dataset.mark = !mark;

        // マーク済みのIDを取得する
        const menuContainer = this.shadowRoot.getElementById("menu-container");
        const marks = menuContainer.getElementsByClassName("mark-button");
        const markIdList = [];
        for (let mark of marks) {
          if (mark.dataset.mark === "true") {
            markIdList.push(mark.id);
          }
        }

        // フィルタリング処理
        this.filterHandler({ markIdList });
      });

      return btn;
    }

    /**
     * フィルタ実行用のハンドラを設定する
     * @param {function}} handler
     */
    setFilterHandler(handler) {
      this.filterHandler = handler;
    }
  }
  // カスタム要素 "HistoryControlMenu" を定義する
  customElements.define("history-control-menu", HistoryControlMenu);
}
