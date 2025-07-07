import { Injectable } from '@nestjs/common';
import { RegisterUserUseCase } from '../usecases/register-user.usecase';
import { LoginUserUseCase } from '../usecases/login-user.usecase';
import { ValidateUserUseCase } from '../usecases/validate-user.usecase';
import { CreateUserDto } from '../dtos/create-user.dto';
import { LoginDto } from '../dtos/login.dto';
import { AuthResponseDto } from '../dtos/auth-response.dto';
import { User } from '../../domain/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly registerUserUseCase: RegisterUserUseCase,
    private readonly loginUserUseCase: LoginUserUseCase,
    private readonly validateUserUseCase: ValidateUserUseCase,
  ) {}

  async register(createUserDto: CreateUserDto): Promise<User> {
    return this.registerUserUseCase.execute(createUserDto);
  }

  async login(loginDto: LoginDto): Promise<AuthResponseDto> {
    return this.loginUserUseCase.execute(loginDto);
  }

  async validateUser(userId: string): Promise<User | null> {
    return this.validateUserUseCase.execute(userId);
  }
}