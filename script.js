const Chance = require('chance');
const gen = require('sentence-generator');
const moment = require('moment');
// const probability = require('probability-distributions');
const Client = require('./dbs/elasticsearch');

const Gen = gen('./lepetite.txt');
const chance = new Chance();

const numberOfUsers = 20000;
const numberOfVideos = 1000;

// Client.dropIndex('video-microservice').then(d => console.log('dropped'));

const createUsers = (number) => {
  const recursive = (count = 0) => {
    if (count < number) {
      const user = {
        name: chance.name(),
        state: chance.state(),
      }

      Client.addToIndex('video-microservice', 'user', count, user)
      .then(data => {
        // console.log(`saved ${JSON.stringify(user)}`)
        recursive(++count);
      });
    }
  }
  recursive();
}

const createVideos = (number) => {
  const recursive = (count = 0) => {
    if (count < number) {
      const video =  {
        title: Gen.take(1),
        author: Math.floor(Math.random() * 500)
      }
      Client.addToIndex('video-microservice', 'videos', count, video)
      .then(data => {
        // console.log(`saved ${JSON.stringify(video)}`)
        recursive(++count);
      });
    }
  }

  recursive();
}

function createView(data) {
  return  Client.addToIndex('video-microservice', 'test', data);
}

function createBulkViewsForSingleVideo (videoId, date, totalViews, count = 0) {
  const arrOfPromises = [];

  for (let i = 0; i < totalViews; i += 1) {
    arrOfPromises.push(createView(i, {videoId, date: date.format(), userId: Math.floor(Math.random() * 500)}));
  }
  return Promise.all(arrOfPromises);

}

// createBulkViewsForSingleVideo(20, moment(), 200).then(() => console.log('success'));
function pseries(list) {
  var p = Promise.resolve();
  return list.reduce(function(pacc, fn) {
    return pacc = pacc.then(fn);
  }, p);
}

// function createDayViews (total, amount = 0) {
//   return new Pro
//   if (numberOfViews < total) {
//     const viewsOfSingleVideo = Math.floor(paretoDistribution(1, 0.7) - 1);
//     const singleVideoId = Math.floor(Math.random() * 100);

//     if (viewsOfSingleVideo > 0 && viewsOfSingleVideo < 300) {
//       arrForPromises.push(createBulkViewsForSingleVideo(singleVideoId, date, viewsOfSingleVideo).catch(err => console.log(err)));
//       numberOfViews += viewsOfSingleVideo;
//     }
//   }
// }

const createTrend = (days, start, min) => {
  let date = new moment().subtract(days, 'days');

  const recursive = (count = 0, last = start, date) => {
    if (count < days) {
      const direction = Math.random < 0.5 ? -1 : 1;
      const amount = last += direction * 100;
      date = date.add(1, 'days');

      let numberOfViews = 0;

      const distribution = [];

      const arrForPromises = [];

      while (numberOfViews < amount) {
        let singleVideoViews = paretoDistribution(1, 0.7);
        if (singleVideoViews < amount * 0.3) {
          numberOfViews += singleVideoViews;
          distribution.push(singleVideoViews);
        }
      }

      distribution.forEach(count => {
        const videoId = Math.floor(Math.random() * numberOfVideos);
        for (let i = 0; i < count; i += 1) {
          arrForPromises.push({videoId, date});
        }
      })

      arrForPromises.push({videoId: -1, date});
      console.log(date.format())
      const first = Promise.resolve();

      arrForPromises.reduce((promise, data) => {
        const {videoId, date} = data;
        if (videoId === -1) {
          return promise.then(() => recursive(++count, amount, date));
        }
        return promise.then(() => createView({videoId, date}).catch(err => console.log(err)));
      }, first);

    }
  }
  recursive(0, start, date);
}

createTrend(30, 1000, 300);

function paretoDistribution(minimum, alpha) {
  const u = 1.0 - Math.random();
  return minimum / (u ** (1.0 / alpha));
}
