import qs from 'qs';
import extractData from '../util/ExtractRequestData';

export default class SessionClient {
  constructor(http, jwsUtil) {
    this.http = http;
    this.jwsUtil = jwsUtil;
  }

  async sessionIsValid(callerUniqueId, sessionToken) {
    return extractData(
      this.http.post('session/is_valid', qs.stringify({
        session: this.jwsUtil.createSessionJws(callerUniqueId, sessionToken),
      })),
    );
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
        data: qs.stringify({
          session: this.jwsUtil.createSessionJws(callerUniqueId, sessionToken),
        })
      })
    );
  }
}
