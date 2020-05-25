const express = require('express')
const router = express.Router();
const schedulingController = require('../controllers/scheduling-controller');

router.get('/', schedulingController.get);
router.get('/:id', schedulingController.getById);
router.post('/', schedulingController.post);
router.put('/', schedulingController.put);
router.delete('/', schedulingController.delete);

module.exports = router;