import axios from 'axios'
import store from '../store/index'
import qs from 'qs'

const myAxios = axios.create({
    timeout: 10000
})
axios.defaults.withCredentials = true;
myAxios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
/** 
 * axios设置请求拦截与响应拦截
 */
myAxios.interceptors.request.use(
    config => {
        const token = store.state.token;     
        token && (config.headers.Authorization = `Bear ${token}`);        
        return config;
    },
    error => {
        console.log(error);
    }
)

myAxios.interceptors.response.use(
    res => {
        return res
    },
    error => {
        if (error.message === '终止请求') {
            return Promise.reject(error);
        }
        if (error && error.response.data.code == 10002) {
            Toast.info(error.response.data.message);
        }
        if (error && error.response.data.code == 500 || error.response.data.code == 503) {
            // Toast.info(error.response.data.msg, () => {
            //   if (error.response.data.msg == '该媒体不属于该账号') {
            //     location.href = '/tuijian/media';
            //   }
            // });
            Toast.info('请求服务器失败');
        }
        if (error && error.response.data.code == 400) {
            Toast.info(error.response.data.msg);
        }
        return Promise.reject(error);
    }
)

const get = ({url, type = 'get', data = {}, headers = {}}) => {
    const param = data.param;
    return myAxios({
        method: type,
        headers: headers,
        url: url + `?t=${new Date().getTime()}`,
        withCredentials: true,
        ...param
    }).catch(error => {
        if (error.response.status == 511) {
            location.href = 'http://localhost:8080/'
        }
        error.data = {
            code: 10002
        }
        return Promise.resolve(error);
    })
}

export const post = ({method = 'post', url, params, requestMethod = 'requestParams', headers = {}}) => {
    return myAxios({
        method,
        url,
        data: requestMethod === 'requestParams' ? qs.stringify(params) : params,
        headers
    }).catch(error => {
        error.data = {
            code: 10002,
        }
        return Promise.resolve(error);
    })
}

export default get;