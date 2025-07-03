import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

class TrainingService {
  static async create(data) {
    return prisma.training.create({
      data: {
        date: new Date(data.date),
        duration: data.duration,
        category: data.category,
        place: data.place
      }
    });
  }

  static async list({ page = 1, limit = 10, category, dateFrom, dateTo, sortBy = 'date', sortOrder = 'desc' }) {
    const skip = (page - 1) * limit;

    const where = {};
    if (category) where.category = category;
    if (dateFrom || dateTo) {
      where.date = {};
      if (dateFrom) where.date.gte = new Date(dateFrom);
      if (dateTo) where.date.lte = new Date(dateTo);
    }

    const trainings = await prisma.training.findMany({
      where,
      orderBy: { [sortBy]: sortOrder },
      skip,
      take: limit
    });

    const total = await prisma.training.count({ where });

    return { trainings, total, page, limit };
  }

  static async getOne(id) {
    return prisma.training.findUnique({ where: { id: Number(id) } });
  }

  static async update(id, data) {
    return prisma.training.update({
      where: { id: Number(id) },
      data
    });
  }

  static async delete(id) {
    return prisma.training.delete({ where: { id: Number(id) } });
  }
}

export default TrainingService;
