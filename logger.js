const fs = require('fs');
const logFile = 'log.txt';

var readLog = () => {
    try {
        var strLogFile = fs.readFileSync(logFile);
        return JSON.parse(strLogFile);
    } catch (e) {
        return [];
    }
};

var saveLog = (allLogs) => {
    fs.writeFileSync(logFile, JSON.stringify(allLogs));
};

var addLog = (logtype, result) => {

    var allLogs = readLog();

    var log = {
        logtype,
        result
    };

    allLogs.push(log.result);
    saveLog(allLogs);
    return log.result;
};

module.exports = {
    addLog,
};