const routes = require("next-routes");

module.exports = routes()
  .add("org", "/org/:id", "org")
  .add("form", "/form/:id", "form");
