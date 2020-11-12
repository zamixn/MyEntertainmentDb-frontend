
import SystemUser from '../services/systemuser'

export const GAME_LIST_URL = "/games";
export const WATCHABLE_LIST_URL = "/watchables";
export const CREATORS_LIST_URL = "/creators";
export const USER_URL = "/user"
export const REGISTER_URL = "/register"

export const MY_GAME_LIST_URL = "/mygames";
export const MY_WATCHABLE_LIST_URL = "/mywatchables";



export const API_URL = 
    "https://mbd-backend.herokuapp.com";
    //"https://localhost:44325";
export const GAME_LIST_API_URL = API_URL + GAME_LIST_URL;
export const WATCHABLE_LIST_API_URL = API_URL + WATCHABLE_LIST_URL;
export const CREATORS_LIST_API_URL = API_URL + CREATORS_LIST_URL;

export const SYSTEMUSER_API_URL = API_URL + "/systemusers";
export const REGISTER_API_URL = SYSTEMUSER_API_URL + "/register";
export const LOGIN_API_URL = SYSTEMUSER_API_URL + "/login";
export const LOGOUT_API_URL = SYSTEMUSER_API_URL + "/" + SystemUser.getUserId() + "/logout";
export const RATEENTRY_API_URL = SYSTEMUSER_API_URL + "/" + SystemUser.getUserId() + "/rateentry";
export const MY_GAME_LIST_API_URL = SYSTEMUSER_API_URL + "/" + SystemUser.getUserId() + GAME_LIST_URL;
export const MY_WATCHABLE_LIST_API_URL = SYSTEMUSER_API_URL + "/" + SystemUser.getUserId() + WATCHABLE_LIST_URL;

export const AUTH_HEADER = {'Authorization': SystemUser.getJWT()};
export const METHOD_POST = "POST";
export const JSON_CONTENT_TYPE = {"Content-Type": "application/json"};