const fs = require("fs-extra");

/**
 * 检查path是否存在
 * @param {string} path
 * @returns
 */
exports.isExistPath = (path) => {
  return fs.existsSync(path);
};

/**
 * 创建文件夹
 * @param {string} path
 * @returns
 */
exports.createFolder = (path) => {
  return fs.mkdirSync(path, {
    recursive: true,
  });
};

/**
 * 删除文件夹
 * @param {string} path
 * @returns
 */
exports.deleteFolder = (path) => {
  return fs.rmSync(path, {
    recursive: true,
  });
};

/**
 * 写文件（没有则会新创建一个文件再写入）
 * @param {string} path
 * @param {string | Buffer | TypedArray | DataView | Object} data
 */
exports.writeContentToFile = (path, data) => {
  fs.writeFileSync(path, data);
};

/**
 * 读文件
 * @param {string} path
 * @returns
 */
exports.readContentFile = (path) => {
  return fs.readFileSync(path);
};
