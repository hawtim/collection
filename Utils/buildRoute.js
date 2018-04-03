export function isEmptyObject(obj) {
    return Object.prototype.isPrototypeOf(obj) && Object.keys(obj).length == 0
}

export function buildObj(obj) {
    let query = {}
    for (let key in obj) {
        if (obj[key] !== '' || obj[key] !== 'undefined') {
            query[key] = obj[key]
        }
    }
    return query
}

export function getRoute(_route, query) {
    const route = {name: _route.name}
    route.params = Object.assign({}, _route.params)
    route.query = Object.assign({}, query)
    return route
}

export function goRoute(_route, _query) {
    const query = _query ? Object.assign({}, query) : {}
    const route = getRoute(_route, query)
    router.push(route)
}

export function replaceRoute(_route, _query) {
    const query = _query ? Object.assign({}, query) : {}
    const route = getRoute(_route, query)
    router.replace(route)
}