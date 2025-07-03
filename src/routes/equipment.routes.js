import express from 'express';
import EquipmentController from '../controllers/equipment.controller.js';

const router = express.Router();

router.post('/', EquipmentController.create);
router.get('/', EquipmentController.list);
router.get('/:id', EquipmentController.getOne);
router.put('/:id', EquipmentController.update);
router.delete('/:id', EquipmentController.delete);

export default router;