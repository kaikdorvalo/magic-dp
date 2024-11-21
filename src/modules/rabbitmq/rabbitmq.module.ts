import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { rabbitMQImportDeckProvider, rabbitMQImportedDeckProvider } from "./infrastructure/providers/rabbitmq.client.providers";

@Module({
    providers: [
        rabbitMQImportDeckProvider,
        rabbitMQImportedDeckProvider,
    ],
    exports: [
        rabbitMQImportDeckProvider,
        rabbitMQImportedDeckProvider,
    ]
})
export class RabbitMQModule { }