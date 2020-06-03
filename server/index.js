require('dotenv').config();
const express = require('express');

const db = require('./database');
const ClientError = require('./client-error');
const staticMiddleware = require('./static-middleware');

const app = express();

app.use(staticMiddleware);
app.use(express.json());

app.get('/api/health-check', (req, res, next) => {
  db.query('select \'successfully connected\' as "message"')
    .then(result => res.json(result.rows[0]))
    .catch(err => next(err));
});

app.get('/api/posts', (req, res, next) => {
  const sql = `
    select * from "posts";
  `;
  db.query(sql)
    .then(result => res.status(200).json(result.rows))
    .catch(err => next(err));
});

app.get('/api/posts/:themeId', (req, res, next) => {
  const themeId = req.params.themeId;
  if (themeId === '1') {
    const sql = `
      select * from "posts";
    `;
    db.query(sql)
      .then(result => res.status(200).json(result.rows))
      .catch(err => next(err));
  } else {
    let theme = '';
    switch (themeId) {
      case '2': theme = 'sports';
        break;
      case '3': theme = 'politics';
        break;
      case '4': theme = 'tv';
        break;
      case '5': theme = 'movies';
        break;
      case '6': theme = 'books';
        break;
      case '7': theme = 'tech';
        break;
      case '8': theme = 'webdev';
        break;
      case '9': theme = 'random';
        break;
    }
    const sql = `
      select * from "posts" where theme = $1;
    `;
    const params = [theme];
    db.query(sql, params)
      .then(result => res.status(200).json(result.rows))
      .catch(err => next(err));
  }
});

app.get('/api/theme', (req, res, next) => {
  const theme = req.body.theme;
  const sql = `
    select * from "posts" where "theme" = $1;
  `;
  const params = [theme];
  db.query(sql, params)
    .then(result => res.status(200).json(result.rows))
    .catch(err => next(err));
});

app.use('/api', (req, res, next) => {
  next(new ClientError(`cannot ${req.method} ${req.originalUrl}`, 404));
});

app.use((err, req, res, next) => {
  if (err instanceof ClientError) {
    res.status(err.status).json({ error: err.message });
  } else {
    console.error(err);
    res.status(500).json({
      error: 'an unexpected error occurred'
    });
  }
});

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on port', process.env.PORT, 'yo.');
});
