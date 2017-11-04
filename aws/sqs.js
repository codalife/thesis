/*
=========================
Things to do in aws console
1. Setup Topic in SNS.
2. Setup SQS to subscribe SNS topic.
=========================
*/

const AWS = require('aws-sdk');
AWS.config.update({region:'us-west-1'});
AWS.config.loadFromPath('./aws/credentials.json');

// Create SQS and SNS service object
const sqs = new AWS.SQS({apiVersion: '2012-11-05'});

const listQ = () => {
  return new Promise ((resolve, reject) => {
    sqs.listQueues({}, function(err, data) {
      if (err) {
        console.log("Error", err);
        reject(err);
      } else {
        console.log("Success", data.QueueUrls);
        resolve(data);
      }
    });
  });
}

const getQUrl = (qName) => {
  return new Promise ((resolve, reject) => {
      sqs.getQueueUrl({QueueName: qName}, function(err, data) {
      if (err) {
        console.log("Error", err);
        reject(err);
      } else {
        console.log("Success", data.QueueUrl);
        resolve(data.QueueUrl);
      }
    });
  });
}

const deleteMessage = (qUrl, receiptHandle) => {
  var deleteParams = {
    QueueUrl: qUrl,
    ReceiptHandle: receiptHandle,
  };

  return new Promise ((resolve, reject) => {
    sqs.deleteMessage(deleteParams, function(err, data) {
      if (err) {
        console.log("Delete Error", err);
        reject(err);
      } else {
        console.log("Message Deleted", data);
        resolve(data);
      }
    });
  });
};

const receiveMessage = (qUrl) => {
  // http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/SQS.html#receiveMessage-property
  var params = {
    QueueUrl: qUrl,
    AttributeNames: [
      "All"
    ],
    MessageAttributeNames: [
      "All"
    ],
    MaxNumberOfMessages: 1,
    VisibilityTimeout: 0,
    WaitTimeSeconds: 0
  };
  return new Promise ((resolve, reject) => {
    sqs.receiveMessage(params, function(err, data) {
      if (err) {
        console.log("Receive Error", err);
        reject(err);
      } else {
        resolve(data);

        if (data.Messages){
          deleteMessage(qUrl, data.Messages[0].ReceiptHandle);
        }
      }
    });
  });
}

module.exports.sqs = sqs;
module.exports.listQ = listQ;
module.exports.getQUrl = getQUrl;
module.exports.receiveMessage = receiveMessage;