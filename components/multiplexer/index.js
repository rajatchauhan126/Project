const redisClient = require('./client/redisclient').client;

const topic =require('./config').kafka.topics[0];

const groupName = require('./config').kafka.options.groupId;

const kafkaPipeline = require('kafka-pipeline');

let startTimeAlreadySet = false;

function setStartTime() {
  startTimeAlreadySet = true;
  redisClient.get('startTime')((err, reply) => {
    if (!reply) {
      console.log('Reply Not Set');
      return redisClient.set('startTime', (new Date()).getTime());
    }
    return 0;
  })((err, response) => {
    if (err) { console.log(err); } else { console.log('Reply Already Set'); }
  });
}

let setEndTimeTimeout = null;

function setEndTime(endTime) {
  redisClient.set('endTime', (new Date()).getTime())((err, response) => {
    if (err) { console.log(err); } else { console.log('EndTime Set'); }
  });
}

kafkaPipeline.producer.ready(function() {
  kafkaPipeline.registerConsumer(topic, groupName, (message, done) => {
    console.log(message);
    if (!startTimeAlreadySet) {
      setStartTime();
    }
    const activity = JSON.parse(message);
    const circleId = activity.circleId;
    let followers;
    redisClient.smembers(`${topic}:${circleId}`)((err, result) => {
      if(err) { done(err); return; }
      followers = result;
      const arr = [];
      followers.forEach((data) => {
        const newActivity = activity;
        newActivity.mailboxId = data;
        arr.push({ topic: `${topic}D`, messages: [JSON.stringify(newActivity)] });
      });
      kafkaPipeline.producer.send(arr, (error, data) => {
        if (setEndTimeTimeout) { clearTimeout(setEndTimeTimeout); }
        setEndTimeTimeout = setTimeout(setEndTime.bind(new Date()), 5000);
      });
      done();
    });
  });
});
