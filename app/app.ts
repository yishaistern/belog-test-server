import express = require('express');
import bodyParser = require('body-parser');
import { PORT } from './varibales';
var session = require('express-session');
import * as toweActions from './twoers.actions';
import * as reponses from './reponse-handle';
import { ResponseStatus, TowerListResponse, FunctionsResponse } from './infterces';
import { isLooged, logUser } from './auth';
// Create a new express app instance
const app: express.Application = express();
const port = process.env.PORT || PORT;
app.use(session({secret: "Shh, its a secret!"}));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, bearer");
    next();
});

app.use(bodyParser.json());
app.get('/', function (req, res) {
    res.send('Hello World!');
});
app.listen(port, function () {
    console.log('App is listening on port ' + PORT + '!');
});

/**
 * api call to get all of the towers
 */
app.post('/tower-list', isLooged ,function (req, res, next) {
    const list: FunctionsResponse = toweActions.getList(req);
    res.send(reponses.getResponse(req, list));
});
/**
 * api call to get one tower
 */
app.post('/get-tower', isLooged,  function (req, res) {
    // console.log(req.body);
    const towerResponse: FunctionsResponse = toweActions.getSingleTower(req.body);
    res.send(reponses.getResponse(req, towerResponse));
}); 

app.post('/log-in', function (req, res) {
    const towerResponse: FunctionsResponse = logUser(req, res);
    res.send(reponses.getResponse(req, towerResponse));
}); 
