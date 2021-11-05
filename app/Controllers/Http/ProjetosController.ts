import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Projeto from 'App/Models/Projeto'
import StoreProjetoValidator from 'App/Validators/StoreProjetoValidator'

export default class ProjetosController {
  public async index({ }: HttpContextContract) {
    const projetoDB = await Projeto.all()
    return projetoDB
  }

  public async store({ request, auth }: HttpContextContract) {
    const data = await request.validate(StoreProjetoValidator)
    const projetoDB = await Projeto.create({ ...data, userId: auth.user?.id })
    return projetoDB
  }

  public async show({ }: HttpContextContract) {
  }

  public async update({ }: HttpContextContract) {
  }

  public async destroy({ }: HttpContextContract) {
  }
}
