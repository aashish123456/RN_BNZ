/**
 * action/index.js
 */

export const LOGIN_SUCCESS = 'LOGIN_SUCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';

export function login(userCredentials) {
    if (userCredentials.username === 'testuser' && userCredentials.password === '4') {
        return {
            type: LOGIN_SUCCESS
        }
    } else {
        return {
            type: LOGIN_ERROR
        }
    }
}