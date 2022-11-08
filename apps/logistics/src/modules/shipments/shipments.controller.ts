import { Controller } from '@nestjs/common'
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices'
import { RmqService } from '@ecommerce/shared/infrastructure'
import { CreateOrderDTO } from '@ecommerce/checkout/orders/domain'

@Controller()
export class ShipmentsController {
  constructor(private readonly rmqService: RmqService) {}

  @EventPattern('checkout.orders.order_created')
  async handleOrderCreated(
    @Payload() order: CreateOrderDTO,
    @Ctx() context: RmqContext
  ) {
    console.log('RECEIVED in logistics: ', {
      event: context.getPattern(),
      order: order.id,
    })
    this.rmqService.ack(context)
  }
}
