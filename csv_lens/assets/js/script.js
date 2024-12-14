// ============================================
// クラス
// ============================================

/**
 * Component作成クラス
 */
class Component {
  /**
   * SVGアイコンを作成する
   * @param {string} id アイコンのID
   * @returns アイコン
   */
  static createIcon(id) {
    const svgNS = "http://www.w3.org/2000/svg";
    const xlinkNS = "http://www.w3.org/1999/xlink";
    const element = document.createElementNS(svgNS, "svg");
    element.classList.add("icon");
    element.appendChild(createUse());
    return element;

    function createUse() {
      const element = document.createElementNS(svgNS, "use");
      element.setAttributeNS(xlinkNS, "xlink:href", `#${id}`);
      return element;
    }
  }

  /**
   * ツールチップを作成する
   * @param {string} text
   * @param {string} cls
   * @returns ツールチップ
   */
  static createTooltip(text, cls) {
    const elm = document.createElement("div");
    elm.classList.add(cls);
    elm.textContent = text;
    return elm;
  }

  /**
   * 本日の日付を返す。
   * @returns yyyymmdd
   */
  static getToday() {
    return new Date().toLocaleDateString("sv-SE").replaceAll("-", "");
  }
}

/**
 * ファイル操作クラス
 */
class Filer {
  /**
   * ルートフォルダ
   */
  dirHandle = null;

  /**
   * アーカイブフォルダ
   */
  archiveHandle = null;

  /**
   * ルートフォルダを開く
   */
  async openFolder() {
    // ルートフォルダを開く
    this.dirHandle = await window.showDirectoryPicker({
      mode: "read",
    });
  }

  /**
   * ルートフォルダ内の指定した拡張子のファイル名一覧を取得する。
   * @param {string} extension
   * @returns [ファイル名]
   */
  async readAllFileName(extension) {
    const result = [];
    for await (const fileHandle of this.dirHandle.values()) {
      if (fileHandle.kind === "file" && fileHandle.name.endsWith(extension)) {
        const file = await fileHandle.getFile();
        if (file.size > 0) {
          result.push(fileHandle.name);
        }
      }
    }
    return result;
  }

  /**
   * 指定した名前のファイルを開き、内容をテキストデータとして取得する。
   * @param {string} fileName ファイル名
   * @returns テキストデータ
   */
  async readAllText(fileName) {
    const fileHandle = await this.dirHandle.getFileHandle(fileName);
    const file = await fileHandle.getFile();

    let text = null;
    if (file.size > 0) {
      text = await file.text();
    }

    return text;
  }
}

/**
 * テーブルクラス
 */
