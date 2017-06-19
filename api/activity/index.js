const router = require('express').Router();
const controller = require('./activity.controller');
// For circle
router.post('/:circleId/activity', controller.createPublishActivity);
router.get('/:mailboxId/activity', controller.getActivity);
// console.log('Inside index');
module.exports = router;
