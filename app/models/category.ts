import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import Thread from './thread.js'
import type { HasMany } from '@adonisjs/lucid/types/relations'

export default class Category extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare title: String

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @hasMany(() => Thread)
  declare threads: HasMany<typeof Thread>

}