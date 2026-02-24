import { Inject, Injectable } from '@nestjs/common';
import { USER_REPOSITORY } from './user.repository.interface';
import type { IUserRepository } from './user.repository.interface';
import { UserCredentialsEntity } from './user.credentials.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { hashPassword } from '../auth/jwt.util';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepo: IUserRepository,
  ) {}

  async findUserByEmail(email: string): Promise<UserCredentialsEntity | null> {
    return this.userRepo.findUserByEmail(email);
  }

  async createUser(user: CreateUserDto): Promise<UserCredentialsEntity> {
    // Hasher le password via le util JWT (utilise bcrypt en interne)
    const hashed = await hashPassword(user.password);

    const newUser = new UserCredentialsEntity();
    newUser.email = user.email;
    newUser.passwordHash = hashed;

    return this.userRepo.createUser(newUser);
  }

  async updatePassword(email: string, newPassword: string): Promise<UserCredentialsEntity | null> {
    // Hasher le nouveau password via le util JWT
    const hashedPassword = await hashPassword(newPassword);
    
    return this.userRepo.updatePassword(email, hashedPassword);
  }

  async deleteUser(email: string): Promise<boolean> {
    return this.userRepo.deleteUser(email);
  }

  async getAllUsers(): Promise<UserCredentialsEntity[]> {
    return this.userRepo.findAll();
  }
}
