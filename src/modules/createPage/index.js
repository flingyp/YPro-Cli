const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs-extra");
const chalk = require("chalk");
const { getCwdPathOrJoin } = require("../../utils/pathUtil");
const {
  isExistPath,
  createFolder,
  writeContentToFile,
  readContentFile,
} = require("../../utils/fsUtil");

const { exit } = require("process");

module.exports = async (name) => {
  // 1.1 询问用户页面文件夹需要生成在哪个地方
  const { pageDir } = await inquirer.prompt([
    {
      type: "input",
      name: "pageDir",
      message: "请输入页面文件夹需要存放的位置（相对路径）：",
      default: "./",
      validate(pageDir) {
        // 1.2 判断当前用户输入的路径是否为相对路径
        if (path.isAbsolute(pageDir)) {
          return "请输入相对于当面目录的相对路径";
        }
        return true;
      },
    },
  ]);
  const pageDirAbsolutePath = path.resolve(getCwdPathOrJoin(), pageDir, name);

  // 2. 判断那个地方是否存在当前页面文件夹
  if (isExistPath(pageDirAbsolutePath)) {
    // 3. 如果存在，则直接退出程序，提示用户已存在文件夹，不给用户是否覆盖的机会，防止用户误操作导致不可恢复的后果
    console.log(
      chalk.red(`\n提示：目标路径已存在该文件夹，请重新输入页面文件名\n`)
    );
    exit(1);
  } else {
    // 4. 如果不存在
    // 脚手架的模板文件路径
    const templateDirPath = path.resolve(
      __dirname,
      "../../template/pageTemplate"
    );
    // 获取各个模板的文件名
    const files = fs.readdirSync(templateDirPath);
    // 让用户自己选择模本文件
    const { templateFileName } = await inquirer.prompt([
      {
        type: "list",
        name: "templateFileName",
        message: "请选择模板文件",
        choices: files,
      },
    ]);
    const fileData = readContentFile(
      path.resolve(templateDirPath, `./${templateFileName}`)
    );

    // 创建已name为名称的页面文件夹
    createFolder(pageDirAbsolutePath);

    //写入模板 ${name}Index.vue的文件
    writeContentToFile(
      `${path.resolve(
        pageDirAbsolutePath,
        name + "Index" + `.${path.extname(templateFileName)}`
      )}`,
      fileData
    );

    // 还需要新建一个 components 文件夹
    createFolder(path.resolve(pageDirAbsolutePath, "./components"));

    // 5. 创建完成后，提示用户已初始化页面模块成功
    console.log(
      chalk.blue(`\n模板已创建成功，目标路径为：${pageDirAbsolutePath}\n`)
    );
  }
};
