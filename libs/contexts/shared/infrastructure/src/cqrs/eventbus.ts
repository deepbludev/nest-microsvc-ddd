import { Inject, Injectable } from '@nestjs/common'
import { IEventSubscriber, InMemoryAsyncEventBus } from '@deepblu/ddd'
import { EVENT_SUBSCRIBERS } from './cqrs.module'

@Injectable()
export class EventBus extends InMemoryAsyncEventBus {
  constructor(
    @Inject(EVENT_SUBSCRIBERS)
    private readonly eventSubscribers: IEventSubscriber[]
  ) {
    super()
    this.register(this.eventSubscribers)
  }
}
