import { Injectable, UnauthorizedException } from '@nestjs/common';
//import { JwtService } from '@nestjs/jwt';
import { JwtService } from '../services/jwt.service';
import { UserRepositoryInterface } from '../../domain/repositories/user.repository.interface';
import { LoginDto } from '../dtos/login.dto';
import { AuthResponseDto } from '../dtos/auth-response.dto';
//import * as bcrypt from 'bcrypt';
import { BcryptService } from '../services/bcrypt.service';

@Injectable()
export class LoginUserUseCase {
  constructor(
    private readonly userRepository: UserRepositoryInterface,
    private readonly jwtService: JwtService,
    private readonly bcryptService: BcryptService
  ) {}

  async execute(loginDto: LoginDto): Promise<AuthResponseDto> {
    const user = await this.userRepository.findByEmail(loginDto.email);
    
    if (!user || !user.isActive) {
      throw new UnauthorizedException('Invalid credentials');
    }

    //const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);
    const isPasswordValid = await this.bcryptService.compare(loginDto.password, user.password);
    
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: user.id, email: user.email, planType: user.plan };
    //const accessToken = this.jwtService.sign(payload);
    const accessToken = this.jwtService.generateAccessToken(payload);

    return {
      accessToken,
      tokenType: 'bearer',
      expiresIn: 3600,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        plan: user.plan,
      },
    };
  }
}