import vine from '@vinejs/vine'



const threadSchema = vine.object({
  title: vine.string().trim().maxLength(255),
  content: vine.string().trim(),
  category_id: vine.number().exists({table: 'categories', column: 'id'})
})

export const threadValidator = vine.compile(threadSchema)
