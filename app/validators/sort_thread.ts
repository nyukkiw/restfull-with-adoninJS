import vine from '@vinejs/vine'

export const sortThreadValidator = vine.compile(
  vine.object({
    sort_by: vine.enum([
      'id',
      'user_id',
      'category_id',
      'title',
      'created_at',
      'updated_at'
    ]),
    order: vine.enum(['asc', 'desc'] as const)
  
  })
)