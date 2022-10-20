import request from './request'


export const RegisterApi = (params) => request.post('/register', params)


export const LoginApi = (params) => request.post('/login', params)


export const ArticleListApi = (params) => request.get('/article', {params})


export const ArticleAddApi = (params) => request.post('/article/add', params)


export const ArticleSearchApi = (params) => request.get(`/article/${params.id}`)


export const ArticleUpdateApi = (params) => request.put('/article/update', params)

export const ArticleDelApi = (params) => request.post('/article/remove', params)


export const GetUserDataApi = () => request.get('/info')


export const ChangeUserDataApi = (params) => request.put('/info', params)
