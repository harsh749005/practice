// app/lib/redis.js
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: 'https://pumped-narwhal-44048.upstash.io',
  token: 'AawQAAIjcDEyZDdjODk4ZjZjMDg0MWU1ODdlNTMyYTNlZTNmZWViMnAxMA',
});

export default redis;
