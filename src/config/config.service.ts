import { DocumentBuilder } from '@nestjs/swagger';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';

require('dotenv').config();

class ConfigService {

  constructor(private env: { [k: string]: string | undefined }) { }

  private getValue(key: string, throwOnMissing = true): string {
    const value = this.env[key];
    if (!value && throwOnMissing) {
      throw new Error(`config error - missing env.${key}`);
    }

    return value;
  }

  public ensureValues(keys: string[]) {
    keys.forEach(k => this.getValue(k, true));
    return this;
  }

  public getPort() {
    return this.getValue('PORT', true);
  }

  public getJWTSecret() {
    return this.getValue('SECRET_KEY', true);
  }

  public isProduction() {
    const mode = this.getValue('ENV_TYPE', false);
    return mode != 'DEV';
  }

  public getTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      type: 'postgres',

      host: this.getValue('POSTGRES_HOST'),
      port: parseInt(this.getValue('POSTGRES_PORT')),
      username: this.getValue('POSTGRES_USER'),
      password: this.getValue('POSTGRES_PASSWORD'),
      database: this.getValue('POSTGRES_DATABASE'),

      entities: [join(__dirname, '..', '**', '*.entity.{ts,js}'), join("dist/**/*.entity.js")],

      migrationsTableName: 'migration',

      migrations: ['src/migration/*.ts'],

      cli: {
        migrationsDir: 'src/migration',
      },

      ssl: this.isProduction(),
    };
  }

  public getSwaggerConfig() {
    return new DocumentBuilder().setTitle('Church of Phillippi VCMS API')
      .setDescription('The documentation for the Church of Phillippi Vendor and Contract Management System')
      .setVersion(require('../../package.json').version)
      .build();
  }

}

const configService = new ConfigService(process.env)
  .ensureValues([
    'POSTGRES_HOST',
    'POSTGRES_PORT',
    'POSTGRES_USER',
    'POSTGRES_PASSWORD',
    'POSTGRES_DATABASE',
    'PORT',
    'SECRET_KEY'
  ]);

export { configService };