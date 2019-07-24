import qs from 'qs';
import extractData from '../util/ExtractRequestData';
import RoomTopicClient from './RoomTopicClient';
import RoomMemberClient from './RoomMemberClient';
import RoomInviteClient from './RoomInviteClient';
import auth from '../util/CreateAuthorizationHeader';

export default class RoomClient {
  constructor(http, jwsUtil) {
    this.http = http;
    this.jwsUtil = jwsUtil;
    this.roomTopicClient = new RoomTopicClient(http);
    this.roomMemberClient = new RoomMemberClient(http, jwsUtil);
    this.roomInviteClient = new RoomInviteClient(http, jwsUtil);
  }

  async create(callerUniqueId, sessionToken, topicId, name, secret) {
    return extractData(
      this.http.post(
        'room/create',
        qs.stringify({
          topic_id: topicId,
          name,
          secret,
        }),
        {
          headers: auth(this.jwsUtil, callerUniqueId, sessionToken),
        },
      ),
    );
  }

  async read(callerUniqueId, sessionToken, roomId) {
    return extractData(
      this.http.get('room/read', {
        params: {
          id: roomId,
        },
        headers: auth(this.jwsUtil, callerUniqueId, sessionToken),
      }),
    );
  }

  async readOwned(callerUniqueId, sessionToken) {
    return extractData(
      this.http.get('room/read_owned', {
        headers: auth(this.jwsUtil, callerUniqueId, sessionToken),
      }),
    );
  }

  async readAdmin(callerUniqueId, sessionToken) {
    return extractData(
      this.http.get('room/read_admin', {
        headers: auth(this.jwsUtil, callerUniqueId, sessionToken),
      }),
    );
  }

  async update(callerUniqueId, sessionToken, id, updateBag) {
    return extractData(
      this.http.put(
        'room/update',
        qs.stringify({
          id,
          owner_unique_id: updateBag.ownerUniqueId ? updateBag.ownerUniqueId : null,
          topic_id: updateBag.topicId ? updateBag.topicId : null,
          name: updateBag.name ? updateBag.name : null,
          secret: updateBag.secret ? updateBag.secret : null,
        }),
        {
          headers: auth(this.jwsUtil, callerUniqueId, sessionToken),
        },
      ),
    );
  }

  async delete(callerUniqueId, sessionToken, roomId) {
    return extractData(
      this.http.delete('room/delete', {
        data: {
          id: roomId,
        },
        headers: auth(this.jwsUtil, callerUniqueId, sessionToken),
      }),
    );
  }

  topic() {
    return this.roomTopicClient;
  }

  member() {
    return this.roomMemberClient;
  }

  invite() {
    return this.roomInviteClient;
  }
}
