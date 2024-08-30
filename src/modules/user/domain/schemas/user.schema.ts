import "dotenv/config"
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { Role } from "src/shared/enums/roles.enum";

export type UserDocument = User & Document;

@Schema()
export class User {

    _id: string;

    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop({ required: true })
    roles: Role[];
}

export const UserSchema = SchemaFactory.createForClass(User)
