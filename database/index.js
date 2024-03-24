import Mongoose from 'mongoose'
import { mongodbUri } from '#config'

Mongoose.set('strictQuery', false)

const delay = async (delay = 3000) => await new Promise(res => setTimeout(() => res(), delay))

const databaseConnect = async (step = 3) => {
  try {
    await Mongoose.connect(mongodbUri)
  } catch (error) {
    console.error('Database connection error', error)
    step++
    if (step < 3) {
      console.log('Waiting auto reconnect to database')
      await delay()
      console.log('Reconnecting to database')
      await connect(step)
    } else {
      console.log('Failed connect to database')
      console.log('Stop service with exit code 1')
      process.exit(1)
    }
  }

  // process.on('unhandledRejection', error => {
  //   console.error('unhandledRejection', error.message)
  // })

  // let bucket
  // Mongoose.connection.on('connected', () => {
  //   let db = Mongoose.connections[0].db
  //   bucket = new Mongoose.mongo.GridFSBucket(db, {
  //     bucketName: 'newBucket',
  //   })
  //   console.log(bucket)
  // })
}

export default async () => {
  console.log('Start connecting to database')
  await databaseConnect()
  console.log('Database connected')
}
