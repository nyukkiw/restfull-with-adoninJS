import Thread from '#models/thread'
import { threadValidator } from '#validators/thread'
import type { HttpContext } from '@adonisjs/core/http'
import { messages } from '@vinejs/vine/defaults'

export default class ThreadsController {

    async index({ response }: HttpContext){
      try {
        const threads = await Thread.query().preload('category').preload('user').preload('replies')
        return response.status(200).json({
          data: threads
        })  
      } catch (error) {
        return response.status(400).json({
          message: error.messages
        })
        
      }
    }


    async store({request, response, auth}: HttpContext){
       
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
    
    async show({ params, response}: HttpContext){
     
      try {
        const thread = await Thread.query()
        .where('id', params.id)
        .preload('category')
        .preload('user')
        .preload('replies')
        .firstOrFail()
        return response.status(200).json({
          data: thread

        })
      } catch (error) {
        return response.status(404).json({
          message: 'Thread not found'
        })
      }
    }


    async update({params, request, auth ,response}: HttpContext){
      try {
        const user = await auth.user
        const thread = await Thread.findOrFail(params.id)

        if(user?.id !== thread.userId){
          return response.status(401).json({
            message: 'Unauthorized'
          })
        }

        const validateData = await request.validateUsing(threadValidator)
        await thread.merge(validateData).save()
        await thread?.load('category')
        await thread?.load('user')

        return response.status(200).json({
          data: thread
        })
      } catch (error) {
        return response.status(400).json({
          message: error
        })
      }
    }
    
    async destroy({params, auth, response}: HttpContext){
      try {
         const user = await auth.user
        const thread = await Thread.findOrFail(params.id)

        
        if(user?.id !== thread.userId){
          return response.status(401).json({
            message: 'Unauthorized'
          })
        }

        await thread.delete()

        return response.status(200).json({
          message: 'Thread deleted successfully'
        })
      } catch (error) {
        return response.status(500).json({
          message: error
        })
      }
    }

}