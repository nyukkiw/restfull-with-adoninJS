import { Exception } from '@adonisjs/core/exceptions'

export default class UnauthorizedException extends Exception {
  constructor(
    message: string = 'Unauthorized access',
    options?: {
      status?: number
      code?: string
    }
  ) {
    super(message, {
      status: options?.status || 401,
      code: options?.code || 'E_UNAUTHORIZED'
    })
  }
}