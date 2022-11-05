import { HttpStatus } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { OrdersController } from './orders.controller'

describe('OrdersController', () => {
  let controller: OrdersController

  const order = {
    id: '1',
    clientId: '1',
    date: new Date().toJSON(),
    address: '1 Main Avenue, New York',
    products: [
      { id: '1', quantity: '1', cost: '10.00' },
      { id: '2', quantity: '2', cost: '20.00' },
    ],
  }

  const response = {
    statusCode: HttpStatus.CREATED,
    status: 'Transaction created successfully',
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
