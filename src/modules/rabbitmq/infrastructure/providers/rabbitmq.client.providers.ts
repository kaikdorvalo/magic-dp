import { Provider } from "@nestjs/common";
import { ClientProxyFactory, Transport } from "@nestjs/microservices";

export const rabbitMQImportDeckProvider: Provider = {
    provide: 'CARDS_SERVICE',
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