class Table {
  /**
   * CSVデータからテーブルを作成する
   * @param {array} csvData
   * @returns テーブル
   */
  createTableFromCsv(csvData) {
    /**
     * ヘッダーを作成する
     * @param {string} line
     * @returns ヘッダー
     */
    const createHeader = (line) => {
      const theadElm = document.createElement("thead");
      const trElm = document.createElement("tr");
      const cells = line.split(",");
      cells.forEach((cell) => {
        const thElm = document.createElement("th");
        thElm.innerText = cell;
        trElm.appendChild(thElm);
      });
      theadElm.appendChild(trElm);
      return theadElm;
    };

    /**
     * ボディを作成する
     * @param {array} lines
     * @returns ボディ
     */
    const createBody = (lines) => {
      /**
       * ルビを作成
       * @param {array} str
       * @returns ルビ
       */
      const createRuby = (arr) => {
        const ruby = document.createElement("ruby");
        const rb = document.createElement("rb");
        const rt = document.createElement("rt");

        rb.textContent = arr[0];
        rt.textContent = arr[1];

        ruby.appendChild(rb);
        ruby.appendChild(rt);

        return ruby;
      };

      /**
       * リストを作成
       * @param {array} arr
       * @returns リスト
       */
      const createUl = (arr) => {
        const ul = document.createElement("ul");
        arr.forEach((item, index) => {
          const li = document.createElement("li");
          li.classList.add(`cell-list--${index}`);
          li.textContent = item;
          ul.appendChild(li);
        });
        return ul;
      };

      /**
       * リンクを作成する
       * @param {string} str
       * @returns リンク
       */
      const createLink = (str) => {
        const a = document.createElement("a");
        a.href = str;
        a.textContent = str;
        a.target = "_blank";
        return a;
      };

      // テーブル作成開始
      const tbodyElm = document.createElement("tbody");

      for (let line of lines) {
        const trElm = document.createElement("tr");

        line.split(",").forEach((cell) => {
          const tdElm = document.createElement("td");
          let dtStr;

          if (cell.indexOf("__") !== -1) {
            const arr = cell.split("__");
            tdElm.appendChild(createRuby(arr));
            dtStr = arr[0];
          } else if (cell.indexOf("--") !== -1) {
            const arr = cell.split("--");
            tdElm.appendChild(createUl(arr));
            dtStr = arr.join(" ");
          } else if (URL.canParse(cell)) {
            tdElm.appendChild(createLink(cell));
            dtStr = cell;
          } else {
            tdElm.textContent = cell;
            dtStr = cell;
          }

          /**
           * クリック時、クリップボードに値を設定
           */
          tdElm.addEventListener("click", () => {
            navigator.clipboard.writeText(dtStr).then();
          });

          trElm.appendChild(tdElm);
        });
        trElm.classList.add("table-record");
        tbodyElm.appendChild(trElm);
      }

      return tbodyElm;
    };

    const tableElm = document.createElement("table");
    tableElm.appendChild(createHeader(csvData[0]));
    tableElm.appendChild(createBody(csvData.slice(1)));
    return tableElm;
  }
}

// ============================================
// インスタンス変数
// ============================================
const filer = new Filer();
const table = new Table();

// ============================================
// Start Page
// ============================================

/**
 * ルートフォルダを開く
 */
const openRootFolder = async () => {
  try {
    // フォルダを開く
    await filer.openFolder();

    // ファイル名一覧を取得
    const fileList = await filer.readAllFileName(".csv");
    refreshDrawerFileList(fileList);

    // 最初のファイルを開きテーブルに出力
    createTable(fileList[0]);
  } catch (e) {
    console.log(e);
  }
};

/**
 * 開始画面の初期化
 */
const initStartPage = () => {
  const modalFilerOpen = document.getElementById("modal_filer-open");
  const btnFolderOpen = document.getElementById("btn_open");

  /**
   * ルートフォルダを開き、画面を初期化する。
   */
  btnFolderOpen.addEventListener("click", () => {
    try {
      // フォルダを開く
      openRootFolder();

      // 開始画面を非表示とする。
      modalFilerOpen.classList.add("hidden");
    } catch (e) {
      console.log(e);
    }
  });
};

// ============================================
// Drawer
// ============================================
const initDrawer = () => {
  const btnOpenDrawer = document.getElementById("btn_open--drawer");
  const btnDrawerFolderOpen = document.getElementById("btn_drawer-folderopen");
  const btnDrawerRefresh = document.getElementById("btn_drawer-refresh");

  /**
   * ルートフォルダを開きなおす
   */
  btnDrawerFolderOpen.addEventListener("click", () => {
    openRootFolder();
  });

  /**
   * ドロワーの内容を再描画する。
   */
  btnDrawerRefresh.addEventListener("click", async () => {
    const fileList = await filer.readAllFileName(".csv");
    refreshDrawerFileList(fileList);
  });

  /**
   * ドロワー画面を閉じる
   */
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".drawer-close--not")) {
      closeDrawer();
    }
  });

  /**
   * ドロワー画面を開く
   */
  btnOpenDrawer.addEventListener("click", () => {
    opendrawer();
  });
};

/**
 * ドロワーを閉じる
 */
const closeDrawer = () => {
  const boxDrawer = document.getElementById("drawer_left");
  boxDrawer.classList.remove("show");
};

/**
 * ドロワーを開く
 */
const opendrawer = () => {
  const boxDrawer = document.getElementById("drawer_left");
  boxDrawer.classList.add("show");
};

