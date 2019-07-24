import extractData from '../util/ExtractRequestData';

export default class RoomTopicClient {
  constructor(http) {
    this.http = http;
  }

  async all() {
    return extractData(this.http.get('room/topic/all'));
  }

  async read(topicId) {
    return extractData(
      this.http.get('room/read', {
        params: {
          topic_id: topicId,
        },
      }),
    );
  }
}
