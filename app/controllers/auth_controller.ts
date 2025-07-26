import type { HttpContext } from '@adonisjs/core/http'
import { registerValidator } from '#validators/register'
import User from '#models/user'

export default class AuthController {
  async register({ request, response }: HttpContext) {
    const data = await request.validateUsing(registerValidator)

    const user = await User.create(data)

    return response.created({
      message: 'User registered successfully',
      user,
    })
  }
}