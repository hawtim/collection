function replace(regex, opt) {
    regex = regex.source
    opt = opt || ''
    return function self (name, val) {
        if (!name) return new RegExp(regex, opt)
        val = val.source || val
        val = val.replace(/(^|[^\[])\^/g, '$1')
        regex = regex.replace(name, val)
        return self
    }
}

var str = `if ( a= b) {`
var str1 = `if (  a[b] = c.d)  {`
var str2 = `if  ( a.b = c.d ) {`
var propertyReg = /[a-zA-Z\[\]\.]*/

var ifReg = /if\s*\(\s*propertyReg\s*=\s*propertyReg\s*\)/
ifReg = replace(ifReg)(/propertyReg/g, propertyReg)()
console.log(str.match(ifReg))
console.log(str1.match(ifReg))
console.log(str2.match(ifReg))