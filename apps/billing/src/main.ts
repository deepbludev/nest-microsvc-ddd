import { NestFactory } from '@nestjs/core'
import { Queue, RmqService } from '@ecommerce/shared/infrastructure'
import { BillingBoundedContext } from './bounded-context/billing.module'

async function bootstrap() {
  const billing = await NestFactory.create(BillingBoundedContext)

  billing.connectMicroservice(billing.get(RmqService).connect(Queue.BILLING))
  await billing.startAllMicroservices()
}

bootstrap()
