import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { RmqModule } from '@ecommerce/shared/infrastructure'
import { BillsModule } from '../modules/bills/bills.module'
import { config } from './config'

@Module({
  imports: [BillsModule, RmqModule, ConfigModule.forRoot(config)],
})
export class BillingBoundedContext {}
