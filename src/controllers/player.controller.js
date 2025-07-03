import playerService from "../services/player.service.js";

const getAll = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const data = await playerService.getAll(Number(page), Number(limit));
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getOne = async (req, res) => {
  try {
    const player = await playerService.getOne(Number(req.params.id));
    res.json(player);
  } catch (err) {
    res.status(404).json({ error: "Joueur non trouvé" });
  }
};

const create = async (req, res) => {
  try {
    const player = await playerService.create(req.body);
    res.status(201).json(player);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const update = async (req, res) => {
  try {
    const player = await playerService.update(Number(req.params.id), req.body);
    res.json(player);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const remove = async (req, res) => {
  try {
    await playerService.remove(Number(req.params.id));
    res.status(204).end();
  } catch (err) {
    res.status(404).json({ error: "Joueur non trouvé" });
  }
};

const checkLicense = async (req, res) => {
  try {
    const status = await playerService.checkLicense(Number(req.params.id));
    res.json(status);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getTopByStat = async (req, res) => {
  try {
    const { statKey = "points", limit = 5 } = req.query;
    const data = await playerService.getTopByStat(statKey, Number(limit));
    res.json(data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export default {
  getAll,
  getOne,
  create,
  update,
  remove,
  checkLicense,
  getTopByStat
};
