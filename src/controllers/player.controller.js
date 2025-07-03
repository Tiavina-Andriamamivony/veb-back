import PlayerService from '../services/player.service.js';

class PlayerController {
  static async create(req, res) {
    try {
      const player = await PlayerService.createPlayer(req.body);
      res.status(201).json(player);
    } catch (err) {
      console.error(err);
      res.status(400).json({ message: err.message });
    }
  }

  static async list(req, res) {
    try {
      const { page, limit, category, search, sortBy, sortOrder } = req.query;
      const result = await PlayerService.getPlayers({
        page: Number(page) || 1,
        limit: Number(limit) || 10,
        category,
        search,
        sortBy,
        sortOrder
      });
      res.json(result);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  static async getOne(req, res) {
    try {
      const player = await PlayerService.getPlayerById(req.params.id);
      if (!player) return res.status(404).json({ message: 'Player not found' });
      res.json(player);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  static async update(req, res) {
    try {
      const player = await PlayerService.updatePlayer(req.params.id, req.body);
      res.json(player);
    } catch (err) {
      console.error(err);
      if (err.message === 'Player not found') return res.status(404).json({ message: err.message });
      res.status(400).json({ message: err.message });
    }
  }

  static async delete(req, res) {
    try {
      await PlayerService.deletePlayer(req.params.id);
      res.status(204).send();
    } catch (err) {
      console.error(err);
      if (err.message === 'Player not found') return res.status(404).json({ message: err.message });
      res.status(400).json({ message: err.message });
    }
  }
}

export default PlayerController;
