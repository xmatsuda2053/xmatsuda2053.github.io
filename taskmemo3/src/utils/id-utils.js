/**
 * IDユーティリティクラス
 */
export class IdUtils {
  /**
   * 一意のIDを生成する
   * @returns {string} 一意のID
   */
  static getUniqueId = () => {
    // ランダム文字列を生成する
    const randomStr = Math.floor(10000 * Math.random()).toString(16);

    // 日付文字列を生成
    const date = new Date();
    const parts = {
      yyyy: date.getFullYear(),
      MM: String(date.getMonth() + 1).padStart(2, "0"),
      dd: String(date.getDate()).padStart(2, "0"),
      HH: String(date.getHours()).padStart(2, "0"),
      mm: String(date.getMinutes()).padStart(2, "0"),
      ss: String(date.getSeconds()).padStart(2, "0"),
      SSS: String(date.getMilliseconds()).padStart(3, "0"),
    };

    const format = "{yyyy}{MM}{dd}{HH}{mm}{ss}{SSS}";
    const systemDate = format.replace(
      /{(yyyy|MM|dd|HH|mm|ss|SSS)}/g,
      (matched) => parts[matched.slice(1, -1)]
    );

    return `${systemDate}_${randomStr}`;
  };
}
