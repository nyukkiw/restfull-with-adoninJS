import { threadValidator } from '#validators/thread'
import type { HttpContext } from '@adonisjs/core/http'

export default class ThreadsController {

    async store({request, response, auth}: HttpContext){
        console.log('masuk thread store controller')
      

        const validateData = await request.validateUsing(threadValidator)
        try {
          const thread = await auth.user?.related('threads').create(validateData)
          await thread?.load('category')
          await thread?.load('user')

          return response.status(201).json({
            data: thread
          })
        } catch (error) {
            console.log(error)
            return response.status(400).json({
                message: error.message
            })
            
        }

    }    

}