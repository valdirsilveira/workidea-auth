import { UserRepository } from '@/core/repositories'
import { UserInMemoryRepository } from '@/infra/data/in-memory/repositories'
import { CreateUserUseCase } from './create-user.use-case'

describe('CreateUserUseCase', () => {
  let createUserUserCase: CreateUserUseCase
  let userRepository: UserRepository

  const name = 'John Doe'
  const email = 'johndoe@example.com'
  const password = '123456'

  beforeAll(async () => {
    userRepository = new UserInMemoryRepository()
    createUserUserCase = new CreateUserUseCase(userRepository)
  })

  it('should be defined', () => {
    expect(createUserUserCase).toBeDefined()
  })

  it('should create a user', async () => {
    const user = await createUserUserCase.execute({ name, email, password })
    expect({ name: user.name, email: user.email }).toEqual({ name, email })
  })

  // it('should throw an error if user already exists', async () => {
  //   await createUserUserCase.execute({ name, email, password })
  //   await expect(createUserUserCase.execute({ name, email, password })).rejects.toThrowError(
  //     'User already exists'
  //   )
  // })
})
