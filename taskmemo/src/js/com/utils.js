export class Utils {
  /**
   * 指定したCSSファイルを読み込むリンクタグを生成する。
   * @param {string} filename CSSファイルパス
   * @returns タグ
   */
  static style(filename) {
    const elm = document.createElement("link");
    elm.setAttribute("rel", "stylesheet");
    elm.setAttribute("href", filename);
    return elm;
  }

  /**
   * Shadow DOMに適用するためのスタイルシートを生成する。
   * @param {*} styles
   * @returns スタイルシート
   * @memberof Utils
   * @static
   */
  static createStyle(styles) {
    const styleSheet = new CSSStyleSheet();
    styleSheet.replaceSync(styles);
    return [styleSheet];
  }

  /**
   * SVGアイコンを生成する。
   * @param {object} conf SVG設定内容
   * @returns タグ
   */
  static svg(conf) {
    const svgNS = "http://www.w3.org/2000/svg";
    const xlinkNS = "http://www.w3.org/1999/xlink";

    const createSvg = () => {
      const svg = document.createElementNS(svgNS, "svg");
      svg.setAttribute("aria-hidden", "true");
      svg.setAttribute("version", "1.1");
      svg.setAttribute("xmlns", svgNS);
      svg.setAttribute("xmlns:xlink", xlinkNS);
      svg.classList.add("svg");
      return svg;
    };

    const createDefs = () => {
      return document.createElementNS(svgNS, "defs");
    };

    const createSymbol = () => {
      const symbol = document.createElementNS(svgNS, "symbol");
      symbol.setAttribute("id", `icon-${conf.name}`);
      symbol.setAttribute("viewBox", "0 0 24 24");
      symbol.setAttribute("fill", "none");
      symbol.setAttribute("stroke", "currentColor");
      symbol.setAttribute("stroke-width", "2");
      symbol.setAttribute("stroke-linecap", "round");
      symbol.setAttribute("stroke-linejoin", "round");
      return symbol;
    };

    const createPathFirst = () => {
      const pathFirst = document.createElementNS(svgNS, "path");
      pathFirst.setAttribute("stroke", "none");
      pathFirst.setAttribute("d", "M0 0h24v24H0z");
      pathFirst.setAttribute("fill", "none");
      return pathFirst;
    };

    const createPath = (elm) => {
      const path = document.createElementNS(svgNS, "path");
      path.setAttribute("d", elm.path);

      if (elm.isFill !== undefined && elm.isFill) {
        path.setAttribute("fill", "currentColor");
        path.setAttribute("stroke", "none");
      }

      return path;
    };

    const symbol = createSymbol();
    symbol.appendChild(createPathFirst());
    conf.paths.forEach((elm) => {
      symbol.appendChild(createPath(elm));
    });

    const defs = createDefs();
    defs.appendChild(symbol);

    const svg = createSvg();
    svg.appendChild(defs);

    return svg;
  }

  /**
   * SVGアイコンを使用したボタンを生成する。
   * @param {string} icon アイコン名
   * @returns タグ
   */
  static svgBtn(icon) {
    const svgNS = "http://www.w3.org/2000/svg";
    const xlinkNS = "http://www.w3.org/1999/xlink";

    const svg = document.createElementNS(svgNS, "svg");
    svg.classList.add("icon");

    const use = document.createElementNS(svgNS, "use");
    use.setAttributeNS(xlinkNS, "xlink:href", `#icon-${icon}`);
    svg.appendChild(use);

    const button = document.createElement("button");
    button.appendChild(svg);

    return button;
  }
}
