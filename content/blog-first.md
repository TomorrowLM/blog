---
slug: blog-first
title: My first Blog
description: This Description Of My Second Blog.
date: 25-September-2020
---
## 内置API

### getStaticProps 

```jsx
export async function getStaticProps(context) {
  return {
    props: {}, // 将作为props传递给页面组件
  }
}
```

## mardown解析

https://www.netlify.com/blog/2020/05/04/building-a-markdown-blog-with-next-9.4-and-netlify/

[react-markdown](https://www.npmjs.com/package/react-markdown)将帮助我们解析和渲染 Markdown 文件

[gray-matter](https://www.npmjs.com/package/react-markdown) 将解析我们博客的*顶部内容*。（文件顶部的部分`---` ）

我们需要这样的元数据`title`，`data` 并`description`和`sl        ug`。您可以在此处添加任何您喜欢的内容

[raw-loader](https://www.npmjs.com/package/raw-loader)将帮助我们导入我们的markdown文件。 

# react项目搭建

前提：搭建react下的webpack环境

## 依赖包

 react 这个包，是专门用来创建React组件、组件生命周期等这些东西的；
 react-dom 里面主要封装了和 DOM 操作相关的包，比如，要把 组件渲染到页面上

```js
import React from 'react'
import ReactDOM from 'react-dom'
```

要使用 JSX 语法，必须先运行 `cnpm i babel-preset-react -D`，然后再 `.babelrc` 中添加 语法配置；

表单 formik

UI框架material

yup用于值解析和验证的JavaScript模式构建器

PropTypes 进行类型检查,可用于确保组件接收到的props数据类型是有效的