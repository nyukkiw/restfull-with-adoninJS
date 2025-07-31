import { ThreadFactory } from '#database/factories/thread_factory'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await ThreadFactory.createMany(50)
  }
}