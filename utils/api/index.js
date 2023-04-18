import {get,post} from "../request"
function login(data){
    return post("/login",data);
}

function register(data){
    return post("/register",data);
}

export {
    login,
    register
}