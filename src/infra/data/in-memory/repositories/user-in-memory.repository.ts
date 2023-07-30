import { UserEntity } from '@/core/domain/entities'
import { UserRepository } from '@/core/repositories'

import { InMemoryRepository } from './in-memory.repository'
import { PaginateResultDto } from '@/shared/dtos/paginate'

export class UserInMemoryRepository
  extends InMemoryRepository<UserEntity>
  implements UserRepository
{
  getAllPaginated(): Promise<PaginateResultDto<UserEntity>> {
    throw new Error('Method not implemented.')
  }
}
