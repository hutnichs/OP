import { AuthProxy } from "./AuthProxy.js";

const proxy = new AuthProxy("https://api.example.com", {
  type: "apiKey",
  apiKey: "KEY123"
});

proxy.request("/data");