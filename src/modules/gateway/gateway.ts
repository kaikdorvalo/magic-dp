import { OnModuleInit } from "@nestjs/common"
import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets"
import { Server, Socket } from 'socket.io'

@WebSocketGateway()
export class Gateway {
    @WebSocketServer()
    server: Server

    sendMessageToClient(event: string, data: any) {
        this.server.emit(event, data);
    }
}