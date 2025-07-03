import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

class TransportService {
  static async create(data) {
    return prisma.transport.create({
      data: {
        usageFrequency: data.usageFrequency
      }
    });
  }

  static async list({ page = 1, limit = 10 }) {
    const skip = (page - 1) * limit;

    const transports = await prisma.transport.findMany({
      include: { maintenanceCosts: true },
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' }
    });

    const total = await prisma.transport.count();

    return { transports, total, page, limit };
  }

  static async getOne(id) {
    return prisma.transport.findUnique({
      where: { id: Number(id) },
      include: { maintenanceCosts: true }
    });
  }

  static async update(id, data) {
    return prisma.transport.update({
      where: { id: Number(id) },
      data
    });
  }

  static async delete(id) {
    return prisma.transport.delete({
      where: { id: Number(id) }
    });
  }

  static async calculateRentability(id) {
    const transport = await prisma.transport.findUnique({
      where: { id: Number(id) },
      include: { maintenanceCosts: true }
    });

    if (!transport) throw new Error('Transport not found');

    const totalCost = transport.maintenanceCosts.reduce((sum, mc) => {
      return sum + Number(mc.cost);
    }, 0);

    const rentability = totalCost === 0 ? null : transport.usageFrequency / totalCost;

    return {
      usageFrequency: transport.usageFrequency,
      totalCost,
      rentability
    };
  }
}

export default TransportService;
