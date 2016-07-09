# LearningHigh

本项目是一个提供大学生在线看课件的系统，并且提供基于课件每页的Q&A和评论功能

## 1 小组成员

|姓名|分工|
|---|---|
|谭 笑|设计|
|刘俊义|前端|
|谢仁强|前端|
|林逸凡|前端|
|李俊杰|后台|

## 2 项目构架

项目Web服务端采用"MEAN" 技术框架，即(MySQL+Express+Angular+Node.js)结合MVC架构进行开发。使用Gulp作为自动化构建工具。

> 业界说的MEAN指的是：MongoDB, Express, Angular, Nodejs，本项目更换MongoDB为MySQL

## 3 目录结构

```bash
.
├── app
    ├── controllers     控制器
    ├── models          模型
    ├── utils           工具函数
├── app.js              入口文件
├── bower.json          bower模块依赖
├── config
    ├── config.js       配置文件
    └── express.js      express服务器
├── gulpfile.js         gulp任务
├── jsconfig.json
├── node_modules        npm模块
├── package.json        npm模块依赖
└── public              静态文件
    ├── app_angular     angular文件
    ├── components      bower库
    ├── courseware      共享文件夹挂载点
    ├── favicon.ico
    └── index.html


```

## 4 项目启动

鉴于功能比较明确而且小组成员数量较少，所有成员直接在master分支上开发。

### 4.1 前置条件

1. 把自己电脑的RSA公钥个人设置里设置好。详情请百度。
2. 修改host文件绑定服务器IP为 `qykj.com`
3. 安装sshfs
```
git clone git@github.com:jungor/LearningHigh.git
```

### 4.2 运行方式

```
cd LearningHigh
sudo apt-get install sshfs
npm install
bower install
gulp mount (会提示让你输入服务器密码)
gulp
```
运行无误后，直接访问：`http://localhost:3000`

## 5 代码贡献
详情请看[代码贡献](contributing.md)

## 6 提醒
1. 前端使用angular_ui_boostrap  http://angular-ui.github.io/bootstrap/
   **如果觉得麻烦，直接用bootstrap撸也行**
2. 路由使用ui-router 不用angular自带的router

