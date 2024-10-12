const fileOpen = document.getElementById("open");
const fileSave = document.getElementById("save");
const downloadShow = document.getElementById("download");
const sampleShow = document.getElementById("sample");

const header = document.getElementById("header");
const editor = document.getElementById("editor");
const result = document.getElementById("result");
const svgArea = document.getElementById("svg-area");
const resizeHandler = document.getElementById("resizeHandler");

const fileOption = {
  types: [
    {
      description: "Mermaidファイル",
      accept: {
        "text/Mermaid": [".mmd"],
      },
    },
  ],
  excludeAcceptAllOption: true,
  mode: "readwrite",
};

let lastSVG = null;
let fileHandle = null;

window.addEventListener("DOMContentLoaded", () => {
  mermaid.initialize({ startOnLoad: false, theme: "forest" });
  editor.syntaxEditor({
    theme: "light",
    id: "mermaid_input",
  });

  initFileOpen();
  initFileSave();
  initClickDownloadShow();
  initClickSampleShow();

  initKeyupEditor();
  initDragResizeHandler();
});

function initFileOpen() {
  fileOpen.addEventListener("click", async () => {
    try {
      [fileHandle] = await window.showOpenFilePicker(fileOption);
      const file = await fileHandle.getFile();
      const fileText = await file.text();
      editor.setCodeText(fileText);
      editor.ApplyTextChange();
      renderMermaid();
      header.innerText = file.name;
    } catch (e) {}
  });
}

function initFileSave() {
  fileSave.addEventListener("click", async () => {
    try {
      if (fileHandle == null) {
        fileHandle = await window.showSaveFilePicker(fileOption);
      }
      const file = await fileHandle.getFile();
      const writable = await fileHandle.createWritable();
      await writable.write(editor.getCodeText());
      await writable.close();
      header.innerText = file.name;
      showMessage(`${file.name} saved.`);
    } catch (e) {}
  });
}

function getRadioCheckedValue(name) {
  const elements = document.getElementsByName(name);
  for (let element of elements) {
    if (element.checked) {
      return element.value;
    }
  }
  return "";
}

function initClickDownloadShow() {
  clickDownloadShow();
  clickTypeRadio();

  clickDonwload();
  clickCancel();

  function clickDownloadShow() {
    downloadShow.addEventListener("click", () => {
      if (lastSVG === null) {
        return;
      }
      const dlConfWindow = document.getElementById("download-config-window");
      dlConfWindow.classList.remove("hidden");
    });
  }

  function clickTypeRadio() {
    const typeGroup = document.getElementById("type-group");
    const typeButtons = typeGroup.getElementsByTagName("input");
    const qualityGroup = document.getElementById("quality-group");
    const qualityButtons = qualityGroup.getElementsByTagName("input");

    let isQualityReadonly = false;

    const middleButton = document.getElementById("mid");

    for (let type of typeButtons) {
      type.addEventListener("click", () => {
        qualityGroup.classList.remove("readonly");
        if (type.value == "svg" && type.checked) {
          qualityGroup.classList.add("readonly");
          isQualityReadonly = true;
          for (let quality of qualityButtons) {
            quality.checked = false;
          }
        } else if (isQualityReadonly) {
          isQualityReadonly = false;
          middleButton.checked = true;
        }
      });
    }
  }

  function clickDonwload() {
    const download = document.getElementById("download-exec");

    download.addEventListener("click", () => {
      const type = getRadioCheckedValue("dl-type");
      const quality = getRadioCheckedValue("quality");

      switch (type) {
        case "png":
          downloadImage(quality, type);
          break;
        case "webp":
          downloadImage(quality, type);
          break;
        default:
          downloadSVG();
      }

      function downloadImage(quality, type) {
        const size = convertQualityToSize(quality);

        const svg = document.getElementById("resultDiv");
        const svgData = new XMLSerializer().serializeToString(svg);

        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        canvas.width = size.width;
        canvas.height = size.height;

        const img = new Image();
        img.src =
          "data:image/svg+xml;charset=utf-8;base64," +
          btoa(unescape(encodeURIComponent(svgData)));

        img.onload = function () {
          context.drawImage(img, 0, 0, size.width, size.height);

          const a = document.createElement("a");
          a.href = canvas.toDataURL(`image/${type}`);
          a.download = `result.${type}`;
          a.click();
        };

        function convertQualityToSize(quality) {
          let size;
          switch (quality) {
            case "high":
              size = { width: 1920, height: 1080 };
              break;
            case "mid":
              size = { width: 1280, height: 720 };
              break;
            default:
              size = { width: 640, height: 480 };
          }
          return size;
        }
      }

      function downloadSVG() {
        const svg = document.getElementById("resultDiv");
        const svgText = new XMLSerializer().serializeToString(svg);
        const svgBlob = new Blob([svgText], { type: "image/svg+xml" });
        const svgUrl = URL.createObjectURL(svgBlob);

        const a = document.createElement("a");
        a.href = svgUrl;
        a.download = "result.svg";
        a.click();

        URL.revokeObjectURL(svgUrl);
      }
    });
  }

  function clickCancel() {
    document.getElementById("download-cancel").addEventListener("click", () => {
      const dlConfWindow = document.getElementById("download-config-window");
      dlConfWindow.classList.add("hidden");
    });
  }
}

