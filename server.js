const express = require('express');
const { Client } = require('@notionhq/client');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
// app.use(cors()); 
app.use(express.static('public'));
const port = 3000;
let lastState = null;

const notion = new Client({ auth: process.env.NOTION_TOKEN });
const databaseId = process.env.NOTION_DATABASE_ID;

// Calcolo stato da percentuale
function getStateFromPercent(percent) {
  return Math.min(4, Math.floor(percent / 20));
}

app.get('/api/getProgress', async (req, res) => {
  try {
    const response = await notion.databases.query({
      database_id: databaseId,
    });

    const totalItems = response.results.length;

    const checkedItems = response.results.filter(page =>
      page.properties["DOne"]?.checkbox === true
    ).length;

    const percent = Math.round((checkedItems / totalItems) * 100);

    res.json({ percent });
  } catch (error) {
    console.error('Errore:', error);
    res.status(500).json({ error: 'Errore nel recupero dati da Notion' });
  }
});

app.get('/api/getProgressState', async (req, res) => {
  try {
    const response = await notion.databases.query({
      database_id: databaseId,
    });

    const totalItems = response.results.length;
    const checkedItems = response.results.filter(page =>
      page.properties["DOne"]?.checkbox === true
    ).length;

    const percent = Math.round((checkedItems / totalItems) * 100);
    const currentState = getStateFromPercent(percent);

    const hasChanged = currentState !== lastState;
    lastState = currentState;

    res.json({ state: currentState, changed: hasChanged });
  } catch (error) {
    console.error('Errore:', error);
    res.status(500).json({ error: 'Errore nel recupero dati da Notion' });
  }
});

// Avvia server
app.listen(port, () => {
  console.log(`✅ Server in ascolto su http://localhost:${port}`);
});

// http://localhost:3000/api/getProgress