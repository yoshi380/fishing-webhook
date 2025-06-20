app.post('/webhook', (req, res) => {
  const events = req.body.events;

  if (events.length > 0) {
    const userId = events[0].source.userId;
    console.log("👤 USER_ID を取得:", userId);
  }

  res.sendStatus(200);
});
