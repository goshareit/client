import qs from 'qs';
import extractData from '../util/ExtractRequestData';
import auth from '../util/CreateSessionAuthorizationHeader';
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
        params: { email },
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
      this.http.get('user/read_self', {
        headers: auth(this.jwsUtil, callerUniqueId, sessionToken),
      }),
    );
  }

  async update(callerUniqueId, sessionToken, currentPassword, updateBag) {
    return extractData(
      this.http.put(
        'user/update',
        qs.stringify({
          current_password: currentPassword,
          username: updateBag.username ? updateBag.username : null,
          password: updateBag.password ? updateBag.password : null,
          email: updateBag.email ? updateBag.email : null,
        }),
        {
          headers: auth(this.jwsUtil, callerUniqueId, sessionToken),
        },
      ),
    );
  }

  async delete(callerUniqueId, sessionToken, currentPassword) {
    return extractData(
      this.http.delete('user/delete', {
        data: qs.stringify({
          current_password: currentPassword,
        }),
        headers: auth(this.jwsUtil, callerUniqueId, sessionToken),
      }),
    );
  }

  session() {
    return this.sessionClient;
  }
}
