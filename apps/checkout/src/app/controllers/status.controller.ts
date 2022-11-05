import { Controller, Get } from '@nestjs/common'

@Controller()
export class StatusController {
  @Get('status')
  status() {
    return { message: '[checkout] All systems operational' }
  }
}
