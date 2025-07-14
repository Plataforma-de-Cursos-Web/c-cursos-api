import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './infrastructure/controllers/auth.controller';
import { CoursesController } from './infrastructure/controllers/courses.controller';
import { HealthController } from './infrastructure/controllers/health.controller';
import { JwtStrategy } from './common/strategies/jwt.strategy';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'AUTH_SERVICE',
        transport: Transport.NATS,
        options: {
          servers: [process.env.NATS_URL || 'nats://nats:4222'],
        },
      },
      {
        name: 'COURSES_SERVICE',
        transport: Transport.NATS,
        options: {
          servers: [process.env.NATS_URL || 'nats://nats:4222'],
        },
      },
    ]),
    PassportModule,
  ],
  controllers: [AuthController, CoursesController, HealthController],
  providers: [JwtStrategy],
})
export class AppModule {}