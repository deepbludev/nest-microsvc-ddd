import { string, z } from 'zod'

export const OrderSchema = z.object({
  id: string().uuid({ message: 'Order ID must be a valid UUID' }),
  clientId: z
    .number()
    .positive({ message: 'Client ID must be a valid number id' }),
  date: z.date(),
  address: z.string().min(1, { message: 'Address must be a non-empty string' }),
  products: z.array(
    z.object({
      id: z.string().uuid({ message: 'Product ID must be a valid UUID' }),
      quantity: z
        .number()
        .positive({ message: 'Quantity must be a positive number' }),
      cost: z.number().positive({ message: 'Cost must be a positive number' }),
    })
  ),
})

export type OrderDTO = z.infer<typeof OrderSchema>
