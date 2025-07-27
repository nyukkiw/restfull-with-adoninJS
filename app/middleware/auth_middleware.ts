import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import type { Authenticators } from '@adonisjs/auth/types'

export default class AuthMiddleware {
  redirectTo = '/login'

  async handle(
    ctx: HttpContext,
    next: NextFn,
    options: {
      guards?: (keyof Authenticators)[]
    } = {}
  ) {
    console.log('🔐 Masuk ke middleware auth')

    try {
      await ctx.auth.authenticateUsing(options.guards, {
        loginRoute: this.redirectTo,
      })
      console.log('✅ Auth sukses')
      await next()
    } catch (error) {
      console.error('❌ Auth gagal:', error.message)

      return ctx.response.status(401).json({
        message: 'Unauthorized: ' + error.message,
      })
    }
  }
}
