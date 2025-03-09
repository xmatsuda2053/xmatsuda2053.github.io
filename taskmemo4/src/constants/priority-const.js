/**
 * 優先度定数クラス
 */
export class PriorityConst {
  /**
   * 優先度のパラメータ配列。
   * @type {Array<{value: number, text: string}>}
   */
  static PARAM = [
    { value: 5, text: "最低" },
    { value: 4, text: "低" },
    { value: 3, text: "中" },
    { value: 2, text: "高" },
    { value: 1, text: "最高" },
  ];

  /**
   * 指定された値に対応するテキストを取得します。
   * @param {number} value - 検索する値。
   * @returns {string} - 対応するテキスト。見つからない場合はnullを返します。
   */
  static text(value) {
    const priority = this.PARAM.find((p) => p.value == value);
    return priority ? priority.text : null;
  }

  /**
   * 指定されたテキストに対応する値を取得します。
   * @param {string} text - 検索するテキスト。
   * @returns {number} - 対応する値。見つからない場合はnullを返します。
   */
  static value(text) {
    const priority = this.PARAM.find((p) => p.text == text);
    return priority ? priority.value : null;
  }
}
