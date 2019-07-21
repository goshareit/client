import qs from 'qs';
import extractData from '../util/ExtractRequestData';
import SessionClient from './SessionClient';

export default class UserClient {
  constructor(http, jwsUtil) {
    this.http = http;
    this.jwsUtil = jwsUtil;
    this.sessionClient = new SessionClient(http, jwsUtil);
  }

  async usernameExists(username) {
    return extractData(
      this.http.get('user/username_exists', {
        params: { username },
      }),
    );
  }

  async emailExists(email) {
    return extractData(
      this.http.get('user/email_exists', {
        params: { email }
      }),
    );
  }

  async signUp(username, password, confirmation, email) {
    return extractData(
      this.http.post('user/sign_up', qs.stringify({
        username, password, confirmation, email,
      })),
    );
  }

  async readSelf(callerUniqueId, sessionToken) {
    return extractData(
      this.http.post('user/read_self', qs.stringify({
        session: this.jwsUtil.createSessionJws(callerUniqueId, sessionToken),
      })),
    );
  }

  async update(callerUniqueId, sessionToken, updateBag) {
    return extractData(
      this.http.put('user/update', qs.stringify({
        session: this.jwsUtil.createSessionJws(callerUniqueId, sessionToken),
        username: updateBag.username ? updateBag.username : null,
        password: updateBag.password ? updateBag.password : null,
        email: updateBag.email ? updateBag.email : null,
      })),
    );
  }

  async delete(callerUniqueId, sessionToken) {
    return extractData(
      this.http.delete('user/delete', {
        data: qs.stringify({
          session: this.jwsUtil.createSessionJws(callerUniqueId, sessionToken),
        }),
      }),
    );
  }

  session() {
    return this.sessionClient;
  }
}
