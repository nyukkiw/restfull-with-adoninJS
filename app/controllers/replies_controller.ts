import Thread from '#models/thread'
import { ReplayValidator } from '#validators/replay'
import type { HttpContext } from '@adonisjs/core/http'

export default class RepliesController {

    async store({request,params,auth,response}: HttpContext){
        try {
            const {content} = await request.validateUsing(ReplayValidator)
            const thread = await Thread.findOrFail(params.thread_id)

            const replay = await thread.related('replies').create({
                userId: auth.user?.id,
                content
            })

            await replay.load('user')
            await replay.load('thread')

            return response.status(201).json({
                data:replay
            })
        } catch (error) {
            return response.status(500).json({
                message: error.messages
            })
        }
    }

}