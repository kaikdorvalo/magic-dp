import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './modules/database/database.module';
import { UserModule } from './modules/user/user.module';
import { CardModule } from './modules/card/card.module';

@Module({
  imports: [
    DatabaseModule,
    UserModule,
    CardModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
