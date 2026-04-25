export class OAuth {
  constructor(token) {
    this.token = token;
  }
 apply(headers) {
    headers["authorization"] = "Bearer " + this.token;
  }
 async refresh() {
    this.token = "new-token-" + Date.now();
  }
}