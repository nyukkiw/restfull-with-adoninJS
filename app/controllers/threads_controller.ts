import UnauthorizedException from '#exceptions/unauthorized_exception'
import Thread from '#models/thread'
import { sortThreadValidator } from '#validators/sort_thread'
import { threadValidator } from '#validators/thread'
import type { HttpContext } from '@adonisjs/core/http'
import { messages } from '@vinejs/vine/defaults'

export default class ThreadsController {

    async index({ request, response }: HttpContext){
      try {
        const page = request.input('page', 1)
        const perPage = request.input('per_page',10)
        const userId = request.input('user_id')
        const categoryId = request.input('category_id')
        const  sortValidated = await request.validateUsing(sortThreadValidator)
        const sortBy = sortValidated.sort_by || 'id'
        const order = sortValidated.order || 'asc'
        
        const threads = await Thread.query()
        .if(userId, (query) => query.where('user_id', userId))
        .if(categoryId, (query) => query.where('category_id', categoryId))
        .orderBy(sortBy, order)
        .preload('category')
        .preload('user')
        .preload('replies')
        .paginate(page, perPage)

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
         throw new UnauthorizedException('Unauthorized', { status: 403 })
          // return response.status(401).json({
          //   message: 'Unauthorized'
          // })
        }

        const validateData = await request.validateUsing(threadValidator)
        await thread.merge(validateData).save()
        await thread?.load('category')
        await thread?.load('user')

        return response.status(200).json({
          data: thread
        })
      } catch (error) {
        if(error.name === 'UnauthorizedException'){
          return response.status(error.status).json({
            message: error.message
          })
        }else{
          return response.status(404).json({
            message: 'Thread not found'
          })
        }
       
       
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
        if(error.name === 'UnauthorizedException'){
          return response.status(error.status).json({
            message: error.message
          })
        }else{
          return response.status(404).json({
            message: 'Thread not found'
          })
        }
       
      }
    }

}