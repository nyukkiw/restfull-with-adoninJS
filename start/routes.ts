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
import ThreadsController from '#controllers/threads_controller'
import { middleware } from '#start/kernel'

const authController = new AuthController()
const threadsController = new ThreadsController()

router.get('/', async () => {
  return {
    hello: 'world',
  }
})


router.group(() => {
   console.log('✅ GROUP /api ROUTES LOADED');
  router.post('/auth/register', (data) => authController.register(data))
  router.post('/auth/login',(data) => authController.login(data))
  router.post('/threads', (data) => threadsController.store(data))
//sepertinya ada masalaha di middlewarenya 

}).prefix('/api')

