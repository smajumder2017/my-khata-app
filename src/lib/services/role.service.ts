import prisma from "@/lib/prisma";

export class RoleService {
  private roleRepository = prisma.role;
  // Add role-related methods here in the future
  findroleByName(name: string) {
    // Implementation for finding a role by name
    return this.roleRepository.findUnique({ where: { name } });
  }
}
