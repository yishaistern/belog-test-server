"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isLooged = exports.logUser = exports.users = void 0;
var reponses = __importStar(require("./reponse-handle"));
var infterces_1 = require("./infterces");
exports.users = new Map();
/**
 * log in a new user, add it to are "in memory" data base,
 * are data base can have only 400 users
 * @param req
 * @param res
 */
function logUser(req, res) {
    var name = req.body.name;
    var time = new Date().getTime();
    var key = name + new Date().getTime();
    var oldKey = (req.headers.bearer) ? req.headers.bearer : null;
    var user = {
        name: name,
        time: time
    };
    var oldUser = exports.users.get(oldKey);
    console.log(oldUser);
    // check if it is the same user
    if (oldUser && name === oldUser.name) {
        exports.users.delete(oldKey);
    }
    exports.users.set(key, user);
    if (exports.users.size > 400) {
        var first = exports.users.keys().next();
        exports.users.delete(first.value);
    }
    req.session.user_key = key;
    console.log(exports.users.size);
    return {
        status: infterces_1.ResponseStatus.SUCCESS,
        data: {
            key: key,
            name: name,
        }
    };
}
exports.logUser = logUser;
/**
 * check if there is an active "session"
 * @param req
 * @param res
 * @param next
 */
function isLooged(req, res, next) {
    var correctKey = req.session.user_key;
    var item = exports.users.get(correctKey);
    if (!item) {
        correctKey = req.headers.bearer;
        item = exports.users.get(correctKey);
    }
    if (item) {
        // for implementing LRU in the map 
        exports.users.delete(correctKey);
        item.time = (new Date().getTime());
        exports.users.set(correctKey, item);
        req.currentUser = item.name;
        next();
    }
    else {
        // console.log('user with no session');
        res.send(reponses.getResponse(req, { status: infterces_1.ResponseStatus.NO_USER, data: {} }));
    }
}
exports.isLooged = isLooged;
//# sourceMappingURL=auth.js.map