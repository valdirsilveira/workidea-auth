import { Test, TestingModule } from '@nestjs/testing'
import { UserRepository } from '@/core/repositories'
import { UserInMemoryRepository } from '@/infra/data/in-memory/repositories'
import { CreateUserUseCase, GetAllUsersUseCase } from '@/use-cases/user'
import { UsersController } from './users.controller'

describe('UsersController', () => {
  let userController: UsersController

  const name = 'John Doe'
  const email = 'johndoe@example.com'
  const password = '123456'

  beforeEach(async () => {
    const userModule: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UserRepository,
          useClass: UserInMemoryRepository
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
    }).compile()

    userController = userModule.get<UsersController>(UsersController)
  })

  it('should be defined', () => {
    expect(userController).toBeDefined()
  })

  it('should create a user', async () => {
    const user = await userController.create({ name, email, password })
    expect(user).toEqual({ id: 1, name, email })
  })

  it('should get all users', async () => {
    await userController.create({ name, email, password })
    const users = await userController.findAll()
    expect(users).toEqual([{ id: 1, name, email }])
  })
})
