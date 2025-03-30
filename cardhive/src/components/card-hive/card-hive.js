import styles from "./style/card-hive.css";

import { ElmUtils } from "../../utils/elm-utils";
import { SvgConst } from "../../constants/svg-const";
import { FileManager } from "../../classes/file-manager";

import { SvgBtn } from "../svg-btn/svg-btn";
import { BizCard } from "../biz-card/biz-card";

/**
 * CardHive コンポーネント
 * @class CardHive
 * @extends {HTMLElement}
 */
export function CardHive() {
  class CardHive extends HTMLElement {
    /**
     * コンストラクタ
     * @return {void}
     */
    constructor() {
      super();

      SvgBtn();
      BizCard();

      // Shadow DOMをオープンモードでアタッチ
      this.attachShadow({ mode: "open" });

      // CSSを適用
      this.shadowRoot.adoptedStyleSheets = ElmUtils.createStylesheet(styles);

      // grid作成
      this.container = ElmUtils.createElm("div", "container");
      this.header = ElmUtils.createElm("div", "header-area");
      this.contents = ElmUtils.createElm("div", "contents-area", ["scroll"]);

      this.container.appendChild(this.#createFolderOpenButton());
      this.container.appendChild(this.header);
      this.container.appendChild(this.contents);

      this.shadowRoot.innerHTML = "";
      this.shadowRoot.appendChild(this.container);
    }

    /**
     * フォルダを開くボタンを作成するメソッド
     * @private
     * @description
     * フォルダを開くためのボタンを作成し、そのアイコンを設定し、円形にする。
     * @returns {HTMLElement} - 作成されたfolderOpenBtn要素
     */
    #createFolderOpenButton() {
      const folderOpenBtn = ElmUtils.createElm("svg-btn", "folder-open");
      folderOpenBtn.iconPaths = SvgConst.folderPaths;
      folderOpenBtn.isCircle = true;

      /**
       * クリックイベント
       */
      folderOpenBtn.addEventListener("click", () => {
        folderOpenBtn.remove();
        this.#initPage();
      });

      /**
       * Floatボタン用の領域でラップ
       */
      this.floatBtns = ElmUtils.createFloatArea();
      this.floatBtns.appendChild(folderOpenBtn);

      return this.floatBtns;
    }

    /**
     * 画面初期化
     */
    #initPage() {
      const addItemButton = ElmUtils.createElm("svg-btn", "add-item");
      addItemButton.iconPaths = SvgConst.plusPaths;
      addItemButton.isCircle = true;

      addItemButton.addEventListener("click", () => {
        this.#addBizCard();
      });

      this.floatBtns.appendChild(addItemButton);
    }

    /**
     * 名刺カードコンテンツを追加する。
     * @param {object} data - 名刺データ
     */
    #addBizCard(data = {}) {
      const bizCard = ElmUtils.createElm("biz-card");
      this.contents.appendChild(bizCard);
    }
  }
  customElements.define("card-hive", CardHive);
}
