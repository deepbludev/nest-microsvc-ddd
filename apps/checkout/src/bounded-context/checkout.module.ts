import * as j from 'joi'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { OrdersModule } from '../modules/orders/orders.module'
import { StatusController } from './controllers/status.controller'
import { CqrsModule, Queue, RmqModule } from '@ecommerce/shared/infrastructure'
import { ordersCommandHandlers } from '../modules/orders/commands/orders.command-handlers'

@Module({
  imports: [
    OrdersModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: j.object({
        MONGODB_URI: j.string().required(),
        PORT: j.number().required(),
      }),
      envFilePath: './apps/checkout/.env',
    }),
    CqrsModule.forRoot({
      commandHandlers: [...ordersCommandHandlers],
      queryHandlers: [],
      eventSubscribers: [],
    }),
    RmqModule.forRoot({
      names: [Queue.BILLING, Queue.LOGISTICS],
    }),
  ],
  controllers: [StatusController],
})
export class CheckoutBoundedContext {}
