const express = require('express');
const { getMetrics } = require('../controllers/hrController');

const router = express.Router();

router.get('/hr/metrics', getMetrics);

module.exports = router;