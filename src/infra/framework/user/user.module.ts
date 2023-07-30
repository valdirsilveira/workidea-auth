import { Module } from '@nestjs/common'
import { UserRepository } from '@/core/repositories'
import { CreateUserUseCase, GetAllUsersUseCase } from '@/use-cases/user'
import { UsersController } from './users.controller'
import { MongooseModule } from '../mongoose.module'
import { UserMongooseRepository } from '@/infra/data/mongoose/repositories'

@Module({
  imports: [MongooseModule],
  controllers: [UsersController],
  providers: [
    {
      provide: UserRepository,
      useFactory: () => new UserMongooseRepository()
    },
    {
      provide: CreateUserUseCase,
      useFactory: (repository: UserRepository) => new CreateUserUseCase(repository),
      inject: [UserRepository]
    },
    {
      provide: GetAllUsersUseCase,
      useFactory: (repository: UserRepository) => new GetAllUsersUseCase(repository),
      inject: [UserRepository]
    }
  ]
})
export class UserModule {}
