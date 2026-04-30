export class AuthProxy {
  constructor(baseUrl, strategy) {
    this.baseUrl = baseUrl;
    this.strategy = strategy;
    this.rate = { count: 0, limit: 5, reset: Date.now() + 1000 };
  }
    setStrategy(strategy) {
    this.strategy = strategy;
  }
 async request(path, options = {}) {
    this._rateLimit();
    const headers = { ...(options.headers || {}) };
    this.strategy.apply(headers);
    console.log("request:", path);
    const res = await fetch(this.baseUrl + path, {
      ...options,
      headers
    });
    if (res.status === 401 && this.strategy.refresh) {
      await this.strategy.refresh();
      return this.request(path, options);
    }
    return res;
  }
 _rateLimit() {
    const now = Date.now();
    if (now > this.rate.reset) {
      this.rate.count = 0;
      this.rate.reset = now + 1000;
    }
    this.rate.count++;
    if (this.rate.count > this.rate.limit) {
      throw new Error("rate limit");
    }
  }
}
