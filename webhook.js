const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());

app.post('/webhook', (req, res) => {
  const events = req.body.events;
  if (!events || events.length === 0) {
    return res.status(200).end();
  }

  const event = events[0];
  console.log('✅ Webhook受信イベント:', JSON.stringify(event, null, 2));

  if (event.source && event.source.groupId) {
    console.log('🎯 このグループIDだ！！👉', event.source.groupId);
  } else if (event.source && event.source.userId) {
    console.log('👤 個人USER_ID:', event.source.userId);
  }

  res.status(200).send('OK');
});

app.listen(3000, () => {
  console.log('🌐 Webhookサーバー起動中 http://localhost:3000/webhook');
});
