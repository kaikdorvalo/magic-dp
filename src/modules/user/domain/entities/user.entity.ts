import { ColdObservable } from "rxjs/internal/testing/ColdObservable";
import { TableNames } from "src/shared/constants/table-names.constants";
import { USER_TABLE } from "src/shared/constants/tables.constants";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: TableNames.USER })
export class User {
    @PrimaryGeneratedColumn({ name: USER_TABLE.ID })
    id: number;

    @Column({ name: USER_TABLE.NAME })
    name: string;

    @Column({ name: USER_TABLE.EMAIL })
    email: string;

    @Column({ name: USER_TABLE.PASSWORD })
    password: string;
}
