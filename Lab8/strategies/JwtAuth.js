export class JwtAuth {
  constructor(token) {
    this.token = token;
  }
 apply(headers) {
    headers["authorization"] = "Bearer " + this.token;
  }
}