import TrainingService from '../services/training.service.js';

class TrainingController {
  static async create(req, res) {
    try {
      const training = await TrainingService.create(req.body);
      console.info('[POST] /trainings - Training created:', training);
      res.status(201).json(training);
    } catch (err) {
      console.error('❌ Error creating training:', err.message);
      res.status(400).json({ message: err.message });
    }
  }

  static async list(req, res) {
    try {
      const result = await TrainingService.list({
        page: Number(req.query.page) || 1,
        limit: Number(req.query.limit) || 10,
        category: req.query.category,
        dateFrom: req.query.dateFrom,
        dateTo: req.query.dateTo,
        sortBy: req.query.sortBy,
        sortOrder: req.query.sortOrder
      });
      res.json(result);
    } catch (err) {
      console.error('❌ Error listing trainings:', err.message);
      res.status(500).json({ message: err.message });
    }
  }

  static async getOne(req, res) {
    try {
      const training = await TrainingService.getOne(req.params.id);
      if (!training) return res.status(404).json({ message: 'Not found' });
      res.json(training);
    } catch (err) {
      console.error('❌ Error getting training:', err.message);
      res.status(500).json({ message: err.message });
    }
  }

  static async update(req, res) {
    try {
      const training = await TrainingService.update(req.params.id, req.body);
      res.json(training);
    } catch (err) {
      console.error('❌ Error updating training:', err.message);
      res.status(400).json({ message: err.message });
    }
  }

  static async delete(req, res) {
    try {
      await TrainingService.delete(req.params.id);
      res.status(204).send();
    } catch (err) {
      console.error('❌ Error deleting training:', err.message);
      res.status(400).json({ message: err.message });
    }
  }
}

export default TrainingController;
