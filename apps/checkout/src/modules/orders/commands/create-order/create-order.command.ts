import { Command } from '@deepblu/ddd'
import { CreateOrderDTO } from '@ecommerce/checkout/orders/domain'

export class CreateOrder extends Command<CreateOrderDTO> {}
