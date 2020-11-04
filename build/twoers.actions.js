"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSingleTower = exports.getList = void 0;
var infterces_1 = require("./infterces");
var twoers_1 = require("./twoers");
/**
 * this function gets all of the bulding and returns the data of all of them.
 * we minimize the payload for the performance and the function return an array of
 * MinTowers and not a array of towers
 * @param request
 */
function getList(request) {
    console.log('Call tower list');
    var list = twoers_1.twoerObj;
    // Now we will create a situation as if there is a call to the database and it returns
    // only the fields we want for performance issues
    var keys = Object.keys(list);
    var returnArr = [];
    for (var i = 0; i < keys.length; i++) {
        var item = list[keys[i]];
        returnArr.push({ name: item.name, id: item.id });
    }
    console.log('return tower minumized list');
    var answer = {
        firstTower: (list[keys[0]]),
        towers: returnArr
    };
    return {
        data: answer,
        status: infterces_1.ResponseStatus.SUCCESS
    };
}
exports.getList = getList;
/**
 * get all details of a tower
 * @param request
 */
function getSingleTower(request) {
    var id = request.towerId;
    var tower = twoers_1.twoerObj[id];
    var answer = {
        tower: (tower) ? tower : null
    };
    var resposne = {
        data: answer,
        status: (tower) ? infterces_1.ResponseStatus.SUCCESS : infterces_1.ResponseStatus.BAD_CONTENT
    };
    return resposne;
}
exports.getSingleTower = getSingleTower;
//# sourceMappingURL=twoers.actions.js.map