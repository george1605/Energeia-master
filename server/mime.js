const fs = require('node:fs');
const http = require('node:http');

const types = {
    JPEG: "image/jpeg",
    TXT: "text/plain",
    HTML: "text/html",
    JS: "text/javascript",
    BMP: "image/bmp",
    CSS: "text/css",
    PNG: "image/png",
    from(file) {
        var x = file.split(".");
        return types[x[x.length - 1].toUpperCase()] || "text/plain";
    },
    send(res, file, encoding) {
        res.writeHead(200, { "Content-Type": types.from(file) });
        res.write(fs.readFileSync(file, encoding || "utf8"));
        res.end();
    },
    sendPipe(res, file) {
        res.writeHead(200, { "Content-Type": types.from(file) });
        var stream = fs.createReadStream(file);
        stream.on('open', () => {
            stream.pipe(res);
        })
        stream.on('error', (err) => {
            res.end('<code style="color:red">Internal Server Error - Check the Log</code>');
        })
    }
};

module.exports = types;