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

    allLogs.push(log);
    saveLog(allLogs);
    if (log.logtype === 'Twitter') {
        let twitterReturn = '';
        for (let i = 0; i < log.result.length; i++) {
            twitterReturn += '\n' + log.result[i];
        }
        return twitterReturn;
    } else {
        return log.result;
    }

};

module.exports = {
    addLog,
};