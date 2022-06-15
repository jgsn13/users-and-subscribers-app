import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateUsersTable1655328033076 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: "users",
      columns: [
        {
          name: "id",
          type: "uuid",
          isPrimary: true,
          generationStrategy: "uuid",
          default: "UUID()"
        },
        {
          name: "full_name",
          type: "varchar",
          isUnique: true,
          isNullable: false,
        },
        {
          name: "email",
          type: "varchar",
          isUnique: true,
          isNullable: false,
        },
        {
          name: "password",
          type: "varchar",
          isUnique: false,
          isNullable: false,
        },
      ]
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("users");
  }

}
