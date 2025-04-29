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
   * TreeViewのグループをダブルクリック
   */
  static DBL_CLICK_GROUP_EVENT_NAME = "dblClickGruopItem";
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
   * 検索キャンセルボタンクリックイベント
   */
  static CLICK_SEARCH_CANCEL_EVENT_NAME = "clickSearchCancel";

  /**
   * コンテンツグループ変更イベント
   */
  static CHANGE_CONTENTS_GROUP_EVENT_NAME = "changeContentsGroup";

  /**
   * グループ内グループのクリックイベント
   */
  static CLICK_CONTENTS_GROUP_GROUP_EVENT_NAME = "clickContentsGroupGroup";

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

  /**
   * タスク印刷イベント
   */
  static PRINT_TASK_EVENT_NAME = "printTask";

  /**
   * 名刺管理表示イベント
   */
  static CHANGE_BIZ_CARD_EVENT_NAME = "changeBizCard";

  /**
   * 遅延タスク表示イベント
   */
  static SHOW_DELAY_TASK_EVENT_NAME = "showDelayTask";

  /**
   * TODOタスク表示イベント
   */
  static SHOW_TODO_TASK_EVENT_NAME = "showTodoTask";
}
