import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

import {
    GET_ERRORS,
    SET_CURRRENT_USER,
    USER_LOADING
}from "./types";

//Register User
export const registerUser = (userData, history) => dispatch => {
    axios
        .post("/api/users/register", userData)
        .then(res => history.push("/login")) //redirect to login on successful register
        .catch( err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }))
};

//Login - get user token
export const loginUser = userData => dispatch => {
    axios
        .post("/api/users/login", userData)
        .then(res => {
            //set and save to local storage
            const { token } = res.data;
            localStorage.setItem("jwtToken", token);
            //set token to auth header
            setAuthToken(token);
            //decode token to get user data
            const decoded = jwt_decode(token);
            //set current user
            dispatch(setCurrentUser(decoded));
        })
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }))
} 

//set logged in user
export const setCurrentUser = decoded => {
    return{
        type: SET_CURRRENT_USER,
        payload: decoded
    }
}

//User Loading
export const setUserLoading = () => {
    return{
        type: USER_LOADING
    }
}

//Log User Out
export const logoutUser = () => dispatch => {
    //remove token from local storage
    localStorage.removeItem("jwtToken");
    //reove auth header from future requests
    setAuthToken(false)
    //set curent user to empty object which will set isUserAuthenticated to fale
    dispatch(setCurrentUser({}));
}