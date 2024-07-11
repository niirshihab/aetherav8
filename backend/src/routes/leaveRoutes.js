const express = require('express');
const { requestLeave, approveRejectLeave } = require('../controllers/leaveController');

const router = express.Router();

router.post('/leave-requests', requestLeave);
router.put('/leave-requests/:id', approveRejectLeave);

module.exports = router;