import vine from '@vinejs/vine'

export const ReplayValidator = vine.compile(
  vine.object({
    content: vine.string().trim(),
  })
)