export class ApiKeyAuth {
  constructor(key) {
    this.key = key;
  }
 apply(headers) {
    headers["x-api-key"] = this.key;
  }
}