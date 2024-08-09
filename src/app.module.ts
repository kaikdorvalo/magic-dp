import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './modules/database/database.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [],
  controllers: [],
  providers: [
    DatabaseModule,
    UserModule
  ],
})
export class AppModule { }
