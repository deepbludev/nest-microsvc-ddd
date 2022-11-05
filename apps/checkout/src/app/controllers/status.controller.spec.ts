import { Test, TestingModule } from '@nestjs/testing'
import { StatusController } from './status.controller'

describe('StatusController', () => {
  let app: TestingModule
  let statusCtrl: StatusController

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [StatusController],
      providers: [],
    }).compile()

    statusCtrl = app.get(StatusController)
  })

  describe('/status GET', () => {
    it('should return status OK', () => {
      expect(statusCtrl.status()).toEqual({
        message: '[checkout] All systems operational',
      })
    })
  })
})
