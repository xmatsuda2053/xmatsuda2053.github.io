// タブ
let tabs;
let tabCode;
let tabResult;

// エディタ
const editor = document.getElementById("main-editor");

// コンテンツ
let contents;
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
const updateTabs = () => {
  tabs = Object.values(document.querySelectorAll(".tab-selector-root>li"));
};

const addTabClickEvent = (e) => {
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
};

const tabInit = () => {
  updateTabs();
  tabs.forEach((e) => addTabClickEvent(e));
  tabCode = tabs[0];
  tabResult = tabs[1];
  tabCode.click();
};

// ------------------------------------------------------------
// - Contents
// ------------------------------------------------------------
updateContents = () => {
  contents = contents = Object.values(document.querySelectorAll(".contents"));
};

const contentsInit = () => {
  updateContents();

  contents.forEach((v) => v.classList.add("hidden"));
  contents[0].classList.remove("hidden");

  execButtons.forEach((e) => {
    e.addEventListener("click", () => {
      try {
        let strCode = editor.getCodeText();
        let funcCode = "";

        funcCode += "let teCodeStr = '';\n";
        funcCode += strCode.replaceAll(
          /document\.write\((.*?)\)/g,
          "teCodeStr += $1"
        );
        funcCode += `\ndocument.getElementById("result-area").innerHTML = teCodeStr;`;

        tabResult.click();
        Function(funcCode)();
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
};

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

  drawerOpen.addEventListener("click", () => {
    drawer.classList.add("show");
  });

  drawerClose.addEventListener("click", () => {
    drawer.classList.remove("show");
  });
};

// ------------------------------------------------------------
// - Window Load
// ------------------------------------------------------------

window.addEventListener("load", function () {
  drawerInit();
  contentsInit();
  tabInit();
  editor.syntaxEditor({
    theme: "dark",
  });
  let template = "";
  template += 'const msg = "Hello JavaScript";\n';
  template += "for (i = 0; i <= 10; i++) {\n";
  template += "  document.write(`${msg}_${i}<br />`);\n";
  template += "}\n";
  editor.setCodeText(template);
  editor.ApplyTextChange();
});
