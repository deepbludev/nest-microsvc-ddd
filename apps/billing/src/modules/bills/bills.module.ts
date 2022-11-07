import { RmqModule } from '@ecommerce/shared/infrastructure'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { BillsController } from './bills.controller'

@Module({
  imports: [ConfigModule, RmqModule],
  controllers: [BillsController],
})
export class BillsModule {}
