import jwt from 'jsonwebtoken';

export default class JwsUtil {
  constructor(signingKey, maxAgeMinutes) {
    this.signingKey = signingKey;
    this.maxAgeMinutes = maxAgeMinutes;
  }

  create(subject, payload) {
    return jwt.sign(payload, this.signingKey, { subject });
  }

  createSessionJws(uniqueId, token) {
    return this.create(uniqueId, { token });
  }

  read(token) {
    return jwt.verify(token, this.signingKey, { maxAge: `${this.maxAgeMinutes}m` });
  }
}
