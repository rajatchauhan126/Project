const followDAO = require('../../dao/').follow;
const activityDAO = require('../../dao/').activity;


function createPublishActivity(req, res) {
  const payload = req.body;
  const receiver = req.params.circleId;
  const newActivity = {
    payload: req.body,
    timestamp: new Date(),
  };
  activityDAO.createPublishActivity(receiver, newActivity, (err, data) => {
    // if (err) { res.status(404).json(err); return; }
    res.status(201).json(data);
  });
}


function getActivity(req, res) {
  const mailId = req.params.mailboxId;
  activityDAO.retriveMessageFromMailbox(mailId, (err, result) => {
    if (err) {
      res.status(404).json([]); return;
    }
    res.json(result);
  });
  return null;
}


module.exports = {
  createPublishActivity,
  getActivity,
};
