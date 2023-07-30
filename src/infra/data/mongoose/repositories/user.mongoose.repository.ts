import { Service } from 'typedi'
import { IUserDocument, UserModel } from '../models/user.model'
import { UserEntity } from '@/core/domain/entities'
import { MongooseRepository } from './mongoose.repository'
import { Model, PaginateModel } from 'mongoose'

@Service()
export class UserMongooseRepository extends MongooseRepository<UserEntity, IUserDocument> {
  protected model: PaginateModel<IUserDocument> = UserModel

  toEntity(model: IUserDocument): UserEntity {
    const userEntity = new UserEntity()
    userEntity.name = model.name
    userEntity.email = model.email
    userEntity.id = model.id
    userEntity.password = model.password
    return userEntity
  }

  toModel(entity: UserEntity): IUserDocument {
    const userModel = new Model<IUserDocument>()
    userModel.name = entity.name
    userModel.email = entity.email
    userModel.id = entity.id
    userModel.password = entity.password
    return userModel
  }
}
