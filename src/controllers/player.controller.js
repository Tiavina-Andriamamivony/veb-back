import PlayerService from '../services/player.service.js';

class PlayerController {
  static async create(req, res) {
    console.info('📥 [POST] /players - Creating player with data:', req.body);
    try {
      const player = await PlayerService.createPlayer(req.body);
      console.info('✅ Player created:', player);
      res.status(201).json(player);
    } catch (err) {
      console.error('❌ Failed to create player:', err.message);
      res.status(400).json({ message: err.message });
    }
  }

  static async list(req, res) {
    console.info('📤 [GET] /players - Params:', req.query);
    try {
      const result = await PlayerService.getPlayers({
        page: Number(req.query.page) || 1,
        limit: Number(req.query.limit) || 10,
        category: req.query.category,
        search: req.query.search,
        sortBy: req.query.sortBy,
        sortOrder: req.query.sortOrder
      });
      console.info(`✅ Returned ${result.players.length} players`);
      res.json(result);
    } catch (err) {
      console.error('❌ Error fetching players:', err.message);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  static async getOne(req, res) {
    console.info(`📥 [GET] /players/${req.params.id}`);
    try {
      const player = await PlayerService.getPlayerById(req.params.id);
      if (!player) {
        console.warn('⚠️ Player not found');
        return res.status(404).json({ message: 'Player not found' });
      }
      res.json(player);
    } catch (err) {
      console.error('❌ Error fetching player:', err.message);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  static async update(req, res) {
    console.info(`🔧 [PUT] /players/${req.params.id} - Updating with:`, req.body);
    try {
      const player = await PlayerService.updatePlayer(req.params.id, req.body);
      console.info('✅ Player updated:', player);
      res.json(player);
    } catch (err) {
      console.error('❌ Failed to update player:', err.message);
      if (err.message === 'Player not found') return res.status(404).json({ message: err.message });
      res.status(400).json({ message: err.message });
    }
  }

  static async delete(req, res) {
    console.info(`🗑️ [DELETE] /players/${req.params.id}`);
    try {
      await PlayerService.deletePlayer(req.params.id);
      console.info('✅ Player deleted');
      res.status(204).send();
    } catch (err) {
      console.error('❌ Failed to delete player:', err.message);
      if (err.message === 'Player not found') return res.status(404).json({ message: err.message });
      res.status(400).json({ message: err.message });
    }
  }
}

export default PlayerController;
