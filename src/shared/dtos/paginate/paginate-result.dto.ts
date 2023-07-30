export class PaginateResultDto<T> {
  data: T[]
  totalItems: number
  limit: number
  hasPrevPage: boolean
  hasNextPage: boolean
  page?: number | undefined
  totalPages: number
  offset: number
  prevPage?: number | null | undefined
  nextPage?: number | null | undefined
  pagingCounter: number
  meta?: any;
  [customLabel: string]: T[] | number | boolean | null | undefined
}
