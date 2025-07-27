/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import AuthController from '#controllers/auth_controller'

const authController = new AuthController()

router.get('/', async () => {
  return {
    hello: 'world',
  }
})


router.group(() => {
  router.post('/auth/register', (data) => authController.register(data))
  router.post('/auth/login',(data) => authController.login(data))
}).prefix('/api')

