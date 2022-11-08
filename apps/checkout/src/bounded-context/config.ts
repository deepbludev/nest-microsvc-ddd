import * as j from 'joi'

export const config = {
  isGlobal: true,
  validationSchema: j.object({
    MONGODB_URI: j.string().required(),
    PORT: j.number().required(),
  }),
  envFilePath: './apps/checkout/.env',
}
