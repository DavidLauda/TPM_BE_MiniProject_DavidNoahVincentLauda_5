const app = require("./src/app");
const config = require("./src/config/app.config");

app.listen(config.port, () => {
  console.log(`Server running at http://localhost:${config.port}`);
  console.log(`App Name: ${config.appName}`);
});
