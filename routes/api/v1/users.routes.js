import { Router } from 'express'
import ash from 'express-async-handler'
import createUser from '#controllers/v1/createUser.controllers.js'
import deleteUser from '#controllers/v1/deleteUser.controllers.js'
import getUser from '#controllers/v1/getUser.controllers.js'
import modifyUser from '#controllers/v1/modifyUser.controllers.js'
import getUsersRating from '#controllers/v1/getUsersRating.controllers.js'

const router = Router()

router.route('/rating/:id?')
  .get(ash(getUsersRating))

router.route('/:id?')
  .post(ash(createUser))
  .delete(ash(deleteUser))
  .get(ash(getUser))
  .put(ash(modifyUser))

export default router
