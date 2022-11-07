import { Body, Controller, HttpStatus, Inject, Post } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { CreateOrderDTO } from '@ecommerce/checkout/orders/domain'
import { Queue } from '@ecommerce/shared/infrastructure'
import { firstValueFrom } from 'rxjs'

@Controller('orders')
export class OrdersController {
  constructor(
    @Inject(Queue.BILLING) private readonly billingClient: ClientProxy,
    @Inject(Queue.LOGISTICS) private readonly logisticsClient: ClientProxy
  ) {}
  @Post()
  async create(@Body() dto: CreateOrderDTO) {
    // TODO: validate dto with pipe and send command to commandbus
    // const response = await this.commandbus.dispatch(CreateTransaction.with(dto))
    // if (response.isOk) {}

    console.log(dto)
    const billingResponse = await firstValueFrom(
      this.billingClient.emit('ecommerce.checkout.orders.order_created', dto)
    )
    const logisticsResponse = await firstValueFrom(
      this.logisticsClient.emit('ecommerce.checkout.orders.order_created', dto)
    )

    console.log({ billingResponse, logisticsResponse })

    return {
      statusCode: HttpStatus.CREATED,
      status: 'Order created successfully',
      data: { id: dto.id },
    }
  }
}
