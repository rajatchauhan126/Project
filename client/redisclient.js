const express = require('express');

const redis = require('thunk-redis');

const client = redis.createClient();

module.exports = {
  client
};
