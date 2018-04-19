import axios from 'axios'
import {Message} from 'element-ui'
import router from '../router'

export default {
    install: function (V) {
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
            if (error.response.status === 403) {
                Message({
                    type: error,
                    message: '登录信息已过期，请重新登录！',
                    duration: 3000
                })
                setTimeout(() => {
                    // window.location.href = ''
                }, 1000)
                return Promise.reject(err)
            }
        })

        V.$axios = axios
        V.prototype.$axios = axios
    }
}



