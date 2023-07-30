import { UserMongooseRepository } from '@/infra/data/mongoose/repositories'
import { MongooseService } from '@/infra/data/mongoose/mongoose.service'
import { MongoMemoryServer } from 'mongodb-memory-server'

describe('UserMongooseRepository', () => {
  let userMongooseRepository: UserMongooseRepository
  let mongodb: MongoMemoryServer
  let mongooseService: MongooseService

  const name = 'John Doe'
  const email = 'johndoe@example.com'
  const password = '123456'

  beforeAll(async () => {
    userMongooseRepository = new UserMongooseRepository()
    mongooseService = new MongooseService()
    mongodb = await MongoMemoryServer.create()
    const uri = mongodb.getUri()
    mongooseService.connect(uri)
  })

  afterAll(async () => {
    mongooseService.disconnect()
    await mongodb.stop()
  })

  it('should be defined', () => {
    expect(userMongooseRepository).toBeDefined()
  })

  it('should create a user', async () => {
    const user = await userMongooseRepository.create({ name, email, password })
    expect({ name: user.name, email: user.email }).toEqual({ name, email })
  })
})
