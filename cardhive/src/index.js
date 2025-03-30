import { ElmUtils } from "./utils/elm-utils";
import { CardHive } from "./components/card-hive/card-hive";

/**
 * 画面ロード処理
 */
window.addEventListener("load", () => {
  CardHive();
  document.body.appendChild(ElmUtils.createElm("card-hive"));
});
