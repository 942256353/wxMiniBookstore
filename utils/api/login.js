import {post} from "../request"

function registAPI(params){
    return post('/user/register',params)
}

function loginAPI(params){
    return post('/user/login',params)
}

export {
    registAPI,
    loginAPI
}