const path = require("path");

/**
 * 获取当前NodeJs进程的绝对路径或者是拼接参数后的绝对路径
 * @param  {...string} paths
 * @returns
 */
exports.getCwdPathOrJoin = function (...paths) {
  return path.join(process.cwd(), ...paths);
};
