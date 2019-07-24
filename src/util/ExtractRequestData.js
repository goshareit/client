export default async function extractData(promise) {
  return promise.then(resp => resp.data).catch((resp) => {
    if (resp.response) {
      return resp.response.data;
    }

    return {
      status: 503,
      data: resp.message,
    };
  });
}
