import axios from 'axios';
import UserClient from './module/UserClient';
import JwsUtil from './util/JwsUtil';

export default class Client {
    constructor(config) {
        this.http = axios.create({ baseURL: config.baseUrl })
        this.jwsUtil = new JwsUtil(config.signingKey)
        this.userClient = new UserClient(this.http, this.jwsUtil)
    }

    jws() {
        return this.jwsUtil
    }

    user() {
        return this.userClient
    }
}