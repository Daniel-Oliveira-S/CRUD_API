import { User, UserCreate, UserRespository } from "../intefaces/user.interface";
import { userRepositoryPrisma } from "../repositories/user.repository"; // Import the missing class
class UserUseCase {
  private userRepository: UserRespository;

  constructor() {
    this.userRepository = new userRepositoryPrisma();
  }

  async create({ name, email }: UserCreate): Promise<User> {
    const verifyIfUserExists = await this.userRepository.findByEmail(email);
    if (verifyIfUserExists) {
      throw new Error("User already exists");
    }
    const result = await this.userRepository.create({ email, name });

    return result;
  }
}

export { UserUseCase };
