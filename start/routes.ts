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
import RepliesController from '#controllers/replies_controller'


const authController = new AuthController()
const threadsController = new ThreadsController()
const repliesController = new RepliesController()

router.get('/', async () => {
  return {
    hello: 'world',
  }
})


router.group(() => {
  
  router.post('/auth/register', (data) => authController.register(data))
  router.post('/auth/login',(data) => authController.login(data))

  router.get('/threads', threadsController.index)
  router.post('/threads', threadsController.store).use(middleware.auth())
  router.get('/threads/:id', threadsController.show)
  router.put('/threads/:id', threadsController.update).use(middleware.auth())
  router.delete('/threads/:id', threadsController.destroy).use(middleware.auth())

  router.post('/threads/:thread_id/replies', repliesController.store).use(middleware.auth())
}).prefix('/api')

