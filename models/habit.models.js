import { Types, Schema, model, Query } from 'mongoose'

const modelName = 'habit'

const modelSchema = new Schema({
  owner: {
    type: Types.ObjectId,
    required: true,
  },
  title: {
    type: String,
    minLength: 1,
    maxLength: 64,
    required: true,
  },
  description: {
    type: String,
    maxLength: 512,
  },
  worth: {
    type: Number,
    min: 0,
    default: 1,
  },
  frequency: {
    type: String,
    enum: ['day', 'week', 'month'],
    required: true,
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

modelSchema.statics.create = async function(query, subject) {
  const habit = await this.model(modelName)({
    owner: subject._id,
    title: query?.title,
    description: query?.description,
    frequency: query?.frequency,
    worth: query?.worth,
    createdAt: Date.now(),
    lastModifyDate: Date.now(),
  })

  return await habit.save()
}

modelSchema.statics.getAll = async function(subject) {
  const habits = await this.model(modelName).find({ owner: subject._id })
  return habits
}

modelSchema.statics.getById = async function(_id, subject) {
  if (!await this.model(modelName).exists({ _id })) return

  const habit = await this.model(modelName).findById(_id)

  if (subject._id === habit.owner) return

  return habit
}

modelSchema.statics.deleteById = async function(_id, subject) {
  if (!await this.model(modelName).exists({ _id })) return

  const habit = await this.model(modelName).findById(_id)

  if (subject._id === habit.owner) return

  return await this.model(modelName).findByIdAndDelete(_id)
}

// modelSchema.statics.create = async function(query) {
//   return await bcrypt.hash(query.passwd, 10)
//     .then(async (hash) => {
//       const user = await this.model(modelName)({
//         ...query,
//         hash,
//         createdAt: Date.now(),
//         lastModifyDate: Date.now(),
//       })

//       return await user.save()
//     })
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
