import { Module, OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { MongooseService } from '@/infra/data/mongoose/mongoose.service'
import { useContainer } from 'class-validator'
import { Container } from 'typedi'

@Module({
  imports: [ConfigModule.forRoot()],
  providers: [MongooseService]
})
export class MongooseModule implements OnModuleInit, OnModuleDestroy {
  constructor(
    private readonly mongooseService: MongooseService,
    private readonly configService: ConfigService
  ) {}

  async onModuleInit() {
    useContainer(Container)
    const MONGODB_ROOT_USERNAME = this.configService.get<string>('MONGODB_ROOT_USERNAME')
    const MONGODB_HOST = this.configService.get<string>('MONGODB_HOST')
    const MONGODB_ROOT_PASSWORD = this.configService.get<string>('MONGODB_ROOT_PASSWORD')
    const MONGODB_PORT = this.configService.get<string>('MONGODB_PORT')
    const MONGODB_DATABASE_NAME = this.configService.get<string>('MONGODB_DATABASE_NAME')
    const uri = `mongodb://${MONGODB_ROOT_USERNAME}:${MONGODB_ROOT_PASSWORD}@${MONGODB_HOST}:${MONGODB_PORT}/${MONGODB_DATABASE_NAME}?authSource=admin`
    console.log(uri)
    await this.mongooseService.connect(uri)
  }

  async onModuleDestroy() {
    await this.mongooseService.disconnect()
  }
}
