import { createConnection } from 'typeorm'

export const databaseProviders = [
    {
        provide: process.env.DB_CONN,
        useFactory: async () => await createConnection({
            type: 'postgres',
            host: process.env.ENV_TYPE === "production" ? process.env.HOST : 'localhost',
            port: Number(process.env.PORT),
            username: process.env.USERNAME,
            password: process.env.PASSWORD,
            database: process.env.DB,
            synchronize: process.env.ENV_TYPE !== "production"
        })
    },
];