/*-----------入口js-------------*/
import React from 'react';
import ReactDom from 'react-dom';
import memoryUtil from './utils/memoryUtils.js';
import storageUtil from './utils/storageUtils.js';

import App from './App.js';
//入口查询是否有用户登陆信息,保存在内存中
const user = storageUtil.getUser();
memoryUtil.user = user



ReactDom.render(<App />,document.getElementById('root'))