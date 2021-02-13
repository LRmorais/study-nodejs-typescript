import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class AlterProviderFieldToProviderId1613233607337
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('appointments', 'provider');
    await queryRunner.addColumn(
      'appointments',
      new TableColumn({
        name: 'provider_id',
        type: 'uuid',
        isNullable: true,
      }),
    );
    // criando relação
    await queryRunner.createForeignKey(
      'appointments',
      new TableForeignKey({
        name: 'AppointmentProvider',
        // coluna que ira receber a foreign key
        columnNames: ['provider_id'],
        // qual o nome da coluna na tabela users que vai representar esse provider_id -> será o id do user
        referencedColumnNames: ['id'],
        // nome da tabela que irá fazer referencia com esse campo (provider_id)
        referencedTableName: 'users',
        // o que irá acontecer com com os appointments caso um user seja deletado
        // opções -> 'restrict' = não permite user seja deletado
        // -> 'set null' -> = setar o provider_id como nulo
        // -> 'cascade' -> deletou user= deletou todos os outros dados relacionados
        onDelete: 'SET NULL',
        // auterou id do user implica alterar provider_id
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('appointments', 'AppointmentProvider');

    await queryRunner.dropColumn('appointments', 'provider_id');

    await queryRunner.addColumn(
      'appointments',
      new TableColumn({
        name: 'provider',
        type: 'varchar',
      }),
    );
  }
}
