import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { RmqModule } from '@ecommerce/shared/infrastructure'
import { ShipmentsModule } from '../modules/shipments/shipments.module'
import { config } from './config'

@Module({
  imports: [ShipmentsModule, RmqModule, ConfigModule.forRoot(config)],
})
export class LogisticsBoundedContext {}
