const router = require('express').Router();
const controller = require('./activity.controller');
// For circle
router.post('/:circleId/activity', controller.createPublishActivity);

// Receive message from mailbox
router.get('/:mailboxId/activity', controller.getActivity);

// For circle
// router.post('/:circleId/activity', authorize.permit('activity:all', 'activity:create'), controller.createPublishActivity);

// // Receive message from mailbox
// router.get('/:mailboxId/activity', authorize.permit('activity:all', 'activty:read'), controller.getActivity);
// module.exports = router;


module.exports = router;
