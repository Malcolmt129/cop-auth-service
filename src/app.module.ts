import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { databaseProviders } from './database.providers';

@Module({
  imports: [AuthModule],
  controllers: [AppController],
  providers: [AppService, ...databaseProviders],
  exports: [...databaseProviders]
})
export class AppModule {}
