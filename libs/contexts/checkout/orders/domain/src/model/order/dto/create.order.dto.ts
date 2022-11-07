import { PickType } from '@nestjs/swagger'
import { OrderDTO } from './order.dto'

export class CreateOrderDTO extends PickType(OrderDTO, [
  'id',
  'clientId',
  'date',
  'address',
  'products',
] as const) {}
