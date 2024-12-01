// ============================================
// グローバル定数
// ============================================
const FILE_NAME_SETTING_DATA = "setting_data.config";
const CONTENTS_STICKER = 1;
const CONTENTS_LIST = 2;
const CONTENTS_SETTINGS = 3;

// ============================================
// グローバル変数
// ============================================
let ContentsOnDisplay;

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
      mode: "readwrite",
    });

    // アーカイブフォルダを開く。フォルダがなければ新規作成
    this.archiveHandle = await this.dirHandle.getDirectoryHandle("archive", {
      create: true,
    });
  }

  /**
   * ルートフォルダ内の指定した拡張子のファイルを開き、内容をテキストデータとして取得する。
   * @param {string} extension
   * @returns [テキストデータ]
   */
  async readAllFileText(extension) {
    const result = [];
    for await (const fileHandle of this.dirHandle.values()) {
      if (fileHandle.kind === "file" && fileHandle.name.endsWith(extension)) {
        const file = await fileHandle.getFile();
        if (file.size > 0) {
          result.push(await file.text());
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

  /**
   * ルートフォルダにテキストデータを保存する。
   * @param {string} fileName ファイル名
   * @param {string} text テキストデータ
   */
  async saveText(fileName, text) {
    const fileHandle = await this.dirHandle.getFileHandle(fileName, {
      create: true,
    });
    const writable = await fileHandle.createWritable();
    await writable.write(text);
    await writable.close();
  }

  /**
   * アーカイブフォルダにテキストデータを保存する。
   * @param {string} fileName ファイル名
   * @param {string} text テキストデータ
   */
  async saveTextArchive(fileName, text) {
    const fileHandle = await this.archiveHandle.getFileHandle(fileName, {
      create: true,
    });
    const writable = await fileHandle.createWritable();
    await writable.write(text);
    await writable.close();
  }
}

/**
 * カラーピッカークラス
 */
class ColorPicker {
  /**
   * ファイル操作
   */
  filer;

  /**
   * 設定インスタンス
   */
  settings;

  /**
   * コンストラクタ
   * @param {Object} settings
   */
  constructor(settings) {
    this.settings = settings;
  }

  /**
   * カラーピッカーを作成する
   * @param {string} id 作成対象のHTML要素のID
   */
  async init(id) {
    // 設定データを読み込む
    const settingData = await this.settings.readSettingData();

    // 作成対象のHTML要素を取得
    const target = document.getElementById(id);

    // カラーピッカーを作成
    target.innerHTML = "";
    settingData.colorPicker.forEach((data) => {
      target.appendChild(createBtn(data));
    });

    /**
     * カラーピッカーボタンを作成
     * @param {object} data 設定データ
     * @returns ボタン
     */
    function createBtn(data) {
      const elm = document.createElement("button");
      elm.id = `cp_btn--${data.color}`;
      elm.classList.add("has-item--tooltip");
      elm.appendChild(Component.createIcon("icon-pencil-plus"));
      elm.appendChild(Component.createTooltip(data.name, "tooltip-text--l"));

      elm.addEventListener("click", () => {
        const root = document.getElementById("box_whitebord--root");
        const sticker = document.createElement("div");
        sticker.sticker(root, null);
        sticker.setColor(data.color);
        root.appendChild(sticker);
        sticker.save();
      });
      return elm;
    }
  }
}

/**
 * 設定クラス
 */
class Settings {
  /**
   * ファイル操作
   */
  filer;

  /**
   * 設定データ
   */
  settingData;

  /**
   * コンストラクタ
   * @param {Object} filer
   */
  constructor(filer) {
    this.filer = filer;
  }

  /**
   * 設定データを読み込みオブジェクトとして返却する。
   * @returns 設定データオブジェクト
   */
  async readSettingData() {
    const jsonStr = await this.filer.readAllText(FILE_NAME_SETTING_DATA);
    this.settingData = JSON.parse(jsonStr);
    return this.settingData;
  }

  /**
   * 設定内容を保存する
   */
  async save() {
    const saveData = { colorPicker: [] };
    const items = document.getElementsByClassName(
      "settings-param--colorPicker"
    );
    for (let item of items) {
      saveData.colorPicker.push({
        color: item.name,
        name: item.value,
      });
    }
    await this.filer.saveText(FILE_NAME_SETTING_DATA, JSON.stringify(saveData));
  }

  /**
   * 設定画面を作成する
   * @param {string} id 作成対象のHTML要素のID
   */
  async init(id) {
    // 設定データを再読み込み
    await this.readSettingData();

    // 作成対象のHTML要素を取得
    const target = document.getElementById(id);

    // 設定画面を作成する。
    target.innerHTML = "";
    target.appendChild(initColorPicker(this.settingData.colorPicker));

    // 保存イベントを追加
    const items = target.getElementsByClassName("settings-param--saveTarget");
    for (let item of items) {
      item.addEventListener("blur", () => {
        this.save();
      });
    }

    /**
     * カラーピッカーの設定を作成する。
     * @param {object} colorPickerData 設定データ
     * @returns カラーピッカー設定
     */
    function initColorPicker(colorPickerData) {
      const elm = document.createElement("div");
      elm.classList.add("box-settings--root");
      elm.appendChild(createSection());
      return elm;

      /**
       * セクションを作成する。
       * @returns セクション
       */
      function createSection() {
        const elm = document.createElement("div");
        elm.id = "setting_section-groupName";
        elm.classList.add("box-settings--section");
        elm.appendChild(createTitle());
        elm.appendChild(createDescription());
        colorPickerData.forEach((data) => {
          elm.appendChild(createItem(data));
        });
        return elm;

        /**
         * タイトルを作成する。
         * @returns タイトル
         */
        function createTitle() {
          const elm = document.createElement("h2");
          elm.appendChild(createTitleText());
          elm.appendChild(document.createTextNode("\u00A0"));
          elm.appendChild(document.createTextNode("グループ名"));
          return elm;

          /**
           * タイトルテキスト部品を作成する。
           * @returns タイトルテキスト部品
           */
          function createTitleText() {
            const elm = document.createElement("span");
            elm.classList.add("settings-class--min");
            elm.textContent = "Setting:";
            return elm;
          }
        }

        /**
         * 説明を作成する。
         * @returns 説明
         */
        function createDescription() {
          const elm = document.createElement("p");
          elm.classList.add("settings-class--description");
          elm.textContent = "付箋の色に任意の名前を付けます。";
          return elm;
        }

        /**
         * 設定レコードを作成する。
         * @param {object} data 設定情報
         * @returns 設定レコード
         */
        function createItem(data) {
          const elm = document.createElement("p");
          elm.classList.add("settings-item--min");
          elm.appendChild(createLabel());
          elm.appendChild(createInput());
          elm.appendChild(createIcon());
          return elm;

          function createLabel() {
            const elm = document.createElement("label");
            elm.htmlFor = data.color;
            elm.id = `label_${data.color}`;
            return elm;
          }

          function createInput() {
            const elm = document.createElement("input");
            elm.type = "text";
            elm.name = data.color;
            elm.id = `name_${data.color}`;
            elm.classList.add("settings-param--saveTarget");
            elm.classList.add("settings-param--colorPicker");
            elm.value = data.name;
            return elm;
          }

          function createIcon() {
            const elm = document.createElement("span");
            elm.classList.add("settings-icon--pencil");
            elm.appendChild(Component.createIcon("icon-pencil"));
            return elm;
          }
        }
      }
    }
  }
}

/**
 * ホワイトボードクラス
 */
class Whitebord {
  /**
   * ファイル操作
   */
  filer;

  /**
   * ルート要素
   */
  root;

  /**
   * コンストラクタ
   * @param {Object} filer
   */
  constructor(filer) {
    this.filer = filer;
  }

  /**
   * ホワイトボード画面を作成する
   * @param {string} id 作成対象のHTML要素のID
   */
  async init(id) {
    // 作成対象のHTML要素を取得
    const target = document.getElementById(id);

    // 描画範囲を新規作成
    target.innerHTML = "";
    this.root = document.createElement("div");
    this.root.classList.add("box-whitebord--root");
    this.root.id = "box_whitebord--root";

    // 作成済みの付箋を描画
    const items = await this.filer.readAllFileText(".json");
    items.forEach((item) => {
      const sticker = document.createElement("div");
      sticker.sticker(this.root, JSON.parse(item));
      this.root.appendChild(sticker);
    });

    target.appendChild(this.root);
  }

  /**
   * 指定された文字でフィルタをかける。
   * @param {string} text
   */
  filterText(text) {
    const stickers = this.root.getElementsByClassName("item-sticker--root");
    for (let sticker of stickers) {
      sticker.textFilter(text);
    }
  }

  /**
   * 指定された日付範囲でフィルタをかける。
   * @param {string} afterDate 開始日付
   * @param {string} beforeDate 終了日付
   */
  filterDataRange(afterDate, beforeDate) {
    const stickers = this.root.getElementsByClassName("item-sticker--root");
    for (let sticker of stickers) {
      sticker.filterDataRange(afterDate, beforeDate);
    }
  }
}

/**
 * 付箋
 * @param {object} myRoot 親要素
 * @param {object} data 付箋データ
 */
HTMLElement.prototype.sticker = function (myRoot, data) {
  //========================================
  // 初期処理
  //========================================
  const oneSelft = this;

  // *****************************
  // 付箋データの状態を正規化
  // *****************************
  data = adjustData(data);

  // *****************************
  // 付箋オブジェクトを作成
  // *****************************
  oneSelft.classList.add("item-sticker--root");
  if (data.color !== "") {
    oneSelft.classList.add(data.color);
  }
  if (data.completion === "true") {
    oneSelft.classList.add("sticker-state--completion");
  }

  oneSelft.appendChild(createHeader());
  oneSelft.appendChild(createContents());
  oneSelft.appendChild(createFooter());

  oneSelft.id = data.id;
  oneSelft.dataset.duedate = data.dueDate.replaceAll("-", "");
  oneSelft.dataset.top = data.top;
  oneSelft.dataset.left = data.left;
  oneSelft.dataset.color = data.color;
  oneSelft.dataset.completion = data.completion;

  oneSelft.style.top = data.top + "px";
  oneSelft.style.left = data.left + "px";
  oneSelft.style.zIndex = mathStickerZindex(oneSelft.dataset.duedate);

  // *****************************
  // ドラッグ移動機能を追加
  // *****************************
  let pos1 = 0;
  let pos2 = 0;
  let pos3 = 0;
  let pos4 = 0;

  /**
   * ドラッグ移動機能を追加
   * @param {event} e
   */
  oneSelft.onpointerdown = (e) => {
    if (isMoveDisable(e)) {
      return;
    }

    pos3 = e.clientX;
    pos4 = e.clientY;
    oneSelft.onpointermove = slide;
    oneSelft.setPointerCapture(e.pointerId);

    oneSelft.classList.add("active");

    /**
     * 移動させる
     * @param {event} e
     */
    function slide(e) {
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;

      let top = oneSelft.offsetTop - pos2;
      let left = oneSelft.offsetLeft - pos1;
      if (top < 0) top = 0;
      if (left < 0) left = 0;

      const rootWidth = myRoot.offsetWidth;
      const rootHeight = myRoot.offsetHeight - 3;
      const oneSelftWidth = oneSelft.offsetWidth;
      const oneSelftHeight = oneSelft.offsetHeight;
      if (top + oneSelftHeight > rootHeight) top = rootHeight - oneSelftHeight;
      if (left + oneSelftWidth > rootWidth) left = rootWidth - oneSelftWidth;

      oneSelft.style.top = top + "px";
      oneSelft.style.left = left + "px";

      oneSelft.dataset.top = top;
      oneSelft.dataset.left = left;
    }
  };

  /**
   * ドラッグ移動を終了
   * @param {event} e
   */
  oneSelft.onpointerup = (e) => {
    if (isMoveDisable(e)) {
      return;
    }

    oneSelft.onpointermove = null;
    oneSelft.releasePointerCapture(e.pointerId);

    oneSelft.classList.remove("active");

    save();
  };

  // *****************************
  // 状態の変化を監視
  // *****************************

  //========================================
  // プライベートメソッド
  //========================================
  /**
   * 付箋のzIndexを日付を元に計算する。
   * @param {string} dueDate
   * @returns zIndex
   */
  function mathStickerZindex(dueDate) {
    if (dueDate === "") dueDate = 0;
    return 99999999 - dueDate;
  }

  /**
   * ドラッグ可能な状態であるかを判定する
   * @param {event} e
   * @returns boolean
   */
  function isMoveDisable(e) {
    return e.target.classList.contains("sticker-control--unmove");
  }

  /**
   * データ内容を整える。データが存在しない場合、空のデータを作成する。
   * @param {object} data
   * @returns data
   */
  function adjustData(data) {
    data = data || {};

    // ID
    if (data.id === undefined) {
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
      data.id = `${systemDate}_${randamStr}`;
    }

    // タイトル
    if (data.title === undefined) {
      data.title = "";
    }

    // メモ
    if (data.descrption === undefined) {
      data.descrption = "";
    }

    // 期限日
    if (data.dueDate === undefined) {
      data.dueDate = "";
    }

    // 位置情報
    if (data.top === undefined) {
      data.top = "10";
    }
    if (data.left === undefined) {
      data.left = "10";
    }

    // 色設定
    if (data.color === undefined) {
      data.color = "";
    }

    // 完了フラグ
    if (data.completion === undefined) {
      data.completion = false;
    }

    return data;
  }

  /**
   * 入力内容をオブジェクト形式で取得する。
   * @returns data
   */
  function getInputData() {
    const data = adjustData(null);
    const getValue = (className) => {
      return oneSelft.getElementsByClassName(className)[0].value;
    };

    data.id = oneSelft.id;
    data.title = getValue("sticker-input--title");
    data.descrption = getValue("sticker-input--memo");
    data.dueDate = getValue("sticker-input--data");
    data.top = oneSelft.dataset.top;
    data.left = oneSelft.dataset.left;
    data.color = oneSelft.dataset.color;
    data.completion = oneSelft.dataset.completion;

    return data;
  }

  /**
   * 入力内容を保存する
   */
  function save() {
    const data = getInputData();
    const filename = `${data.id}.json`;
    const jsonStr = JSON.stringify(data);
    filer.saveText(filename, jsonStr);
  }

  /**
   * 入力内容をアーカイブする
   */
  function archive() {
    const data = getInputData();
    const filename = `${data.id}.json`;
    const jsonStr = JSON.stringify(data);
    filer.saveTextArchive(filename, jsonStr);
    filer.saveText(filename, "");
    oneSelft.remove();
  }

  /**
   * ヘッダー要素を作成する
   * @returns ヘッダー
   */
  function createHeader() {
    const elmHeader = document.createElement("div");
    elmHeader.classList.add("sticker-grid--header");
    elmHeader.appendChild(createTitleInput());

    const icon = Component.createIcon("icon-outline-thumb-up");
    icon.classList.add("icon-outline-thumb-up", "item-show--completion");
    elmHeader.appendChild(icon);

    return elmHeader;

    /**
     * タイトル入力欄を作成
     * @returns タイトル入力欄
     */
    function createTitleInput() {
      const elmTitleInput = document.createElement("input");
      elmTitleInput.type = "text";
      elmTitleInput.classList.add(
        "sticker-input--title",
        "sticker-control--unmove"
      );
      elmTitleInput.placeholder = "タイトル...";
      elmTitleInput.value = data.title;

      elmTitleInput.addEventListener("blur", save);
      return elmTitleInput;
    }
  }

  /**
   * コンテンツ要素を作成する。
   * @returns コンテンツ要素
   */
  function createContents() {
    const elmContents = document.createElement("div");
    elmContents.classList.add("sticker-grid--contents");
    elmContents.appendChild(createMemoTextarea());
    return elmContents;

    /**
     * メモ入力欄を作成
     * @returns メモ入力欄
     */
    function createMemoTextarea() {
      const elmMemoTextarea = document.createElement("textarea");
      elmMemoTextarea.classList.add(
        "sticker-input--memo",
        "sticker-control--unmove"
      );
      elmMemoTextarea.placeholder = "メモ...";
      elmMemoTextarea.spellcheck = false;
      elmMemoTextarea.value = data.descrption;

      elmMemoTextarea.addEventListener("blur", save);
      return elmMemoTextarea;
    }
  }

  /**
   * フッター要素を作成する。
   * @returns フッター要素
   */
  function createFooter() {
    const elmFooter = document.createElement("div");
    elmFooter.classList.add("sticker-grid--footer");
    elmFooter.appendChild(createDurDateInput());
    elmFooter.appendChild(createCheckBox());

    const iconArchive = Component.createIcon("icon-download");
    iconArchive.classList.add(
      "sticker-icon--archive",
      "sticker-control--unmove"
    );
    elmFooter.appendChild(iconArchive);

    /**
     * アーカイブ保存
     */
    iconArchive.addEventListener("click", () => {
      archive();
    });

    return elmFooter;

    /**
     * 期限日入力欄を作成
     * @returns 期限日入力欄
     */
    function createDurDateInput() {
      const elmDurDateInput = document.createElement("input");
      elmDurDateInput.type = "date";
      elmDurDateInput.classList.add(
        "sticker-input--data",
        "sticker-control--unmove"
      );
      elmDurDateInput.value = data.dueDate;

      elmDurDateInput.addEventListener("change", () => {
        oneSelft.dataset.duedate = elmDurDateInput.value.replaceAll("-", "");
        oneSelft.style.zIndex = mathStickerZindex(oneSelft.dataset.duedate);
        save();
      });
      return elmDurDateInput;
    }

    /**
     * チェックボックスを作成
     * @returns チェックボックス
     */
    function createCheckBox() {
      const elmCBInput = document.createElement("input");
      elmCBInput.type = "checkbox";
      elmCBInput.classList.add(
        "sticker-input--checkbox",
        "sticker-control--unmove"
      );
      elmCBInput.checked = data.completion === "true";

      elmCBInput.addEventListener("change", () => {
        console.log(elmCBInput.checked);
        oneSelft.dataset.completion = elmCBInput.checked;

        if (elmCBInput.checked) {
          oneSelft.classList.add("sticker-state--completion");
        } else {
          oneSelft.classList.remove("sticker-state--completion");
        }

        save();
      });
      return elmCBInput;
    }
  }

  //========================================
  // パブリックメソッド
  //========================================

  /**
   * 付箋の色を変更する。
   * @param {string} color カラークラス
   */
  oneSelft.setColor = (color) => {
    const before = oneSelft.dataset.color;

    if (oneSelft.classList.contains(before)) {
      oneSelft.classList.remove(before);
    }

    oneSelft.classList.add(color);
    oneSelft.dataset.color = color;
  };

  /**
   * 保存する。
   */
  oneSelft.save = () => {
    save();
  };

  /**
   * テキストフィルタをかける。
   * @param {string} text
   */
  oneSelft.textFilter = (text) => {
    oneSelft.classList.remove("hidden");

    const kws = text.toLowerCase().split(",");
    const data = getInputData();
    const target = `${data.title} ${data.descrption}`.toLowerCase();

    if (kws.find((v) => target.indexOf(v) === -1) !== undefined) {
      oneSelft.classList.add("hidden");
    }
  };

  /**
   * 指定された日付範囲でフィルタをかける。
   * @param {string} afterDate より後
   * @param {string} beforeDate より前
   */
  oneSelft.filterDataRange = (afterDate, beforeDate) => {
    oneSelft.classList.add("hidden");
    const dueDate = getInputData().dueDate.replaceAll("-", "");

    if (!isNaN(afterDate) && !isNaN(beforeDate) && dueDate !== "") {
      if (afterDate <= dueDate && beforeDate >= dueDate) {
        oneSelft.classList.remove("hidden");
      }
    }
  };
};

// ============================================
// インスタンス変数
// ============================================
const filer = new Filer();
const settings = new Settings(filer);
const whitebord = new Whitebord(filer);
const colorPicker = new ColorPicker(settings);

// ============================================
// Start Page
// ============================================
const initStartPage = () => {
  const modalFilerOpen = document.getElementById("modal_filer-open");
  const btnFolderOpen = document.getElementById("btn_dir--open");

  /**
   * ルートフォルダを開き、画面を初期化する。
   */
  btnFolderOpen.addEventListener("click", async () => {
    try {
      // フォルダを開く
      await filer.openFolder();

      // カラーピッカーを設定する。
      colorPicker.init("box_colorpicker--root");

      // ホワイトボード画面を表示する。
      whitebord.init("grid_area--main");

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
  const btnHamburger = document.getElementById("btn_menu--hamburger");
  const boxDrawer = document.getElementById("box_drawer--left");

  /**
   * ドロワー画面を閉じる
   */
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".drawer-close--not")) {
      boxDrawer.classList.remove("show");
    }
  });

  /**
   * ドロワー画面を開く
   */
  btnHamburger.addEventListener("click", () => {
    boxDrawer.classList.add("show");
  });
};

// ============================================
// Search
// ============================================
const initSearch = () => {
  const btnCancelR = document.getElementById("btn_cancel--r");
  const textSearchCond = document.getElementById("text_search--cond");

  /**
   * 検索処理を実行する。
   */
  textSearchCond.addEventListener("change", () => {
    const text = textSearchCond.value.toLowerCase();

    let isDataRange = false;
    let afterDate = 0;
    let beforeDate = 99999999;

    text.split(",").forEach((kw) => {
      if (kw.startsWith("after:")) {
        isDataRange = true;
        afterDate = kw.replaceAll("after:", "");
      } else if (kw.startsWith("before:")) {
        isDataRange = true;
        beforeDate = kw.replaceAll("before:", "");
      } else {
        //empty
      }
    });

    switch (ContentsOnDisplay) {
      case CONTENTS_STICKER:
        if (isDataRange) {
          whitebord.filterDataRange(afterDate, beforeDate);
        } else {
          whitebord.filterText(text);
        }
        break;
      default:
        break;
    }
  });

  /**
   * 入力欄が空になったらフィルタを解除する
   */
  textSearchCond.addEventListener("keyup", () => {
    const text = textSearchCond.value;
    if (text === "") whitebord.filterText("");
  });

  /**
   * 検索テキストの入力内容をクリアする
   */
  btnCancelR.addEventListener("click", () => {
    textSearchCond.value = "";
    whitebord.filterText("");
  });
};

// ============================================
// Menu
// ============================================
const initMenu = () => {
  const btnChangeSticker = document.getElementById("btn-change--sticker");
  const btnChangeList = document.getElementById("btn-change--list");
  const btnChangeSettings = document.getElementById("btn-change--settings");
  const boxColorpickerRoot = document.getElementById("box_colorpicker--root");

  /**
   * メイン画面を初期化する。
   */
  const clearMainArea = () => {
    const target = document.getElementById("grid_area--main");
    target.innerHTML = "";
  };

  /**
   * 各メニューボタンのアクティブ化を解除する。
   */
  const removeClassActiveAll = () => {
    btnChangeSticker.classList.remove("active");
    btnChangeList.classList.remove("active");
    btnChangeSettings.classList.remove("active");
  };

  /**
   * 付箋画面を表示
   */
  btnChangeSticker.addEventListener("click", () => {
    removeClassActiveAll();
    btnChangeSticker.classList.add("active");

    // ホワイトボード画面を作成
    clearMainArea();
    whitebord.init("grid_area--main");
    ContentsOnDisplay = CONTENTS_STICKER;

    // カラーピッカーを再設定する。
    boxColorpickerRoot.classList.remove("hidden");
    colorPicker.init("box_colorpicker--root");
  });

  /**
   * 一覧画面を表示
   */
  btnChangeList.addEventListener("click", () => {
    removeClassActiveAll();
    btnChangeList.classList.add("active");

    clearMainArea();
    ContentsOnDisplay = CONTENTS_LIST;

    // カラーピッカーを非表示にする。
    boxColorpickerRoot.classList.add("hidden");
  });

  /**
   * 設定画面を表示
   */
  btnChangeSettings.addEventListener("click", () => {
    removeClassActiveAll();
    btnChangeSettings.classList.add("active");

    //設定画面を作成
    clearMainArea();
    settings.init("grid_area--main");
    ContentsOnDisplay = CONTENTS_SETTINGS;

    // カラーピッカーを非表示にする。
    boxColorpickerRoot.classList.add("hidden");
  });
};

// ============================================
// Load
// ============================================
window.addEventListener("load", () => {
  initStartPage();
  initDrawer();
  initSearch();
  initMenu();
  ContentsOnDisplay = CONTENTS_STICKER;
});
