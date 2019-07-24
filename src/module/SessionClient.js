import qs from 'qs';
import extractData from '../util/ExtractRequestData';
import auth from '../util/CreateAuthorizationHeader';

export default class SessionClient {
  constructor(http, jwsUtil) {
    this.http = http;
    this.jwsUtil = jwsUtil;
  }

  async logIn(username, password) {
    return extractData(
      this.http.post('session/log_in', qs.stringify({
        username, password,
      })),
    );
  }

  async logOut(callerUniqueId, sessionToken) {
    return extractData(
      this.http.delete('session/log_out', {
        headers: auth(this.jwsUtil, callerUniqueId, sessionToken),
      }),
    );
  }
}
