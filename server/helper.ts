import * as Encoding from 'encoding-japanese';

export class Helper {
  /**
   * 機種依存文字をスペースに置換
   * @param word
   * @returns 置換された文字列
   */
  static replacePlatformDependentCharacter(word: string) {
    // Unicode -> SJIS に変換
    const unicodeArray = Encoding.stringToCode(word);
    const sjisArray = Encoding.convert(unicodeArray, {
      to: 'SJIS',
      from: 'UNICODE',
    });

    // SJIS -> Unicode に変換
    const reconvUnicodeArray = Encoding.convert(sjisArray, {
      from: 'SJIS',
      to: 'UNICODE',
    });

    // SJIS で表現できなかった文字を　スペースにする
    const filteredUnicodeArray = reconvUnicodeArray.map((char) => {
      return char == 63 ? 32 : char;
    });
    const filteredString = Encoding.codeToString(filteredUnicodeArray);

    return filteredString;
  }
}
