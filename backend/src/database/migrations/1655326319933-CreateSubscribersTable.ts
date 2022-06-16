import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateSubscribersTable1655326319933 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: "subscribers",
      columns: [
        {
          name: "id",
          type: "uuid",
          isPrimary: true,
          generationStrategy: "uuid",
          default: "UUID()"
        },
        {
          name: "cpf",
          type: "varchar",
          isUnique: true,
          isNullable: false,
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
          name: "phone_number",
          type: "varchar",
          isUnique: false,
          isNullable: true,
        },
        {
          name: "cep",
          type: "varchar",
          isUnique: false,
          isNullable: false,
        },
        {
          name: "city",
          type: "varchar",
          isUnique: false,
          isNullable: false,
        },
        {
          name: "neighborhood",
          type: "varchar",
          isUnique: false,
          isNullable: false,
        },
        {
          name: "address",
          type: "varchar",
          isUnique: false,
          isNullable: false,
        },
        {
          name: "number",
          type: "varchar",
          isUnique: false,
          isNullable: true,
        },
        {
          name: "address_2",
          type: "varchar",
          isUnique: false,
          isNullable: true,
        },
        {
          name: "hear_about_the_event",
          type: "varchar",
          isUnique: false,
          isNullable: false,
        },
        {
          name: "created_at",
          type: "timestamp",
        },
        {
          name: "updated_at",
          type: "timestamp",
        }
      ]
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('subscribers');
  }
}
