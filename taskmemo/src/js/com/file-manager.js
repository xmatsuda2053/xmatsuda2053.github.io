/**
 * ファイルマネージャークラス
 * @class FileManager
 */
export class FileManager {
  /**
   * コンストラクタ
   */
  constructor() {}

  /**
   * フォルダを開く
   * @returns {Promise<boolean>}
   * @memberof FileManager
   * @instance
   * @async
   * @public
   */
  async openDirectory() {
    try {
      this.directoryHandler = await window.showDirectoryPicker({
        mode: "readwrite",
      });
      return true;
    } catch (err) {
      // キャンセル時のエラーは無視
      return false;
    }
  }

  /**
   * ファイルに文字列を書き込む
   * @param {string} fileName
   * @param {string} content
   * @returns {Promise<void>}
   * @memberof FileManager
   * @instance
   * @async
   * @public
   */
  async saveFile(fileName, content) {
    const fileHandle = await this.directoryHandler.getFileHandle(fileName, {
      create: true,
    });
    const writable = await fileHandle.createWritable();
    await writable.write(content);
    await writable.close();
  }

  /**
   * ファイルを読み込む
   * @param {string} fileName
   * @returns {Promise<string>}
   * @memberof FileManager
   * @instance
   * @async
   * @public
   */
  async readFile(fileName) {
    try {
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
