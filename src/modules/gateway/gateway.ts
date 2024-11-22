import { OnModuleInit } from "@nestjs/common"
import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets"
import { Server, Socket } from 'socket.io'

@WebSocketGateway()
export class Gateway implements OnModuleInit {
    @WebSocketServer()
    server: Server

    private clients = new Map<string, Socket>();

    onModuleInit() {
        this.server.on('connection', (socket) => {
            console.log(socket.id)
            console.log('Conectado')
        })
    }

    @SubscribeMessage("newMessage")
    onMessage(@MessageBody() body: any) {
        console.log(body)
    }

    sendMessage(clientId: string, message: any) {
        const client = this.clients.get(clientId);
        if (client) {
            client.emit('deck_imported', message);
        }
    }
}