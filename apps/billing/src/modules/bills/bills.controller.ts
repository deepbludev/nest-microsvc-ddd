import { Controller } from '@nestjs/common'
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices'
import { RmqService } from '@ecommerce/shared/infrastructure'
import { CreateOrderDTO } from '@ecommerce/checkout/orders/domain'

let counter = 0
@Controller()
export class BillsController {
  constructor(private readonly rmqService: RmqService) {}

  @EventPattern('ecommerce.checkout.orders.order_created')
  async handleOrderCreated(
    @Payload() order: CreateOrderDTO,
    @Ctx() context: RmqContext
  ) {
    counter++
    console.log('RECEIVED in billing: ', {
      event: context.getPattern(),
      counter,
    })
    this.rmqService.ack(context)
  }
}
