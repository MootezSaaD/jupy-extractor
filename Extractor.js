/**
 * Represents an Jupyter Note Python Code Extractor Class.
 */
const fs = require("fs");

/**
 * @constructor
 */

module.exports = class Extractor {
  constructor() {
    this.fw_loc = [];
  }
  /**
   * Extracts Python Code from the Notebook
   * @param {string} fileName - Jupyter Notebook File Name.
   */
  extractCode(fileName) {
    let outPutFileName;
    try {
      const file = fs.readFileSync(fileName, "utf8");
      outPutFileName = fileName.split(".")[0].concat(".py");
      const outputFile = fs.createWriteStream(outPutFileName);
      const code_array = [];
      const data = JSON.parse(file);
      const data_cells = data.cells;
      for (const cell in data_cells) {
        if (data_cells[cell].cell_type == "code") {
          const cell_source = data_cells[cell].source;
          for (const loc in cell_source) {
            code_array.push(cell_source[loc]);
            cell_source[loc].includes("import")
              ? this.fw_loc.push(cell_source[loc])
              : null;
          }
        }
      }
      this.lineBreaker(code_array);
      code_array.forEach((loc) => outputFile.write(loc));
      outputFile.close();
      console.log("\x1b[32m", "[SUCCESS]", "\x1b[0m", "Code Extracted!");
    } catch (err) {
      console.error(err);
      fs.unlinkSync(outPutFileName);
    }
  }
  /**
   * Checks and adds linebreak if not present
   * @param {string[]} code_array - Lines Of Codes Array.
   */
  lineBreaker(code_array) {
    for (let l in code_array) {
      if (!code_array[l].endsWith("\n")) {
        const newStr = code_array[l].concat("\n");
        code_array.splice(l, 1, newStr);
      }
    }
  }

  /**
   * Identifies Frameworks used
   * @returns {string[]} - Array of frameworks used
   */
  getFws() {
    return this.fw_loc.map((s) => s.match(/^import(.[aA-zZ]*)/)[1]);
  }
};
