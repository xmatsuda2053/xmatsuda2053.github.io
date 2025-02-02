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
}
