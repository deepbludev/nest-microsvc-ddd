import {
  commandHandler,
  CommandResponse,
  ICommandHandler,
  Result,
} from '@deepblu/ddd'
import { Queue } from '@ecommerce/shared/infrastructure'
import { Inject, Injectable } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { CreateOrder } from '../create-order.command'

@Injectable()
@commandHandler(CreateOrder)
export class CreateOrderHandler extends ICommandHandler<CreateOrder> {
  constructor(
    // @Inject(Queue.LOGISTICS) private readonly logisticsClient: ClientProxy
    @Inject(Queue.BILLING) private readonly billingClient: ClientProxy
  ) {
    super()
  }
  async handle({ payload }: CreateOrder): CommandResponse {
    try {
      const clients = [this.billingClient]
      clients.map(client => {
        client.emit('ecommerce.checkout.orders.order_created', payload)
      })
    } catch (error) {
      return Result.fail(error)
    }
    return Result.ok()
  }
}
