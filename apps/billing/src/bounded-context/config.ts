import * as j from 'joi'

export const config = {
  isGlobal: true,
  validationSchema: j.object({
    MONGODB_URI: j.string().required(),
  }),
  envFilePath: './apps/billing/.env',
}
