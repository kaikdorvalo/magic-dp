import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { CardModule } from './modules/card/card.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './modules/auth/auth.module';
import { RabbitMQModule } from './modules/rabbitmq/rabbitmq.module';
import { GatewayModule } from './modules/gateway/gateway.module';
import "dotenv/config"

@Module({
  imports: [
    GatewayModule,
    RabbitMQModule,
    MongooseModule.forRoot(process.env.MONGO_URL),
    UserModule,
    CardModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
