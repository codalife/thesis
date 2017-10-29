const express = require('express');
const elasticsearch = require('elasticsearch');
const path = require('path');

const client = new elasticsearch.Client();

const app = express();

app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
  client.get({
    index: 'video-mcrservice',
    type: 'user',
    id: 100,
  }).then((resp) => {
    res.send(resp);
  });
});

app.post('/', (req, res) => {
  client.index({
    index: 'video-mcrservice',
    type: 'user',
    id: 101,
    body: {
      name: 'Liz Kong',
      content: 'It all started when...',
      date: '2017-12-17',
    },
  }, (err) => {
    res.send('saved');
  });
});

app.get('/graph', (req, res) => {
  res.send();
});

app.listen('3000', () => console.log('app running on 3000'));
