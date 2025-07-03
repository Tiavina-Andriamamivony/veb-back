import express from 'express';
import PlayerController from '../controllers/player.controller.js';

const router = express.Router();

router.post('/', PlayerController.create);
router.get('/', PlayerController.list);
router.get('/:id', PlayerController.getOne);
router.put('/:id', PlayerController.update);
router.delete('/:id', PlayerController.delete);

export default router;
