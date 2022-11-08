import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ShipmentsModule } from '../modules/shipments/shipments.module'
import { config } from './config'

@Module({
  imports: [ShipmentsModule, ConfigModule.forRoot(config)],
})
export class LogisticsBoundedContext {}
