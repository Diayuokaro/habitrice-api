import User from '#models/user.models.js'

export default async (req, res) => {
  const [_, username, passwd] = Buffer.from(req.headers.authorization.replace('Basic ', ''), 'base64').toString('utf-8').match(/(.*):(.*)/)

  const user = await User.create(username, passwd)
  await res.json(user)
}
