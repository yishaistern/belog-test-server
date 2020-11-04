"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getResponse = void 0;
var infterces_1 = require("./infterces");
/**
 * payload for every type of call
 * @param req
 * @param payload
 */
function getResponse(req, payload) {
    var answer = {
        data: payload.data,
        error: { code: -50 },
        user: req.currentUser
    };
    switch (payload.status) {
        case infterces_1.ResponseStatus.SUCCESS:
            // console.log('Call was success');
            answer.error.code = 0;
            break;
        case infterces_1.ResponseStatus.FAIL:
            // console.log('Call was success');
            answer.error.code = -1;
            answer.data = null;
            break;
        case infterces_1.ResponseStatus.BAD_CONTENT:
            // console.log('Call was success');
            answer.error.code = 5;
            answer.error.message = 'did not find data from our data base';
            break;
        case infterces_1.ResponseStatus.NO_USER:
            // console.log('Call was reject');
            answer.error.code = 10;
            answer.error.message = 'user is not allowed';
            break;
    }
    return answer;
}
exports.getResponse = getResponse;
//# sourceMappingURL=reponse-handle.js.map