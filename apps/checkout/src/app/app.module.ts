import * as j from 'joi'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { OrdersModule } from '../modules/orders/orders.module'
import { StatusController } from './controllers/status.controller'

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
  ],
  controllers: [StatusController],
})
export class AppModule {}
