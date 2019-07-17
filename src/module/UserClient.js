import qs from 'qs'

export default class UserClient {
    constructor(http, jwsUtil) {
        this.http = http
        this.jwsUtil = jwsUtil
    }

    async usernameExists(username) {
        return this.http.get("user/username_exists", {
            params: { username }
        })
    }

    async signUp(username, password, confirmation, email) {
        return this.http.post("user/sign_up", qs.stringify({
            username, password, confirmation, email
        }))
    }

    async readSelf(callerUniqueId, sessionToken) {
        return this.http.post("user/read_self", qs.stringify({
            session: this.jwsUtil.create(callerUniqueId, { token: sessionToken })
        }))
    }

    async update(callerUniqueId, sessionToken, username, password, email) {
        return this.http.put("user/update", qs.stringify({
            session: this.jwsUtil.create(callerUniqueId, { token: sessionToken }),
            username,
            password,
            email
        }))
    }

    async delete(callerUniqueId, sessionToken) {
        return this.http.delete("user/delete", {
            data: {
                session: this.jwsUtil.create(callerUniqueId, { token: sessionToken })
            }
        })
    }

    async sessionIsValid(callerUniqueId, sessionToken) {
        return this.http.post("session/is_valid", qs.stringify({
            session: this.jwsUtil.create(callerUniqueId, { token: sessionToken })
        }))
    }

    async logIn(username, password) {
        return this.http.post("session/log_in", qs.stringify({
            username, password
        }))
    }

    async logOut(callerUniqueId, sessionToken) {
        return this.http.post("session/log_out", qs.stringify({
            session: this.jwsUtil.create(callerUniqueId, { token: sessionToken })
        }))
    }
}