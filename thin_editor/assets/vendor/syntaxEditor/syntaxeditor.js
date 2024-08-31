HTMLElement.prototype.syntaxEditor = function (config) {
  config = config || {};

  if (config.theme === undefined) {
    config.theme = dark;
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
    const regExpVarType = /\b(var|const|let)\b/g;

    /**
     * 予約語のハイライト定義
     * @constant
     * @type {RegExp}
     */
    const regExpReserve =
      /\b(await|break|case|catch|continue|default|delete|do|else|export|extends|false|finally|for|forEach|function|if|import|in|instanceof|new|null|return|super|switch|this|throw|true|try|typeof|void|while|with|yield)\b/g;

    /**
     * その他文言のハイライト定義
     * @constant
     * @type {RegExp}
     */
    const regExpOther =
      /\b(Math|Date|String|RegExp|Array|Map|Set|document.write)\b/g;

    /**
     * コメントのハイライト定義
     * @constant
     * @type {RegExp}
     */
    const regExpComment = /(&#47;&#47;.*|&#47;&#42;.*&#42;&#47;)/g;

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
      .replace(regExpBrackets, '<span class="se-pattern-brackets">$1</span>')
      .replace(regExpVarType, '<span class="se-pattern-var-type">$1</span>')
      .replace(regExpReserve, '<span class="se-pattern-reserve">$1</span>')
      .replace(regExpOther, '<span class="se-pattern-other">$1</span>')
      .replace(regExpComment, '<span class="se-pattern-comment">$1</span>')
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
