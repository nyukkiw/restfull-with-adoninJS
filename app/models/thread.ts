import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import User from './user.js'
import type  { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Category from './category.js'
import Replay from './replay.js'

export default class Thread extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare userId: number

  @column()
  declare categoryId: number

  @column()
  declare title: string

  @column()
  declare content: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>
  
  @belongsTo(() => Category)
  declare category: BelongsTo<typeof Category>

  @hasMany(()=> Replay)
  declare replies: HasMany<typeof Replay>

}