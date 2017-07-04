const start=require('../../../db');

const client=start.client;
const uuid = start.uuid;

const followapi = [];

function addFollow(follower, callback) {
  followapi.push(follower);
  return callback(null, follower);
}

function checkIfFollowExists(follower, callback) {
  const filterData = follow => follow.circleId === follower.circleId && follow.mailboxId === follower.mailboxId;
  const filteredFollowers = followapi.filter(filterData);
  return callback(null, filteredFollowers.length !== 0);
}

function deleteFollow(follower, callback) {
  const filter = followapi.filter(y => y.circleId === follower.circleId && y.mailboxId === follower.mailboxId);
  followapi.splice(followapi.indexOf(filter[0]), 1);
  return callback(null, filter[0]);
}

function splitMailId(circleId, callback) {
  const splitMailIdd = followapi.filter(y => y.circleId === circleId);
  return callback(null, splitMailIdd);
}

function addBulkFollow({ circleId, mailboxsId }, callback) {
  mailboxsId.forEach((box) => {
    followapi.push({ circleId, mailboxId: box });
  });
  return callback(null, followapi);
}

// function checkIfBulkFollowExists(follower, callback) {
//   console.log(`Follower${JSON.stringify(follower)}`);
//   const filterData = follow => follow.circleId === follower.circleId && follow.box === follower.box;
//   const filteredFollowers = followapi.filter(filterData);
//   console.log(filteredFollowers.length);
//   return callback(null, filteredFollowers.length !== 0);
// }
module.exports = {
  deleteFollow,
  addFollow,
  checkIfFollowExists,
  splitMailId,
  addBulkFollow,
};
