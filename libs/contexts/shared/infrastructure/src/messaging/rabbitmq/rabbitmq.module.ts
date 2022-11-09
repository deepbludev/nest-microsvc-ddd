import { DynamicModule, Global, Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { RmqService } from './rabbitmq.service'

interface RmqModuleOptions {
  queues: string[]
}

@Global()
@Module({
  providers: [RmqService],
  exports: [RmqService],
})
export class RmqModule {
  static forRoot({ queues }: RmqModuleOptions): DynamicModule {
    return {
      module: RmqModule,
      global: true,
      imports: [
        ClientsModule.registerAsync(
          queues.map(queue => ({
            name: queue,
            useFactory: (configService: ConfigService) => ({
              transport: Transport.RMQ,
              options: {
                urls: [configService.get<string>('RABBITMQ_URI')],
                queue: configService.get<string>(`RABBITMQ_QUEUE_${queue}`),
              },
            }),
            inject: [ConfigService],
          }))
        ),
      ],
      exports: [ClientsModule],
    }
  }
}
