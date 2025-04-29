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

  /**
   * フィルタSVGのパスデータを含むオブジェクトの配列を生成する。
   * @returns {Object[]} SVGのパスデータを含むオブジェクトの配列。
   * @returns {string} return.path - SVGのパス情報。
   */
  static FilterPaths = {
    name: "icon-filter",
    paths: [
      { path: "M0 0h24v24H0z" },
      {
        path: "M4 4h16v2.172a2 2 0 0 1 -.586 1.414l-4.414 4.414v7l-6 2v-8.5l-4.48 -4.928a2 2 0 0 1 -.52 -1.345v-2.227z",
      },
    ],
  };

  /**
   * コピーSVGのパスデータを含むオブジェクトの配列を生成する。
   * @returns {Object[]} SVGのパスデータを含むオブジェクトの配列。
   * @returns {string} return.path - SVGのパス情報。
   */
  static CopyPaths = {
    name: "icon-copy",
    paths: [
      { path: "M0 0h24v24H0z" },
      {
        path: "M7 7m0 2.667a2.667 2.667 0 0 1 2.667 -2.667h8.666a2.667 2.667 0 0 1 2.667 2.667v8.666a2.667 2.667 0 0 1 -2.667 2.667h-8.666a2.667 2.667 0 0 1 -2.667 -2.667z",
      },
      {
        path: "M4.012 16.737a2.005 2.005 0 0 1 -1.012 -1.737v-10c0 -1.1 .9 -2 2 -2h10c.75 0 1.158 .385 1.5 1",
      },
    ],
  };

  /**
   * リンクSVGのパスデータを含むオブジェクトの配列を生成する。
   * @returns {Object[]} SVGのパスデータを含むオブジェクトの配列。
   * @returns {string} return.path - SVGのパス情報。
   */
  static LinkPaths = {
    name: "icon-copy",
    paths: [
      { path: "M0 0h24v24H0z" },
      {
        path: "M9 15l6 -6",
      },
      {
        path: "M11 6l.463 -.536a5 5 0 0 1 7.071 7.072l-.534 .464",
      },
      {
        path: "M13 18l-.397 .534a5.068 5.068 0 0 1 -7.127 0a4.972 4.972 0 0 1 0 -7.071l.524 -.463",
      },
    ],
  };

  /**
   * 編集SVGのパスデータを含むオブジェクトの配列を生成する。
   * @returns {Object[]} SVGのパスデータを含むオブジェクトの配列。
   * @returns {string} return.path - SVGのパス情報。
   */
  static EditPaths = {
    name: "icon-edit",
    paths: [
      { path: "M0 0h24v24H0z" },
      {
        path: "M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1",
      },
      {
        path: "M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z",
      },
      {
        path: "M16 5l3 3",
      },
    ],
  };

  /**
   * TagSVGのパスデータを含むオブジェクトの配列を生成する。
   * @returns {Object[]} SVGのパスデータを含むオブジェクトの配列。
   * @returns {string} return.path - SVGのパス情報。
   */
  static TagPaths = {
    name: "icon-tag",
    paths: [
      { path: "M0 0h24v24H0z" },
      {
        path: "M7.5 7.5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0",
      },
      {
        path: "M3 6v5.172a2 2 0 0 0 .586 1.414l7.71 7.71a2.41 2.41 0 0 0 3.408 0l5.592 -5.592a2.41 2.41 0 0 0 0 -3.408l-7.71 -7.71a2 2 0 0 0 -1.414 -.586h-5.172a3 3 0 0 0 -3 3z",
      },
    ],
  };

  /**
   * ブックSVGのパスデータを含むオブジェクトの配列を生成する。
   * @returns {Object[]} SVGのパスデータを含むオブジェクトの配列。
   * @returns {string} return.path - SVGのパス情報。
   */
  static BookPaths = {
    name: "icon-book",
    paths: [
      { path: "M0 0h24v24H0z" },
      {
        path: "M3 19a9 9 0 0 1 9 0a9 9 0 0 1 9 0",
      },
      {
        path: "M3 6a9 9 0 0 1 9 0a9 9 0 0 1 9 0",
      },
      {
        path: "M3 6l0 13",
      },
      {
        path: "M12 6l0 13",
      },
      {
        path: "M21 6l0 13",
      },
    ],
  };

  /**
   * ユーザーSVGのパスデータを含むオブジェクトの配列を生成する。
   * @returns {Object[]} SVGのパスデータを含むオブジェクトの配列。
   * @returns {string} return.path - SVGのパス情報。
   */
  static UserPaths = {
    name: "icon-user",
    paths: [
      { path: "M0 0h24v24H0z" },
      {
        path: "M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0",
      },
      {
        path: "M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2",
      },
    ],
  };

  /**
   * 期限日SVGのパスデータを含むオブジェクトの配列を生成する。
   * @returns {Object[]} SVGのパスデータを含むオブジェクトの配列。
   * @returns {string} return.path - SVGのパス情報。
   */
  static DueDatePaths = {
    name: "icon-deu-date",
    paths: [
      { path: "M0 0h24v24H0z" },
      {
        path: "M4 5m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z",
      },
      {
        path: "M16 3v4",
      },
      {
        path: "M8 3v4",
      },
      {
        path: "M4 11h16",
      },
      {
        path: "M12 16m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0",
      },
    ],
  };

  /**
   * カレンダー無効SVGのパスデータを含むオブジェクトの配列を生成する。
   * @returns {Object[]} SVGのパスデータを含むオブジェクトの配列。
   * @returns {string} return.path - SVGのパス情報。
   */
  static CalendarOff = {
    name: "icon-calendar-off",
    paths: [
      { path: "M0 0h24v24H0z" },
      {
        path: "M9 5h9a2 2 0 0 1 2 2v9m-.184 3.839a2 2 0 0 1 -1.816 1.161h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 1.158 -1.815",
      },
      {
        path: "M16 3v4",
      },
      {
        path: "M8 3v1",
      },
      {
        path: "M4 11h7m4 0h5",
      },
      {
        path: "M3 3l18 18",
      },
    ],
  };

  /**
   * アンテナSVGのパスデータを含むオブジェクトの配列を生成する。
   * @returns {Object[]} SVGのパスデータを含むオブジェクトの配列。
   * @returns {string} return.path - SVGのパス情報。
   */
  static AntennaPaths = {
    name: "icon-antenna",
    paths: [
      { path: "M0 0h24v24H0z" },
      {
        path: "M6 18l0 -3",
      },
      {
        path: "M10 18l0 -6",
      },
      {
        path: "M14 18l0 -9",
      },
      {
        path: "M18 18l0 -12",
      },
    ],
  };

  /**
   * パーセンテージSVGのパスデータを含むオブジェクトの配列を生成する。
   * @returns {Object[]} SVGのパスデータを含むオブジェクトの配列。
   * @returns {string} return.path - SVGのパス情報。
   */
  static PercentagePaths = {
    name: "icon-percentage",
    paths: [
      { path: "M0 0h24v24H0z" },
      {
        path: "M12 3a9 9 0 0 1 7.794 13.5l-7.79 -4.497z",
        isFill: true,
      },
      {
        path: "M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0",
      },
    ],
  };

  /**
   * ライティングSVGのパスデータを含むオブジェクトの配列を生成する。
   * @returns {Object[]} SVGのパスデータを含むオブジェクトの配列。
   * @returns {string} return.path - SVGのパス情報。
   */
  static WitingPaths = {
    name: "icon-writing",
    paths: [
      { path: "M0 0h24v24H0z" },
      {
        path: "M20 17v-12c0 -1.121 -.879 -2 -2 -2s-2 .879 -2 2v12l2 2l2 -2z",
      },
      {
        path: "M16 7h4",
      },
      {
        path: "M18 19h-13a2 2 0 1 1 0 -4h4a2 2 0 1 0 0 -4h-3",
      },
    ],
  };

  /**
   * WebhookSVGのパスデータを含むオブジェクトの配列を生成する。
   * @returns {Object[]} SVGのパスデータを含むオブジェクトの配列。
   * @returns {string} return.path - SVGのパス情報。
   */
  static WebhookPaths = {
    name: "icon-webhook",
    paths: [
      { path: "M0 0h24v24H0z" },
      {
        path: "M4.876 13.61a4 4 0 1 0 6.124 3.39h6",
      },
      {
        path: "M15.066 20.502a4 4 0 1 0 1.934 -7.502c-.706 0 -1.424 .179 -2 .5l-3 -5.5",
      },
      {
        path: "M16 8a4 4 0 1 0 -8 0c0 1.506 .77 2.818 2 3.5l-3 5.5",
      },
    ],
  };

  /**
   * テーブルSVGのパスデータを含むオブジェクトの配列を生成する。
   * @returns {Object[]} SVGのパスデータを含むオブジェクトの配列。
   * @returns {string} return.path - SVGのパス情報。
   */
  static TablePaths = {
    name: "icon-table",
    paths: [
      { path: "M0 0h24v24H0z" },
      {
        path: "M3 5a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-14z",
      },
      {
        path: "M3 10h18",
      },
      {
        path: "M10 3v18",
      },
    ],
  };

  /**
   * 履歴SVGのパスデータを含むオブジェクトの配列を生成する。
   * @returns {Object[]} SVGのパスデータを含むオブジェクトの配列。
   * @returns {string} return.path - SVGのパス情報。
   */
  static HistoryPaths = {
    name: "icon-history",
    paths: [
      { path: "M0 0h24v24H0z" },
      {
        path: "M12 8l0 4l2 2",
      },
      {
        path: "M3.05 11a9 9 0 1 1 .5 4m-.5 5v-5h5",
      },
    ],
  };

  /**
   * 壁紙SVGのパスデータを含むオブジェクトの配列を生成する。
   * @returns {Object[]} SVGのパスデータを含むオブジェクトの配列。
   * @returns {string} return.path - SVGのパス情報。
   */
  static WallpaperPaths = {
    name: "icon-wallpaper",
    paths: [
      { path: "M0 0h24v24H0z" },
      {
        path: "M8 6h10a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-12",
      },
      {
        path: "M6 18m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0",
      },
      {
        path: "M8 18v-12a2 2 0 1 0 -4 0v12",
      },
    ],
  };

  /**
   * 三重円SVGのパスデータを含むオブジェクトの配列を生成する。
   * @returns {Object[]} SVGのパスデータを含むオブジェクトの配列。
   * @returns {string} return.path - SVGのパス情報。
   */
  static CirclesPaths = {
    name: "icon-circles",
    paths: [
      { path: "M0 0h24v24H0z" },
      {
        path: "M12 7m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0",
      },
      {
        path: "M6.5 17m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0",
      },
      {
        path: "M17.5 17m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0",
      },
    ],
  };

  /**
   * 電話コールSVGのパスデータを含むオブジェクトの配列を生成する。
   * @returns {Object[]} SVGのパスデータを含むオブジェクトの配列。
   * @returns {string} return.path - SVGのパス情報。
   */
  static PhoneCallPaths = {
    name: "icon-phone-call",
    paths: [
      { path: "M0 0h24v24H0z" },
      {
        path: "M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2",
      },
      {
        path: "M15 7a2 2 0 0 1 2 2",
      },
      {
        path: "M15 3a6 6 0 0 1 6 6",
      },
    ],
  };

  /**
   * 線SVGのパスデータを含むオブジェクトの配列を生成する。
   * @returns {Object[]} SVGのパスデータを含むオブジェクトの配列。
   * @returns {string} return.path - SVGのパス情報。
   */
  static LinePaths = {
    name: "icon-line",
    paths: [
      { path: "M0 0h24v24H0z" },
      {
        path: "M6 18m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0",
      },
      {
        path: "M18 6m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0",
      },
      {
        path: "M7.5 16.5l9 -9",
      },
    ],
  };

  /**
   * プリンタSVGのパスデータを含むオブジェクトの配列を生成する。
   * @returns {Object[]} SVGのパスデータを含むオブジェクトの配列。
   * @returns {string} return.path - SVGのパス情報。
   */
  static PrinterPath = {
    name: "icon-printer",
    paths: [
      { path: "M0 0h24v24H0z" },
      {
        path: "M17 17h2a2 2 0 0 0 2 -2v-4a2 2 0 0 0 -2 -2h-14a2 2 0 0 0 -2 2v4a2 2 0 0 0 2 2h2",
      },
      {
        path: "M17 9v-4a2 2 0 0 0 -2 -2h-6a2 2 0 0 0 -2 2v4",
      },
      {
        path: "M7 13m0 2a2 2 0 0 1 2 -2h6a2 2 0 0 1 2 2v4a2 2 0 0 1 -2 2h-6a2 2 0 0 1 -2 -2z",
      },
    ],
  };

  /**
   * フラグSVGのパスデータを含むオブジェクトの配列を生成する。
   * @returns {Object[]} SVGのパスデータを含むオブジェクトの配列。
   * @returns {string} return.path - SVGのパス情報。
   */
  static FlagPath = {
    name: "icon-flag",
    paths: [
      { path: "M0 0h24v24H0z" },
      {
        path: "M19 4a1 1 0 0 1 .993 .883l.007 .117v9a1 1 0 0 1 -.883 .993l-.117 .007h-13v6a1 1 0 0 1 -.883 .993l-.117 .007a1 1 0 0 1 -.993 -.883l-.007 -.117v-16a1 1 0 0 1 .883 -.993l.117 -.007h14z",
        isFill: true,
      },
    ],
  };

  /**
   * IDSVGのパスデータを含むオブジェクトの配列を生成する。
   * @returns {Object[]} SVGのパスデータを含むオブジェクトの配列。
   * @returns {string} return.path - SVGのパス情報。
   */
  static IdPath = {
    name: "icon-id",
    paths: [
      { path: "M0 0h24v24H0z" },
      {
        path: "M3 4m0 3a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v10a3 3 0 0 1 -3 3h-12a3 3 0 0 1 -3 -3z",
      },
      {
        path: "M9 10m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0",
      },
      {
        path: "M15 8l2 0",
      },
      {
        path: "M15 12l2 0",
      },
      {
        path: "M7 16l10 0",
      },
    ],
  };

  /**
   * ビルディングSVGのパスデータを含むオブジェクトの配列を生成する。
   * @returns {Object[]} SVGのパスデータを含むオブジェクトの配列。
   * @returns {string} return.path - SVGのパス情報。
   */
  static BuildingsPath = {
    name: "icon-buildings",
    paths: [
      { path: "M0 0h24v24H0z" },
      { path: "M4 21v-15c0 -1 1 -2 2 -2h5c1 0 2 1 2 2v15" },
      { path: "M16 8h2c1 0 2 1 2 2v11" },
      { path: "M3 21h18" },
      { path: "M10 12v0" },
      { path: "M10 16v0" },
      { path: "M10 8v0" },
      { path: "M7 12v0" },
      { path: "M7 16v0" },
      { path: "M7 8v0" },
      { path: "M17 12v0" },
      { path: "M17 16v0" },
    ],
  };

  /**
   * アドレス帳SVGのパスデータを含むオブジェクトの配列を生成する。
   * @returns {Object[]} SVGのパスデータを含むオブジェクトの配列。
   * @returns {string} return.path - SVGのパス情報。
   */
  static AddressBookPath = {
    name: "icon-address-book",
    paths: [
      { path: "M0 0h24v24H0z" },
      {
        path: "M20 6v12a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2z",
      },
      { path: "M10 16h6" },
      { path: "M13 11m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" },
      { path: "M4 8h3" },
      { path: "M4 12h3" },
      { path: "M4 16h3" },
    ],
  };

  /**
   * モバイルデバイスSVGのパスデータを含むオブジェクトの配列を生成する。
   * @returns {Object[]} SVGのパスデータを含むオブジェクトの配列。
   * @returns {string} return.path - SVGのパス情報。
   */
  static DeviceMobilePath = {
    name: "icon-device-mobile",
    paths: [
      { path: "M0 0h24v24H0z" },
      {
        path: "M6 5a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2v-14z",
      },
      { path: "M11 4h2" },
      { path: "M12 17v.01" },
    ],
  };

  /**
   * プリンターSVGのパスデータを含むオブジェクトの配列を生成する。
   * @returns {Object[]} SVGのパスデータを含むオブジェクトの配列。
   * @returns {string} return.path - SVGのパス情報。
   */
  static PrinterPath = {
    name: "icon-printer",
    paths: [
      { path: "M0 0h24v24H0z" },
      {
        path: "M17 17h2a2 2 0 0 0 2 -2v-4a2 2 0 0 0 -2 -2h-14a2 2 0 0 0 -2 2v4a2 2 0 0 0 2 2h2",
      },
      { path: "M17 9v-4a2 2 0 0 0 -2 -2h-6a2 2 0 0 0 -2 2v4" },
      {
        path: "M7 13m0 2a2 2 0 0 1 2 -2h6a2 2 0 0 1 2 2v4a2 2 0 0 1 -2 2h-6a2 2 0 0 1 -2 -2z",
      },
    ],
  };

  /**
   * メールSVGのパスデータを含むオブジェクトの配列を生成する。
   * @returns {Object[]} SVGのパスデータを含むオブジェクトの配列。
   * @returns {string} return.path - SVGのパス情報。
   */
  static MailPath = {
    name: "icon-mail",
    paths: [
      { path: "M0 0h24v24H0z" },
      {
        path: "M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10z",
      },
      { path: "M3 7l9 6l9 -6" },
    ],
  };

  /**
   * 郵便番号SVGのパスデータを含むオブジェクトの配列を生成する。
   * @returns {Object[]} SVGのパスデータを含むオブジェクトの配列。
   * @returns {string} return.path - SVGのパス情報。
   */
  static PostCodePath = {
    name: "icon-post-code",
    paths: [
      { path: "M0 0h24v24H0z" },
      {
        path: "M7 7h10",
      },
      { path: "M7 10h10" },
      { path: "M12 10v7" },
    ],
  };

  /**
   * 郵便受けSVGのパスデータを含むオブジェクトの配列を生成する。
   * @returns {Object[]} SVGのパスデータを含むオブジェクトの配列。
   * @returns {string} return.path - SVGのパス情報。
   */
  static MailBoxPath = {
    name: "icon-mail-box",
    paths: [
      { path: "M0 0h24v24H0z" },
      {
        path: "M10 21v-6.5a3.5 3.5 0 0 0 -7 0v6.5h18v-6a4 4 0 0 0 -4 -4h-10.5",
      },
      { path: "M12 11v-8h4l2 2l-2 2h-4" },
      { path: "M6 15h1" },
    ],
  };

  /**
   * Mに四角SVGのパスデータを含むオブジェクトの配列を生成する。
   * @returns {Object[]} SVGのパスデータを含むオブジェクトの配列。
   * @returns {string} return.path - SVGのパス情報。
   */
  static SquareMPath = {
    name: "icon-square-letter-m",
    paths: [
      { path: "M0 0h24v24H0z" },
      {
        path: "M3 3m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z",
      },
      { path: "M9 16v-8l3 5l3 -5v8" },
    ],
  };

  /**
   * ネクタイSVGのパスデータを含むオブジェクトの配列を生成する。
   * @returns {Object[]} SVGのパスデータを含むオブジェクトの配列。
   * @returns {string} return.path - SVGのパス情報。
   */
  static TiePaths = {
    name: "icon-tie",
    paths: [
      { path: "M0 0h24v24H0z" },
      {
        path: "M12 22l4 -4l-2.5 -11l.993 -2.649a1 1 0 0 0 -.936 -1.351h-3.114a1 1 0 0 0 -.936 1.351l.993 2.649l-2.5 11l4 4z",
      },
      { path: "M10.5 7h3l5 5.5" },
    ],
  };

  /**
   * 検索SVGのパスデータを含むオブジェクトの配列を生成する。
   * @returns {Object[]} SVGのパスデータを含むオブジェクトの配列。
   * @returns {string} return.path - SVGのパス情報。
   */
  static SearchPaths = {
    name: "icon-search",
    paths: [
      {
        path: "M0 0h24v24H0z",
      },
      {
        path: "M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0",
      },
      {
        path: "M21 21l-6 -6",
      },
    ],
  };

  /**
   * 円とXのSVGのパスデータを含むオブジェクトの配列を生成する。
   * @returns {Object[]} SVGのパスデータを含むオブジェクトの配列。
   * @returns {string} return.path - SVGのパス情報。
   */
  static CircleXPaths = {
    name: "icon-circle-x",
    paths: [
      {
        path: "M0 0h24v24H0z",
      },
      {
        path: "M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0",
      },
      {
        path: "M10 10l4 4m0 -4l-4 4",
      },
    ],
  };

  /**
   * 文字列照準ソートのSVGのパスデータを含むオブジェクトの配列を生成する。
   * @returns {Object[]} SVGのパスデータを含むオブジェクトの配列。
   * @returns {string} return.path - SVGのパス情報。
   */
  static SortAscendingLettersPaths = {
    name: "icon-sort-ascending-letters",
    paths: [
      {
        path: "M0 0h24v24H0z",
      },
      {
        path: "M15 10v-5c0 -1.38 .62 -2 2 -2s2 .62 2 2v5m0 -3h-4",
      },
      {
        path: "M19 21h-4l4 -7h-4",
      },
      {
        path: "M4 15l3 3l3 -3",
      },
      {
        path: "M7 6v12",
      },
    ],
  };
}
