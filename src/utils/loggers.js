import winston from "winston";

const coustomLevelsOptions = {
  levels: {
    debug: 5,
    http: 4,
    info: 3,
    warning: 2,
    error: 1,
    fatal: 0,
  }
};

const devLogger = winston.createLogger({
  levels: coustomLevelsOptions.levels,
  transports: [new winston.transports.Console({level: "debug"})],
});

const prodLogger = winston.createLogger({
  levels: coustomLevelsOptions.levels,
  transports: [
    new winston.transports.Console({level: "info"}),
    new winston.transports.File({
      filename: "./errors.log",
      level: "error",
    }),
  ],
});
const loggersLevels = {
  production: prodLogger,
  development: devLogger,
};

export function setLogger(req, res, next) {
  req.logger = loggersLevels[`${process.env.NODE_ENV}`];
  next();
}
