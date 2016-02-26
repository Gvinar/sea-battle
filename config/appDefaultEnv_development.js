"use strict";

if (!process.env.APPLICATION_PORT){
    process.env.APPLICATION_PORT = "4000";
}

if (!process.env.LOGGER_LEVEL){
    process.env.LOGGER_LEVEL = "trace";
}

if (!process.env.DB_URL){
    process.env.DB_URL = "mongodb://{username}:{password}@127.0.0.1:27017/{dbName}";
}

if (!process.env.DB_USERNAME){
    throw new Error("DB Username is not set");
}

if (!process.env.DB_PASSWORD){
    throw new Error("DB Password is not set");
}

if (!process.env.DB_NAME){
    process.env.DB_NAME = "local-sea-battle-dev";
}