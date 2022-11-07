import * as j from 'joi'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { BillsModule } from '../modules/bills/bills.module'

@Module({
  imports: [
    BillsModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: j.object({
        MONGODB_URI: j.string().required(),
        PORT: j.number().required(),
      }),
      envFilePath: './apps/billing/.env',
    }),
  ],
})
export class BillingBoundedContext {}
