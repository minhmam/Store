const express = require('express');
const router = express.Router();

const storeController = require('../app/controllers/storeController');

router.get('/plants', storeController.plants);
router.get('/cactus', storeController.cactus);
router.get('/:slug', storeController.show);

module.exports = router;
