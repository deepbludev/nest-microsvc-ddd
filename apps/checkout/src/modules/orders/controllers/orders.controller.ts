import { Body, Controller, HttpStatus } from '@nestjs/common'

@Controller('orders')
export class OrdersController {
  async create(@Body() dto: unknown) {
    // const response = await this.commandbus.dispatch(CreateTransaction.with(dto))

    // if (response.isOk)
    return {
      statusCode: HttpStatus.CREATED,
      status: 'Transaction created successfully',
    }
  }
}
