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
var express = require("express");
var bodyParser = require("body-parser");
var varibales_1 = require("./varibales");
var session = require('express-session');
var toweActions = __importStar(require("./twoers.actions"));
var reponses = __importStar(require("./reponse-handle"));
var auth_1 = require("./auth");
// Create a new express app instance
var app = express();
var port = process.env.PORT || varibales_1.PORT;
app.use(session({ secret: "Shh, its a secret!" }));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, bearer");
    next();
});
app.use(bodyParser.json());
app.get('/', function (req, res) {
    res.send('Hello World!');
});
app.listen(port, function () {
    console.log('App is listening on port ' + varibales_1.PORT + '!');
});
/**
 * api call to get all of the towers
 */
app.post('/tower-list', auth_1.isLooged, function (req, res, next) {
    var list = toweActions.getList(req);
    res.send(reponses.getResponse(req, list));
});
/**
 * api call to get one tower
 */
app.post('/get-tower', auth_1.isLooged, function (req, res) {
    // console.log(req.body);
    var towerResponse = toweActions.getSingleTower(req.body);
    res.send(reponses.getResponse(req, towerResponse));
});
app.post('/log-in', function (req, res) {
    var towerResponse = auth_1.logUser(req, res);
    res.send(reponses.getResponse(req, towerResponse));
});
//# sourceMappingURL=app.js.map