export class AuthProxy {
  constructor(baseUrl, auth) {
    this.baseUrl = baseUrl;
    this.auth = auth;
  }
    async request(path, options = {}) {
    const url = this.baseUrl + path;
    const headers = { ...(options.headers || {}) };
    if (this.auth.type === "apiKey") {
      headers["x-api-key"] = this.auth.apiKey;
    }
    return fetch(url, {
      ...options,
      headers
    });
  }
}