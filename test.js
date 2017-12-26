'use strict';
const easyInput = require('./index.js');

// Promiseが返ってくる
const promise = easyInput.easyInput('h-abe', '', 'start', '18:30');
promise.then((result) => {
  console.log(`出勤時刻: ${result.intime}, 退勤時刻: ${result.outtime}`);
  console.log('テストが正常に完了しました');
});
