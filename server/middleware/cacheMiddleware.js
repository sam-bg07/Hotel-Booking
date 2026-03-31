import NodeCache from "node-cache";

// Cache for 5 minutes by default
const cache = new NodeCache({ stdTTL: 300 });

export const cacheMiddleware = (req, res, next) => {
  // Only cache GET requests
  if (req.method !== "GET") {
    return next();
  }

  // Construct a unique cache key based on URL and query params
  const key = req.originalUrl || req.url;
  const cachedResponse = cache.get(key);

  if (cachedResponse) {
    res.setHeader("Content-Type", "application/json");
    return res.status(200).send(cachedResponse);
  }

  // Intercept the res.json response to store it in cache before sending
  const originalJson = res.json;
  res.json = function (body) {
    // Only cache successful responses
    if (res.statusCode >= 200 && res.statusCode < 300) {
      cache.set(key, JSON.stringify(body));
    }
    // Call the original res.json function
    originalJson.call(this, body);
  };

  next();
};
