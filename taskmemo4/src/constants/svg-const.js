/**
 * SVG定数クラス
 */
export class SvgConst {
  /**
   * 縦の線SVGのパスデータを含むオブジェクトの配列を生成する。
   * @type {Object}
   * @property {string} name - アイコンフォルダの名前
   * @property {Array<Object>} paths - 各パスオブジェクトの配列
   * @property {string} paths.path - インラインSVGパスの定義
   */
  static linePaths = {
    name: "icon-line",
    paths: [{ path: "M0 0h24v24H0z" }, { path: "M12 4v17" }],
  };

  /**
   * すべて開くSVGのパスデータを含むオブジェクトの配列を生成する。
   * @type {Object}
   * @property {string} name - アイコンフォルダの名前
   * @property {Array<Object>} paths - 各パスオブジェクトの配列
   * @property {string} paths.path - インラインSVGパスの定義
   */
  static treeOpenPaths = {
    name: "icon-tree-open",
    paths: [
      { path: "M0 0h24v24H0z" },
      { path: "M12 20h-6a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h6" },
      { path: "M18 14v7" },
      { path: "M18 3v7" },
      { path: "M15 18l3 3l3 -3" },
      { path: "M15 6l3 -3l3 3" },
    ],
  };

  /**
   * すべて閉じるSVGのパスデータを含むオブジェクトの配列を生成する。
   * @type {Object}
   * @property {string} name - アイコンフォルダの名前
   * @property {Array<Object>} paths - 各パスオブジェクトの配列
   * @property {string} paths.path - インラインSVGパスの定義
   */
  static treeClosePaths = {
    name: "icon-tree-close",
    paths: [
      { path: "M0 0h24v24H0z" },
      { path: "M12 20h-6a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h6" },
      { path: "M18 14v7" },
      { path: "M18 3v7" },
      { path: "M15 7l3 3l3 -3" },
      { path: "M15 17l3 -3l3 3" },
    ],
  };

  /**
   * 静的なフォルダパスを定義するオブジェクト
   * @type {Object}
   * @property {string} name - アイコンフォルダの名前
   * @property {Array<Object>} paths - 各パスオブジェクトの配列
   * @property {string} paths.path - インラインSVGパスの定義
   */
  static folderPaths = {
    name: "icon-folder",
    paths: [
      {
        path: "M0 0h24v24H0z",
      },
      {
        path: "M5 4h4l3 3h7a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-11a2 2 0 0 1 2 -2",
      },
    ],
  };

  /**
   * 四角形に十字SVGのパスデータを含むオブジェクトの配列
   *
   * @type {Object}
   * @property {string} name - アイコンフォルダの名前
   * @property {Array<Object>} paths - 各パスオブジェクトの配列
   * @property {string} paths.path - インラインSVGパスの定義
   */
  static squarePlusPaths = {
    name: "icon-square-plus",
    paths: [
      {
        path: "M0 0h24v24H0z",
      },
      {
        path: "M9 12h6",
      },
      {
        path: "M12 9v6",
      },
      {
        path: "M3 5a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-14z",
      },
    ],
  };

  /**
   * 四角形のパスデータを含むオブジェクトの配列
   *
   * @type {Object}
   * @property {string} name - アイコンフォルダの名前
   * @property {Array<Object>} paths - 各パスオブジェクトの配列
   * @property {string} paths.path - インラインSVGパスの定義
   */
  static squarePaths = {
    name: "icon-square",
    paths: [
      {
        path: "M0 0h24v24H0z",
      },
      {
        path: "M3 3m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z",
      },
    ],
  };

  /**
   * 四角形とチェックのパスデータを含むオブジェクトの配列
   *
   * @type {Object}
   * @property {string} name - アイコンフォルダの名前
   * @property {Array<Object>} paths - 各パスオブジェクトの配列
   * @property {string} paths.path - インラインSVGパスの定義
   */
  static squareCheckPaths = {
    name: "icon-square-check",
    paths: [
      {
        path: "M0 0h24v24H0z",
      },
      {
        path: "M3 3m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z",
      },
      {
        path: "M9 12l2 2l4 -4",
      },
    ],
  };

