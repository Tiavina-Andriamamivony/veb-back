import express from 'express';
import TransportController from '../controllers/transport.controller.js';

const router = express.Router();

router.post('/', TransportController.create);
router.get('/', TransportController.list);
router.get('/:id', TransportController.getOne);
router.put('/:id', TransportController.update);
router.delete('/:id', TransportController.delete);
router.get('/:id/rentability', TransportController.rentability);

export default router;
