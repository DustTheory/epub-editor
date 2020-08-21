/* 'use strict';

import './editor';
import { FileExplorer } from './fileExplorer';

let fileExplorer = new FileExplorer('file-explorer');

 */

import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Faeg from './components/Faeg';

import css from './styles/global.css';


ReactDOM.render(
  <Faeg />,
  document.getElementById('faeg')
);