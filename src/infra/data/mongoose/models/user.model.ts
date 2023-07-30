import * as paginate from 'mongoose-paginate-v2'
import { Schema, Document, model, PaginateModel } from 'mongoose'

export interface IUserDocument extends Document {
  name: string
  email: string
  password: string
}

const UserSchema = new Schema<IUserDocument>({
  name: String,
  email: String,
  password: String
})

UserSchema.plugin(paginate)

// export const UserModel = model<IUserDocument>('User', UserSchema)

export const UserModel = model<IUserDocument, PaginateModel<IUserDocument>>(
  'Users',
  UserSchema,
  'users'
)
