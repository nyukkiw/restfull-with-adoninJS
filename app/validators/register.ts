import vine from '@vinejs/vine'

const registerSchema = vine.object({
  fullName: vine.string().trim(),

  email: vine
    .string()
    .trim()
    .email()
    .unique(async (db, value) => {
      const user = await db.from('users').where('email', value).first()
      return !user
    }),

  password: vine.string().trim().confirmed(),
})

export const registerValidator = vine.compile(registerSchema)
