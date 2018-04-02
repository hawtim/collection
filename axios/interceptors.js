axios.interceptors.request.use(config => {
    if (config.method == 'get') {
        config.params = {
            ...config.params,
            _t: new Date().getTime()
        }
    }
    return config
}, err => {
    return Promise.reject(err)
})

axios.interceptors.response.use(res => {
    return res.data.Code === 200 ? res : Promise.reject(res)
}, err => {
    if (!err.response) {
        err.response = {
            Code: 9990,
            Message: '请求超时',
            data: {}
        }
        return Promise.reject(err)
    }
    let errorMessage = err.response.data.Message
    if (error.response.status === 'xxx') {
        console.log('xxxx')
        return Promise.reject(err)
    }
})

