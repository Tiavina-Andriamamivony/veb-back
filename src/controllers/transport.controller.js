import TransportService from '../services/transport.service.js';

class TransportController {
  static async create(req, res) {
    try {
      const transport = await TransportService.create(req.body);
      res.status(201).json(transport);
    } catch (err) {
      console.error('❌ Error creating transport:', err.message);
      res.status(400).json({ message: err.message });
    }
  }

  static async list(req, res) {
    try {
      const result = await TransportService.list({
        page: Number(req.query.page) || 1,
        limit: Number(req.query.limit) || 10
      });
      res.json(result);
    } catch (err) {
      console.error('❌ Error listing transports:', err.message);
      res.status(500).json({ message: err.message });
    }
  }

  static async getOne(req, res) {
    try {
      const transport = await TransportService.getOne(req.params.id);
      if (!transport) return res.status(404).json({ message: 'Not found' });
      res.json(transport);
    } catch (err) {
      console.error('❌ Error getting transport:', err.message);
      res.status(500).json({ message: err.message });
    }
  }

  static async update(req, res) {
    try {
      const transport = await TransportService.update(req.params.id, req.body);
      res.json(transport);
    } catch (err) {
      console.error('❌ Error updating transport:', err.message);
      res.status(400).json({ message: err.message });
    }
  }

  static async delete(req, res) {
    try {
      await TransportService.delete(req.params.id);
      res.status(204).send();
    } catch (err) {
      console.error('❌ Error deleting transport:', err.message);
      res.status(400).json({ message: err.message });
    }
  }

  static async rentability(req, res) {
    try {
      const result = await TransportService.calculateRentability(req.params.id);
      res.json(result);
    } catch (err) {
      console.error('❌ Error calculating rentability:', err.message);
      res.status(400).json({ message: err.message });
    }
  }
}

export default TransportController;
