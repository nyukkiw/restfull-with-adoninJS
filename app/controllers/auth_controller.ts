import type { HttpContext } from '@adonisjs/core/http'
import { registerValidator } from '#validators/register'
import User from '#models/user'
import { messages } from '@vinejs/vine/defaults'

export default class AuthController {
  async register({ request, response, auth }: HttpContext) {
    // Validasi input
 const data = await request.validateUsing(registerValidator)
    try {

    // Buat user baru
    const user = await User.create(data)

    // Login otomatis dan dapatkan token
    const token = await User.accessTokens.create(user, ['*'], { name: 'login_token' })

    // Kirim respons 201 dengan user dan token
    return response.created({
      user,
      token,
    })
    } catch (error) {
      return response.status(400).json({
        message: error.message,
      })
    }
    
    
    
   
  }

  async login({request, response, auth}: HttpContext) {

    const {email, password} = request.all()
    try {
     // Verifikasi kredensial user
      const user = await User.verifyCredentials(email, password)

    // Buat token
    const token = await User.accessTokens.create(user, ['*'], {
      name: 'login_token',
    })

    // Kirim user dan token sebagai respons
    return response.status(200).json({
      user,
      token,
    })
    } catch (error) {
      return response.status(401).json({
        message: error.message,
      })
      
    }

  }




}