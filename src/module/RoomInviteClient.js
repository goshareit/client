import qs from 'qs';
import extractData from '../util/ExtractRequestData';

export default class RoomInviteClient {
  constructor(http, jwsUtil) {
    this.http = http;
    this.jwsUtil = jwsUtil;
  }

  async readAllForRoom(callerUniqueId, sessionToken, roomId) {
    return extractData(
      this.http.post('room/invite/read_all_for_room', qs.stringify({
        session: this.jwsUtil.createSessionJws(callerUniqueId, sessionToken),
        room_id: roomId,
      })),
    );
  }

  async readAllForUser(callerUniqueId, sessionToken) {
    return extractData(
      this.http.post('room/invite/read_all_for_user', qs.stringify({
        session: this.jwsUtil.createSessionJws(callerUniqueId, sessionToken),
      })),
    );
  }

  async create(callerUniqueId, sessionToken, invitedUserUniqueId, roomId) {
    return extractData(
      this.http.post('room/invite/create', qs.stringify({
        session: this.jwsUtil.createSessionJws(callerUniqueId, sessionToken),
        invited_user_unique_id: invitedUserUniqueId,
        room_id: roomId,
      })),
    );
  }

  async accept(callerUniqueId, sessionToken, inviteId) {
    return extractData(
      this.http.post('room/invite/accept', qs.stringify({
        session: this.jwsUtil.createSessionJws(callerUniqueId, sessionToken),
        invite_id: inviteId,
      })),
    );
  }

  async delete(callerUniqueId, sessionToken, inviteId) {
    return extractData(
      this.http.delete('room/invite/delete', {
        data: {
          session: this.jwsUtil.createSessionJws(callerUniqueId, sessionToken),
          invite_id: inviteId,
        },
      }),
    );
  }
}
