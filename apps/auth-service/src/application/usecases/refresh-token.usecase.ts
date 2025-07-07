import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../domain/repositories/user.repository';
import { User } from '../../domain/entities/user.entity';
import { InvalidTokenException } from '@c-cursos-api/exceptions/invalid-token.exception';
import { JwtService } from '../services/jwt.service';

@Injectable()
export class RefreshTokenUseCase {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async execute(refreshToken: string): Promise<User> {
    try {
      const payload = this.jwtService.verifyToken(refreshToken);
      const user = await this.userRepository.findById(payload.sub);
      
      if (!user || !user.isActive) {
        throw new InvalidTokenException();
      }

      return new User({ ...user });
    } catch (error) {
      throw new InvalidTokenException();
    }
  }
}