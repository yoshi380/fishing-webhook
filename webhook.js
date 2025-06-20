require('dotenv').config();
const express = require('express');
const app = express();

app.use(express.json());

app.post('/webhook', (req, res) => {
  const events = req.body.events;
  if (events.length > 0) {
    const userId = events[0].source.userId;
    console.log("👤 USER_ID を取得:", userId); // ← ここが重要
  }
  res.sendStatus(200);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
