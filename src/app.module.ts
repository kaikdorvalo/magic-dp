import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { CardModule } from './modules/card/card.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/magic_dp'),
    UserModule,
    CardModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
