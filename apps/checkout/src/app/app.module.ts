import { Module } from '@nestjs/common'
import { OrdersModule } from '../modules/orders/orders.module'
import { StatusController } from './controllers/status.controller'

@Module({
  imports: [OrdersModule],
  controllers: [StatusController],
})
export class AppModule {}
