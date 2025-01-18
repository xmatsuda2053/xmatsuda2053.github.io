export class Utils {
  /**
   * 指定されたファイル名を使用して新しいCSSスタイルシートを作成する。
   * @param {string} filepath - CSSスタイルシートのファイルパス。
   * @returns {CSSStyleSheet[]} 作成されたCSSスタイルシートの配列。
   */
  static createStyleSheetWithFilename = (filepath) => {
    const styleSheet = new CSSStyleSheet();
    styleSheet.replaceSync(filepath);
    return [styleSheet];
  };

  /**
   * 指定されたIDおよびクラスリストを持つ新しいdiv要素を作成する。
   * @param {string} id - 新しいdiv要素に割り当てるID。
   * @param {string[]} classList - 新しいdiv要素に追加するクラスの配列。
   * @returns {HTMLDivElement} 新しく作成されたdiv要素。
   */
  static createDiv = (id, classList) => {
    const div = document.createElement("div");
    div.id = id;
    div.classList.add(...classList);
    return div;
  };

  /**
   * 指定されたタグ名とオプションのIDでHTML要素を作成する。
   * @param {string} tagName - 作成する要素のタグ名。
   * @param {string} [id=""] - オプションの要素ID。
   * @returns {HTMLElement} 生成されたHTML要素。
   */
  static createElm = (tagName, id = "") => {
    const elm = document.createElement(tagName);
    if (id !== "") {
      elm.id = id;
    }
    return elm;
  };

  /**
   * SVGアイコンを生成する
   * @param {string} name アイコンの名前
   * @param {Array<{path: string, isFill?: boolean}>} paths SVGのパス配列
   * @returns {SVGElement} 作成されたSVG要素
   */
  static createSvg = (name, paths) => {
    const svgNS = "http://www.w3.org/2000/svg";
    const xlinkNS = "http://www.w3.org/1999/xlink";

    // SVGタグを作成する
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("aria-hidden", "true");
    svg.setAttribute("version", "1.1");
    svg.setAttribute("xmlns", svgNS);
    svg.setAttribute("xmlns:xlink", xlinkNS);
    svg.classList.add("svg");

    // Defsタグを作成する
    const defs = document.createElementNS(svgNS, "defs");

    // symbolタグを作成する
    const symbol = document.createElementNS(svgNS, "symbol");
    symbol.setAttribute("id", `icon-${name}`);
    symbol.setAttribute("viewBox", "0 0 24 24");
    symbol.setAttribute("fill", "none");
    symbol.setAttribute("stroke", "currentColor");
    symbol.setAttribute("stroke-width", "2");
    symbol.setAttribute("stroke-linecap", "round");
    symbol.setAttribute("stroke-linejoin", "round");

    // SVGのPathを作成し、symbolタグに追加する
    paths.forEach((elm, index) => {
      const path = document.createElementNS(svgNS, "path");
      if (index === 0) {
        path.setAttribute("stroke", "none");
        path.setAttribute("fill", "none");
      } else if (elm.isFill) {
        path.setAttribute("stroke", "none");
        path.setAttribute("fill", "currentColor");
      }
      path.setAttribute("d", elm.path);
      symbol.appendChild(path);
    });

    // defsタグにsymbolタグを追加する
    defs.appendChild(symbol);

    // svgタグにdefsタグを追加する。
    svg.appendChild(defs);

    return svg;
  };

  /**
   * SVGアイコンを含むボタンを生成する
   * @param {string} iconName アイコンの名前
   * @returns {HTMLButtonElement} SVGアイコンを含むボタン要素
   */
  static createSvgButton = (iconName) => {
    const svgNS = "http://www.w3.org/2000/svg";
    const xlinkNS = "http://www.w3.org/1999/xlink";

    // SVG要素を作成し、クラスを追加する
    const svg = document.createElementNS(svgNS, "svg");
    svg.classList.add("icon");

    // use要素を作成し、SVG要素に追加する
    const use = document.createElementNS(svgNS, "use");
    use.setAttributeNS(xlinkNS, "xlink:href", `#icon-${iconName}`);
    svg.appendChild(use);

    // ボタン要素を作成し、SVG要素を追加する
    const button = document.createElement("button");
    button.appendChild(svg);

    return button;
  };

  /**
   * 日付オブジェクトからフォーマットされた文字列を生成するヘルパー関数
   * @param {Date} date 日付オブジェクト
   * @param {string} format 日付フォーマット
   * @returns {string} フォーマットされた日付文字列
   */
  static formatDate = (date, format = "{yyyy}{MM}{dd}{HH}{mm}{ss}{SSS}") => {
    const parts = {
      yyyy: date.getFullYear(),
      MM: String(date.getMonth() + 1).padStart(2, "0"),
      dd: String(date.getDate()).padStart(2, "0"),
      HH: String(date.getHours()).padStart(2, "0"),
      mm: String(date.getMinutes()).padStart(2, "0"),
      ss: String(date.getSeconds()).padStart(2, "0"),
      SSS: String(date.getMilliseconds()).padStart(3, "0"),
    };

    return format.replace(
      /{(yyyy|MM|dd|HH|mm|ss|SSS)}/g,
      (matched) => parts[matched.slice(1, -1)]
    );
  };

  /**
   * 日付文字列をDateオブジェクトに変換する。
   * @param {string} dateString - "yyyy-mm-dd"形式の日付文字列。
   * @returns {Date} - 変換されたDateオブジェクト。
   */
  static parseDate = (dateString) => {
    // 日付であるか判定
    if (!this.isValidDate(dateString)) {
      throw new Error("日付文字列の形式が正しくありません。");
    }
    // "-"で日付を分割し、配列として取得
    const parts = dateString.split("-");

    // 配列の要素を数値に変換
    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1; // 月は0-11で表現されるため-1
    const day = parseInt(parts[2], 10);

    // Dateオブジェクトを作成して返す
    return new Date(year, month, day);
  };

  /**
   * 与えられた文字列がyyyy-mm-dd形式の日付かどうかを判定する
   *
   * @param {string} dateString - 判定する文字列。
   * @returns {boolean} - 有効な日付形式かどうか。
   */
  static isValidDate = (dateString) => {
    // 正規表現によるフォーマットのチェック
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(dateString)) {
      return false;
    }

    // Dateオブジェクトを使用して実際の有効性を確認
    const date = new Date(dateString);
    const timestamp = date.getTime();
    if (typeof timestamp !== "number" || Number.isNaN(timestamp)) {
      return false;
    }

    // 入力された文字列が有効な日付か確認
    return date.toISOString().startsWith(dateString);
  };

  /**
   * 一意のIDを生成する
   * @returns {string} 一意のID
   */
  static getUniqueId = () => {
    // ランダム文字列を生成する
    const randomStr = Math.floor(10000 * Math.random()).toString(16);

    // 日付文字列を生成
    const systemDate = this.formatDate(new Date());

    return `${systemDate}_${randomStr}`;
  };

  /**
   * カスタムイベントを発行用の関数を返す
   * @param {string} eventName
   * @param {string} msg
   * @returns
   */
  static getCustomEvent = (eventName, msg = "CustomEvent") => {
    return new CustomEvent(eventName, {
      detail: { message: msg },
      bubbles: true,
      composed: true,
    });
  };

  /**
   * 指定された要素をクラス"item"を持つdivでラップする。
   *
   * @param {HTMLElement} elm - ラップする要素。
   * @returns {HTMLElement} 指定された要素を含む新しく作成された"item"クラスのdiv要素を返す。
   */
  static wrapElementInItemDiv = (elm) => {
    const item = document.createElement("div");
    item.classList.add("wrap-item");
    item.appendChild(elm);
    return item;
  };

  /**
   * テキストエリアの高さを調整する
   * @param {HTMLTextAreaElement} textarea 高さを調整するテキストエリア要素
   * @param {number} [defaultRows=3] デフォルト行数
   * @param {number} [rows=0] 任意設定行数
   * @returns {string} 調整された高さ（ピクセル単位）
   */
  static adjustTextareaHeight(textarea, defaultRows = 3, rows = 0) {
    // 高さを自動設定に変更
    textarea.style.height = "auto";

    const style = window.getComputedStyle(textarea);
    const lineHeight = parseFloat(style.lineHeight);
    const paddingTop = parseFloat(style.paddingTop);
    const paddingBottom = parseFloat(style.paddingBottom);
    const paddingHeight = paddingTop + paddingBottom;
    const contentHeight = textarea.scrollHeight - paddingHeight;

    if (rows === 0) {
      rows = Math.ceil(contentHeight / lineHeight);
      if (rows < defaultRows) {
        rows = defaultRows;
      }
    }

    // テキストエリアの高さをピクセル単位で計算
    const adjustHeight = lineHeight * rows + paddingHeight;
    return `${adjustHeight}px`;
  }

  /**
   * 与えられた日付文字列と当日の日付との差を日数で計算する。
   * @param {string} dataString - yyyy-mm-dd形式の日付文字列。
   * @returns {number} - 当日からの残り日数。
   */
  static calcDateDiffToday(dataString) {
    /**
     * ミリ秒を1日単位に変換する定数
     */
    const MS_PER_DAY = 86400000;

    // 空の場合は処理対象外
    if (!this.isValidDate(dataString)) {
      return 0;
    }
    // 入力された日付をパース
    const data = this.parseDate(dataString);
    // 本日の日付を取得してフォーマット
    const today = this.parseDate(
      this.formatDate(new Date(), "{yyyy}-{MM}-{dd}")
    );
    // 残り日数を計算
    const dayCount = Math.floor((data - today) / MS_PER_DAY);

    return dayCount;
  }

  /**
   * 特定のデータ属性変更イベントハンドラを設定する
   *
   * @param {HTMLElement} target - 監視対象の要素
   * @param {string} dataName - 監視するデータ属性名
   * @param {function} handler - 属性変更時に呼び出されるコールバック関数
   */
  static setDatasetChangeHandler(target, dataName, handler) {
    /**
     * ミューテーションリストを処理するコールバック関数
     * @param {MutationRecord[]} mutationsList - 監視対象の変化リスト
     */
    const callback = (mutationsList) => {
      for (let m of mutationsList) {
        // 属性の変更で、変更された属性名が指定されたデータ属性名と一致する場合に処理を行う
        if (m.type === "attributes" && m.attributeName === dataName) {
          handler();
        }
      }
    };

    const observer = new MutationObserver(callback);
    // 監視対象の要素にオブザーバを設定し、指定されたデータ属性の変更のみを監視する
    observer.observe(target, {
      attributes: true,
      attributeFilter: [dataName],
    });
  }
}
