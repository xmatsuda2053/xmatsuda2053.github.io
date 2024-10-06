let whitebord = document.getElementById("whitebord");
let dirHandle = null;
let archiveHandle = null;
const template = `{
  "id":"",
  "title":"",
  "descrption":"",
  "dueDate":"",
  "top":"30",
  "left":"30",
  "color":""}`;

function clickOpenFolder() {
  let openButton = document.getElementById("folder-open");
  openButton.addEventListener("click", async () => {
    try {
      dirHandle = await window.showDirectoryPicker({ mode: "readwrite" });
      archiveHandle = await dirHandle.getDirectoryHandle("archive", {
        create: true,
      });

      for await (const entry of dirHandle.values()) {
        if (entry.kind === "file" && entry.name.endsWith(".json")) {
          const fileHandle = await entry.getFile();
          if (fileHandle.size > 0) {
            const fileContent = await fileHandle.text();
            const postIt = createPostIt(fileContent);
            whitebord.appendChild(postIt);
          }
        }
      }
      document.getElementById("add-button-root").classList.remove("disabled");
    } catch (e) {
      console.log(e);
    }
  });
}

function clickAddPostIt() {
  document.getElementById("add").appendChild(createUl());

  function createUl() {
    const element = document.createElement("ul");
    element.id = "add-button-root";
    element.classList.add("button-list", "disabled");

    const colorList = [
      "color1",
      "color2",
      "color3",
      "color4",
      "color5",
      "color6",
      "color7",
      "color8",
      "color9",
      "color10",
    ];

    colorList.forEach((color) => {
      element.appendChild(createLi(color));
    });

    return element;
  }

  function createLi(color) {
    const element = document.createElement("li");
    element.classList.add(color);
    element.dataset.color = color;
    element.appendChild(createSvg());

    element.addEventListener("click", async () => {
      // オブジェクト追加
      const newfile = JSON.parse(template);
      newfile.id = getUniqueStr();
      newfile.color = element.dataset.color;

      const jsonStr = JSON.stringify(newfile);
      const postIt = createPostIt(jsonStr);
      whitebord.appendChild(postIt);

      // JSONファイル出力
      await saveItem(dirHandle, postIt);
    });

    return element;

    function createSvg() {
      const svgNS = "http://www.w3.org/2000/svg";
      const xlinkNS = "http://www.w3.org/1999/xlink";
      const element = document.createElementNS(svgNS, "svg");
      element.classList.add("icon", "icon-plus");
      element.appendChild(createIcon());
      return element;

      function createIcon() {
        const element = document.createElementNS(svgNS, "use");
        element.setAttributeNS(xlinkNS, "xlink:href", "#icon-plus");
        return element;
      }
    }
  }
}

function createPostIt(jsonStr) {
  postItData = JSON.parse(jsonStr);
  const root = createRoot(postItData);
  const main = createMain();
  const title = createTitle(postItData.title);
  const archiveButton = createArchiveButton(postItData.id);
  const descrption = createDescrption(postItData.descrption);
  const dueDate = createDueDate(postItData.dueDate);

  main.appendChild(title);
  main.appendChild(archiveButton);
  main.appendChild(descrption);
  main.appendChild(dueDate);

  root.appendChild(main);

  dargPostIt(root);
  editPostItItem(root);
  return root;

  function createRoot(postItData) {
    const element = document.createElement("div");
    element.classList.add("post-it-root");
    element.classList.add(postItData.color);

    element.id = postItData.id;

    element.style.top = postItData.top + "px";
    element.style.left = postItData.left + "px";
    element.dataset.top = postItData.top;
    element.dataset.left = postItData.left;
    element.dataset.color = postItData.color;

    return element;
  }

  function createMain() {
    const element = document.createElement("div");
    element.classList.add("post-it-main");
    return element;
  }

  function createTitle(title) {
    const element = document.createElement("div");
    element.classList.add("area-title");
    element.appendChild(createInput(title));
    return element;

    function createInput(value) {
      const element = document.createElement("input");
      element.type = "text";
      element.classList.add("edit-item", "title-text");
      element.placeholder = "タイトル...";
      element.value = value;
      return element;
    }
  }

  function createArchiveButton(id) {
    const element = document.createElement("div");
    element.classList.add("area-archive");
    element.appendChild(createButton(id));
    return element;

    function createButton(id) {
      const element = document.createElement("button");
      element.classList.add("archiveButton");
      element.dataset.targetId = id;
      element.appendChild(createSvg());
      element.addEventListener("click", archiveFile);
      return element;

      function createSvg() {
        const svgNS = "http://www.w3.org/2000/svg";
        const xlinkNS = "http://www.w3.org/1999/xlink";
        const element = document.createElementNS(svgNS, "svg");
        element.classList.add("icon", "icon-archive");
        element.appendChild(createIcon());
        return element;

        function createIcon() {
          const element = document.createElementNS(svgNS, "use");
          element.setAttributeNS(xlinkNS, "xlink:href", "#icon-archive");
          return element;
        }
      }

      async function archiveFile(e) {
        e.preventDefault();

        const id = this.dataset.targetId;
        const postId = document.getElementById(id);

        await saveItem(archiveHandle, postId);

        postId.onmouseup = null;
        postId.onmousemove = null;
        postId.remove();

        const fileHandle = await dirHandle.getFileHandle(`${id}.json`);
        const writable = await fileHandle.createWritable();
        await writable.write("");
        await writable.close();

        showMessage("Archived.");
      }
    }
  }

  function createDescrption(descrption) {
    const element = document.createElement("div");
    element.classList.add("area-descrption");
    element.appendChild(createTextArea(descrption));
    return element;

    function createTextArea(value) {
      const element = document.createElement("textarea");
      element.classList.add("edit-item", "descrption-text");
      element.placeholder = "説明...";
      element.value = value;
      return element;
    }
  }

  function createDueDate(dueDate) {
    const element = document.createElement("div");
    element.classList.add("area-due-date");
    element.appendChild(createLabel(dueDate));
    return element;

    function createLabel(value) {
      const element = document.createElement("label");
      element.innerText = "期限日：";
      element.appendChild(createInputDate(value));
      return element;

      function createInputDate(value) {
        const element = document.createElement("input");
        element.type = "date";
        element.classList.add("edit-item", "date-text");
        element.value = value;
        return element;
      }
    }
  }
}

