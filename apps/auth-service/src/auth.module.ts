import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './domain/entities/user.entity';
import { UserRepository } from './domain/repositories/user.repository';
import { AuthController } from './infrastructure/controllers/auth.controller';
import { AuthService } from './application/services/auth.service';
import { RegisterUserUseCase } from './application/usecases/register-user.usecase';
import { LoginUserUseCase } from './application/usecases/login-user.usecase';
import { ValidateUserUseCase } from './application/usecases/validate-user.usecase';
import { JwtStrategy } from './infrastructure/strategies/jwt.strategy';
import { BcryptService } from './application/services/bcrypt.service';
import { JwtService } from './application/services/jwt.service';

@Module({
  imports: [
    SequelizeModule.forFeature([User]),
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'your-secret-key',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    BcryptService,
    JwtService,
    JwtStrategy,
    {
      provide: 'UserRepositoryInterface',
      useClass: UserRepository,
    },
    {
      provide: RegisterUserUseCase,
      useFactory: (userRepository, bcryptService) => new RegisterUserUseCase(userRepository, bcryptService),
      inject: ['UserRepositoryInterface', BcryptService],
    },
    {
      provide: LoginUserUseCase,
      useFactory: (userRepository, jwtService, bcryptService) => new LoginUserUseCase(userRepository, jwtService, bcryptService),
      inject: ['UserRepositoryInterface', JwtService, BcryptService],
    },
    {
      provide: ValidateUserUseCase,
      useFactory: (userRepository) => new ValidateUserUseCase(userRepository),
      inject: ['UserRepositoryInterface'],
    },
  ],
  exports: [AuthService],
})
export class AuthModule {}