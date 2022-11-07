import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { RmqModule, Queue } from '@ecommerce/shared/infrastructure'
import { OrdersController } from './controllers/orders.controller'

@Module({
  imports: [
    ConfigModule,
    RmqModule.register({ names: [Queue.BILLING, Queue.LOGISTICS] }),
  ],
  controllers: [OrdersController],
})
export class OrdersModule {}
