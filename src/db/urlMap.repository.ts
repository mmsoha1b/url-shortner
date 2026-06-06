import prisma from "./prisma.js";

export class UrlMapRepository {
  async findById(id: number) {
    return prisma.urlMap.findUnique({ where: { id } });
  }

  async findAll() {
    return prisma.urlMap.findMany();
  }

  async create(url: string) {
    return prisma.urlMap.create({ data: { url } });
  }

  async update(id: number, url: string) {
    return prisma.urlMap.update({ where: { id }, data: { url } });
  }

  async delete(id: number) {
    return prisma.urlMap.delete({ where: { id } });
  }
}