/**
 * ドロワーのファイルリストを再描画する。
 * @param {*} fileList
 */
const refreshDrawerFileList = (fileList) => {
  /**
   * ファイル選択ボタンを作成する。
   * @param {string} fileName ボタンに表示するファイル名
   * @returns ボタン
   */
  const createButton = (fileName) => {
    /**
     * ボタンの文字列を作成する。
     * @param {string} fileName
     * @returns 文字列
     */
    const createText = (fileName) => {
      const elmSpan = document.createElement("span");
      elmSpan.classList.add("text-filename");
      elmSpan.textContent = fileName.replaceAll(".csv", "");
      return elmSpan;
    };

    const elmDiv = document.createElement("div");
    elmDiv.classList.add("btn-fileopen");
    elmDiv.appendChild(Component.createIcon("icon-file-filled"));
    elmDiv.appendChild(createText(fileName));
    elmDiv.dataset.filename = fileName;
    return elmDiv;
  };

  const target = document.getElementById("list_file--csv");
  target.innerHTML = "";
  fileList.forEach((fileName) => {
    const btn = createButton(fileName);
    btn.addEventListener("click", () => {
      createTable(fileName);
    });
    target.appendChild(btn);
  });
};

// ============================================
// Table
// ============================================

/**
 * CSVからテーブルを新規作成する
 * @param {string} fileName
 */
const createTable = async (fileName) => {
  const csv = await filer.readAllText(fileName);
  const lines = csv.split("\n");
  const tableElm = table.createTableFromCsv(lines);
  const boxCsv = document.getElementById("box_csv");

  tableElm.id = "table_csv";

  boxCsv.innerHTML = "";
  boxCsv.appendChild(tableElm);

  const footerFileName = document.getElementById("file_name--footer");
  footerFileName.textContent = fileName;

  const footerLineCount = document.getElementById("file_lines--footer");
  footerLineCount.textContent = `${lines.length - 1} lines`;

  setSearchCount(0);

  closeDrawer();
};

/**
 * 検索結果件数をフッターに設定する。
 * @param {number} count
 */
const setSearchCount = (count) => {
  const footerSearchCount = document.getElementById("search_count--footer");
  footerSearchCount.textContent = `${count} hits`;
};

// ============================================
// Seerch
// ============================================
const initSearch = () => {
  const FILTER_CLASS_NAME = "filter-on";
  const textSearch = document.getElementById("text_search");
  const btnSearchCancel = document.getElementById("btn_search--cancel");

  /**
   * 文字列を検索用に正規化
   * @param {string} str
   * @returns 正規化後
   */
  const normalizeText = (str) => {
    return str.toLowerCase().replaceAll("　", " ");
  };

  /**
   * フィルタをクリアする
   */
  const clear = () => {
    const tableCsv = document.getElementById("table_csv");
    tableCsv.classList.remove(FILTER_CLASS_NAME);
    const visibleTrs = tableCsv.getElementsByClassName("visible");
    for (let tr of visibleTrs) {
      tr.classList.remove("visible");
    }
    setSearchCount(0);
  };

  /**
   * テーブルにフィルタをかける
   */
  textSearch.addEventListener("change", () => {
    const tableCsv = document.getElementById("table_csv");
    const text = normalizeText(textSearch.value);

    if (text === "") {
      clear();
      return;
    }

    tableCsv.classList.add(FILTER_CLASS_NAME);

    const kws = text.split(" ");
    const trs = tableCsv.getElementsByClassName("table-record");
    let hitCount = 0;
    for (let tr of trs) {
      const target = normalizeText(tr.textContent).replaceAll('"', "");
      if (kws.every((v) => target.includes(v))) {
        tr.classList.add("visible");
        hitCount++;
      } else {
        tr.classList.remove("visible");
      }
    }
    setSearchCount(hitCount);
  });

  /**
   * フィルタをクリアする
   */
  btnSearchCancel.addEventListener("click", () => {
    clear();
  });
};

// ============================================
// Load
// ============================================
window.addEventListener("load", () => {
  initStartPage();
  initDrawer();
  initSearch();
});
