import User from '#models/user.models.js'

export default async (req, res) => {
  const [_, username, passwd] = Buffer.from(req.headers.authorization.replace('Basic ', ''), 'base64').toString('utf-8').match(/(.*):(.*)/)

  const profilePictureBuffer = Buffer.from(req.body.picture.substring(req.body.picture.indexOf(',') + 1))

  if (!profilePictureBuffer.length <= 12*1024*1024) return res.status(401).send()

  if (!await User.validateCredentials(username, passwd)) return res.status(401).send()
  const subject = await User.getByUsername(username)

  if (!req.params.id) return res.status(401).send()

  const user = await User.modifyById(req.params.id, req.body, subject)
  await res.json(user)
}
