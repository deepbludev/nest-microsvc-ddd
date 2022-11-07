import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { RmqModule, Queue, CqrsModule } from '@ecommerce/shared/infrastructure'
import { OrdersController } from './controllers/orders.controller'
import { CreateOrderHandler } from './commands/create-order/create-order.handler'

@Module({
  imports: [
    ConfigModule,
    CqrsModule.register({
      imports: [RmqModule.register({ names: [Queue.CHECKOUT] })],
      commandHandlers: [CreateOrderHandler],
      // queryHandlers: [],
      // eventSubscribers: [],
    }),
    RmqModule.register({
      names: [Queue.CHECKOUT],
    }),
  ],
  controllers: [OrdersController],
})
export class OrdersModule {}
