export default function auth(jws, callerUniqueId, sessionToken) {
  return {
    Authorization: `Bearer ${jws.createSessionJws(callerUniqueId, sessionToken)}`,
  };
}