  /**
   * 四角形と点のパスデータを含むオブジェクトの配列
   *
   * @type {Object}
   * @property {string} name - アイコンフォルダの名前
   * @property {Array<Object>} paths - 各パスオブジェクトの配列
   * @property {string} paths.path - インラインSVGパスの定義
   */
  static squareDotPaths = {
    name: "icon-square-dot",
    paths: [
      {
        path: "M0 0h24v24H0z",
      },
      {
        path: "M3 3m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z",
      },
      {
        path: "M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0",
      },
    ],
  };

  /**
   * 四角形とアラートのパスデータを含むオブジェクトの配列
   *
   * @type {Object}
   * @property {string} name - アイコンフォルダの名前
   * @property {Array<Object>} paths - 各パスオブジェクトの配列
   * @property {string} paths.path - インラインSVGパスの定義
   */
  static squareAlertPaths = {
    name: "icon-square-alert",
    paths: [
      {
        path: "M0 0h24v24H0z",
      },
      {
        path: "M3 5a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-14z",
      },
      {
        path: "M12 8v4",
      },
      {
        path: "M12 16h.01",
      },
    ],
  };

  /**
   * 四角形とバツ印のパスデータを含むオブジェクトの配列
   *
   * @type {Object}
   * @property {string} name - アイコンフォルダの名前
   * @property {Array<Object>} paths - 各パスオブジェクトの配列
   * @property {string} paths.path - インラインSVGパスの定義
   */
  static squareXPaths = {
    name: "icon-square-x",
    paths: [
      {
        path: "M0 0h24v24H0z",
      },
      {
        path: "M3 5a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-14z",
      },
      {
        path: "M9 9l6 6m0 -6l-6 6",
      },
    ],
  };

  /**
   * フォルダ追加SVGのパスデータを含むオブジェクトの配列を生成する。
   *
   * @type {Object}
   * @property {string} name - アイコンフォルダの名前
   * @property {Array<Object>} paths - 各パスオブジェクトの配列
   * @property {string} paths.path - インラインSVGパスの定義
   */
  static folderPlusPaths = {
    name: "icon-folder-plus",
    paths: [
      { path: "M0 0h24v24H0z" },
      {
        path: "M12 19h-7a2 2 0 0 1 -2 -2v-11a2 2 0 0 1 2 -2h4l3 3h7a2 2 0 0 1 2 2v3.5",
      },
      {
        path: "M16 19h6",
      },
      { path: "M19 16v6" },
    ],
  };

  /**
   * 右向き山形SVGのパスデータを含むオブジェクトの配列を生成する。
   *
   * @type {Object}
   * @property {string} name - アイコンフォルダの名前
   * @property {Array<Object>} paths - 各パスオブジェクトの配列
   * @property {string} paths.path - インラインSVGパスの定義
   */
  static chevronRightPaths = {
    name: "icon-chevron-right",
    paths: [
      { path: "M0 0h24v24H0z" },
      {
        path: "M9 6l6 6l-6 6",
      },
    ],
  };

  /**
   * ゴミ箱SVGのパスデータを含むオブジェクトの配列を生成する。
   *
   * @type {Object}
   * @property {string} name - アイコンフォルダの名前
   * @property {Array<Object>} paths - 各パスオブジェクトの配列
   * @property {string} paths.path - インラインSVGパスの定義
   */
  static trashPaths = {
    name: "icon-trash",
    paths: [
      { path: "M0 0h24v24H0z" },
      { path: "M4 7l16 0" },
      { path: "M10 11l0 6" },
      { path: "M14 11l0 6" },
      { path: "M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" },
      { path: "M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" },
    ],
  };

  /**
   * プラスSVGのパスデータを含むオブジェクトの配列を生成する。
   * @returns {Object[]} SVGのパスデータを含むオブジェクトの配列。
   * @returns {string} return.path - SVGのパス情報。
   */
  static plusPaths = {
    name: "icon-plus",
    paths: [
      { path: "M0 0h24v24H0z" },
      { path: "M12 5l0 14" },
      { path: "M5 12l14 0" },
    ],
  };
}
