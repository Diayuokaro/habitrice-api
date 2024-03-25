import Habit from '#models/habit.models.js'
import User from '#models/user.models.js'

export default async (req, res) => {
  const [_, username, passwd] = Buffer.from(req.headers.authorization.replace('Basic ', ''), 'base64').toString('utf-8').match(/(.*):(.*)/)

  if (!await User.validateCredentials(username, passwd)) return res.status(401).send()
  const subject = await User.getByUsername(username)

  if (req.params.id) {
    const habit = await Habit.getById(req.params.id, subject)
    await res.json(habit)
  } else {
    const habits = await Habit.getAll(subject)
    await res.json(habits)
  }

  // if (req.params.id) {
  //   const user = await User.getById(req.params.id)
  //   await res.json(user)
  // } else {
  //   const users = await User.getAll()
  //   await res.json(users)
  // }
}
