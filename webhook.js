const express = require('express');
const { Client, middleware } = require('@line/bot-sdk');

// 環境変数からキーを取得（Render側に設定済みであること）
const config = {
  channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.LINE_CHANNEL_SECRET,
};

const app = express();
const client = new Client(config);

app.post('/webhook', middleware(config), (req, res) => {
  Promise
    .all(req.body.events.map(handleEvent))
    .then(result => res.json(result));
});

function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    // テキスト以外は無視
    return Promise.resolve(null);
  }

  const replyText = `あなたの言ったこと：${event.message.text}`;

  return client.replyMessage(event.replyToken, {
    type: 'text',
    text: replyText,
  });
}

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`🚀 Listening on ${port}`);
});
