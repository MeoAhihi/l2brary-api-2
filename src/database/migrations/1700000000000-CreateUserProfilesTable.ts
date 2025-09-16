import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUserProfilesTable1700000000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'user_profiles',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            length: '36',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid()',
          },
          {
            name: 'fullName',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
          {
            name: 'internationalName',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
          {
            name: 'gender',
            type: 'enum',
            enum: ['male', 'female', 'other'],
            isNullable: false,
          },
          {
            name: 'birthdate',
            type: 'date',
            isNullable: false,
          },
          {
            name: 'phoneNumber',
            type: 'varchar',
            length: '20',
            isNullable: false,
          },
          {
            name: 'email',
            type: 'varchar',
            length: '255',
            isNullable: false,
            isUnique: true,
          },
          {
            name: 'password',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            isNullable: false,
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            onUpdate: 'CURRENT_TIMESTAMP',
            isNullable: false,
          },
          {
            name: 'deletedAt',
            type: 'timestamp',
            isNullable: true,
          },
        ],
        indices: [
          {
            name: 'IDX_USER_PROFILES_EMAIL',
            columnNames: ['email'],
            isUnique: true,
          },
          {
            name: 'IDX_USER_PROFILES_PHONE',
            columnNames: ['phoneNumber'],
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('user_profiles');
  }
}
