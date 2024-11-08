const dotenv = require("dotenv");
dotenv.config();

exports.app_configuration = {
    PORT: process.env.PORT,
    APP_NAME: process.env.APP_NAME,
    TYPE: process.env.TYPE,
    SESSION_SECRET: process.env.SESSION_SECRET,
    MONGO_DETAILS: process.env.MONGO_URL,
    NODEMAILER_USER: process.env.NODEMAILER_USER,
    NODEMAILER_PASSWORD: process.env.NODEMAILER_PASSWORD,
    AZURE_STORAGE_CONNECTION_STRING: process.env.AZURE_STORAGE_CONNECTION_STRING,
    CONTAINER_NAME: process.env.CONTAINER_NAME,
    ACCOUNT_NAME: process.env.ACCOUNT_NAME,
    KEY: process.env.KEY,
    TRANSCRIPTION_SUBSCRIPTION: process.env.TRANSCRIPTION_SUBSCRIPTION
};
