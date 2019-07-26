import qs from 'qs';
import extractData from '../util/ExtractRequestData';
import auth from '../util/CreateAuthorizationHeader';

export default class RoomMemberClient {
  constructor(http, jwsUtil) {
    this.http = http;
    this.jwsUtil = jwsUtil;
  }

  async read(callerUniqueId, sessionToken) {
    return extractData(
      this.http.get('room/member/read', {
        headers: auth(this.jwsUtil, callerUniqueId, sessionToken)
      }),
    );
  }

  async add(callerUniqueId, sessionToken, roomId) {
    return extractData(
      this.http.post(
        'room/member/add',
        qs.stringify({
          room_id: roomId,
        }),
        {
          headers: auth(this.jwsUtil, callerUniqueId, sessionToken),
        },
      ),
    );
  }

  async update(callerUniqueId, sessionToken, roomId, userUniqueId, admin) {
    return extractData(
      this.http.put(
        'room/member/update',
        qs.stringify({
          room_id: roomId,
          user_unique_id: userUniqueId,
          admin,
        }),
        {
          headers: auth(this.jwsUtil, callerUniqueId, sessionToken),
        },
      ),
    );
  }

  async delete(callerUniqueId, sessionToken, roomId, userUniqueId) {
    return extractData(
      this.http.delete('room/member/delete', {
        data: {
          room_id: roomId,
          user_unique_id: userUniqueId,
        },
        headers: auth(this.jwsUtil, callerUniqueId, sessionToken),
      }),
    );
  }
}
