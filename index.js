'use strict';

const client = require('cheerio-httpcli');
let inouttime = {};

const easyInput = async (user, pass, mode, time) => {

  // ログイン
  await client.fetch('https://s2soft.co.jp/prbbs/login', { userId: user, userPass: pass });

  // token取得のため、一度アクセスする
  const easyinput = await client.fetch('https://s2soft.co.jp/prbbs/easyinput');

  // 簡易入力
  const inputInfo = {
    'mode': mode,
    'intime': time ? time : '自動'
  };
  const inputresult = await easyinput.$('form[name=timeCard]').attr('method', 'POST').submit(inputInfo);

  // 入力完了後、同じ画面に遷移してくる。同画面の開始時間、終了時間を読み取って inouttime オブジェクトへ保管。
  const intime = inputresult.$('dt:contains("開始時間")').next('dd').text();
  const outtime = inputresult.$('dt:contains("終了時間")').next('dd').text();
  inouttime.intime = intime;
  inouttime.outtime = outtime;
  // console.log(inouttime);
  return inouttime;
}

module.exports = {
  easyInput: easyInput
}