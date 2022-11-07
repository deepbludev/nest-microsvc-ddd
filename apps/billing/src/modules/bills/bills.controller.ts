import { Controller } from '@nestjs/common'
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices'
import { RmqService } from '@ecommerce/shared/infrastructure'
import { CreateOrderDTO } from '@ecommerce/checkout/orders/domain'

@Controller()
export class BillsController {
  constructor(private readonly rmqService: RmqService) {}

  @EventPattern('ecommerce.checkout.orders.order_created')
  async handleOrderCreated(
    @Payload() order: CreateOrderDTO,
    @Ctx() context: RmqContext
  ) {
    console.log('RECEIVED: ', { event: context.getPattern(), payload: order })
    this.rmqService.ack(context)
  }
}
