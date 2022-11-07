import { RmqModule } from '@ecommerce/shared/infrastructure'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { ShipmentsController } from './shipments.controller'

@Module({
  imports: [ConfigModule, RmqModule],
  controllers: [ShipmentsController],
})
export class ShipmentsModule {}
