import { Injectable, ConflictException } from '@nestjs/common';
import { UserRepositoryInterface } from '../../domain/repositories/user.repository.interface';
import { CreateUserDto } from '../dtos/create-user.dto';
import { User } from '../../domain/entities/user.entity';
//import * as bcrypt from 'bcrypt';
import { BcryptService } from '../services/bcrypt.service';

@Injectable()
export class RegisterUserUseCase {
  constructor(
    private readonly userRepository: UserRepositoryInterface,
    private readonly bcryptService: BcryptService,
  ) {}

  async execute(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.userRepository.findByEmail(createUserDto.email);
    
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    const hashedPassword = await this.bcryptService.hash(createUserDto.password);
    if (!hashedPassword) {
      throw new ConflictException('Error hashing password');
    }
    
    const userData = {
      ...createUserDto,
      password: hashedPassword,
    };

    return this.userRepository.create(userData);
  }
}