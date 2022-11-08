import { Inject, Injectable } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import {
  commandHandler,
  CommandResponse,
  ICommandHandler,
  Result,
} from '@deepblu/ddd'
import { Queue } from '@ecommerce/shared/infrastructure'
import { CreateOrder } from './create-order.command'

@Injectable()
@commandHandler(CreateOrder)
export class CreateOrderHandler extends ICommandHandler<CreateOrder> {
  constructor(
    @Inject(Queue.BILLING) readonly billing: ClientProxy,
    @Inject(Queue.LOGISTICS) readonly logistics: ClientProxy
  ) {
    super()
  }
  async handle({ payload }: CreateOrder): CommandResponse {
    const event = 'checkout.orders.order_created'
    const clients = [this.billing, this.logistics]

    console.log('Emitting from checkout: ', event)
    try {
      clients.map(client => client.emit(event, payload))
    } catch (error) {
      return Result.fail(error)
    }

    return Result.ok()
  }
}
