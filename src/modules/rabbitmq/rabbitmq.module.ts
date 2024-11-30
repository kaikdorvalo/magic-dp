import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { rabbitMQDeckNotifyProvider, rabbitMQImportDeckProvider, rabbitMQImportedDeckProvider } from "./infrastructure/providers/rabbitmq.client.providers";

@Module({
    providers: [
        rabbitMQImportDeckProvider,
        rabbitMQImportedDeckProvider,
        rabbitMQDeckNotifyProvider
    ],
    exports: [
        rabbitMQImportDeckProvider,
        rabbitMQImportedDeckProvider,
        rabbitMQDeckNotifyProvider
    ]
})
export class RabbitMQModule { }