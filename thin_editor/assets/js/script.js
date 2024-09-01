// タブ
let tabs;
let tabCode;
let tabResult;

// エディタ
const editor = document.getElementById("main-editor");

// コンテンツ
let contents;
const fileInput = document.getElementById("file-input");

// ファイル操作
let fileHandle = null;

// フロートボタン
const execButtons = document.querySelectorAll(".exec-button");
const codeOpenButton = document.querySelector(".code-open-button");
const saveButton = document.querySelector(".save-button");

// 結果
const result = document.getElementById("result-area");

// ドロワー
const drawerOpen = document.getElementById("drawer-open");
const drawerClose = document.getElementById("drawer-close");
const drawer = document.getElementById("drawer");

const isSmartphone = () => {
  const userAgent = navigator.userAgent.toLowerCase();
  return /iphone|ipod|android.*mobile|windows.*phone|blackberry.*mobile/.test(
    userAgent
  );
};

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

  const fileOption = {
    types: [
      {
        description: "JavaScriptファイル",
        accept: {
          "text/javascript": [".js"],
        },
      },
    ],
    excludeAcceptAllOption: true,
  };

  codeOpenButton.addEventListener("click", async () => {
    try {
      [fileHandle] = await window.showOpenFilePicker(fileOption);
      const file = await fileHandle.getFile();
      const fileText = await file.text();
      editor.setCodeText(fileText);
      editor.ApplyTextChange();
      result.innerHTML = "";
      tabCode.children[0].textContent = file.name;
    } catch (e) {
      alert("Sorry. It's impossible with your device.");
    }
  });

  saveButton.addEventListener("click", async () => {
    try {
      if (fileHandle == null) {
        fileHandle = await window.showSaveFilePicker(fileOption);
      }
      const writable = await fileHandle.createWritable();
      await writable.write(editor.getCodeText());
      await writable.close();
      tabCode.children[0].textContent = file.name;
    } catch (e) {
      alert("Sorry. It's impossible with your device.");
    }
  });

  if (isSmartphone()) {
    codeOpenButton.classList.add("hidden");
    saveButton.classList.add("hidden");
  }
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
