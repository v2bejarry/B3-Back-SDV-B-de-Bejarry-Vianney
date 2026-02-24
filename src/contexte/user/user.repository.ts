import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserCredentialsEntity } from './user.credentials.entity';
import { IUserRepository } from './user.repository.interface';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(UserCredentialsEntity)
    private readonly userRepository: Repository<UserCredentialsEntity>,
  ) {}

  async findUserByEmail(
    email: string,
  ): Promise<UserCredentialsEntity | null> {
    const entity = await this.userRepository.findOne({
      where: { email },
    });

    return entity;
  }

  async createUser(user: UserCredentialsEntity): Promise<UserCredentialsEntity> {
    const newUser = this.userRepository.create(user);
    return this.userRepository.save(newUser);
  }

  async updatePassword(email: string, newPasswordHash: string): Promise<UserCredentialsEntity | null> {
    await this.userRepository.update({ email }, { passwordHash: newPasswordHash });
    return this.findUserByEmail(email);
  }

  async deleteUser(email: string): Promise<boolean> {
    const result = await this.userRepository.delete({ email });
    return result.affected ? result.affected > 0 : false;
  }

  async findAll(): Promise<UserCredentialsEntity[]> {
    return this.userRepository.find();
  }
}
