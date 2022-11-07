import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { RmqModule, Queue, CqrsModule } from '@ecommerce/shared/infrastructure'
import { OrdersController } from './controllers/orders.controller'
import { CreateOrderHandler } from './commands/create-order/create-order.handler'

@Module({
  imports: [
    ConfigModule,
    CqrsModule.register({
      imports: [RmqModule.register({ names: [Queue.BILLING] })],
      commandHandlers: [CreateOrderHandler],
      // eventSubscribers: [],
    }),
    RmqModule.register({
      names: [Queue.CHECKOUT, Queue.BILLING, Queue.LOGISTICS],
    }),
  ],
  controllers: [OrdersController],
})
export class OrdersModule {}
