HTMLElement.prototype.syntaxEditor = function (config) {
  config = config || {};

  if (config.theme === undefined) {
    config.theme = dark;
  }

  if (config.id === undefined) {
    config.id = "main-editor";
  }

  /**
   * シンタックスエディタのルート要素
   */
  const seCodeRoot = this;
  seCodeRoot.classList.add("se-code-root");
  seCodeRoot.classList.add(`se-theme-${config.theme}`);

  /**
   * 行番号出力用の領域
   */
  const seCodeLineNumberArea = document.createElement("div");
  seCodeLineNumberArea.classList.add("se-code-line-number-area");

  /**
   * シンタックスハイライト用の領域
   */
  const seCodeSyntaxArea = document.createElement("div");
  seCodeSyntaxArea.classList.add("se-code-syntax-area");

  /**
   * コード入力用の領域
   */
  const seCodeEditor = document.createElement("textarea");
  seCodeEditor.id = config.id;
  seCodeEditor.classList.add("se-code-editor-area");
  seCodeEditor.spellcheck = false;
  seCodeEditor.autocomplete = false;

  // 作成した各要素を追加
  seCodeRoot.appendChild(seCodeLineNumberArea);
  seCodeRoot.appendChild(seCodeSyntaxArea);
  seCodeRoot.appendChild(seCodeEditor);

  /**
   * エディタのテーマを変更する。
   */
  seCodeRoot.ChangeEditorTheme = (theme) => {
    seCodeRoot.classList.remove(`se-theme-dark`);
    seCodeRoot.classList.remove(`se-theme-light`);
    seCodeRoot.classList.add(`se-theme-${theme}`);
  };

  /**
   * 入力したコードの内容を取得する。
   */
  seCodeRoot.getCodeText = () => {
    return seCodeEditor.value;
  };

  /**
   * 入力画面にコードを設定する。
   * @param {String} str
   */
  seCodeRoot.setCodeText = (str) => {
    seCodeEditor.value = str;
  };

  /**
   * エディタ入力以外でのコード変更を画面に反映する。
   */
  seCodeRoot.ApplyTextChange = () => {
    seCodeEditor.dispatchEvent(
      new Event("input", {
        bubbles: true,
        cancelable: true,
      })
    );
  };

  /**
   * コード入力に連動し、行番号とハイライトを設定する。
   */
  seCodeEditor.addEventListener("input", () => {
    /**
     * 括弧のハイライト定義
     * @constant
     * @type {RegExp}
     */
    const regExpBrackets =
      /(&lbrace;|&rbrace;|&lpar;|&rpar;|&lbrack;|&rbrack;)/g;

    /**
     * 変数宣言のハイライト定義
     * @constant
     * @type {RegExp}
     */
    const regExpVarType =
      /\b(sequenceDiagram|flowchart|classDiagram|stateDiagram|erDiagram|journey|gantt|pie|quadrantChart|requirementDiagram|mindmap|timeline)\b/gi;

    /**
     * 予約語のハイライト定義
     * @constant
     * @type {RegExp}
     */
    const regExpReserve = /\b(TD|TB|BT|RL|LR|as)\b/gi;

    /**
     * その他文言のハイライト定義
     * @constant
     * @type {RegExp}
     */
    const regExpOther =
      /\b(box|round_box|stadium|subroutine|cylindrical|circle|asymmetric|rhombus|hexagon|parallelogram|parallelogram_alt|trapezoid|trapezoid_alt|double_circle|participant|actor)\b/gi;

    /**
     * redハイライト定義
     * @constant
     * @type {RegExp}
     */
    const regRed = /\b(destroy)\b/gi;

    // ハイライト用のクラスを設定
    const arr = seCodeEditor.value
      .replaceAll(" ", "&nbsp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll("{", "&lbrace;")
      .replaceAll("}", "&rbrace;")
      .replaceAll("(", "&lpar;")
      .replaceAll(")", "&rpar;")
      .replaceAll("[", "&lbrack;")
      .replaceAll("]", "&rbrack;")
      .replaceAll("/", "&#47;")
      .replaceAll("*", "&#42;")
      .replace(/\"(.*?)\"/g, `<span class="se-pattern-emphasis">"$1"</span>`)
      .replace(/\'(.*?)\'/g, `<span class="se-pattern-emphasis">'$1'</span>`)
      .replace(/\`(.*?)\`/g, '<span class="se-pattern-emphasis">`$1`</span>')
      .replace(
        /\$&lbrace;(.*?)&rbrace;/g,
        '<span class="se-pattern-reserve">$$&lbrace;$1&rbrace;</span>'
      )
      .replace(regExpBrackets, '<span class="se-pattern-brackets">$1</span>')
      .replace(regExpVarType, '<span class="se-pattern-var-type">$1</span>')
      .replace(regExpReserve, '<span class="se-pattern-reserve">$1</span>')
      .replace(regExpOther, '<span class="se-pattern-other">$1</span>')
      .replace(regRed, '<span class="se-pattern-red">$1</span>')
      .split("\n");

    // 行番号を出力
    seCodeLineNumberArea.innerHTML =
      arr.map((v, i) => `<span>${i + 1}</span><br />`).join("") + "<br />";

    // ハイライト後のコードを出力
    seCodeSyntaxArea.innerHTML =
      arr.map((v) => `<span>${v}</span><br />`).join("") + "<br />";
  });

  /**
   * コード入力画面・行番号・ハイライトのスクロールを連動させる。
   */
  seCodeEditor.addEventListener("scroll", () => {
    const scrollTop = seCodeEditor.scrollTop;
    seCodeLineNumberArea.scrollTop = scrollTop;
    seCodeSyntaxArea.scrollTop = scrollTop;
    seCodeSyntaxArea.scrollLeft = scrollTop;
  });

  /**
   * Tab入力をインターセプトしSpace*2に変更する。
   */
  seCodeEditor.addEventListener("keydown", (e) => {
    if (e.key == "Tab") {
      e.preventDefault();
      const st = seCodeEditor.selectionStart;
      const en = seCodeEditor.selectionEnd;
      const sp = "  ";
      seCodeEditor.value =
        seCodeEditor.value.substring(0, st) +
        sp +
        seCodeEditor.value.substring(en);
      seCodeEditor.selectionStart = seCodeEditor.selectionEnd = st + sp.length;
      seCodeRoot.ApplyTextChange();
    }
  });
};
