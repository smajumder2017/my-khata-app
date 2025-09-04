import bcrypt from "bcryptjs";
import { UserService, RoleService } from ".";
import {
  ConflictError,
  InternalServerError,
  UnauthorizedError,
} from "@/lib/response";

export class AuthService {
  private userService: UserService = new UserService();
  private roleService: RoleService = new RoleService();

  async register(email: string, password: string) {
    const existingUser = await this.userService.findByEmail(email);
    if (existingUser) {
      throw new ConflictError("User already exist");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const ownerRole = await this.roleService.findroleByName("Owner");
    if (!ownerRole) {
      throw new InternalServerError(
        "Owner role not found. Please create it first."
      );
    }

    const user = await this.userService.createUser({
      email,
      password: hashedPassword,
      roleId: ownerRole.id, // You can set a default roleId if needed
    });
    return { id: user.id, email: user.email };
  }

  async login(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedError("User not found");
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new UnauthorizedError("Invalid credentials");
    }
    return user;
  }
}
