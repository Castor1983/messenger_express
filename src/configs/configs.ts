import { config } from "dotenv";

config();

export const configs = {
    PORT: process.env.PORT || 5001,
    FRONT_URL: process.env.FRONT_URL || "http://0.0.0.0:3000",
    SECRET_SALT: process.env.SECRET_SALT,
    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,

    FIREBASE: {
        apiKey: process.env.API_KEY,
        authDomain: process.env.AUTH_DOMAIN,
        databaseURL: process.env.DATABASE_URL,
        projectId: process.env.PROJECT_ID,
        storageBucket: process.env.STORAGE_BUCKET,
        messagingSenderId: process.env.MESSAGING_SENDER_ID,
        appId: process.env.APP_ID
    }
};
