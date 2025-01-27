/**
 * ファイル操作を行うためのマネージャークラス
 */
export class FileManager {
  /**
   * コンストラクタ
   */
  constructor() {
    this.directoryHandler = null;
    this.writeLock = Promise.resolve(); // 初期化時のロック
  }

  /**
   * ディレクトリを選択する
   * @returns {Promise<boolean>} ディレクトリを正常に開けたかどうか
   */
  async selectDirectory() {
    try {
      this.directoryHandler = await window.showDirectoryPicker({
        mode: "readwrite",
      });
      return true;
    } catch (err) {
      throw err;
    }
  }

  /**
   * ファイルを書き込む
   * @param {string} fileName 書き込むファイルの名前
   * @returns {Promise<string|null>} ファイルの内容。ファイルが存在しない場合はnull
   * @throws {Error} ディレクトリが開かれていない場合、またはファイル書き込みに失敗した場合
   */
  async writeFile(fileName, content) {
    if (!this.directoryHandler) {
      throw new Error("ディレクトリがまだ開かれていません。");
    }
    // ロック取得とリリースの処理（書き込みの一貫性を担保）
    this.writeLock = this.writeLock.then(async () => {
      try {
        const fileHandle = await this.directoryHandler.getFileHandle(fileName, {
          create: true,
        });
        const writable = await fileHandle.createWritable();
        await writable.write(content);
        await writable.close();
      } catch (err) {
        throw err;
      }
    });

    return this.writeLock; // プロミスを返す
  }

  /**
   * ファイルを読み込む
   * @param {string} fileName 読み込むファイルの名前
   * @returns {Promise<string|null>} ファイルの内容、ファイルが存在しない場合はnull
   * @throws {Error} ディレクトリが開かれていない場合、またはファイル読み込みに失敗した場合
   */
  async loadFile(fileName) {
    if (!this.directoryHandler) {
      throw new Error("ディレクトリがまだ開かれていません。");
    }
    try {
      // ファイルハンドルを取得してファイルを読み込む
      const fileHandle = await this.directoryHandler.getFileHandle(fileName);
      const file = await fileHandle.getFile();
      if (file.size <= 0) {
        return null;
      }
      return await file.text();
    } catch (err) {
      if (err.name === "NotFoundError") {
        return null;
      } else {
        throw err;
      }
    }
  }
}
