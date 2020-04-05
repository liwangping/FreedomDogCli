import program from "commander";
import symbol from "log-symbols";
import chalk from "chalk";

import create from './create';  //  项目创建
import init from './init'; // 项目初始化
import dev from './dev'; //项目启动
import build from './build'; //项目打包


let actionMap = {
    // 项目创建
    create: {
        description: '创建一个新的项目', // 描述
        usages: [// 使用方法
            'freedom-dog-cli create ProjectName',
            'lb-cli create ProjectName',
            'lbc create ProjectName'
        ],
        alias: 'c'  // 命令简称
    },
    // 项目初始化
    init: {
        description: '初始化项目',
        usages: [
            'freedom-dog-cli init',
            'lb-cli init',
            'lbc init'
        ],
        alias: 'i'
    },
    // 启动项目
    dev: {
        description: '本地启动项目',
        usages: [
            'freedom-dog-cli dev',
            'lb-cli dev',
            'lbc dev'
        ],
        options: [
            {
                flags: '-p --port <port>',
                description: '端口',
                defaultValue: 3000
            }
        ],
        alias: 'd'
    },
    //打包
    build: {
        description: '服务端项目打包',
        usages: [
            'little-bird-cli build',
            'lb-cli build',
            'lbc build'
        ],
        options: [
            {
                flags: '-u --username <port>',
                description: 'github用户名',
                defaultValue: ''
            },
            {
                flags: '-t --token <port>',
                description: 'github创建的token',
                defaultValue: ''
            }
        ],
        alias: 'b'
    }
}

// 添加create命令
Object.keys(actionMap).forEach(action => {

    // 读取每项的options
    if(actionMap[action].options){
        Object.keys(actionMap[action].options).forEach(option => {
            let obj = actionMap[action].options[option];
            program.option(obj.flags, obj.description, obj.defaultValue)
        })
    }

    program
        .command(action)
        .description(actionMap[action].description)
        .alias(actionMap[action].alias)
        .action(() => {
            switch(action) {
                case 'create': 
                    create(...process.argv.slice(3));
                    break;
                case 'init':
                    // init(program.username, program.token);
                    init("liwangping", "dc1f40a3bd86a4c5358fbf0f3c90c05b5b1a0d0c");
                    break;
                case 'dev':
                    dev(program.port);
                    break;
                case 'build':
                    build();
                    break;
                default:
                    break;
            }
        })
})

// 项目版本
program
    .version(require('../package.json').version, '-v --version')
    .parse(process.argv);

/**
 * freedom-dog-cli命令后不带参数的时候，输出帮助信息
 */
if(!process.argv.slice(2).length) {
    program.outputHelp()
}