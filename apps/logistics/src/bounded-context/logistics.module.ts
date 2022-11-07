import * as j from 'joi'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ShipmentsModule } from '../modules/shipments/shipments.module'

@Module({
  imports: [
    ShipmentsModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: j.object({
        MONGODB_URI: j.string().required(),
      }),
      envFilePath: './apps/logistics/.env',
    }),
  ],
})
export class LogisticsBoundedContext {}
