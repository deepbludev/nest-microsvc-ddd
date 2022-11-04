import { Injectable } from '@nestjs/common'
import { z } from 'zod'

@Injectable()
export class AppService {
  getData(): { message: string } {
    const schema = z.object({
      message: z.string(),
    })

    const response = {
      message: 'Welcome to orders-svc from Docker with volumes and everything!',
    }

    const { success } = schema.safeParse(response)

    if (!success) throw new Error('Invalid response')

    return response
  }
}
