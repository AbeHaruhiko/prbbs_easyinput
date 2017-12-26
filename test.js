'use strict';
const easyInput = require('./index.js');

// Promiseが返ってくる
const promise = easyInput.easyInput('h-abe', '', 'start', '18:30');
promise.then((result) => {
  console.log(result);
  console.log('テストが正常に完了しました');
});
