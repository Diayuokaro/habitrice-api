import User from '#models/user.models.js'

export default async (req, res) => {
  const [_, username, passwd] = Buffer.from(req.headers.authorization.replace('Basic ', ''), 'base64').toString('utf-8').match(/(.*):(.*)/)

  if (!req.params.id || !username || !passwd) return

  const user = await User.deleteById(req.params.id, username, passwd)
  await res.json(user)
}
