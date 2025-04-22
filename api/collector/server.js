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
  await client.connect();
  db = client.db(); // Uses default DB from connection URI
  sessions = db.collection('sessions');

  app.post('/session/event', async (req, res) => {
    const sessionId = req.headers['x-session-id'];
    const event = req.body;

    const session = await sessions.findOne({ sessionId });
    if (!session) {
      await sessions.insertOne({ sessionId, events: [event] });
    } else {
