const fs = require('fs');

var readIt = () => {
    try {
        var command = fs.readFileSync('random.txt').toString();
        var it = command.split(',');
        return it;
    } catch (e) {
        return null;
    }
};

module.exports = readIt();