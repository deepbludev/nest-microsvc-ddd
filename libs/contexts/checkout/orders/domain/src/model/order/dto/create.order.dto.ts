import { z } from 'zod'
import { OrderSchema } from './order.dto'

export const CreateOrderSchema = OrderSchema.pick({
  id: true,
  clientId: true,
  date: true,
  address: true,
  products: true,
})

export type CreateOrderDTO = z.infer<typeof OrderSchema>
