import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1688594460314 implements MigrationInterface {
    name = 'InitialMigration1688594460314'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "comment" ("id" uuid NOT NULL, "content" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, "announcementId" uuid, CONSTRAINT "PK_0b0e4bbc8415ec426f87f3a88e2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."User_accounttype_enum" AS ENUM('buyer', 'seller')`);
        await queryRunner.query(`CREATE TABLE "User" ("id" uuid NOT NULL, "name" character varying(50) NOT NULL, "email" character varying(50) NOT NULL, "cpf" character varying(11) NOT NULL, "telephone" character varying(11) NOT NULL, "birthdate" date NOT NULL, "description" character varying(250), "cep" character varying(8) NOT NULL, "state" character varying(2) NOT NULL, "city" character varying(30) NOT NULL, "street" character varying(50) NOT NULL, "number" character varying NOT NULL, "resetToken" character varying, "resetTokenExpiration" date, "accountType" "public"."User_accounttype_enum" NOT NULL DEFAULT 'buyer', "complement" character varying(50), "password" character varying(200) NOT NULL, CONSTRAINT "UQ_4a257d2c9837248d70640b3e36e" UNIQUE ("email"), CONSTRAINT "UQ_fd04577de1de205c8a1f5297318" UNIQUE ("cpf"), CONSTRAINT "PK_9862f679340fb2388436a5ab3e4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "image" ("id" SERIAL NOT NULL, "url" text, "announcementId" uuid, CONSTRAINT "PK_d6db1ab4ee9ad9dbe86c64e4cc3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."Announcement_fueltype_enum" AS ENUM('1', '2', '3')`);
        await queryRunner.query(`CREATE TABLE "Announcement" ("id" uuid NOT NULL, "brand" character varying(50) NOT NULL, "model" character varying(100) NOT NULL, "year" character varying(4) NOT NULL, "fuelType" "public"."Announcement_fueltype_enum" NOT NULL, "mileage" character varying(20) NOT NULL, "color" character varying(15) NOT NULL, "fipePrice" numeric(10,2) NOT NULL, "sellPrice" numeric(10,2) NOT NULL, "description" text NOT NULL, "coverImage" text NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "userId" uuid NOT NULL, CONSTRAINT "PK_1aad4a24ede009867311c065675" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_c0354a9a009d3bb45a08655ce3b" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_68af9910d29a58bf047f82c4c7a" FOREIGN KEY ("announcementId") REFERENCES "Announcement"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "image" ADD CONSTRAINT "FK_d0994b7f039420a59aeb0839133" FOREIGN KEY ("announcementId") REFERENCES "Announcement"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Announcement" ADD CONSTRAINT "FK_a1bbd010f187d2149b6000115ef" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Announcement" DROP CONSTRAINT "FK_a1bbd010f187d2149b6000115ef"`);
        await queryRunner.query(`ALTER TABLE "image" DROP CONSTRAINT "FK_d0994b7f039420a59aeb0839133"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_68af9910d29a58bf047f82c4c7a"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_c0354a9a009d3bb45a08655ce3b"`);
        await queryRunner.query(`DROP TABLE "Announcement"`);
        await queryRunner.query(`DROP TYPE "public"."Announcement_fueltype_enum"`);
        await queryRunner.query(`DROP TABLE "image"`);
        await queryRunner.query(`DROP TABLE "User"`);
        await queryRunner.query(`DROP TYPE "public"."User_accounttype_enum"`);
        await queryRunner.query(`DROP TABLE "comment"`);
    }

}