import { Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { CheckoutBoundedContext } from './bounded-context/checkout.module'

async function bootstrap() {
  const checkout = await NestFactory.create(CheckoutBoundedContext)
  const port = checkout.get(ConfigService).get('PORT')
  await checkout.listen(port)
  Logger.log(`🚀 Checkout microservice is running on: http://localhost:${port}`)
}

bootstrap()
