const elasticsearch = require('elasticsearch');
const Chance = require('chance');
const gen = require('sentence-generator');
const fs = require('fs');
// const probability = require('probability-distributions');

const Gen = gen('./lepetite.txt');
const chance = new Chance();
const Client = new elasticsearch.Client();

for (let i = 1; i < 1001; i += 1) {
  Client.index({
    index: 'user',
    type: 'author',
    id: i,
    body: {
      name: chance.name(),
      state: chance.state(),
      date: chance.date(),
    },
  }, (err) => {
    if (err) throw err;
  });
}

function deleteIndex() {
  Client.indices.delete({
    index: '_all',
  }, (err, res) => {
    if (err) {
      throw err;
    }
  });
}


const createUsers = (num, curr = 1) => {
  if (curr < num) {
    Client.index({
      index: 'video-mcrservice',
      type: 'user',
      id: curr,
      body: {
        name: chance.name(),
        state: chance.state(),
        date: chance.date(),
      },
    }, (err) => {
      if (err) throw err;
      createUsers(num, ++curr);
    });
  }
};

createUsers(100);

// --------------- create video titles ----------------------
for (let i = 0; i < 1000; i += 1) {
  console.log(Gen.take(1));
}


// ---------------- create long term trend -------------------


let current = 1000;
// let sum = current;

let wstream = fs.createWriteStream('./public/data.tsv');

wstream.write('date close\n');

for (let j = 0; j < 90; j += 1) {
  const direction = Math.random() < 0.5 && current > 300 ? -1 : 1;
  current += direction * Math.floor(Math.random() * 200);
  // sum += current;
  wstream.write(`${j} ${current}\n`);
}
wstream.end();


function paretoDistribution(minimum, alpha) {
  const u = 1.0 - Math.random();
  return minimum / (u ** (1.0 / alpha));
}

const pareto = [];

wstream = fs.createWriteStream('./public/pareto.tsv');

let paretoSum = 0;

wstream.write('views\n');

while (paretoSum < 10000) {
  const views = Math.floor(paretoDistribution(1, 0.7) - 1);
  if (views < 1000) {
    paretoSum += views;
    // pareto.push(Math.floor(paretoDistribution(1, 0.7) - 1))
	    wstream.write(`${views}\n`);
  }
}

pareto.sort((a, b) => a - b);
wstream.end();
