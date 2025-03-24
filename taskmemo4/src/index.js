import { ElmUtils } from "./utils/elm-utils";
import { TaskMemo } from "./components/task-memo/task-memo";
import { PrintViewer } from "./components/print-viewer/print-viewer";

TaskMemo();
PrintViewer();

/**
 * HTMLElementを作成する。
 * @param {string} tagName
 * @returns HTMLElement
 */
const createElm = (tagName) => {
  const elm = ElmUtils.createElm(tagName);
  document.body.appendChild(elm);
  return elm;
};

/**
 * SessionStorageからデータを取得する。
 * @param {string} key
 * @returns Object
 */
const getSessionData = (key) => {
  const data = JSON.parse(sessionStorage.getItem(key));
  sessionStorage.removeItem(key);
  return data;
};

/**
 * URLからtypeパラメータを取得する
 * @returns
 */
const getTypeFromURL = () => {
  const url = new URL(window.location.href);
  const params = url.searchParams;
  if (params.get("type")) {
    return params.get("type");
  } else {
    return null;
  }
};

/**
 * 画面ロード処理
 */
window.addEventListener("load", () => {
  switch (getTypeFromURL()) {
    case "print":
      createElm("print-viewer").render(getSessionData("print")); // 印刷
      break;

    default:
      createElm("task-memo"); // 初期表示
  }
});
