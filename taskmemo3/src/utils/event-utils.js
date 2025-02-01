/**
 * イベント作成ユーティリティクラス
 */
export class EventUtils {
  /**
   * カスタムイベントを作成する静的メソッド
   * @param {string} eventName - イベントの名前
   * @param {Object} [item={}] - イベントに関連するオブジェクト
   * @return {CustomEvent} - 作成されたカスタムイベント
   */
  static createEvent = (eventName, item = {}) => {
    return new CustomEvent(eventName, {
      detail: { item: item },
      bubbles: true,
      composed: true,
    });
  };
}
