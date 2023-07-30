import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common'
import { classToPlain, plainToClass } from 'class-transformer'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

@Injectable()
export class SnakeCaseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map(data => {
        if (data && typeof data === 'object') {
          return this.transformToSnakeCase(data)
        }
        return data
      })
    )
  }

  private transformToSnakeCase(data: any): any {
    const plainData = classToPlain(data)
    return plainToClass(data.constructor, plainData)
  }
}
