const fs = require("fs");

const logger = (req, res, next) => {
    const log = `[${new Date().toISOString()}] ${req.method} ${req.url}\n`;
    fs.appendFileSync("logs.txt", log);
    console.log(log);
    next();
};

module.exports = logger;
