import { Controller, Post, Body, Get, UseGuards, Req } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AuthService } from '../../application/services/auth.service';
import { CreateUserDto } from '../../application/dtos/create-user.dto';
import { LoginDto } from '../../application/dtos/login.dto';
import { AuthResponseDto } from '../../application/dtos/auth-response.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({ status: 201, description: 'User registered successfully' })
  @ApiResponse({ status: 409, description: 'Email already exists' })
  async register(@Body() createUserDto: CreateUserDto) {
    const user = await this.authService.register(createUserDto);
    const { password, ...result } = user.toJSON();
    return result;
  }

  @Post('login')
  @ApiOperation({ summary: 'Login user' })
  @ApiResponse({ status: 200, description: 'Login successful', type: AuthResponseDto })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  async login(@Body() loginDto: LoginDto): Promise<AuthResponseDto> {
    return this.authService.login(loginDto);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get user profile' })
  @ApiResponse({ status: 200, description: 'User profile retrieved successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getProfile(@Req() req) {
    const { password, ...result } = req.user.toJSON();
    return result;
  }

  @MessagePattern({ cmd: 'auth.register' })
  async handleRegister(@Payload() createUserDto: CreateUserDto) {
    try {
      const user = await this.authService.register(createUserDto);
      const { password, ...result } = user.toJSON();
      return { success: true, data: result };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  @MessagePattern({ cmd: 'auth.login' })
  async handleLogin(@Payload() loginDto: LoginDto) {
    try {
      const result = await this.authService.login(loginDto);
      return { success: true, data: result };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  @MessagePattern({ cmd: 'auth.validate' })
  async handleValidate(@Payload() { userId }: { userId: string }) {
    try {
      const user = await this.authService.validateUser(userId);
      if (!user) {
        return { success: false, error: 'User not found' };
      }
      const { password, ...result } = user.toJSON();
      return { success: true, data: result };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}