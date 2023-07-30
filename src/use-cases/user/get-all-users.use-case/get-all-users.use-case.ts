import { UseCase } from '@/core/base/use-case'
import { CreatedUserMapper } from '@/core/domain/mappers'
import { UserRepository } from '@/core/repositories'
import { PaginateOptionsDto, PaginateResultDto } from '@/shared/dtos/paginate'
import { CreatedUserDto } from '@/shared/dtos/user'

export class GetAllUsersUseCase implements UseCase<PaginateResultDto<CreatedUserDto>> {
  private createdUserMapper: CreatedUserMapper

  constructor(private readonly repository: UserRepository) {
    this.createdUserMapper = new CreatedUserMapper()
  }

  public async execute(
    paginateOptionsDto: PaginateOptionsDto
  ): Promise<PaginateResultDto<CreatedUserDto>> {
    const pagination = await this.repository.getAllPaginated(paginateOptionsDto)
    const users = pagination.data.map(d => this.createdUserMapper.mapTo(d))
    return { ...pagination, data: users }
  }
}
