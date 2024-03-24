import { Schema, model } from 'mongoose'

const modelName = 'habit'

const modelSchema = new Schema({
  owner: {
    type: String,
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
