import databaseConnect from '#database'
import cors from 'cors'
import express from 'express'

export default async (app) => {
  await databaseConnect()

  await app.use(cors())
	await app.use(express.json({
    limit: '128mb',
  }))
	await app.use(express.urlencoded({
    limit: '128mb',
		extended: true,
	}))

  await app.use((err, req, res, next) => {
    console.error('ERR:'.red, err.stack)
    res.status(500).send(err.message)
  })
}
