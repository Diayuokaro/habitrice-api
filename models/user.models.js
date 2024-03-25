import { Schema, model } from 'mongoose'
import bcrypt from 'bcrypt'

const modelName = 'user'

const modelSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  fullname: {
    type: String,
  },
  pronouns: {
    type: String,
  },
  picture: {
    type: String,
  },
  account: {
    type: Number,
    default: 0,
  },
  hash: {
    type: String,
    required: true,
    select: false,
  },
  permissions: {
    type: Number,
    default: 0x0,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  lastModifyDate: {
    type: Date,
    required: true,
  },
})

modelSchema.statics.validateCredentials = async function(username, passwd) {
  if (!await this.model(modelName).exists({ username })) return

  const user = await this.model(modelName).findOne({ username }).select({ hash: 1, _id: 0 })
  const match = await bcrypt.compare(passwd, user.hash)

  return match
}

modelSchema.statics.getAll = async function() {
  const users = await this.model(modelName).find().select({
    username: 1,
    fullname: 1,
    pronouns: 1,
    account: 1,
    picture: 1,
    createdAt: 1,
  })
  return users
}

modelSchema.statics.getRatingByAccount = async function() {
  const users = await this.model(modelName).find().sort({account: 1}).select({
    username: 1,
    fullname: 1,
    pronouns: 1,
    account: 1,
    picture: 1,
    createdAt: 1,
  })
  return users
}

modelSchema.statics.getById = async function(_id, subject) {
  if (!await this.model(modelName).exists({ _id })) return

  const user = await this.model(modelName).findById(_id)

  if (subject._id === user._id) return

  return user
}

modelSchema.statics.getByUsername = async function(username, subject) {
  if (!await this.model(modelName).exists({ username })) return

  const user = await this.model(modelName).findOne({ username })

  if (subject?._id === user._id) return user.select({ _id: 1 })

  return user
}

modelSchema.statics.modifyById = async function(_id, query, subject) {
  if (!await this.model(modelName).exists({ _id })) return

  const user = await this.model(modelName).findById(_id)

  if (subject._id === user._id) return

  await this.model(modelName).findByIdAndUpdate(_id, {
    username: query?.username,
    fullname: query?.fullname,
    pronouns: query?.pronouns,
    picture: query?.picture,
    lastModifyDate: Date.now(),
  })

  return await this.model(modelName).findById(user._id)
}

modelSchema.statics.deleteById = async function(_id, subject) {
  if (!await this.model(modelName).exists({ _id })) return

  const user = await this.model(modelName).findById(_id)

  if (subject._id === user._id) return

  return await this.model(modelName).findByIdAndDelete(_id)
}

modelSchema.statics.create = async function(username, passwd) {
  return await bcrypt.hash(passwd, 10)
    .then(async (hash) => {
      const user = await this.model(modelName)({
        username,
        hash,
        createdAt: Date.now(),
        lastModifyDate: Date.now(),
      })

      if (await user.save()) {
        const user1 = await this.model(modelName).findOne({ username }).select({ hash: 1, _id: 0 })
        const match = await bcrypt.compare(passwd, user1.hash)

        if (match) return await this.model(modelName).findOne({ username })
      }
    })
}

// modelSchema.statics.deleteById = async function(_id, username, passwd) {
//   const user = await this.model(modelName).findOne({ username }).select({ hash: 1 })
//   const match = await bcrypt.compare(passwd, user.hash)

//   if (match && _id == user._id) return await this.model(modelName).findByIdAndDelete(_id)
// }

// modelSchema.statics.getByUsername = async function(username, passwd) {
//   const user = await this.model(modelName).findOne({ username }).select({ hash: 1, _id: 0 })
//   const match = await bcrypt.compare(passwd, user.hash)

//   if (match) return await this.model(modelName).findOne({ username })
// }

// modelSchema.statics.modifyById = async function(_id, query, username, passwd) {
//   const user = await this.model(modelName).findOne({ username }).select({ hash: 1 })
//   const match = await bcrypt.compare(passwd, user.hash)

//   if (match && _id == user._id) {
//     await this.model(modelName).findByIdAndUpdate(_id, {
//       username: query.username,
//       fullname: query.fullname,
//       pronouns: query.pronouns,
//       picture: query.picture,
//       lastModifyDate: Date.now(),
//     })

//     return await this.model(modelName).findById(user._id)
//   }
// }

// modelSchema.statics.create = async function(query) {
//   return await bcrypt.hash(query.passwd, 10)
    // .then(async (hash) => {
    //   const user = await this.model(modelName)({
    //     ...query,
    //     hash,
    //     createdAt: Date.now(),
    //     lastModifyDate: Date.now(),
    //   })

    //   return await user.save()
    // })
// }

// modelSchema.statics.deleteById = async function(_id, passwd) {
//   const user = await this.model(modelName).findById(_id)
//   const match = await bcrypt.compare(query.passwd, user.hash)

//   if (match) return await this.model(modelName).findByIdAndDelete(
//     _id,
//     {
//       fields: { hash: 0 },
//     },
//   )
// }

// modelSchema.statics.getAll = async function(_id, passwd) {
//   const user = await this.model(modelName).findById(_id)
//   const match = await bcrypt.compare(passwd, user.hash)

//   if (match) return await this.model(modelName).find().select({ hash: 0 })
// }

// modelSchema.statics.getById = async function(_id, passwd) {
//   const user = await this.model(modelName).findById(_id)
//   const match = await bcrypt.compare(passwd, user.hash)

//   if (match) return await this.model(modelName).findById(_id).select({ hash: 0 })
// }

// modelSchema.statics.modifyById = async function(_id, passwd, query) {
//   const user = await this.model(modelName).findById(_id)
//   const match = await bcrypt.compare(passwd, user.hash)

//   if (match) return await this.model(modelName).findByIdAndUpdate(
//     _id,
//     {
//       ...query,
//       lastModifyDate: Date.now(),
//     },
//     {
//       fields: { hash: 0 },
//     },
//   )
// }

export default model(modelName, modelSchema)
