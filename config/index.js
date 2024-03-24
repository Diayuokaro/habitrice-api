import dotenv from 'dotenv'

dotenv.config()

export const serverPort = process.env.SERVER_PORT
export const mongodbUri = process.env.MONGODB_URI
