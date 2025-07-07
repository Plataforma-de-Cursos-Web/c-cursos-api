import { Injectable } from '@nestjs/common';
import { UserRepositoryInterface } from '../../domain/repositories/user.repository.interface';
import { User } from '../../domain/entities/user.entity';

@Injectable()
export class ValidateUserUseCase {
  constructor(private readonly userRepository: UserRepositoryInterface) {}

  async execute(userId: string): Promise<User | null> {
    const user = await this.userRepository.findById(userId);
    
    if (!user || !user.isActive) {
      return null;
    }

    return user;
  }
}