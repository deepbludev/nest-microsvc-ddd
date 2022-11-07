import { CreateOrderDTO } from '../model/order/dto/create.order.dto'

export const createOrderStub = (
  props?: Partial<CreateOrderDTO>
): CreateOrderDTO => ({
  id: props?.id || 1,
  clientId: props?.clientId || 1,
  date: props?.date || new Date(),
  address: props?.address || '1 Main Avenue, New York',
  products: props?.products || [
    { id: 1, quantity: 1, cost: 10.0 },
    { id: 2, quantity: 2, cost: 20.0 },
  ],
})
