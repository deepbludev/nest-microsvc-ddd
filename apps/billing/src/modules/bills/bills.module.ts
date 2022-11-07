import * as j from 'joi'
import { RmqModule } from '@ecommerce/shared/infrastructure'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { BillsController } from './bills.controller'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: j.object({
        MONGODB_URI: j.string().required(),
        PORT: j.number().required(),
      }),
      envFilePath: './apps/billing/.env',
    }),
    RmqModule,
  ],
  controllers: [BillsController],
})
export class BillsModule {}
