import qs from 'qs';
import extractData from '../util/ExtractRequestData';
import RoomMemberClient from './RoomMemberClient';
import RoomInviteClient from './RoomInviteClient';

export default class RoomClient {
  constructor(http, jwsUtil) {
    this.http = http;
    this.jwsUtil = jwsUtil;
    this.roomMemberClient = new RoomMemberClient(http, jwsUtil);
    this.roomInviteClient = new RoomInviteClient(http, jwsUtil);
  }

  async create(callerUniqueId, sessionToken, topicId, name, secret) {
    return extractData(
      this.http.post('room/create', qs.stringify({
        session: this.jwsUtil.createSessionJws(callerUniqueId, sessionToken),
        topic_id: topicId,
        name,
        secret,
      })),
    );
  }

  async read(callerUniqueId, sessionToken, roomId) {
    return extractData(
      this.http.post('room/read', qs.stringify({
        session: this.jwsUtil.createSessionJws(callerUniqueId, sessionToken),
        id: roomId,
      })),
    );
  }

  async readOwned(callerUniqueId, sessionToken) {
    return extractData(
      this.http.post('room/read_owned', qs.stringify({
        session: this.jwsUtil.createSessionJws(callerUniqueId, sessionToken),
      })),
    );
  }

  async readAdmin(callerUniqueId, sessionToken) {
    return extractData(
      this.http.post('room/read_admin', qs.stringify({
        session: this.jwsUtil.createSessionJws(callerUniqueId, sessionToken),
      })),
    );
  }

  async update(callerUniqueId, sessionToken, id, updateBag) {
    return extractData(
      this.http.put('room/update', qs.stringify({
        session: this.jwsUtil.createSessionJws(callerUniqueId, sessionToken),
        id,
        owner_unique_id: updateBag.ownerUniqueId ? updateBag.ownerUniqueId : null,
        topic_id: updateBag.topicId ? updateBag.topicId : null,
        name: updateBag.name ? updateBag.name : null,
        secret: updateBag.secret ? updateBag.secret : null,
      })),
    );
  }

  async delete(callerUniqueId, sessionToken, roomId) {
    return extractData(
      this.http.delete('room/delete', {
        data: {
          session: this.jwsUtil.createSessionJws(callerUniqueId, sessionToken),
          id: roomId,
        },
      }),
    );
  }

  member() {
    return this.roomMemberClient;
  }

  invite() {
    return this.roomInviteClient;
  }
}
