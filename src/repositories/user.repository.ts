import { UserRespository, User, UserCreate } from "../intefaces/user.interface";
import { prisma } from "../database/prisma-client";
class userRepositoryPrisma implements UserRespository {
  async create(data: UserCreate): Promise<User> {
    const result = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
      },
    });
    return result;
  }

  async findByEmail(email: string): Promise<User | null> {
    const result = await prisma.user.findFirst({
      where: {
        email,
      },
    });
    return result || null;
  }
}

export { userRepositoryPrisma };
