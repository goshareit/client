export default class WebsocketUtil {
    constructor(wsBaseUrl) {
        this.wsBaseUrl = wsBaseUrl;
    }

    open(path) {
        return new WebSocket(this._constructUrl(path))
    }

    _constructUrl(path) {
        return this.wsBaseUrl + path
    }
}