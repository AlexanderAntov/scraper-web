const fs = require('fs');

const readdirRecursive = (dir) => {
    let results = [];
    let list = fs.readdirSync(dir);
    list.forEach((file) => {
        file = dir + '/' + file;
        let stat = fs.statSync(file);
        if (stat && stat.isDirectory()) { 
            results = results.concat(readdirRecursive(file));
        } else {
            results.push(file);
        }
    });
    return results;
}

const output = readdirRecursive('./dist/').map((file) => {
    if (fs.existsSync(file)) {
        return fs.readFileSync(file).toString();
    }
}).join(';');

fs.writeFileSync('dist/index.min.js', output)
