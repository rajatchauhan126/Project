const activityDao = require('../../dao/activity');
const followDao = require('../../dao/follow');


function createPublishActivity(req, res) {
  const payload = req.body;
  const receiver = req.params.circleId;
  // console.log(req.params.circleId);
  const newActivity = {
    payload: req.body,
    timestamp: new Date(),
  };
  // console.log(newActivity);
  // receiver:{[payload:req.body,'timestamp:'req.timestamp}]
  res.status(201).json(activityDao.createPublishActivity(receiver, newActivity));
}

function getActivity(req, res) {
  const mailId = req.params.mailboxId;
  res.json(activityDao.retriveMessageFromMailbox(mailId));
}
module.exports = {
  createPublishActivity,
  getActivity,
};
