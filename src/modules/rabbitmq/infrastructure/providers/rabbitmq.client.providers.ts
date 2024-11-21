import { Provider } from "@nestjs/common";
import { ClientProxyFactory, Transport } from "@nestjs/microservices";

export const rabbitMQImportDeckProvider: Provider = {
    provide: 'CARDS_IMPORT',
    useFactory: () => {
        return ClientProxyFactory.create({
            transport: Transport.RMQ,
            options: {
                urls: ['amqp://localhost:5672'],
                queue: 'deck_import_queue',
            },
        });
    },
};

export const rabbitMQImportedDeckProvider: Provider = {
    provide: 'CARDS_IMPORTED',
    useFactory: () => {
        return ClientProxyFactory.create({
            transport: Transport.RMQ,
            options: {
                urls: ['amqp://localhost:5672'],
                queue: 'deck_updates_queue'
            }
        })
    }
}