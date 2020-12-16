const Extractor = require("./Extractor");

try {
  const codeExtractor = new Extractor();
  codeExtractor.extractCode("classification.ipynb");
  const fws = codeExtractor.getFws();
  console.log(fws);
} catch (error) {
  console.error(error);
}
