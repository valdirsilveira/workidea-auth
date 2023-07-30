import { Entity } from '@/core/base/entity'
import { Repository } from '@/core/base/repository'
import { FilterQuery, PaginateModel, PaginateResult } from 'mongoose'
import { Document } from 'mongoose'
import { PaginateOptionsDto, PaginateResultDto } from '@/shared/dtos/paginate'

export abstract class MongooseRepository<
  TEntity extends Entity,
  TModel extends Document
> extends Repository<TEntity> {
  protected abstract model: PaginateModel<TModel>

  async create(data: TEntity): Promise<TEntity> {
    const model = await this.model.create(data)
    return this.toEntity(model)
  }

  async update(id: number, data: TEntity): Promise<TEntity> {
    const model = await this.model.findByIdAndUpdate(id, data, { new: true }).exec()
    return this.toEntity(model)
  }

  async patch(id: number, data: Partial<TEntity>): Promise<TEntity> {
    const model = await this.model.findByIdAndUpdate(id, data, { new: true }).exec()
    return this.toEntity(model)
  }

  async getById(id: number): Promise<TEntity> {
    const model = await this.model.findById(id).exec()
    return this.toEntity(model)
  }

  async getAll(): Promise<TEntity[]> {
    const models = await this.model.paginate()
    return models.docs.map(m => this.toEntity(m))
  }

  async getAllPaginated(
    paginateOptionsDto: PaginateOptionsDto
  ): Promise<PaginateResultDto<TEntity>> {
    const paginationResult = await this.model.paginate({}, { ...paginateOptionsDto })
    return this.toPaginateResultDto(paginationResult)
  }

  async getOne(filter: Partial<TEntity>): Promise<TEntity> {
    const model = await this.model.findOne(filter as FilterQuery<TModel>).exec()
    return this.toEntity(model)
  }

  async getMany(filter: Partial<TEntity>): Promise<TEntity[]> {
    const models = await this.model.find(filter as FilterQuery<TModel>).exec()
    return models.map(m => this.toEntity(m))
  }

  async delete(id: number): Promise<void> {
    await this.model.findByIdAndDelete(id).exec()
  }

  private toPaginateResultDto(
    paginationResult: PaginateResult<TModel>
  ): PaginateResultDto<TEntity> {
    const dto: PaginateResultDto<TEntity> = {
      data: paginationResult.docs.map(item => this.toEntity(item)),
      totalItems: paginationResult.totalDocs,
      limit: paginationResult.limit,
      hasPrevPage: paginationResult.hasPrevPage,
      hasNextPage: paginationResult.hasNextPage,
      page: paginationResult.page,
      totalPages: paginationResult.totalPages,
      offset: paginationResult.offset,
      prevPage: paginationResult.prevPage,
      nextPage: paginationResult.nextPage,
      pagingCounter: paginationResult.pagingCounter,
      meta: paginationResult.meta
    }
    return dto
  }

  abstract toEntity(model: TModel): TEntity
  abstract toModel(entity: TEntity): TModel
}
