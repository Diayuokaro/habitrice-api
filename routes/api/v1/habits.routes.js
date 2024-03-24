import { Router } from 'express'
import ash from 'express-async-handler'
import createHabit from '#controllers/v1/createHabit.controllers.js'
import deleteHabit from '#controllers/v1/deleteHabit.controllers.js'
import getHabit from '#controllers/v1/getHabit.controllers.js'
import modifyHabit from '#controllers/v1/modifyHabit.controllers.js'

const router = Router()

router.route('/:id?')
  .post(ash(createHabit))
  .delete(ash(deleteHabit))
  .get(ash(getHabit))
  .put(ash(modifyHabit))

export default router
