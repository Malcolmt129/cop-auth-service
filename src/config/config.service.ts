import { DocumentBuilder } from '@nestjs/swagger';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';

require('dotenv').config();

class ConfigService {

  constructor(private env: { [k: string]: string | undefined }) { }

  /**
   * 
   * @param key environment variable key
   * @param throwOnMissing whether the getValue function should throw an error if the key doesn't exist
   * @returns the environment variable value
   */
  private getValue(key: string, throwOnMissing: boolean = true): string {
    if (!this.env[key] && throwOnMissing) {
      throw new Error(`config error - missing env.${key}`);
    }
    return this.env[key];
  }

  /**
   * 
   * @param keys array of environment variable keys to check for
   * @returns instance of class
   */
  public ensureValues(keys: string[]) {
    keys.forEach(k => this.getValue(k, true));
    return this;
  }

  /**
   * 
   * @returns the PORT environment variable
   */
  public getPort() {
    return this.getValue('PORT', true);
  }

  /**
   * 
   * @returns the SECRET_KEY environment variable
   */
  public getJWTSecret() {
    return this.getValue('SECRET_KEY', true);
  }

  /**
   * 
   * @returns whether the environment is running in production
   */
  public isProduction() {
    const mode = this.getValue('ENV_TYPE', false);
    return mode != 'DEV';
  }

  /**
   * 
   * @returns typeOrm Configuration needed by the forRoot function
   */
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

      // cli: {
      //   migrationsDir: 'src/migration',
      // },

      ssl: this.isProduction(),

      synchronize: true
    };
  }

  public getSwaggerConfig() {
    return new DocumentBuilder().setTitle('Church of Phillippi VCMS API')
      .setDescription('The documentation for the Church of Phillippi Vendor and Contract Management System')
      .setVersion(require('../../package.json').version)
      .build();
  }

}

/**
 * Exports new instance of configService with expected variables set
 */
const configService = new ConfigService(process.env)
  .ensureValues([
    'POSTGRES_HOST',
    'POSTGRES_PORT',
    'POSTGRES_USER',
    'POSTGRES_PASSWORD',
    'POSTGRES_DATABASE',
    'PORT'
  ]);
export { configService };
