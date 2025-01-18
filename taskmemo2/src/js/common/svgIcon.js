/**
 * SVGアイコン
 */
export class SvgIcon {
  /**
   * フォルダSVGのパスデータを含むオブジェクトの配列を生成する。
   * @returns {Object[]} SVGのパスデータを含むオブジェクトの配列。
   * @returns {string} return.path - SVGのパス情報。
   */
  static folderPaths = () => {
    return [
      {
        path: "M0 0h24v24H0z",
      },
      {
        path: "M5 4h4l3 3h7a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-11a2 2 0 0 1 2 -2",
      },
    ];
  };

  /**
   * ファイル追加SVGのパスデータを含むオブジェクトの配列を生成する。
   * @returns {Object[]} SVGのパスデータを含むオブジェクトの配列。
   * @returns {string} return.path - SVGのパス情報。
   */
  static filePlustPaths = () => {
    return [
      { path: "M0 0h24v24H0z" },
      { path: "M14 3v4a1 1 0 0 0 1 1h4" },
      {
        path: "M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z",
      },
      { path: "M12 11l0 6" },
      { path: "M9 14l6 0" },
    ];
  };

  /**
   * フォルダ追加SVGのパスデータを含むオブジェクトの配列を生成する。
   * @returns {Object[]} SVGのパスデータを含むオブジェクトの配列。
   * @returns {string} return.path - SVGのパス情報。
   */
  static folderPlusPaths = () => {
    return [
      { path: "M0 0h24v24H0z" },
      {
        path: "M12 19h-7a2 2 0 0 1 -2 -2v-11a2 2 0 0 1 2 -2h4l3 3h7a2 2 0 0 1 2 2v3.5",
      },
      {
        path: "M16 19h6",
      },
      { path: "M19 16v6" },
    ];
  };

  /**
   * テーブルと書き込みSVGのパスデータを含むオブジェクトの配列を生成する。
   * @returns {Object[]} SVGのパスデータを含むオブジェクトの配列。
   * @returns {string} return.path - SVGのパス情報。
   */
  static tablerWritingPaths = () => {
    return [
      { path: "M0 0h24v24H0z" },
      {
        path: "M20 17v-12c0 -1.121 -.879 -2 -2 -2s-2 .879 -2 2v12l2 2l2 -2z",
      },
      {
        path: "M16 7h4",
      },
      { path: "M18 19h-13a2 2 0 1 1 0 -4h4a2 2 0 1 0 0 -4h-3" },
    ];
  };

  /**
   * プラスSVGのパスデータを含むオブジェクトの配列を生成する。
   * @returns {Object[]} SVGのパスデータを含むオブジェクトの配列。
   * @returns {string} return.path - SVGのパス情報。
   */
  static plusPaths = () => {
    return [
      { path: "M0 0h24v24H0z" },
      { path: "M12 5l0 14" },
      { path: "M5 12l14 0" },
    ];
  };

  /**
   * コピーSVGのパスデータを含むオブジェクトの配列を生成する。
   * @returns {Object[]} SVGのパスデータを含むオブジェクトの配列。
   * @returns {string} return.path - SVGのパス情報。
   */
  static copyPaths = () => {
    return [
      { path: "M0 0h24v24H0z" },
      {
        path: "M7 7m0 2.667a2.667 2.667 0 0 1 2.667 -2.667h8.666a2.667 2.667 0 0 1 2.667 2.667v8.666a2.667 2.667 0 0 1 -2.667 2.667h-8.666a2.667 2.667 0 0 1 -2.667 -2.667z",
      },
      {
        path: "M4.012 16.737a2.005 2.005 0 0 1 -1.012 -1.737v-10c0 -1.1 .9 -2 2 -2h10c.75 0 1.158 .385 1.5 1",
      },
    ];
  };

  /**
   * treeを開くSVGのパスデータを含むオブジェクトの配列を生成する。
   * @returns {Object[]} SVGのパスデータを含むオブジェクトの配列。
   * @returns {string} return.path - SVGのパス情報。
   */
  static treeOpen = () => {
    return [
      { path: "M0 0h24v24H0z" },
      { path: "M12 20h-6a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h6" },
      { path: "M18 14v7" },
      { path: "M18 3v7" },
      { path: "M15 18l3 3l3 -3" },
      { path: "M15 6l3 -3l3 3" },
    ];
  };

  /**
   * treeを閉じるSVGのパスデータを含むオブジェクトの配列を生成する。
   * @returns {Object[]} SVGのパスデータを含むオブジェクトの配列。
   * @returns {string} return.path - SVGのパス情報。
   */
  static treeClose = () => {
    return [
      { path: "M0 0h24v24H0z" },
      { path: "M12 20h-6a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h6" },
      { path: "M18 14v7" },
      { path: "M18 3v7" },
      { path: "M15 7l3 3l3 -3" },
      { path: "M15 17l3 -3l3 3" },
    ];
  };

  /**
   * ゴミ箱SVGのパスデータを含むオブジェクトの配列を生成する。
   * @returns {Object[]} SVGのパスデータを含むオブジェクトの配列。
   * @returns {string} return.path - SVGのパス情報。
   */
  static trashPaths = () => {
    return [
      { path: "M0 0h24v24H0z" },
      { path: "M4 7l16 0" },
      { path: "M10 11l0 6" },
      { path: "M14 11l0 6" },
      { path: "M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" },
      { path: "M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" },
    ];
  };

  /**
   * 掴むSVGのパスデータを含むオブジェクトの配列を生成する。
   * @returns {Object[]} SVGのパスデータを含むオブジェクトの配列。
   * @returns {string} return.path - SVGのパス情報。
   */
  static gripVerticalPaths = () => {
    return [
      { path: "M0 0h24v24H0z" },
      { path: "M9 5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" },
      { path: "M9 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" },
      { path: "M9 19m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" },
      { path: "M15 5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" },
      { path: "M15 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" },
      { path: "M15 19m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" },
    ];
  };
}
