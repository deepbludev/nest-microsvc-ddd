import { NestFactory } from '@nestjs/core'
import { Queue, RmqService } from '@ecommerce/shared/infrastructure'
import { LogisticsBoundedContext } from './bounded-context/logistics.module'

async function bootstrap() {
  const logistics = await NestFactory.create(LogisticsBoundedContext)

  logistics.connectMicroservice(
    logistics.get(RmqService).connect(Queue.LOGISTICS)
  )

  await logistics.startAllMicroservices()
}

bootstrap()
