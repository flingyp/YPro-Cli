const ora = require("ora");
const util = require("util");

const { createFolder, deleteFolder } = require("../fsUtil");

let gitDownload = require("download-git-repo");

// Promise化 （download-git-repo本身不支持Promise）
gitDownload = util.promisify(gitDownload);

module.exports = async (repo, destination, branch = "main") => {
  const spinner = ora(`正在下载${repo}的${branch}分支仓库代码...\n`).start();

  createFolder(destination);

  const newRepo =
    repo.replace(/https:\/\/github.com\//g, "github:") + `#${branch}`;

  await gitDownload(
    newRepo,
    destination,
    {
      clone: true,
    },
    (err) => {
      // 删除文件夹
      if (err !== undefined) {
        deleteFolder(destination);
        spinner.succeed(`下载失败，错误信息为：${err}\n`);
        spinner.stop();
      } else {
        spinner.succeed(`下载成功！！！\n`);
        spinner.stop();
      }
    }
  );
};
