import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import User from 'App/Models/User'
import ProjetoCurtir from './ProjetoCurtir'

export default class Projeto extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public userId: number

  @column()
  public projeto: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @manyToMany(() => User, {
    localKey: 'id',
    pivotForeignKey: 'projeto_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'user_id',
    pivotTable: 'projeto_curtirs'
  })
  public userCurtir: ManyToMany<typeof User>

  @hasMany(() => ProjetoCurtir)
  public projetoCurtirs: HasMany<typeof ProjetoCurtir>
}
