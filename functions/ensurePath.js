var fs = require('fs');

module.exports = (path, cb) => {
    if ( fs.existsSync(path) ){
        cb()
    } else{
        fs.mkdirSync(path)
        cb()
    }
}