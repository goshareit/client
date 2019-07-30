import extractData from '../util/ExtractRequestData'
import auth from '../util/CreateSessionAuthorizationHeader'

export default class RoomWebsocketClient {
    constructor(http, wsUtil, jwsUtil) {
        this.http = http;
        this.wsUtil = wsUtil;
        this.jwsUtil = jwsUtil;
    }

    async open(roomId, callerUniqueId, sessionToken) {
        return extractData(
            this.http.get(`room/${roomId}/get_token`, {
                headers: auth(this.jwsUtil, callerUniqueId, sessionToken),
            })
        ).then((resp) => {
            return resp.status === 200 ?
                this.wsUtil.open(`room/${roomId}?access_token=${resp.data}`) :
                undefined;
        })
    }
}