import axios from 'axios'

// 配置项
const axiosOption = {
    baseURL: '/api',
    timeout: 5000
}


const instance = axios.create(axiosOption);


instance.interceptors.request.use(function (config) {
  let token = localStorage.getItem('cms-token')
  if(token){
    config.headers = {
      'cms-token': token
    }
  }
  return config;
}, function (error) {
 
  return Promise.reject(error);
});

//
instance.interceptors.response.use(function (response) {

  return response.data;
}, function (error) {
  
  return Promise.reject(error);
});

export default instance;
