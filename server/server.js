const express = require('express');
const fs = require('fs/promises');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, 'diaries.json');

app.use(express.json());
app.use(cors());
async function readDiaries() {
  try {
    const raw = await fs.readFile(DATA_FILE, 'utf8');
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    if (error.code === 'ENOENT') {
      return [];
    }
    throw error;
  }
}

async function writeDiaries(diaries) {
  await fs.writeFile(DATA_FILE, JSON.stringify(diaries, null, 2), 'utf8');
}

function validateDiaryPayload(payload) {
  const errors = [];
  if (!payload.title || typeof payload.title !== 'string') {
    errors.push('title is required and must be a string');
  }
  if (!payload.date || typeof payload.date !== 'string') {
    errors.push('date is required and must be a string (ISO format recommended)');
  }
  if (!payload.content || typeof payload.content !== 'string') {
    errors.push('content is required and must be a string');
  }
  return errors;
}

app.get('/', (req, res) => {
  res.send({ message: 'Diary API is running' });
});

app.get('/diaries', async (req, res, next) => {
  try {
    const diaries = await readDiaries();
    res.json(diaries);
  } catch (error) {
    next(error);
  }
});

app.get('/diaries/:id', async (req, res, next) => {
  try {
    const diaryId = Number.parseInt(req.params.id, 10);
    const diaries = await readDiaries();
    const diary = diaries.find((item) => item.id === diaryId);
    if (!diary) {
      return res.status(404).json({ error: 'Diary not found' });
    }
    res.json(diary);
  } catch (error) {
    next(error);
  }
});

app.post('/diaries', async (req, res, next) => {
  try {
    const errors = validateDiaryPayload(req.body);
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    const diaries = await readDiaries();
    const nextId =
      diaries.length > 0 ? Math.max(...diaries.map((item) => item.id)) + 1 : 1;
    const newDiary = {
      id: nextId,
      title: req.body.title.trim(),
      date: req.body.date,
      content: req.body.content,
      mood: req.body.mood,
      color: req.body.color,
    };

    diaries.push(newDiary);
    await writeDiaries(diaries);

    res.status(201).json(newDiary);
  } catch (error) {
    next(error);
  }
});

app.put('/diaries/:id', async (req, res, next) => {
  try {
    const diaryId = Number.parseInt(req.params.id, 10);
    const errors = validateDiaryPayload(req.body);
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    const diaries = await readDiaries();
    const index = diaries.findIndex((item) => item.id === diaryId);
    if (index === -1) {
      return res.status(404).json({ error: 'Diary not found' });
    }

    const updatedDiary = {
      id: diaryId,
      title: req.body.title.trim(),
      date: req.body.date,
      content: req.body.content,
      mood: req.body.mood,
      color: req.body.color,
    };

    diaries[index] = updatedDiary;
    await writeDiaries(diaries);

    res.json(updatedDiary);
  } catch (error) {
    next(error);
  }
});

app.delete('/diaries/:id', async (req, res, next) => {
  try {
    const diaryId = Number.parseInt(req.params.id, 10);
    const diaries = await readDiaries();
    const filtered = diaries.filter((item) => item.id !== diaryId);
    if (filtered.length === diaries.length) {
      return res.status(404).json({ error: 'Diary not found' });
    }

    await writeDiaries(filtered);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});



app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({ error: 'Internal Server Error' });
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Diary API server is running on http://localhost:${PORT}`);
  });
}

module.exports = app;
