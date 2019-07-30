import axios from 'axios';
import UserClient from './module/UserClient';
import JwsUtil from './util/JwsUtil';
import RoomClient from './module/RoomClient';
import WebsocketUtil from './util/WebsocketUtil';

export default class Client {
  constructor(config) {
    this.http = axios.create({ baseURL: config.baseUrl });
    this.jwsUtil = new JwsUtil(config.signingKey, config.maxAgeMinutes);
    this.wsUtil = new WebsocketUtil(config.wsBaseUrl);
    this.userClient = new UserClient(this.http, this.jwsUtil);
    this.roomClient = new RoomClient(this.http, this.jwsUtil, this.wsUtil);
  }

  jws() {
    return this.jwsUtil;
  }

  ws() {
    return this.wsUtil;
  }

  user() {
    return this.userClient;
  }

  session() {
    return this.user().session();
  }

  room() {
    return this.roomClient;
  }

  roomTopic() {
    return this.room().topic();
  }

  roomMember() {
    return this.room().member();
  }

  roomInvite() {
    return this.room().invite();
  }

  roomWs() {
    return this.room().ws();
  }
}
