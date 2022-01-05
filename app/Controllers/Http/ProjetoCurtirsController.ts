import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ProjetoCurtir from 'App/Models/ProjetoCurtir'
import StoreProjetoCurtirValidator from 'App/Validators/StoreProjetoCurtirValidator'

export default class ProjetoCurtirsController {
  public async index({ }: HttpContextContract) {
    const projetoCurtirDB = await ProjetoCurtir.query().preload("projeto").preload("user")
    return projetoCurtirDB
  }

  public async store({ request, auth }: HttpContextContract) {
    const data = await request.validate(StoreProjetoCurtirValidator)
    const projetoCurtirDB = await ProjetoCurtir.create({ ...data, userId: auth.user?.id })
    return projetoCurtirDB
  }

  public async show({ params, response }: HttpContextContract) {
    try {
      const projetoCurtirDB = await ProjetoCurtir.findOrFail(params.id)
      return projetoCurtirDB
    } catch (error) {
      response.status(400).send("Curtir não encontrado!!!")
    }
  }

  public async update({ response, request, params }: HttpContextContract) {
    const { projeto_id, icone } = await request.validate(StoreProjetoCurtirValidator)
    try {
      const projetoCurtirDB = await ProjetoCurtir.findOrFail(params.id)
      projetoCurtirDB.projetoId = projeto_id
      projetoCurtirDB.icone = icone
      await projetoCurtirDB.save()
      return projetoCurtirDB

    } catch (error) {
      response.status(400).send("Curtir não encontrado!!!")
    }
  }

  public async destroy({ params, response }: HttpContextContract) {
    try {
      const projetoCurtirDB = await ProjetoCurtir.findOrFail(params.id)
      await projetoCurtirDB.delete()
      return projetoCurtirDB
    } catch (error) {
      response.status(400).send("Curtir não encontrado!!!")
    }
  }
}
