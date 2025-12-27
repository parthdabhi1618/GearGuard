const express = require('express');
const router = express.Router();
const { getEquipments, createEquipment, updateEquipment, scrapEquipment } = require('../controllers/equipmentController');

router.route('/')
  .get(getEquipments)
  .post(createEquipment);

router.route('/:id')
  .put(updateEquipment);

router.route('/:id/scrap')
  .put(scrapEquipment);

module.exports = router;
