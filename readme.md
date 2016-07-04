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

项目Web服务端采用"MANE" 技术框架，即(MySQL+Express+Angular+Node.js)结合MVC架构进行开发。使用Gulp作为自动化构建工具。

> 业界说的MEAN指的是：MongoDB, Express, Angular, Nodejs，本项目更换MongoDB为MySQL

## 3 目录结构

```bash
.
├── app
    ├── controllers 控制器
    ├── models      模型
    ├── utils       工具函数
    └── views       视图
├── app.js          入口文件
├── bower.json
├── config
├── gulpfile.js
├── jsconfig.json
├── node_modules
├── package.json
└── public          静态文件

```

## 4 项目启动

鉴于功能比较明确而且小组成员数量较少，所有成员直接在master分支上开发。

### 4.1 前置条件

先把自己电脑的RSA公钥个人设置里设置好。详情请百度。
```bash
git clonegit@gitlab.com:jungor/LearningHigh.git
```

### 4.2 运行方式 

```bash
cd LearningHigh
npm install
gulp
```
运行无误后，直接访问：http://localhost:3000

## 5 代码贡献
详情请看[代码贡献](contributing.md)
