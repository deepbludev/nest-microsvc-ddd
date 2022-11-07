import { Inject, Injectable } from '@nestjs/common'
import { InMemoryQueryBus, IQueryHandler } from '@deepblu/ddd'
import { QUERY_HANDLERS } from './cqrs.module'

@Injectable()
export class QueryBus extends InMemoryQueryBus {
  constructor(
    @Inject(QUERY_HANDLERS)
    private readonly queryHandlers: IQueryHandler[]
  ) {
    super()
    this.register(this.queryHandlers)
  }
}
