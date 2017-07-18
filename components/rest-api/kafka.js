const kafka = require('kafka-node');

const kafkaConfig =require('./config').kafka;

const kafkaPipeline = require('kafka-pipeline');

const client = new kafka.Client(`${kafkaConfig.host}:${kafkaConfig.port}`);

function addActivity(msg, callback) {
	kafkaPipeline.producer.ready(function() {
	send([{topic:  kafkaConfig.activitiesTopic, messages: JSON.stringify(msg)}]);
});
}
//
module.exports = {
  addActivity,
};
