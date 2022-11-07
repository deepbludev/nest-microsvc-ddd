import { createOrderStub } from '@ecommerce/checkout/orders/domain'
import { HttpStatus } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { OrdersController } from './orders.controller'

describe('OrdersController', () => {
  let controller: OrdersController
  const order = createOrderStub()

  const response = {
    statusCode: HttpStatus.CREATED,
    status: 'Order created successfully',
    data: { id: order.id },
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrdersController],
    }).compile()

    controller = module.get<OrdersController>(OrdersController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  describe('#create', () => {
    describe('when body is valid', () => {
      it('should return a response with status code 201 CREATED', async () => {
        expect(await controller.create(order)).toEqual(response)
      })
    })
  })
})
