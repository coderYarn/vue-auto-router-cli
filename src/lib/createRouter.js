const handlebars = require("handlebars");
const fs = require("fs");
const template = require("./template.js");
const chalk = require('chalk')
const getFolder = require("./getFolder.js")

module.exports = async () => {
  let data = template;
  let routes = getFolder();
  let result = handlebars.compile(data)({ routes });
  result = transformationFormat(result, /\[id\]/g, ":id");
  fs.access("./src/router", (exists) => {
    if (exists) {
      fs.mkdirSync("./src/router");
      fs.writeFileSync("./src/router/index.js", result, {
        encoding: "utf8",
        flag: "w+",
      });
    } else {
      fs.writeFileSync("./src/router/index.js", result, {
        encoding: "utf8",
        flag: "w+",
      });
    }
  });
  function transformationFormat(text, format, toFormat) {
    return text.replace(format, toFormat);
  }
  console.log(chalk.green(`🚀 ./src/router/index.js 创建成功 !`));
};


