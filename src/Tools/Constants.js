
import SystemUser from '../services/systemuser'

export const GAMES_URL = "/games";
export const WATCHABLES_URL = "/watchables";
export const CREATORS_URL = "/creators";
export const USER_URL = "/user"
export const REGISTER_URL = "/register"

export const MY_GAME_LIST_URL = "/mygames";
export const MY_WATCHABLE_LIST_URL = "/mywatchables";
export const CREATOR_URL = "/creator";
export const GAME_URL = "/game";
export const WATCHABLE_URL = "/watchable";
export const GAME_CREATE_URL = "/creategame";
export const WATCHABLE_CREATE_URL = "/createwatchable";

export function getGameURL(id){
    return GAME_URL + '/' + id;
}
export function getWatchableURL(id){
    return WATCHABLE_URL + '/' + id;
}
export function getCreatorURL(id){
    return CREATOR_URL + '/' + id;
}



export const API_URL = 
    "https://mbd-backend.herokuapp.com";
    //"https://localhost:44325";
export const GAME_LIST_API_URL = API_URL + GAMES_URL;
export const WATCHABLE_LIST_API_URL = API_URL + WATCHABLES_URL;
export const CREATORS_LIST_API_URL = API_URL + CREATORS_URL;
export function getGameAPI_URL(id){
    return API_URL + GAMES_URL + '/' + id;
}
export function getWatchableAPI_URL(id){
    return API_URL + WATCHABLES_URL + '/' + id;
}
export function getCreatorAPI_URL(id){
    return API_URL + CREATORS_URL + '/' + id;    
}


export const SYSTEMUSER_API_URL = API_URL + "/systemusers";
export const REGISTER_API_URL = SYSTEMUSER_API_URL + "/register";
export const LOGIN_API_URL = SYSTEMUSER_API_URL + "/login";
export const VALIDATE_LOGIN_URL = SYSTEMUSER_API_URL + "/" + SystemUser.getUserId() + "/validatelogin";
export const LOGOUT_API_URL = SYSTEMUSER_API_URL + "/" + SystemUser.getUserId() + "/logout";
export const RATEENTRY_API_URL = SYSTEMUSER_API_URL + "/" + SystemUser.getUserId() + "/rateentry";
export const MY_GAME_LIST_API_URL = SYSTEMUSER_API_URL + "/" + SystemUser.getUserId() + GAMES_URL;
export const MY_WATCHABLE_LIST_API_URL = SYSTEMUSER_API_URL + "/" + SystemUser.getUserId() + WATCHABLES_URL;

export function getRatedGameAPI_URL(id){
    return SYSTEMUSER_API_URL + '/' +  SystemUser.getUserId() +  GAMES_URL + '/' + id;
}
export function getRatedWatchableAPI_URL(id){
    return SYSTEMUSER_API_URL + '/' +  SystemUser.getUserId() +  WATCHABLES_URL + '/' + id;
}

export const AUTH_HEADER = {'Authorization': SystemUser.getJWT()};
export const METHOD_POST = "POST";
export const JSON_CONTENT_TYPE = {"Content-Type": "application/json"};



export const BREAKPOINT_WIDTH = 1200;
export const IMAGE_NOT_FOUND_URL = 'https://icon-library.com/images/no-icon/no-icon-5.jpg';