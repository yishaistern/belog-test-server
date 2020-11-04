import { FunctionsResponse, ResponseCalls, ResponseStatus } from "./infterces";

/**
 * payload for every type of call
 * @param req 
 * @param payload 
 */
export function getResponse(req: any, payload: FunctionsResponse): ResponseCalls {
    const answer: ResponseCalls = {
        data: payload.data,
        error: { code: -50},
        user: req.currentUser
    };
    switch (payload.status) {
        case ResponseStatus.SUCCESS:
            // console.log('Call was success');
            answer.error.code = 0;
        break;
        case ResponseStatus.FAIL:
            // console.log('Call was success');
            answer.error.code = -1;
            answer.data = null;
        break;
        case ResponseStatus.BAD_CONTENT:
            // console.log('Call was success');
            answer.error.code = 5;
            answer.error.message = 'did not find data from our data base';
        break;
        case ResponseStatus.NO_USER:
            // console.log('Call was reject');
            answer.error.code = 10;
            answer.error.message = 'user is not allowed';
        break;
    }
    return answer;

}