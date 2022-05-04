#! /usr/bin/env node

const { program } = require("commander");

// 创建一个基础项目
program
  .command("create <app-name>")
  .description("创建应用的基础模板")
  .action((appName, destination) => {
    // console.log("app-name：", appName);
    // console.log("destination：", destination);
    require("./modules/createTemplate/index")(appName);
  });

// 创建页面模块的基本文件结构
program
  .command("add <page-name>")
  .description("创建页面模块的基础文件结构")
  .action((pageName, destination) => {
    // console.log("page-name：", pageName);
    // console.log("destination：", destination);
    require("./modules/createPage/index")(pageName);
  });

// 填写脚手架基本信息
program
  .version(`YPro-Cli：${require("../package").version}`)
  .description("YPro快速搭建前端项目基本模板的脚手架")
  .name("ypro")
  .usage("<command> [options]");

program.parse();
