import { Router } from 'express'
import usersRoute from './users.routes.js'
import habitsRoute from './habits.routes.js'

const router = Router()

router.use('/users', usersRoute)
router.use('/habits', habitsRoute)

export default router
