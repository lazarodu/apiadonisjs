import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class ProjetoCurtirs extends BaseSchema {
  protected tableName = 'projeto_curtirs'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer("user_id")
        .unsigned()
        .references("id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("CASCADE")
      table
        .integer("projeto_id")
        .unsigned()
        .references("id")
        .inTable("projetos")
        .onUpdate("CASCADE")
        .onDelete("CASCADE")
      table.string("icone")

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
