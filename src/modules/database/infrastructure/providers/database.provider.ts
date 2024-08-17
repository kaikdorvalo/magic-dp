import { DataSources } from "src/shared/constants/datasources.constants";
import { DataSource } from "typeorm";
import 'dotenv/config'
import { User } from "src/modules/user/domain/entities/user.entity";

const dataSourceConfig = new DataSource({
    type: 'postgres',
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
    schema: process.env.DATABASE_PUBLIC_SCHEMA,
    entities: [
        User
    ],
    migrations: ["src/modules/database/infrastructure/migrations/*{.ts,.js}"],
    synchronize: false,
});

export const databaseProviders = [
    {
        provide: DataSources.PUBLIC_DATASOURCE,
        useFactory: async () => {
            return dataSourceConfig.initialize();
        },
    },
];

export default dataSourceConfig