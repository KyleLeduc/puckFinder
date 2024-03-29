const scriptSrcUrls = [
  "https://stackpath.bootstrapcdn.com/",
  "https://api.tiles.mapbox.com/",
  "https://api.mapbox.com/",
  "https://kit.fontawesome.com/",
  "https://cdnjs.cloudflare.com/",
  "https://cdn.jsdelivr.net",
];
const styleSrcUrls = [
  "https://kit-free.fontawesome.com/",
  // "https://stackpath.bootstrapcdn.com/",
  "https://cdn.jsdelivr.net/",
  "https://api.mapbox.com/",
  "https://api.tiles.mapbox.com/",
  "https://fonts.googleapis.com/",
  "https://use.fontawesome.com/",
];
const connectSrcUrls = [
  "https://api.mapbox.com/",
  "https://a.tiles.mapbox.com/",
  "https://b.tiles.mapbox.com/",
  "https://events.mapbox.com/",
];
const fontSrcUrls = [];

module.exports.directives = {
  defaultSrc: [],
  connectSrc: ["'self'", ...connectSrcUrls],
  scriptSrc: ["'unsafe-inline'", "'unsafe-eval'", "'self'", ...scriptSrcUrls],
  styleSrc: ["'self'", "'unsafe-inline'", ...styleSrcUrls],
  workerSrc: ["'self'", "blob:"],
  objectSrc: [],
  imgSrc: [
    "'self'",
    "blob:",
    "data:",
    "https://res.cloudinary.com/dmmbzjpzz/",
    "https://images.unsplash.com/",
  ],
  fontSrc: ["'self'", ...fontSrcUrls],
};
