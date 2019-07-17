import jwt from 'jsonwebtoken';

export default class JwsUtil {
    constructor(signingKey) {
        this.signingKey = signingKey;
    }

    create(subject, payload) {
        return jwt.sign(payload, this.signingKey, { subject })
    }

    read(token) {
        return jwt.verify(token, this.signingKey)
    }
}