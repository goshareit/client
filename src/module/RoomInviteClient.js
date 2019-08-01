import qs from 'qs';
import extractData from '../util/ExtractRequestData';
import auth from '../util/CreateSessionAuthorizationHeader';

export default class RoomInviteClient {
  constructor(http, jwsUtil) {
    this.http = http;
    this.jwsUtil = jwsUtil;
  }

  async readAllForRoom(callerUniqueId, sessionToken, roomId) {
    return extractData(
      this.http.get('room/invite/read_all_for_room', {
        params: {
          room_id: roomId,
        },
        headers: auth(this.jwsUtil, callerUniqueId, sessionToken),
      }),
    );
  }

  async readAllForUser(callerUniqueId, sessionToken) {
    return extractData(
      this.http.get('room/invite/read_all_for_user', {
        headers: auth(this.jwsUtil, callerUniqueId, sessionToken),
      }),
    );
  }

  async create(callerUniqueId, sessionToken, invitedUsername, roomId) {
    return extractData(
      this.http.post(
        'room/invite/create',
        qs.stringify({
          invited_username: invitedUsername,
          room_id: roomId,
        }),
        {
          headers: auth(this.jwsUtil, callerUniqueId, sessionToken),
        },
      ),
    );
  }

  async accept(callerUniqueId, sessionToken, inviteId) {
    return extractData(
      this.http.post(
        'room/invite/accept',
        qs.stringify({
          invite_id: inviteId,
        }),
        {
          headers: auth(this.jwsUtil, callerUniqueId, sessionToken),
        },
      ),
    );
  }

  async delete(callerUniqueId, sessionToken, inviteId) {
    return extractData(
      this.http.delete('room/invite/delete', {
        data: {
          invite_id: inviteId,
        },
        headers: auth(this.jwsUtil, callerUniqueId, sessionToken),
      }),
    );
  }
}
