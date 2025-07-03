import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

class EquipmentService {
  static async create(data) {
    return prisma.equipment.create({
      data: {
        name: data.name,
        unitPrice: data.unitPrice,
        quantity: data.quantity
      }
    });
  }

  static async list({ page = 1, limit = 10, search, sortBy = 'createdAt', sortOrder = 'desc' }) {
    const skip = (page - 1) * limit;
    const where = {};

    if (search) {
      where.name = { contains: search, mode: 'insensitive' };
    }

    const equipment = await prisma.equipment.findMany({
      where,
      orderBy: { [sortBy]: sortOrder },
      skip,
      take: limit
    });

    const total = await prisma.equipment.count({ where });

    return { equipment, total, page, limit };
  }

  static async getOne(id) {
    return prisma.equipment.findUnique({
      where: { id: Number(id) }
    });
  }

  static async update(id, data) {
    return prisma.equipment.update({
      where: { id: Number(id) },
      data
    });
  }

  static async delete(id) {
    return prisma.equipment.delete({
      where: { id: Number(id) }
    });
  }
}

export default EquipmentService;
