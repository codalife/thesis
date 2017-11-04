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

const sns = new AWS.SNS({apiVersion: '2010-03-31'});

const pubMessage = (topic, message = {}, msgAttr = {}) => {
  return new Promise ((resolve, reject) => {
    // http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/SNS.html#publish-property
    var params = {
      TopicArn: topic, // topic name
      Message: JSON.stringify(message), /* required */ // json object
      MessageAttributes: msgAttr,
    };
    sns.publish(params, function(err, data) {
      if (err) {
        console.log(err, err.stack); // an error occurred
        reject(err);
      }
      else {
        console.log(data);           // successful response
        resolve(data);
      }
    });
  });
};


module.exports.sns = sns;
module.exports.pubMessage = pubMessage;