module.exports = {
    type: "mysql",
    migrationsTableName: "history",
    migrationsRun: false,
    synchronize: true,
    // logging: process.env.NODE_ENV === 'development',
    logging: false,
    password: process.env.DB_PASSWORD,
    username: process.env.DB_USERNAME,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306,
    entities: ["src/entities/**/*.ts"],
    migrations: ["src/migration/**/*.ts"],
    subscribers: []
};
