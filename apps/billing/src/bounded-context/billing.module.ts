import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { BillsModule } from '../modules/bills/bills.module'
import { config } from './config'

@Module({
  imports: [BillsModule, ConfigModule.forRoot(config)],
})
export class BillingBoundedContext {}
