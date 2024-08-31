// タブ
const tabs = Object.values(document.querySelectorAll(".tab-selector-root>li"));
let tabCode;
let tabResult;

// エディタ
const editor = document.getElementById("main-editor");

// コンテンツ
const contents = Object.values(document.querySelectorAll(".contents"));
const fileInput = document.getElementById("file-input");

// フロートボタン
const execButtons = document.querySelectorAll(".exec-button");
const codeOpenButton = document.querySelector(".code-open-button");

// 結果
const result = document.getElementById("result-area");

// ドロワー
const drawerOpen = document.getElementById("drawer-open");
const drawerClose = document.getElementById("drawer-close");
const drawer = document.getElementById("drawer");

// ------------------------------------------------------------
// - Tab
// ------------------------------------------------------------
const tabInit = () => {
  tabs.forEach((e) => {
    e.addEventListener("click", () => {
      if (e.classList.contains("active")) return;

      tabs.forEach((v) => v.classList.remove("active"));
      e.classList.add("active");

      contents.forEach((v) => {
        v.classList.add("hidden");
        if (v.id == e.dataset.target) {
          v.classList.remove("hidden");
        }
      });
    });
  });

  tabCode = tabs[0];
  tabResult = tabs[1];

  tabCode.click();
};

// ------------------------------------------------------------
// - Contents
// ------------------------------------------------------------
const contentsInit = () => {
  contents.forEach((v) => v.classList.add("hidden"));
  contents[0].classList.remove("hidden");

  execButtons.forEach((e) => {
    e.addEventListener("click", () => {
      try {
        const id = "result-area";
        const before = /document\.write\(([^"]+)\);/g;
        const after = "thinEditorCodeStr += $1;";

        let strCode = "";
        strCode += "let thinEditorCodeStr = '';\n";
        strCode += editor.getCodeText().replaceAll(before, after);
        strCode += `\ndocument.getElementById("${id}").innerHTML = thinEditorCodeStr;`;

        Function(strCode)();
        tabResult.click();
      } catch (e) {
        const msg = `<span style="color: #ff0000;">プログラムが間違っています<span><br />`;
        result.insertAdjacentHTML("beforeend", msg);
        result.insertAdjacentHTML("beforeend", "<br />");
        result.insertAdjacentHTML("beforeend", e);
      }
    });
  });

  codeOpenButton.addEventListener("click", () => {
    fileInput.click();
  });
};

fileInput.addEventListener("change", function () {
  const file = fileInput.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function () {
    editor.setCodeText(reader.result);
    editor.ApplyTextChange();
    result.innerHTML = "";
  };
  reader.readAsText(file);
  fileInput.value = "";
});

// ------------------------------------------------------------
// - Drawer
// ------------------------------------------------------------
const drawerInit = () => {
  document.addEventListener("click", (e) => {
    const clicked = (id) => (e.target.closest(id) ? true : false);
    if (!clicked("#drawer") && !clicked("#drawer-open")) {
      drawerClose.click();
    }
  });
};

drawerOpen.addEventListener("click", () => {
  drawer.classList.add("show");
});

drawerClose.addEventListener("click", () => {
  drawer.classList.remove("show");
});

// ------------------------------------------------------------
// - Window Load
// ------------------------------------------------------------

window.addEventListener("load", function () {
  drawerInit();
  tabInit();
  contentsInit();
  editor.syntaxEditor({
    theme: "dark",
  });
  editor.setCodeText('document.write("Hello JavaScript.");');
  editor.ApplyTextChange();
});
