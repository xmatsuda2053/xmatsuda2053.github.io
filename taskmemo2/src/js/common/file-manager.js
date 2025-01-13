/**
 * ファイル操作を行うためのマネージャークラス
 */
export class FileManager {
  /**
   * コンストラクタ
   */
  constructor() {
    this.directoryHandler = null;
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
      console.error("ディレクトリを開くのに失敗しました:", err);
      return false;
    }
  }

  /**
   * ファイルに書き込む
   * @param {string} fileName 保存するファイルの名前
   * @param {string} content ファイルに書き込む内容
   * @throws {Error} ディレクトリが開かれていない場合、またはファイル保存に失敗した場合
   */
  async writeFile(fileName, content) {
    if (!this.directoryHandler) {
      throw new Error("ディレクトリがまだ開かれていません。");
    }
    try {
      // ファイルハンドルを取得または作成し、ファイルに書き込む
      const fileHandle = await this.directoryHandler.getFileHandle(fileName, {
        create: true,
      });
      const writable = await fileHandle.createWritable();
      await writable.write(content);
      await writable.close();
    } catch (err) {
      console.error("ファイルを保存するのに失敗しました:", err);
      throw err;
    }
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
        console.error("ファイルを読むのに失敗しました:", err);
        throw err;
      }
    }
  }
}
