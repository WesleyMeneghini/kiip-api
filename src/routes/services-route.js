const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/service-controller');

router.get('/', serviceController.get)
router.post('/', serviceController.post)
router.post('/uploads/:id', serviceController.uploadImage)
router.put('/', serviceController.put)
router.delete('/', serviceController.delete)

module.exports = router;