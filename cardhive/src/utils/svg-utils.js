import { ElmUtils } from "./elm-utils";

/**
 * SVG要素作成ユーティリティクラス
 */
export class SvgUtils {
  /**
   * SVG要素を作成するメソッド
   *
   * @method createSvg
   * @param {string} name - シンボルの名前
   * @param {Array<Object>} paths - SVGのパス情報の配列。各オブジェクトは `path` と `isFill` プロパティを持つ。
   * @returns {SVGSVGElement} - 作成されたSVG要素
   * @description
   * 指定された名前とパス情報でSVG要素を作成し、返す。
   * パスはシンボルとして `defs` に定義される。
   */
  static createSvg = (iconData) => {
    const { name, paths } = iconData;
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
    symbol.setAttribute("id", name);
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
   * SVG use 要素を作成するプライベートメソッド
   * @param {HTMLElement} svgIcon - 設定するアイコン要素
   * @returns {SVGElement} 作成されたSVG要素
   * @description
   * 指定されたSVGアイコン要素を元に、SVG use 要素を作成して返します。
   */
  static createSvgUse(svgIcon) {
    const svgNS = "http://www.w3.org/2000/svg";
    const xlinkNS = "http://www.w3.org/1999/xlink";

    // SVG要素を作成し、クラスを追加する
    const svg = document.createElementNS(svgNS, "svg");
    svg.classList.add("svg-icon");

    // アイコンのIDを取得
    const iconName = svgIcon.getElementsByTagName("symbol")[0].id;

    // use要素を作成し、SVG要素に追加する
    const use = document.createElementNS(svgNS, "use");
    use.setAttributeNS(xlinkNS, "xlink:href", `#${iconName}`);
    svg.appendChild(use);

    return svg;
  }

  /**
   * アイコンを作成する静的メソッド
   * @param {Object} iconData - アイコンデータのオブジェクト
   * @return {HTMLElement} - 作成されたSVG要素
   */
  static createIcon(iconData) {
    const icon = this.createSvg(iconData);
    const use = this.createSvgUse(icon);
    const div = ElmUtils.createElm("div");

    div.appendChild(icon);
    div.appendChild(use);

    return div;
  }
}
