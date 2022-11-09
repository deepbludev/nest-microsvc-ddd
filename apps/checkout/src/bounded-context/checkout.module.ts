import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { OrdersModule } from '../modules/orders/orders.module'
import { StatusController } from './controllers/status.controller'
import { CqrsModule, Queue, RmqModule } from '@ecommerce/shared/infrastructure'
import { ordersCommandHandlers } from '../modules/orders/commands/orders.command-handlers'
import { config } from './config'

@Module({
  imports: [
    OrdersModule,
    ConfigModule.forRoot(config),
    CqrsModule.forRoot({
      commandHandlers: [...ordersCommandHandlers],
      queryHandlers: [],
      eventSubscribers: [],
    }),
    RmqModule.forRoot({
      queues: [Queue.BILLING, Queue.LOGISTICS],
    }),
  ],
  controllers: [StatusController],
})
export class CheckoutBoundedContext {}
