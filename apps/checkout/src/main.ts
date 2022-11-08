import { Queue, RmqService } from '@ecommerce/shared/infrastructure'
import { Logger, ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { CheckoutBoundedContext } from './bounded-context/checkout.module'

async function bootstrap() {
  const checkout = await NestFactory.create(CheckoutBoundedContext)
  const port = checkout.get(ConfigService).get('PORT')

  checkout.useGlobalPipes(new ValidationPipe())

  checkout.connectMicroservice(
    checkout.get(RmqService).connect(Queue.LOGISTICS)
  )

  await checkout.listen(port)
  Logger.log(`🚀 Checkout microservice is running on: http://localhost:${port}`)
}

bootstrap()
