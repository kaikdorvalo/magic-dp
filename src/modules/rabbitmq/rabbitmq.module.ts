import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { rabbitMQImportDeckProvider } from "./infrastructure/providers/rabbitmq.client.providers";

@Module({
    providers: [
        rabbitMQImportDeckProvider
    ],
    exports: [
        rabbitMQImportDeckProvider
    ]
})
export class RabbitMQModule { }