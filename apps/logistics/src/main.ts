import { NestFactory } from '@nestjs/core'
import { Queue, RmqService } from '@ecommerce/shared/infrastructure'
import { LogisticsBoundedContext } from './bounded-context/logistics.module'

async function bootstrap() {
  const app = await NestFactory.create(LogisticsBoundedContext)
  const rmqService = app.get<RmqService>(RmqService)
  app.connectMicroservice(rmqService.getOptions(Queue.CHECKOUT))
  await app.startAllMicroservices()
}

bootstrap()
