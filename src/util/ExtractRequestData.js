export default async function extractData(promise) {
    return promise.then(resp => resp.data).catch(resp => resp.response.data)
}