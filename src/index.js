import axios from 'axios';
import UserClient from './module/UserClient';
import JwsUtil from './util/JwsUtil';
import RoomClient from './module/RoomClient';

export default class Client {
  constructor(config) {
    this.http = axios.create({ baseURL: config.baseUrl });
    this.jwsUtil = new JwsUtil(config.signingKey, config.maxAgeMinutes);
    this.userClient = new UserClient(this.http, this.jwsUtil);
    this.roomClient = new RoomClient(this.http, this.jwsUtil);
  }

  jws() {
    return this.jwsUtil;
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
}
