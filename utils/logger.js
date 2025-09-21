import winston from "winston";

const logger = winston.createLogger({
    format: winston.format.combine(
        winston.format.label({ label: "auth-service" }),
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [new winston.transports.Console()]
});


export default logger;
