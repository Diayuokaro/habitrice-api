import User from '#models/user.models.js'

export default async (req, res) => {
  const [_, username, passwd] = Buffer.from(req.headers.authorization.replace('Basic ', ''), 'base64').toString('utf-8').match(/(.*):(.*)/)

  if (!await User.validateCredentials(username, passwd)) return res.status(401).send()
  const subject = await User.getByUsername(username)

  if (req.params.id) {
    const user = await User.getById(req.params.id, subject)
    await res.json(user)
  } else {
    const user = await User.getByUsername(username, subject)
    await res.json(user)
  }
}
