/**
 * 要素作成ユーティリティクラス
 */
export class ElmUtils {
  /**
   * CSSスタイルシートを作成するメソッド
   *
   * @method createStylesheet
   * @param {string} style - スタイルの文字列
   * @returns {CSSStyleSheet[]} - 作成されたスタイルシートの配列
   * @description
   * 与えられたスタイルの文字列を元に、新しいCSSStyleSheetを作成して返す。
   */
  static createStylesheet = (style) => {
    const styleSheet = new CSSStyleSheet();
    styleSheet.replaceSync(style);
    return [styleSheet];
  };

  /**
   * 指定されたタグ名、ID、およびクラスリストを持つ要素を作成するメソッド
   *
   * @method createElm
   * @param {string} tag - 作成する要素のタグ名
   * @param {string|null} [id=null] - 作成する要素のID。デフォルトはnull。
   * @param {Array} [classList=[]] - 追加するクラスのリスト。デフォルトは空の配列。
   * @returns {HTMLElement} - 作成されたHTML要素
   * @description
   * 指定されたタグ名、ID、およびクラスリストを持つHTML要素を作成して返す。
   */
  static createElm = (tag, id = null, classList = []) => {
    const div = document.createElement(tag);

    if (id) div.id = id;
    if (classList.length) div.classList.add(...classList);

    return div;
  };

  /**
   * フロートエリアを作成するメソッド
   *
   * @method createFloatArea
   * @returns {HTMLElement} - 作成されたフロートエリアのHTML要素
   * @description
   * 指定されたクラスリストを持つフロートエリアのdiv要素を作成して返す。
   */
  static createFloatArea = () => {
    return this.createElm("div", null, ["float-area"]);
  };

  /**
   * 指定されたターゲット要素のタグ名が指定されたタグ名と一致するかどうかを確認します。
   *
   * @static
   * @param {HTMLElement} target - ターゲット要素
   * @param {string} tagName - 一致を確認するタグ名
   * @returns {boolean} ターゲットのタグ名が指定されたタグ名と一致する場合は true、それ以外の場合は false
   */
  static tagEq = (target, tagName) => {
    return target.tagName.toLowerCase() === tagName;
  };
}
