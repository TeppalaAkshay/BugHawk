const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

const sessions = new Map();

app.post('/session/event', (req, res) => {
  const sessionId = req.headers['x-session-id'];
  const event = req.body;

  if (!sessions.has(sessionId)) {
    sessions.set(sessionId, []);
  }

  sessions.get(sessionId).push(event);
  console.log(`[Session ${sessionId}]`, event);

  res.status(200).json({ success: true });
});

app.listen(PORT, () => {
  console.log(`BugHawk Collector API running at http://localhost:${PORT}`);
});
