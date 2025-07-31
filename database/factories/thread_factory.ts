import factory from '@adonisjs/lucid/factories'
import Thread from '#models/thread'


export const ThreadFactory = factory
  .define(Thread, async ({ faker }) => {
    return {
      userId: Math.floor(Math.random()*2)+1,
      categoryId: Math.floor(Math.random()*5)+1,
      title: faker.lorem.words(4),
      content: faker.lorem.paragraphs(2)
    }
  })
  .build()