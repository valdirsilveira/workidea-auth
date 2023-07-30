import { Entity } from '@/core/base/entity'
import { Repository } from '@/core/base/repository'
import { PaginateOptionsDto, PaginateResultDto } from '@/shared/dtos/paginate'

export class InMemoryRepository<TEntity extends Entity> extends Repository<TEntity> {
  async getAllPaginated(options: PaginateOptionsDto): Promise<PaginateResultDto<TEntity>> {
    const result = {
      data: this.items,
      totalItems: this.items.length,
      limit: options.limit,
      hasPrevPage: false,
      hasNextPage: false,
      page: 1,
      totalPages: 1,
      offset: options.page ? options.page - 1 : 0,
      prevPage: null,
      nextPage: null,
      pagingCounter: 1
    }

    return result
  }
  protected readonly items: TEntity[]

  constructor() {
    super()
    this.items = []
  }

  async create(data: TEntity): Promise<TEntity> {
    data.id = this.items.length > 0 ? this.items.slice(-1)[0].id + 1 : 1

    const count = this.items.push(data)

    return this.items[count - 1]
  }

  async update(id: number, data: TEntity): Promise<TEntity> {
    const index = this.getIndexById(id)

    if (index === -1) {
      // TODO: handle the case of not finding the item to update
    }

    this.items[index] = data

    return this.items[index]
  }

  async patch(id: number, data: Partial<TEntity>): Promise<TEntity> {
    const index = this.getIndexById(id)

    if (index === -1) {
      // TODO: handle the case of not finding the item to update
    }

    for (const key in data) {
      this.items[index][key] = data[key]
    }

    return this.items[index]
  }

  async getById(id: number): Promise<TEntity> {
    const items = this.items.find(item => item.id === id)

    return items
  }

  async getAll(): Promise<TEntity[]> {
    return this.items
  }

  async getOne(filter: Partial<TEntity>): Promise<TEntity> {
    return this.getMany(filter).then(items => (items.length > 0 ? items[0] : null))
  }

  async getMany(filter: Partial<TEntity>): Promise<TEntity[]> {
    let filtered = this.items

    for (const key in filter) {
      filtered = filtered.filter(item => item[key] === filter[key])
    }

    return filtered
  }

  async delete(id: number): Promise<void> {
    const index = this.getIndexById(id)

    if (index === -1) {
      // TODO: handle the case of not finding the item to be deleted
    }

    this.items.splice(index, 1)
  }

  private getIndexById(id: number) {
    return this.items.findIndex(item => item.id === id)
  }
}
