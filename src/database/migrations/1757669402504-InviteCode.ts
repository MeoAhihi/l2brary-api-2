import { MigrationInterface, QueryRunner } from 'typeorm';

export class InviteCode1757669402504 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE \`invite_codes\` (
                \`id\` varchar(36) NOT NULL,
                \`code\` varchar(255) NOT NULL,
                \`used\` tinyint NOT NULL DEFAULT 0,
                \`usedBy\` varchar(255) NULL,
                \`expiresAt\` datetime NULL,
                PRIMARY KEY (\`id\`),
                UNIQUE INDEX \`IDX_invite_codes_code\` (\`code\`)
            ) ENGINE=InnoDB
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`invite_codes\``);
  }
}
