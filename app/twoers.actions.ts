import { MinTower, Tower, TowerListResponse, SingleTowerResponse, FunctionsResponse, ResponseStatus, GetTowerPayload } from "./infterces";
import { twoerObj } from './twoers';

/**
 * this function gets all of the bulding and returns the data of all of them.
 * we minimize the payload for the performance and the function return an array of 
 * MinTowers and not a array of towers
 * @param request 
 */
export function getList(request: any): FunctionsResponse {
    console.log('Call tower list')
    const list: any = twoerObj;
    // Now we will create a situation as if there is a call to the database and it returns
    // only the fields we want for performance issues
    const keys = Object.keys(list);
    const returnArr: MinTower[] = [];
    for (let i = 0; i < keys.length; i++) {
        const item: Tower = list[keys[i]];
        returnArr.push({name: item.name, id: item.id});
    }
    console.log('return tower minumized list')
    const answer: TowerListResponse = {
        firstTower: (<Tower>(list[keys[0]])),
        towers: returnArr
    }
    return {
       data: answer,
       status: ResponseStatus.SUCCESS 
    };
}

/**
 * get all details of a tower 
 * @param request 
 */
export function getSingleTower(request: GetTowerPayload): FunctionsResponse {
    const id = request.towerId;
    const tower = twoerObj[id];
    const answer: SingleTowerResponse = {
        tower: (tower) ? tower : null
    }
    const resposne: FunctionsResponse = {
        data: answer,
        status: (tower) ? ResponseStatus.SUCCESS : ResponseStatus.BAD_CONTENT
    }
    return resposne;
}