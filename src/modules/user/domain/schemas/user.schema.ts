import { ColdObservable } from "rxjs/internal/testing/ColdObservable";
import { TableNames } from "src/shared/constants/table-names.constants";
import { USER_TABLE } from "src/shared/constants/tables.constants";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import "dotenv/config"
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type UserDocument = User & Document;

@Schema()
export class User {
    @Prop()
    _id: string

    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    email: string;

    @Prop({ required: true })
    password: string;
}

export const UserSchema = SchemaFactory.createForClass(User)
