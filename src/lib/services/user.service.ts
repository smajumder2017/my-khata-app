import prisma from "@/lib/prisma";

export class UserService {
  private userRepository = prisma.user;

  constructor() {}

  async findByEmail(email: string) {
    return this.userRepository.findUnique({ where: { email } });
  }

  async createUser(data: { email: string; password: string; roleId: string }) {
    return this.userRepository.create({ data });
  }
}
