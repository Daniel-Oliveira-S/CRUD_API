export interface User {
  id: string;
  name: string;
  email: string;
}

export interface UserCreate {
  name: string;
  email: string;
}

export interface UserRespository {
  create(data: UserCreate): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
}
