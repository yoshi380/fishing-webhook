const express = require('express');
const { Client } = require('@line/bot-sdk');
require('dotenv').config();

const app = express();
app.use(express.json());

const config = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.CHANNEL_SECRET,
};

const client = new Client(config);

// Webhookエンドポイント
app.post('/webhook', (req, res) => {
  Promise.all(req.body.events.map(handleEvent))
    .then((result) => res.json(result))
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    });
});

// イベントハンドラ
function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    return Promise.resolve(null);
  }

  // 受け取ったメッセージにそのまま返信する
  return client.replyMessage(event.replyToken, {
    type: 'text',
    text: `Botの返信：「${event.message.text}」受け取りました！`,
  });
}

// ポート
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
