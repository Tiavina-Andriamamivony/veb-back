import EquipmentService from '../services/equipment.service.js';

class EquipmentController {
  static async create(req, res) {
    console.info('[POST] /equipment - Creating equipment:', req.body);
    try {
      const equipment = await EquipmentService.create(req.body);
      res.status(201).json(equipment);
    } catch (err) {
      console.error('❌ Error creating equipment:', err.message);
      res.status(400).json({ message: err.message });
    }
  }

  static async list(req, res) {
    try {
      const { page, limit, search, sortBy, sortOrder } = req.query;
      const result = await EquipmentService.list({
        page: Number(page) || 1,
        limit: Number(limit) || 10,
        search,
        sortBy,
        sortOrder
      });
      res.json(result);
    } catch (err) {
      console.error('❌ Error fetching equipment:', err.message);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  static async getOne(req, res) {
    try {
      const item = await EquipmentService.getOne(req.params.id);
      if (!item) return res.status(404).json({ message: 'Not found' });
      res.json(item);
    } catch (err) {
      console.error('❌ Error fetching equipment:', err.message);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  static async update(req, res) {
    try {
      const item = await EquipmentService.update(req.params.id, req.body);
      res.json(item);
    } catch (err) {
      console.error('❌ Error updating equipment:', err.message);
      res.status(400).json({ message: err.message });
    }
  }

  static async delete(req, res) {
    try {
      await EquipmentService.delete(req.params.id);
      res.status(204).send();
    } catch (err) {
      console.error('❌ Error deleting equipment:', err.message);
      res.status(400).json({ message: err.message });
    }
  }
}

export default EquipmentController;
