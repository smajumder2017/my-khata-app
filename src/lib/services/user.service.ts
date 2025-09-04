import prisma from "@/lib/prisma";

export class UserService {
  private userRepository = prisma.user;

  constructor() {}

  async findByEmail(email: string) {
    return this.userRepository.findUnique({ where: { email }, include: {businesses: {include: {business: true}}, role: true} });
  }

  async createUser(data: { email: string; password: string; roleId: string }) {
    return this.userRepository.create({ data });
  }
}
