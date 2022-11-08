import { Body, Controller, HttpStatus, Post } from '@nestjs/common'
import { ICommandBus } from '@deepblu/ddd'
import { CreateOrderDTO } from '@ecommerce/checkout/orders/domain'
import { CreateOrder } from '../commands/create-order/create-order.command'

@Controller('orders')
export class OrdersController {
  constructor(private readonly commandbus: ICommandBus) {}

  @Post()
  async create(@Body() dto: CreateOrderDTO) {
    const response = await this.commandbus.dispatch(CreateOrder.with(dto))
    if (response.isFail)
      return {
        status: HttpStatus.BAD_REQUEST,
        message: response.error,
      }

    return {
      statusCode: HttpStatus.CREATED,
      status: 'Order created successfully',
      data: { id: dto.id },
    }
  }
}
