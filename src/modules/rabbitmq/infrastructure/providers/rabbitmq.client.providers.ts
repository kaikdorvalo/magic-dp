import { Provider } from "@nestjs/common";
import { ClientProxyFactory, Transport } from "@nestjs/microservices";
import "dotenv/config"

export const rabbitMQImportDeckProvider: Provider = {
    provide: 'CARDS_IMPORT',
    useFactory: () => {
        return ClientProxyFactory.create({
            transport: Transport.RMQ,
            options: {
                urls: [process.env.RABBITMQ_URL],
                queue: 'deck_import_queue',
                queueOptions: {
                    arguments: {
                        'x-max-priority': 10,
                    },
                },
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
                urls: [process.env.RABBITMQ_URL],
                queue: 'deck_updates_queue'
            }
        })
    }
}
export const rabbitMQDeckNotifyProvider: Provider = {
    provide: 'CARDS_NOTIFY',
    useFactory: () => {
        return ClientProxyFactory.create({
            transport: Transport.RMQ,
            options: {
                urls: [process.env.RABBITMQ_URL],
                queue: 'deck_notify_queue'
            }
        })
    }
}