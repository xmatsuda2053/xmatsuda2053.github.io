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
 * URLから指定したパラメータを取得する
 * @param {string} name
 * @returns
 */
const getParamFromURL = (name) => {
  const url = new URL(window.location.href);
  const params = url.searchParams;
  if (params.get(name)) {
    return params.get(name);
  } else {
    return null;
  }
};

/**
 * 画面ロード処理
 */
window.addEventListener("load", () => {
  const type = getParamFromURL("type");

  switch (type) {
    case "print":
      const id = getParamFromURL("id");
      createElm("print-viewer").render(getSessionData("print"), id); // 印刷
      break;

    default:
      createElm("task-memo"); // 初期表示
  }
});
