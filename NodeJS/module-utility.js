// NodeJS 工具模块

// OS模块

var os = require('os')
function printOSInfo() {
    console.log(os.tmpdir())
    console.log(os.endianness())
    console.log(os.hostname())
    console.log(os.type())
    console.log(os.platform())
    console.log(os.arch())
    console.log(os.release())
    console.log(os.uptime())
    console.log(os.loadavg())
    console.log(os.totalmem())
    console.log(os.freemem())
    console.log(os.cpus())
    console.log(os.networkInterfaces())
}
printOSInfo()

// Path 模块

var path = require('path')

function printPathInfo() {
    
}


// Net 模块

// DNS 模块

// Domain 模块