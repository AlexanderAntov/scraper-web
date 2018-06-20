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
};

const output = readdirRecursive(process.argv[2]).map((file) => {
    if (fs.existsSync(file) && file.endsWith('.js')) {
        return fs.readFileSync(file).toString();
    }
}).join(';');

fs.writeFileSync('index.min.js', output);
