const express = require('express');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const client = require('./dbs/elasticsearch');

const app = express();

function hrdiff(t1, t2) {
    var s = t2[0] - t1[0];
    var mms = t2[1] - t1[1];
    return s*1e9 + mms;
}

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(morgan('combined'));

app.use(express.static(path.join(__dirname, 'public')));

app.post('/test', (req, res) => {
  const t1 = process.hrtime();
  console.log(`memory used: ${process.memoryUsage().heapUsed}`)

  client.search(777).then((resp) => {
    const t2 = process.hrtime();
    console.log(`latency: ${hrdiff(t1, t2)}`);
    res.send(resp);
  });
});

app.post('/', (req, res) => {

  client.index({
    index: 'video-microservice',
    type: 'user',
    id: 101,
    body: {
      content: 'It all started when...',
      date: '2017-12-17',
    },
  }, (err) => {
    res.send('saved');
  });
});

app.get('/graph', (req, res) => {
  const t1 = process.hrtime();
  res.send();
  const t2 = process.hrtime();
  console.log(`latency: ${hrdiff(t1, t2)}`);
});

app.listen('8000', () => console.log('app running on 8000'));

module.exports = app;