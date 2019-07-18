import qs from 'qs'
import extractData from '../util/ExtractRequestData'

export default class RoomMemberClient {
    constructor(http, jwsUtil) {
        this.http = http;
        this.jwsUtil = jwsUtil;
    }

    async add(callerUniqueId, sessionToken, roomId) {
        return extractData(
            this.http.post('room/member/add', qs.stringify({
                session: this.jwsUtil.createSessionJws(callerUniqueId, sessionToken),
                room_id: roomId
            }))
        )
    }

    async update(callerUniqueId, sessionToken, roomId, userUniqueId, admin) {
        return extractData(
            this.http.put('room/member/update', qs.stringify({
                session: this.jwsUtil.createSessionJws(callerUniqueId, sessionToken),
                room_id: roomId,
                user_unique_id: userUniqueId,
                admin
            }))
        )
    }

    async delete(callerUniqueId, sessionToken, roomId, userUniqueId) {
        return extractData(
            this.http.delete('room/member/delete', {
                data: {
                    session: this.jwsUtil.createSessionJws(callerUniqueId, sessionToken),
                    room_id: roomId,
                    user_unique_id: userUniqueId
                }
            })
        )
    }
}