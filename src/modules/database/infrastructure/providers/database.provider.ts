import { DataSources } from "src/shared/constants/datasources.constants";
import { DataSource } from "typeorm";
import 'dotenv/config'

export const databaseProviders = [
    {
        provide: DataSources.PUBLIC_DATASOURCE,
        useFactory: async () => {
            const dataSource = new DataSource({
                type: 'postgres',
                host: process.env.DATABASE_HOST,
                port: parseInt(process.env.DATABASE_PORT),
                username: process.env.DATABASE_USERNAME,
                password: process.env.DATABASE_PASSWORD,
                database: process.env.DATABASE,
                schema: process.env.DATABASE_PUBLIC_SCHEMA,
                entities: [
                    __dirname + '/../**/*.entity{.ts,.js}',
                ],
                synchronize: true,
            });

            return dataSource.initialize();
        },
    },
];