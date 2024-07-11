const express = require('express');
const { uploadDocument, getDocuments } = require('../controllers/documentController');

const router = express.Router();

router.post('/documents', uploadDocument);
router.get('/documents', getDocuments);

module.exports = router;