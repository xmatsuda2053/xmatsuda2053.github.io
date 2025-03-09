/**
 * イベント定数クラス
 */
export class EventConst {
  /**
   * コンテキストメニューを閉じる
   */
  static CLOSE_CONTEXT_MENU = "closeContextMenu";
  /**
   * TreeViewのタスクをクリック
   */
  static CLICK_TASK_EVENT_NAME = "clickTaskItem";

  /**
   * TreeViewのグループをクリック
   */
  static CLICK_GROUP_EVENT_NAME = "clickGruopItem";

  /**
   * 新規タスクを追加
   */
  static ADD_NEW_TASK_ITEM_EVENT_NAME = "addTaskItem";

  /**
   * 新規グループを追加
   */
  static ADD_NEW_GROUP_ITEM_EVENT_NAME = "addGroupItem";

  /**
   * TreeViewのアイテムを削除を追加
   */
  static DELETE_TREEVIEW_ITEM_EVENT_NAME = "deleteTreeViewItem";

  /**
   * TreeView変更イベント
   */
  static CHANGE_TREEVIEW_EVENT_NAME = "changeTreeView";

  /**
   * フォームアイテム変更イベント
   */
  static CHANGE_FORM_ITEM_EVENT_NAME = "changeFormItem";

  /**
   * コンテンツグループ変更イベント
   */
  static CHANGE_CONTENTS_GROUP_EVENT_NAME = "changeContentsGroup";

  /**
   * グループ内タスクのクリックイベント
   */
  static CLICK_CONTENTS_GROUP_TASK_EVENT_NAME = "clickContentsGroupTask";

  /**
   * コンテンツタスク変更イベント
   */
  static CHANGE_CONTENTS_TASK_EVENT_NAME = "changeContentsTask";

  /**
   * 履歴コンテンツ追加イベント
   */
  static ADD_HISTORY_CONTENTS_EVENT_NAME = "addHistoryContents";
}
