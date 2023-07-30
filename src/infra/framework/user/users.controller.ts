import { Body, Controller, Get, Post, Query, UseInterceptors } from '@nestjs/common'
import { CreateUserDto } from '@/shared/dtos/user'
import { CreateUserUseCase, GetAllUsersUseCase } from '@/use-cases/user'
import { PaginateOptionsDto } from '@/shared/dtos/paginate'
import { SnakeCaseInterceptor } from '../interceptors'

@UseInterceptors(SnakeCaseInterceptor)
@Controller('users')
export class UsersController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly getAllUsersUseCase: GetAllUsersUseCase
  ) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.createUserUseCase.execute(createUserDto)
  }

  @Get()
  findAll(@Query() paginateOptionsDto?: PaginateOptionsDto) {
    return this.getAllUsersUseCase.execute(paginateOptionsDto)
  }
}
