import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../../domain/entities/user.entity';
import { UserRepositoryInterface } from '../../domain/repositories/user.repository.interface';
import { CreateUserDto } from '../../application/dtos/create-user.dto';

@Injectable()
export class UserRepository implements UserRepositoryInterface {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ where: { email } });
  }

  async findById(id: string): Promise<User | null> {
    return this.userModel.findByPk(id);
  }

  async create(userData: CreateUserDto): Promise<User> {
    return this.userModel.create(userData as unknown as Partial<User>);
  }

  async update(id: string, userData: Partial<User>): Promise<User> {
    await this.userModel.update(userData, { where: { id } });
    const updatedUser = await this.findById(id);
    if (!updatedUser) {
      throw new Error(`User with id ${id} not found`);
    }
    return updatedUser;
  }

  async delete(id: string): Promise<void> {
    await this.userModel.destroy({ where: { id } });
  }
}