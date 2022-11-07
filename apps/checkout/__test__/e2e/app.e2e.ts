import { HttpStatus } from '@nestjs/common'
import { TestEnvironment } from '../utils/test-environment.util'

describe('AppController (e2e)', () => {
  let e2e: TestEnvironment

  beforeEach(async () => {
    e2e = await TestEnvironment.init()
  })

  afterEach(async () => {
    await e2e.close()
  })

  describe('/status', () => {
    describe('GET', () => {
      it('returns http status 200 OK', () => {
        return e2e.request().get('/status').expect(HttpStatus.OK)
      })
    })
  })

  describe('/orders', () => {
    describe('POST', () => {
      describe('when body is valid', () => {
        it('returns http status 201 CREATED', () => {
          const order = {
            id: '88cc384c-eb13-4eee-af43-9f64c36f9e99',
            clientId: '1',
            date: new Date().toJSON(),
            address: '1 Main Avenue, New York',
            products: [
              { id: '1', quantity: '1', cost: '10.00' },
              { id: '2', quantity: '2', cost: '20.00' },
            ],
          }

          return e2e
            .request()
            .post('/orders')
            .send(order)
            .expect(HttpStatus.CREATED)
            .expect({
              statusCode: HttpStatus.CREATED,
              status: 'Order created successfully',
              data: { id: order.id },
            })
        })
      })
    })
  })
})
