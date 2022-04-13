const inquirer = require("inquirer");
const chalk = require("chalk");
const { getCwdPathOrJoin } = require("../../utils/pathUtil");
const { isExistPath, deleteFolder } = require("../../utils/fsUtil");
const gitDownload = require("../../utils/downloadUtil");

const proCollect = require("../../template/projectTemplate/collect");

const proCollectNames = proCollect.map((item) => {
  return item.name;
});

module.exports = async (name) => {
  const { templateName } = await inquirer.prompt([
    {
      type: "list",
      name: "templateName",
      message: "请选择模板的项目名称：",
      choices: proCollectNames,
    },
  ]);
  const proPath = getCwdPathOrJoin(name);
  // 项目已存在了
  if (isExistPath(proPath)) {
    // 询问用户是否需要覆盖文件夹
    const { overWrite } = await inquirer.prompt([
      {
        type: "confirm",
        name: "overWrite",
        message: "是否需要覆盖当前文件夹",
        default: false,
      },
    ]);
    if (overWrite) {
      // 删除文件夹
      deleteFolder(proPath);
      // 下载模板
      const templateRepoInfo = proCollect.find((item) => {
        return item.name === templateName;
      });
      await gitDownload(templateRepoInfo.url, proPath, templateRepoInfo.branch);
    } else {
      console.log(chalk.red("\n提示：下载模板失败，请选择其他路径\n"));
    }
  } else {
    // 项目不存在，就直接下载该项目模板
    const templateRepoInfo = proCollect.find((item) => {
      return item.name === templateName;
    });
    await gitDownload(templateRepoInfo.url, proPath, templateRepoInfo.branch);
  }
};
