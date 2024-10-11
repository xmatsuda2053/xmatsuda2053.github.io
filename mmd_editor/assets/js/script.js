const editor = document.getElementById("editor");
const result = document.getElementById("result");
const resizeHandler = document.getElementById("resizeHandler");
const download = document.getElementById("download");

let lastSVG = null;

window.addEventListener("DOMContentLoaded", () => {
  editor.syntaxEditor({
    theme: "light",
    id: "mermaid_input",
  });

  mermaid.initialize({ startOnLoad: false });

  keyupEditor();
  dragResizeHandler();

  clickDownload();
});

function keyupEditor() {
  const mermaidEditor = document.getElementById("mermaid_input");
  mermaidEditor.addEventListener("keyup", async () => {
    try {
      const { svg } = await mermaid.render(
        "resultDiv",
        editor.getCodeText(),
        undefined,
        result
      );
      result.innerHTML = svg;
      lastSVG = svg;
    } catch (e) {
      document.getElementById("dresultDiv").style.display = "none";
      if (lastSVG) {
        result.innerHTML = lastSVG;
      }
    }
  });
}

function dragResizeHandler() {
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

function clickDownload() {
  download.addEventListener("click", () => {
    if (lastSVG === null) {
      return;
    }
    const svg = document.getElementById("resultDiv");
    const svgText = new XMLSerializer().serializeToString(svg);
    const svgBlob = new Blob([svgText], { type: "image/svg+xml" });
    const svgUrl = URL.createObjectURL(svgBlob);

    const a = document.createElement("a");
    a.href = svgUrl;
    a.download = "result.svg";

    document.body.appendChild(a);
    a.click();

    document.body.removeChild(a);
    URL.revokeObjectURL(svgUrl);
  });
}
