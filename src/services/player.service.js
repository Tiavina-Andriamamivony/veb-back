import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const getAll = async (page = 1, limit = 10) => {
  const skip = (page - 1) * limit;
  const [players, total] = await Promise.all([
    prisma.player.findMany({
      skip,
      take: limit,
      orderBy: { createdAt: "desc" }
    }),
    prisma.player.count()
  ]);

  return {
    players,
    total,
    page,
    totalPages: Math.ceil(total / limit)
  };
};

const getOne = async (id) => {
  const player = await prisma.player.findUnique({ where: { id } });
  if (!player) throw new Error("Not found");
  return player;
};

const create = async (data) => {
  const licenseEnd = new Date();
  licenseEnd.setFullYear(licenseEnd.getFullYear() + 4);

  return await prisma.player.create({
    data: {
      firstName: data.firstName,
      lastName: data.lastName,
      category: data.category,
      stats: data.stats || [],
      photoUrl: data.photoUrl || null,
      licenseEnd
    }
  });
};

const update = async (id, data) => {
  return await prisma.player.update({
    where: { id },
    data: {
      firstName: data.firstName,
      lastName: data.lastName,
      category: data.category,
      stats: data.stats,
      photoUrl: data.photoUrl
    }
  });
};

const remove = async (id) => {
  await prisma.player.delete({ where: { id } });
};

const checkLicense = async (id) => {
  const player = await prisma.player.findUnique({ where: { id } });
  if (!player) throw new Error("Not found");

  const now = new Date();
  const isValid = now < player.licenseEnd;

  return {
    valid: isValid,
    expiresInDays: Math.ceil((player.licenseEnd - now) / (1000 * 3600 * 24))
  };
};

const getTopByStat = async (statKey, limit = 5) => {
  const players = await prisma.player.findMany();

  const sorted = players
    .map(p => ({
      ...p,
      statValue: Array.isArray(p.stats)
        ? (p.stats.find(s => s.type === statKey)?.value || 0)
        : 0
    }))
    .sort((a, b) => b.statValue - a.statValue)
    .slice(0, limit);

  return sorted;
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
