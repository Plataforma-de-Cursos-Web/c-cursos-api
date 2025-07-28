import { 
  Controller, 
  Post, 
  Body, 
  Get, 
  Param, 
  Put, 
  Delete, 
  UseGuards, 
  Req, 
  HttpException, 
  HttpStatus,
  Query,
  ParseIntPipe
} from '@nestjs/common';
import { 
  ApiTags, 
  ApiOperation, 
  ApiResponse, 
  ApiBearerAuth, 
  ApiParam, 
  ApiQuery,
  ApiBody 
} from '@nestjs/swagger';
import { ClientProxy } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CreateCourseDto } from '../../application/dtos/create-course.dto';
import { UpdateCourseDto } from '../../application/dtos/update-course.dto';
import { CreateModuleDto } from '../../application/dtos/create-module.dto';
import { CreateMaterialDto } from '../../application/dtos/create-material.dto';
import { CreateModuleRequestDto } from '../../application/dtos/create-module-request.dto';
import { CreateMaterialRequestDto } from '../../application/dtos/create-material-request.dto';
import { 
  CourseResponseDto, 
  CourseListResponseDto, 
  ModuleResponseDto, 
  MaterialResponseDto 
} from '../../application/dtos/courses-response.dto';
import { DeleteModuleRequestDto } from '../../application/dtos/delete-module-request.dto';

