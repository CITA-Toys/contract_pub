# Faucet Readme



## 项目介绍

该项目基于 Node.js 与 Koa.js 开发

用于提供给开发者 AppChain 测试链 ( http://121.196.200.225:1337 ) 的测试用代币

[项目地址](https://dapp.cryptape.com/faucet/): https://dapp.cryptape.com/faucet/

[Github 仓库地址](https://github.com/cryptape/contract_pub.git): https://github.com/cryptape/contract_pub.git

### 获取测试代币

- 访问[页面](https://dapp.cryptape.com/faucet/)后输入需要获取测试代币的账户地址与正确的验证码

- 然后点击 Get Testnet Token 按钮, 后台服务器会自动向指定地址转出 10000 个代币(10^22 quota)

> 使用 Neuron 钱包登录可自动输入账户地址



## 部署流程

### 下载项目

```shell
git clone https://github.com/cryptape/contract_pub.git
```

### 安装依赖

#### 切换到项目根目录

```shell
cd contract_pub
```

#### 安装依赖

```shell
yarn install
```

#### 设置 .env 变量

根据 .env.example 中的内容设置相应参数

- CHAIN
  - 链的地址, 需要完整的协议, 主机, 端口
- PRIVATE_KEY
  - 发币地址的私钥
- APP_SESSION_KEY
  - cookie key, 随机字符串
  - 长度大于 0
- APP_KEYS
  - app keys, 多个随机字符串, 使用 `,` 隔开
  - 至少设置一个长度大于 0 的字符串

### 启动项目

该项目需要 pm2, 需要全局安装, 

如果 pm2 已经安装(可以输入 `pm2` 确认是否安装), 不需要执行下一条指令

```shell
yarn global add pm2
```

使用 pm2 启动项目

```shell
pm2 start
```

### 管理项目

更详细的内容请参阅 pm2 [官方文档](http://pm2.keymetrics.io/docs/usage/process-management/)

#### 暂停项目

```
pm2 stop contract_pub
```

#### 重启项目

```shell
pm2 reload contract_pub
```

#### 启动项目

```shell
pm2 start contract_pub
```

#### 删除项目

执行下面的指令后需要重新进入项目根目录输入 `pm2 start` 重新启动

```shell
pm2 delete contract_pub
```

#### 列出所有项目

```shell
pm2 list
```



## 开发相关

### 启动项目

在下载项目并安装依赖后, 执行下述指令启动项目 watch 模式

```shell
yarn start:watch
```
在更改代码后会自动重启项目

### 目录与文件说明

`/docs` 中是相关文档

`/public` 中是静态文件, 前端需要用到的脚本, 样式, 图片等

`/src` 中是程序的主文件

`/src/config` 中是项目的基础配置

`/src/controllers` 中是每个文件对应不同页面, 控制页面的内容与交互等

`/src/log` 中是对 console.log 的封装

`/src/routes` 中是对路由的配置

`/src/utils` 中是一些函数, 比如一些与链交互操作的封装

`/src/views` 中是 Pug 模板引擎文件, 生成前端 html 信息

`/src/index.js` 是项目的入口文件, 含有对 koa 的配置

### 相关文档

[Koa.js](https://koa.bootcss.com/)

[Pug](https://pugjs.org/api/getting-started.html)

