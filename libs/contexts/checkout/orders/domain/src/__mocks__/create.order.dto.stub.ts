import { CreateOrderDTO } from '../model/order/dto/create.order.dto'

export const createOrderStub = (
  props?: Partial<CreateOrderDTO>
): CreateOrderDTO => ({
  id: props?.id || '026a2f78-d68c-4e9e-8c9c-ad53f1c74cec',
  clientId: props?.clientId || '3dc36e31-0ef7-4fde-9894-1b93ce59e6a3',
  date: props?.date || new Date(),
  address: props?.address || '1 Main Avenue, New York',
  products: props?.products || [
    { id: '030743e0-bd92-4baa-801a-282710b5648b', quantity: 1, cost: 10.0 },
    { id: '95a80b45-87ab-457f-84e1-e4805e020b1c', quantity: 2, cost: 20.0 },
  ],
})
