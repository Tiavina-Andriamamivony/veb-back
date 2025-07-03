import express from 'express';
import TrainingController from '../controllers/training.controller.js';

const router = express.Router();

router.post('/', TrainingController.create);
router.get('/', TrainingController.list);
router.get('/:id', TrainingController.getOne);
router.put('/:id', TrainingController.update);
router.delete('/:id', TrainingController.delete);

export default router;
