import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Faq from 'App/Models/Faq'
import StoreFaqValidator from 'App/Validators/StoreFaqValidator'

export default class FaqsController {
  public async index({ }: HttpContextContract) {
    const faqDB = await Faq.query().preload('user').orderBy('id')
    return faqDB
  }

  public async store({ request, auth }: HttpContextContract) {
    const data = await request.validate(StoreFaqValidator)
    const faqDB = await Faq.create({ ...data, userId: auth.user?.id })
    return faqDB
  }

  public async show({ params, response }: HttpContextContract) {
    try {
      const faqDB = await Faq.findOrFail(params.id)
      return faqDB
    } catch (error) {
      response.status(400).send("Faq não encontrada!!!")
    }
  }

  public async update({ request, params, response }: HttpContextContract) {
    const { pergunta, resposta } = await request.validate(StoreFaqValidator)
    try {
      const faqDB = await Faq.findOrFail(params.id)
      faqDB.pergunta = pergunta
      faqDB.resposta = resposta
      await faqDB.save()
      return faqDB

    } catch (error) {
      response.status(400).send("Faq não encontrada!!!")
    }
  }

  public async destroy({ params, response }: HttpContextContract) {
    try {
      const faqDB = await Faq.findOrFail(params.id)
      await faqDB.delete()
      return faqDB
    } catch (error) {
      response.status(400).send("Faq não encontrada!!!")
    }
  }
}