function dargPostIt(element) {
  let pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;

  element.onmousedown = (e) => {
    e.preventDefault();

    pos3 = e.clientX;
    pos4 = e.clientY;

    element.onmouseup = closeDragElement;
    element.onmousemove = elementDrag;

    async function closeDragElement() {
      element.onmouseup = null;
      element.onmousemove = null;
      await saveItem(dirHandle, element);
    }

    function elementDrag(e) {
      e.preventDefault();

      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;

      let top = element.offsetTop - pos2;
      let left = element.offsetLeft - pos1;

      if (top < 0) top = 0;
      if (left < 0) left = 0;

      element.style.top = top + "px";
      element.style.left = left + "px";

      element.dataset.top = top;
      element.dataset.left = left;
    }
  };
}

function editPostItItem(element) {
  const items = element.getElementsByClassName("edit-item");
  for (let item of items) {
    item.ondblclick = (e) => {
      e.preventDefault();
      const v = item.value;
      item.value = "";
      item.focus();
      item.value = v;
    };
    item.onchange = async () => {
      await saveItem(dirHandle, element);
    };
  }
}

function clickAllSave() {
  const button = document.getElementById("all-save");
  button.addEventListener("click", async () => {
    const items = document.getElementsByClassName("post-it-root");
    for (let item of items) {
      await saveItem(dirHandle, item);
    }
    showMessage("All tasks saved.");
  });
}

function keuupSearch() {
  const searchText = document.getElementById("search-text");
  const searchCancel = document.getElementById("search-cancel");

  searchText.addEventListener("keyup", () => {
    const kws = searchText.value.toLowerCase().split(",");
    for (let postIt of document.getElementsByClassName("post-it-root")) {
      postIt.style.display = "";
      const text = getSearchText(getTaskData(postIt));
      if (kws.find((v) => text.indexOf(v) === -1) !== undefined) {
        postIt.style.display = "none";
      }
    }
  });

  searchCancel.addEventListener("click", () => {
    searchText.value = "";
    for (let postIt of document.getElementsByClassName("post-it-root")) {
      postIt.style.display = "";
    }
  });

  function getSearchText(object) {
    const title = object.title;
    const descrption = object.descrption;
    const dueDate = object.dueDate.replace(/-/g, "/");
    return `${title}${descrption}${dueDate}`;
  }
}

function showMessage(message) {
  const messageBox = document.getElementById("message");
  messageBox.classList.remove("hidden");
  messageBox.innerText = message;
  setTimeout(hiddenMessage, 3000, messageBox);

  function hiddenMessage(messageBox) {
    messageBox.classList.add("hidden");
  }
}

function getTaskData(element) {
  const postIt = JSON.parse(template);
  postIt.id = element.id;
  postIt.top = element.dataset.top;
  postIt.left = element.dataset.left;
  postIt.color = element.dataset.color;
  postIt.title = element.getElementsByClassName("title-text")[0].value;
  postIt.descrption =
    element.getElementsByClassName("descrption-text")[0].value;
  postIt.dueDate = element.getElementsByClassName("date-text")[0].value;

  return postIt;
}

async function saveItem(handle, element) {
  const jsonStr = JSON.stringify(getTaskData(element));
  const fileHandle = await handle.getFileHandle(`${element.id}.json`, {
    create: true,
  });
  const writable = await fileHandle.createWritable();
  await writable.write(jsonStr);
  await writable.close();
}

function getUniqueStr() {
  const randamStr = Math.floor(10000 * Math.random()).toString(16);
  const date = new Date();
  const systemDate =
    date.getFullYear() +
    String(date.getMonth() + 1).padStart(2, "0") +
    String(date.getDate()).padStart(2, "0") +
    String(date.getHours()).padStart(2, "0") +
    String(date.getMinutes()).padStart(2, "0") +
    String(date.getSeconds()).padStart(2, "0") +
    String(date.getMilliseconds()).padStart(3, "0");
  return `${systemDate}_${randamStr}`;
}

window.addEventListener("DOMContentLoaded", () => {
  clickOpenFolder();
  clickAllSave();
  keuupSearch();
  clickAddPostIt();
});
