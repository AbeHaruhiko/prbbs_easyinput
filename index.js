'use strict';

const client = require('cheerio-httpcli');
let inouttime = {};

function easyInput(user, pass, mode) {

  // ログイン
  client.fetch('https://s2soft.co.jp/prbbs/login', { userId: user, userPass: pass })
    .then((result) => {
      // token取得のため、一度アクセスする
      return client.fetch('https://s2soft.co.jp/prbbs/easyinput');
    })
    .then((result) => {
      // 簡易入力
      const inputInfo = {
        'mode': mode
      };
      return result.$('form[name=timeCard]').attr('method', 'POST').submit(inputInfo);
    })
    .then((result) => {
      // 入力完了後、同じ画面に遷移してくる。同画面の開始時間、終了時間を読み取って inouttime オブジェクトへ保管。
      const intime = result.$('dt:contains("開始時間")').next('dd').text();
      const outtime = result.$('dt:contains("終了時間")').next('dd').text();
      inouttime.intime = intime;
      inouttime.outtime = outtime;
      console.log(inouttime);
      return inouttime;
    })
    .catch(function (err) {
      console.log(err);
      return 'エラー'
    })
    .finally(function () {
      // 処理完了でもエラーでも最終的に必ず実行される
      client.reset();
    });
}

module.exports = {
  easyInput: easyInput
}