import prisma from './prisma.js';

export class UrlMapRepository {
  async findById(id: number) {
    return prisma.urlMap.findUnique({ where: { id } });
  }

  async create(url: string) {
    return prisma.urlMap.create({ data: { url } });
  }
}
