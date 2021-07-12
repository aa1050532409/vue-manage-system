import axios from "axios";


export function get(config) {
  return new Promise((resolve,reject)=>{
    const instance = axios.create({
      baseURL: "http://timemeetyou.com:8889/api/private/v1",
    })

    instance.interceptors.request.use(config => {
      config.headers.authorization = window.sessionStorage.getItem('token')
      return config
    })

    resolve(instance(config))
  })
}
