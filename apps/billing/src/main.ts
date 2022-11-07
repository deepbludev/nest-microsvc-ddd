import { NestFactory } from '@nestjs/core'
import { Queue, RmqService } from '@ecommerce/shared/infrastructure'
import { BillingBoundedContext } from './bounded-context/billing.module'

async function bootstrap() {
  const app = await NestFactory.create(BillingBoundedContext)
  const rmqService = app.get<RmqService>(RmqService)
  app.connectMicroservice(rmqService.getOptions(Queue.BILLING))
  await app.startAllMicroservices()
}

bootstrap()
