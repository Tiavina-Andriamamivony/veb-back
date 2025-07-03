import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

class PlayerService {
  static async createPlayer(data) {
    // On calcule la date de fin de licence à 4 ans
    const licenseEnd = new Date();
    licenseEnd.setFullYear(licenseEnd.getFullYear() + 4);

    // Création des stats d’abord
    const stats = await prisma.playerStats.create({
      data: {
        shoot: data.stats.shoot,
        dribble: data.stats.dribble,
        defense: data.stats.defense,
        finish: data.stats.finish,
        speed: data.stats.speed,
        strength: data.stats.strength,
        weight: data.stats.weight,
        jump: data.stats.jump,
        iq: data.stats.iq,
      }
    });

    // Puis création du joueur
    return prisma.player.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        category: data.category,
        statsId: stats.id,
        photoUrl: data.photoUrl || null,
        licenseEnd: licenseEnd,
      }
    });
  }

  static async getPlayers({ page = 1, limit = 10, category, search, sortBy = 'createdAt', sortOrder = 'desc' }) {
    const skip = (page - 1) * limit;
    const where = {};

    if (category) {
      where.category = category;
    }

    if (search) {
      where.OR = [
        { firstName: { contains: search, mode: 'insensitive' } },
        { lastName: { contains: search, mode: 'insensitive' } }
      ];
    }

    const players = await prisma.player.findMany({
      where,
      include: { stats: true },
      orderBy: { [sortBy]: sortOrder },
      skip,
      take: limit,
    });

    const total = await prisma.player.count({ where });

    return { players, total, page, limit };
  }

  static async getPlayerById(id) {
    return prisma.player.findUnique({
      where: { id: Number(id) },
      include: { stats: true },
    });
  }

  static async updatePlayer(id, data) {
    // On traite la mise à jour des stats si besoin
    if (data.stats) {
      const player = await prisma.player.findUnique({ where: { id: Number(id) } });
      if (!player) throw new Error('Player not found');

      await prisma.playerStats.update({
        where: { id: player.statsId },
        data: data.stats
      });
    }

    // Puis on update le joueur
    return prisma.player.update({
      where: { id: Number(id) },
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        category: data.category,
        photoUrl: data.photoUrl,
        licenseEnd: data.licenseEnd,
      }
    });
  }

  static async deletePlayer(id) {
    const player = await prisma.player.findUnique({ where: { id: Number(id) } });
    if (!player) throw new Error('Player not found');

    // Supprimer les stats associées
    await prisma.playerStats.delete({ where: { id: player.statsId } });
    // Supprimer le joueur
    return prisma.player.delete({ where: { id: Number(id) } });
  }
}

export default PlayerService;
