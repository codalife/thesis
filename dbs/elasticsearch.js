var elasticsearch = require('elasticsearch');

var client = new elasticsearch.Client();

module.exports = {
  dropIndex: function(index) {
    return client.indices.delete({
      index: index,
    });
  },
  createIndex: function(index) {
    return client.indices.create({
      index: index,
    });
  },
  addToIndex: function(index, type, data) {
    // console.log(data)
    return client.index({
      index: index,
      type: type,
      body: {
        data
      }
    });
  },
  search: function(query) {
    return client.search({
      index: 'video-microservice',
      type: 'test',
      q: query
    });
  },
  closeConnection: function () {
    client.close();
  },
  getFromIndex: function() {
    return client.get({
      id: 1,
      index: 'video-microservice',
      type: 'test',
    }).then(() => console.log('found'));
  },
  waitForIndexing: function() {
    log('Wait for indexing ....');
    return new Promise(function(resolve) {
      setTimeout(resolve, 2000);
    });
  }
}
