# Faucet Readme



## 项目地址

```shell
https://github.com/cryptape/contract_pub.git
```



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
  - cookie key, 随机字符串, 长度大于 0
- APP_KEYS
  - 

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



## 项目介绍

该项目主要基于 Node.js 与 Koa.js 开发

该项目主要用于提供给开发者 AppChain 测试链(http://121.196.200.225:1337)的测试用代币