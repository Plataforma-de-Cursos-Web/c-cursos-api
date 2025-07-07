import { Injectable } from '@nestjs/common';
import { JwtService as NestJwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

export interface JwtPayload {
  sub: string;
  email: string;
  planType: string;
  iat?: number;
  exp?: number;
}

@Injectable()
export class JwtService {
  constructor(
    private jwtService: NestJwtService,
    private configService: ConfigService,
  ) {}

  generateAccessToken(payload: Omit<JwtPayload, 'iat' | 'exp'>): string {
    return this.jwtService.sign(payload);
  }

  generateRefreshToken(payload: Omit<JwtPayload, 'iat' | 'exp'>): string {
    return this.jwtService.sign(payload, {
      expiresIn: this.configService.get('JWT_REFRESH_EXPIRES_IN', '7d'),
    });
  }

  verifyToken(token: string): JwtPayload {
    return this.jwtService.verify(token);
  }

  decodeToken(token: string): any {
    return this.jwtService.decode(token);
  }
}