require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

const client = new MongoClient(process.env.MONGODB_URI);

let db, sessions;

async function startServer() {
  try {
    await client.connect();
    db = client.db(); // Default DB from connection string
    sessions = db.collection('sessions');

    app.post('/session/event', async (req, res) => {
      const sessionId = req.headers['x-session-id'];
      const event = req.body;

      const session = await sessions.findOne({ sessionId });
      if (!session) {
        await sessions.insertOne({ sessionId, events: [event] });
      } else {
        await sessions.updateOne(
          { sessionId },
          { $push: { events: event } }
        );
      }

      res.status(200).json({ success: true });
    });

    app.get('/sessions', async (req, res) => {
      const all = await sessions.find().toArray();
      res.json(all);
    });

    app.get('/', (req, res) => {
        res.send('BugHawk Collector API is running.');
      });

    app.listen(PORT, () => {
      console.log(`✅ BugHawk Collector API running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Error starting server:', error);
  }
}

startServer();
