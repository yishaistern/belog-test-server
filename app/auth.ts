import * as reponses from './reponse-handle';
import { FunctionsResponse, ResponseStatus } from "./infterces";
export const users: Map<string, {name: string, time: number}> = new Map<string, any>();

/**
 * log in a new user, add it to are "in memory" data base, 
 * are data base can have only 400 users
 * @param req 
 * @param res 
 */
export function logUser(req: any, res: any): FunctionsResponse {
    const name = req.body.name;
    const time = new Date().getTime();
    const key = name + new Date().getTime();
    const oldKey = (req.headers.bearer) ? req.headers.bearer : null;
    let user = {
        name: name,
        time: time
    };
    const oldUser = users.get(oldKey);
    console.log(oldUser);
    // check if it is the same user
    if (oldUser && name === oldUser.name) {
        users.delete(oldKey);
    }
    users.set(key, user);
    if(users.size > 400) {
     const first = users.keys().next();
     users.delete(first.value);
    }
    req.session.user_key = key;
    console.log(users.size);
    return {
        status: ResponseStatus.SUCCESS,
        data: {
            key: key,
            name: name,
        }
    };
}

/**
 * check if there is an active "session"
 * @param req 
 * @param res 
 * @param next 
 */
export function isLooged(req: any, res: any, next: any) {
    let correctKey = req.session.user_key;
    let item = users.get(correctKey);
    if (!item) {
        correctKey = req.headers.bearer;
        item = users.get(correctKey);
    }
    if (item) {
        // for implementing LRU in the map 
        users.delete(correctKey);
        item.time = (new Date().getTime());
        users.set(correctKey, item);
        req.currentUser = item.name;
        next();
    } else {
        // console.log('user with no session');
        res.send(reponses.getResponse(req, {status: ResponseStatus.NO_USER, data: {}}))
    }
}