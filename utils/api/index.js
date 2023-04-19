import {get} from "../request"
function getMoodListAPI(params){
    return get('/mood/list',params)
}
export {
    getMoodListAPI
}