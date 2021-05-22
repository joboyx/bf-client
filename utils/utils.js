import auth from '@/store/auth'
import store from './../store'; // path to your Vuex store


function logger(x){
    console.log(x)
    console.log("store " + store)

}

function forceAuthHeader(){

}

export {
    logger
}