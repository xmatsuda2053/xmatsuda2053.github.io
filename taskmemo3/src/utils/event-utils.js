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
    item.bubbles = true;
    item.composed = true;
    return new CustomEvent(eventName, item);
  };
}
