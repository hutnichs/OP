import { AuthProxy } from "./AuthProxy.js";
import { ApiKeyAuth } from "./strategies/ApiKeyAuth.js";
import { JwtAuth } from "./strategies/JwtAuth.js";
const proxy = new AuthProxy(
  "https://api.example.com",
  new JwtAuth("abc")
);
proxy.request("/data");
proxy.setStrategy(new ApiKeyAuth("KEY123"));
proxy.request("/other");
