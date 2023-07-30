import { UserRepository } from '@/core/repositories'
import { UserInMemoryRepository } from '@/infra/data/in-memory/repositories'
import { CreateUserUseCase } from '../create-user-use-case'
import { GetAllUsersUseCase } from './get-all-users.use-case'

describe('GetAllUsersUseCase', () => {
  let getAllUsersUseCase: GetAllUsersUseCase
  let createUserUserCase: CreateUserUseCase
  let userRepository: UserRepository

  const name = 'John Doe'
  const email = 'johndoe@example.com'
  const password = '123456'

  beforeEach(async () => {
    userRepository = new UserInMemoryRepository()
    createUserUserCase = new CreateUserUseCase(userRepository)
    getAllUsersUseCase = new GetAllUsersUseCase(userRepository)

    await createUserUserCase.execute({ name, email, password })
  })

  it('should be defined', () => {
    expect(getAllUsersUseCase).toBeDefined()
  })

  it('should get all users', async () => {
    const users = await getAllUsersUseCase.execute()
    expect(users.docs).toEqual([{ id: 1, name, email }])
  })
})
