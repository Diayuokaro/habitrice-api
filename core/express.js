import express from 'express'
import { serverPort } from '#config'
import useMiddleware from '#middleware'
import routes from '#routes'

export default async () => {
  const app = express()

  await useMiddleware(app)

  await app.use(routes)

  await app.listen(serverPort, async () => {
    console.log(`Server ready on ${serverPort} port`)
  })
}
