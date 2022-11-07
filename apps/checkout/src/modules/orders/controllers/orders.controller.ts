import { Body, Controller, HttpStatus, Post } from '@nestjs/common'
import { CreateOrderDTO } from '@ecommerce/checkout/orders/domain'

@Controller('orders')
export class OrdersController {
  @Post()
  async create(@Body() dto: CreateOrderDTO) {
    // TODO: validate dto with pipe
    // TODO: send command to commandbus

    // const response = await this.commandbus.dispatch(CreateTransaction.with(dto))

    // if (response.isOk)
    console.log(dto)
    return {
      statusCode: HttpStatus.CREATED,
      status: 'Order created successfully',
      data: { id: dto.id },
    }
  }
}