@ApiTags('Courses')
@Controller('courses')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class CoursesController {
  constructor(
    @Inject('COURSES_SERVICE') private readonly coursesService: ClientProxy,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Criar um novo curso' })
  @ApiResponse({ status: 201, description: 'Curso criado com sucesso', type: CourseResponseDto })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  async createCourse(@Body() createCourseDto: CreateCourseDto, @Req() req): Promise<CourseResponseDto> {
    try {
      const result = await firstValueFrom(
        this.coursesService.send(
          { cmd: 'courses.create' }, 
          { ...createCourseDto, instructorId: req.user.id }
        )
      );
      
      if (!result.success) {
        throw new HttpException(result.error, HttpStatus.BAD_REQUEST);
      }
      
      return result.data;
    } catch (error) {
      throw new HttpException(
        error.message || 'Falha ao criar curso',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get()
  @ApiOperation({ summary: 'Listar cursos com paginação' })
  @ApiQuery({ name: 'page', required: false, example: 1, description: 'Número da página' })
  @ApiQuery({ name: 'limit', required: false, example: 10, description: 'Itens por página' })
  @ApiResponse({ status: 200, description: 'Lista de cursos', type: CourseListResponseDto })
  async listCourses(
    @Query('page', new ParseIntPipe({ optional: true })) page: number = 1,
    @Query('limit', new ParseIntPipe({ optional: true })) limit: number = 10
  ): Promise<CourseListResponseDto> {
    try {
      const result = await firstValueFrom(
        this.coursesService.send({ cmd: 'courses.list' }, { page, limit })
      );
      
      if (!result.success) {
        throw new HttpException(result.error, HttpStatus.BAD_REQUEST);
      }
      
      return result.data;
    } catch (error) {
      throw new HttpException(
        error.message || 'Falha ao listar cursos',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get('my-courses')
  @ApiOperation({ summary: 'Listar meus cursos como instrutor' })
  @ApiResponse({ status: 200, description: 'Lista dos meus cursos', type: [CourseResponseDto] })
  async listMyCourses(@Req() req): Promise<CourseResponseDto[]> {
    try {
      const result = await firstValueFrom(
        this.coursesService.send(
          { cmd: 'courses.list-by-instructor' }, 
          { instructorId: req.user.id }
        )
      );
      
      if (!result.success) {
        throw new HttpException(result.error, HttpStatus.BAD_REQUEST);
      }
      
      return result.data;
    } catch (error) {
      throw new HttpException(
        error.message || 'Falha ao listar seus cursos',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar curso por ID' })
  @ApiParam({ name: 'id', description: 'ID do curso' })
  @ApiResponse({ status: 200, description: 'Curso encontrado', type: CourseResponseDto })
  @ApiResponse({ status: 404, description: 'Curso não encontrado' })
  async getCourse(@Param('id') id: string): Promise<CourseResponseDto> {
    try {
      const result = await firstValueFrom(
        this.coursesService.send({ cmd: 'courses.get' }, { id })
      );
      
      if (!result.success) {
        throw new HttpException(result.error, HttpStatus.NOT_FOUND);
      }
      
      return result.data;
    } catch (error) {
      throw new HttpException(
        error.message || 'Curso não encontrado',
        error.status || HttpStatus.NOT_FOUND
      );
    }
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar curso' })
  @ApiParam({ name: 'id', description: 'ID do curso' })
  @ApiBody({
    type: UpdateCourseDto,
    description: 'Dados do curso a serem atualizados',
    examples: {
      example1: {
        summary: 'Exemplo de atualização de curso',
        value: {
          title: 'Curso Avançado de Node.js',
          description: 'Curso atualizado com novos conteúdos e módulos',
          status: 'published'
        }
      }
    }
  })
  @ApiResponse({ status: 200, description: 'Curso atualizado com sucesso', type: CourseResponseDto })
  @ApiResponse({ status: 404, description: 'Curso não encontrado' })
  @ApiResponse({ status: 403, description: 'Sem permissão para editar este curso' })
  async updateCourse(
    @Param('id') id: string, 
    @Body() updateCourseDto: Omit<UpdateCourseDto, 'id'>,
    @Req() req
  ): Promise<CourseResponseDto> {
    try {
      const result = await firstValueFrom(
        this.coursesService.send(
          { cmd: 'courses.update' }, 
          { ...updateCourseDto, id, instructorId: req.user.id }
        )
      );
      
      if (!result.success) {
        throw new HttpException(result.error, HttpStatus.BAD_REQUEST);
      }
      
      return result.data;
    } catch (error) {
      throw new HttpException(
        error.message || 'Falha ao atualizar curso',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletar curso' })
  @ApiParam({ name: 'id', description: 'ID do curso' })
  @ApiResponse({ status: 204, description: 'Curso deletado com sucesso' })
  @ApiResponse({ status: 404, description: 'Curso não encontrado' })
  @ApiResponse({ status: 403, description: 'Sem permissão para deletar este curso' })
  async deleteCourse(@Param('id') id: string, @Req() req): Promise<void> {
    try {
      const result = await firstValueFrom(
        this.coursesService.send(
          { cmd: 'courses.delete' }, 
          { id, instructorId: req.user.id }
        )
      );
      
      if (!result.success) {
        throw new HttpException(result.error, HttpStatus.BAD_REQUEST);
      }
    } catch (error) {
      throw new HttpException(
        error.message || 'Falha ao deletar curso',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Post(':courseId/modules')
  @ApiOperation({ summary: 'Adicionar módulo ao curso' })
  @ApiParam({ name: 'courseId', description: 'ID do curso' })
  @ApiBody({ 
    type: CreateModuleRequestDto,
    description: 'Dados do módulo a ser criado',
    examples: {
      example1: {
        summary: 'Exemplo de módulo',
        value: {
          title: 'Introdução ao Node.js',
          description: 'Neste módulo você aprenderá os conceitos básicos do Node.js',
          order: 1
        }
      }
    }
  })
  @ApiResponse({ status: 201, description: 'Módulo criado com sucesso', type: ModuleResponseDto })
  @ApiResponse({ status: 404, description: 'Curso não encontrado' })
  @ApiResponse({ status: 403, description: 'Sem permissão para adicionar módulo a este curso' })
  async addModule(
    @Param('courseId') courseId: string,
    @Body() createModuleDto: CreateModuleRequestDto,
    @Req() req
  ): Promise<ModuleResponseDto> {
    try {
      const result = await firstValueFrom(
        this.coursesService.send(
          { cmd: 'courses.add-module' }, 
          { 
            title: createModuleDto.title,
            description: createModuleDto.description,
            order: createModuleDto.order,
            courseId, 
            instructorId: req.user.id 
          }
        )
      );
      
      if (!result.success) {
        throw new HttpException(result.error, HttpStatus.BAD_REQUEST);
      }
      
      return result.data;
    } catch (error) {
      throw new HttpException(
        error.message || 'Falha ao adicionar módulo',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Delete(':courseId/modules/:moduleId')
  @ApiOperation({ summary: 'Deleta um módulo de um curso' })
  @ApiParam({
    name: 'courseId',
    description: 'ID do curso que contém o módulo',
    example: 'uuid-do-curso',
  })
  @ApiParam({
    name: 'moduleId',
    description: 'ID do módulo a ser deletado',
    example: 'uuid-do-modulo',
  })
  @ApiResponse({ status: 204, description: 'Módulo deletado com sucesso' })
  @ApiResponse({ status: 404, description: 'Curso ou módulo não encontrado' })
  @ApiResponse({ status: 403, description: 'Sem permissão para deletar este módulo' })
  async deleteModule(
    @Param() params: DeleteModuleRequestDto,
    @Req() req,
  ): Promise<void> {
    try {
      const result = await firstValueFrom(
        this.coursesService.send(
          { cmd: 'courses.delete-module' },
          {
            courseId: params.courseId,
            moduleId: params.moduleId,
            instructorId: req.user.id,
          },
        ),
      );

      if (!result.success) {
        throw new HttpException(
          result.error,
          result.error === 'NotFound' ? HttpStatus.NOT_FOUND : HttpStatus.BAD_REQUEST,
        );
      }
    } catch (err) {
      throw new HttpException(
        err.message || 'Falha ao deletar módulo',
        err.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post(':courseId/modules/:moduleId/materials')
  @ApiOperation({ summary: 'Adicionar material ao módulo' })
  @ApiParam({ name: 'courseId', description: 'ID do curso' })
  @ApiParam({ name: 'moduleId', description: 'ID do módulo' })
  @ApiBody({ 
    type: CreateMaterialRequestDto,
    description: 'Dados do material a ser criado',
    examples: {
      example1: {
        summary: 'Exemplo de vídeo',
        value: {
          title: 'Instalação do Node.js',
          description: 'Aprenda como instalar o Node.js em diferentes sistemas operacionais',
          type: 'video',
          url: 'https://example.com/video.mp4',
          duration: 300,
          fileSize: 5242880,
          order: 1
        }
      },
      example2: {
        summary: 'Exemplo de PDF',
        value: {
          title: 'Guia de Instalação',
          description: 'Guia completo em PDF',
          type: 'pdf',
          url: 'https://example.com/guide.pdf',
          fileSize: 2048000,
          order: 2
        }
      }
    }
  })
  @ApiResponse({ status: 201, description: 'Material criado com sucesso', type: MaterialResponseDto })
  @ApiResponse({ status: 404, description: 'Módulo não encontrado' })
  @ApiResponse({ status: 403, description: 'Sem permissão para adicionar material a este módulo' })
  async addMaterial(
    @Param('courseId') courseId: string,
    @Param('moduleId') moduleId: string,
    @Body() createMaterialDto: CreateMaterialRequestDto,
    @Req() req
  ): Promise<MaterialResponseDto> {
    try {
      const result = await firstValueFrom(
        this.coursesService.send(
          { cmd: 'courses.add-material' }, 
          { 
            title: createMaterialDto.title,
            description: createMaterialDto.description,
            type: createMaterialDto.type,
            url: createMaterialDto.url,
            duration: createMaterialDto.duration,
            fileSize: createMaterialDto.fileSize,
            order: createMaterialDto.order,
            moduleId, 
            instructorId: req.user.id 
          }
        )
      );
      
      if (!result.success) {
        throw new HttpException(result.error, HttpStatus.BAD_REQUEST);
      }
      
      return result.data;
    } catch (error) {
      throw new HttpException(
        error.message || 'Falha ao adicionar material',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}