import {
  commandHandler,
  CommandResponse,
  ICommandHandler,
  Result,
} from '@deepblu/ddd'
import { Queue } from '@ecommerce/shared/infrastructure'
import { Inject, Injectable } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { CreateOrder } from './create-order.command'

@Injectable()
@commandHandler(CreateOrder)
export class CreateOrderHandler extends ICommandHandler<CreateOrder> {
  constructor(
    // @Inject(Queue.LOGISTICS) private readonly logisticsClient: ClientProxy
    @Inject(Queue.CHECKOUT) private readonly checkoutClient: ClientProxy
  ) {
    super()
  }
  async handle({ payload }: CreateOrder): CommandResponse {
    try {
      this.checkoutClient.emit(
        'ecommerce.checkout.orders.order_created',
        payload
      )
    } catch (error) {
      return Result.fail(error)
    }
    return Result.ok()
  }
}
