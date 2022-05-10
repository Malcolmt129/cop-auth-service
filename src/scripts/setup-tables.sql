CREATE TABLE "user" (
    "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
    "username" character varying(45) NOT NULL,
    "password" text NOT NULL,
    "role" character varying(45), 
    CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"),
    CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")
)