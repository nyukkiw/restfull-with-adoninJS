import User from '#models/user'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    
    await User.createMany([
      {
        fullName: 'Admin',
        email: 'admin@gmail.com',
        password: 'password'
      },
      {
        fullName: 'User',
        email: 'user@gmail.com',
        password: 'password'
      }

    ])

  }
}