function initClickSampleShow() {
  clickSampleShow();
  clickAppend();
  clickCancel();

  function clickSampleShow() {
    sampleShow.addEventListener("click", () => {
      const dlConfWindow = document.getElementById("sample-window");
      dlConfWindow.classList.remove("hidden");
    });
  }

  function clickAppend() {
    document.getElementById("sample-exec").addEventListener("click", () => {
      const type = getRadioCheckedValue("sample-type");
      let str;

      switch (type) {
        case "s1":
          str = getSequenceDiagramSample();
          break;
        case "s2":
          str = getFlowchart();
          break;
        case "s3":
          str = getGantt();
          break;
        case "s4":
          str = getPie();
          break;
        case "s5":
          str = getMindmap();
          break;
        case "s6":
          str = getTimeline();
          break;
        case "s7":
          str = getStateDiagram();
          break;
        case "s8":
          str = getErDiagram();
          break;
        default:
      }

      editor.setCodeText(str);
      editor.ApplyTextChange();
      renderMermaid();
      fileHandle = null;
      header.innerText = "";

      document.getElementById("sample-cancel").click();

      function getSequenceDiagramSample() {
        return `sequenceDiagram
    Alice->>Bob: Hello Bob, how are you ?
    Bob->>Alice: Fine, thank you. And you?
    create participant Carl
    Alice->>Carl: Hi Carl!
    create actor D as Donald
    Carl->>D: Hi!
    destroy Carl
    Alice-xCarl: We are too many
    destroy Bob
    Bob->>Alice: I agree`;
      }

      function getFlowchart() {
        return `flowchart TD
    A[Christmas] -->|Get money| B(Go shopping)
    B --> C{Let me think}
    C -->|One| D[Laptop]
    C -->|Two| E[iPhone]
    C -->|Three| F[fa:fa-car Car]`;
      }

      function getGantt() {
        return `gantt
    title A Gantt Diagram
    dateFormat YYYY-MM-DD
    section Section
        A task          :a1, 2014-01-01, 30d
        Another task    :after a1, 20d
    section Another
        Task in Another :2014-01-12, 12d
        another task    :24d`;
      }

      function getPie() {
        return `pie title Pets adopted by volunteers
    "Dogs" : 386
    "Cats" : 85
    "Rats" : 15`;
      }

      function getMindmap() {
        return `mindmap
  root((mindmap))
    Origins
      Long history
      ::icon(fa fa-book)
      Popularisation
        British popular psychology author Tony Buzan
    Research
      On effectiveness<br/>and features
      On Automatic creation
        Uses
            Creative techniques
            Strategic planning
            Argument mapping
    Tools
      Pen and paper
      Mermaid`;
      }

      function getTimeline() {
        return `timeline
    title History of Social Media Platform
    2002 : LinkedIn
    2004 : Facebook
         : Google
    2005 : Youtube
    2006 : Twitter`;
      }

      function getStateDiagram() {
        return `---
title: Simple sample
---
stateDiagram-v2
    [*] --> Still
    Still --> [*]

    Still --> Moving
    Moving --> Still
    Moving --> Crash
    Crash --> [*]`;
      }

      function getErDiagram() {
        return `---
title: Order example
---
erDiagram
    CUSTOMER ||--o{ ORDER : places
    ORDER ||--|{ LINE-ITEM : contains
    CUSTOMER }|..|{ DELIVERY-ADDRESS : uses`;
      }
    });
  }

  function clickCancel() {
    document.getElementById("sample-cancel").addEventListener("click", () => {
      const dlConfWindow = document.getElementById("sample-window");
      dlConfWindow.classList.add("hidden");
    });
  }
}

function initKeyupEditor() {
  const mermaidEditor = document.getElementById("mermaid_input");
  mermaidEditor.addEventListener("keyup", renderMermaid);
}

async function renderMermaid() {
  try {
    const { svg } = await mermaid.render(
      "resultDiv",
      editor.getCodeText(),
      undefined,
      svgArea
    );
    svgArea.innerHTML = svg;
    lastSVG = svg;
  } catch (e) {
    document.getElementById("dresultDiv").style.display = "none";
    if (lastSVG) {
      if (editor.getCodeText() == "") {
        lastSVG = "";
      }
      svgArea.innerHTML = lastSVG;
    }
  }
}

function initDragResizeHandler() {
  let isResizing = false;

  resizeHandler.addEventListener("mousedown", (e) => {
    isResizing = true;
    document.addEventListener("mousemove", resize);
    document.addEventListener("mouseup", stopResize);
  });

  function resize(e) {
    if (isResizing) {
      const container = editor.parentElement;
      const containerRect = container.getBoundingClientRect();
      const newEditorWidth = e.clientX - containerRect.left;
      const newResultWidth = containerRect.right - e.clientX;

      if (newEditorWidth <= 300 || newResultWidth <= 300) {
        return;
      }

      if (newEditorWidth > 0 && newResultWidth > 0) {
        editor.style.width = newEditorWidth + "px";
        result.style.width = newResultWidth + "px";
      }
    }
  }

  function stopResize() {
    isResizing = false;
    document.removeEventListener("mousemove", resize);
    document.removeEventListener("mouseup", stopResize);
  }
}

function showMessage(message) {
  const messageBox = document.getElementById("message");
  messageBox.classList.remove("none");
  messageBox.innerText = message;
  setTimeout(hiddenMessage, 3000, messageBox);

  function hiddenMessage(messageBox) {
    messageBox.classList.add("none");
  }
}
