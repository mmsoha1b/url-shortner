import app from "./app.js";
import { config } from "./config/env.js";

app.listen(config.port, () => {
  console.log(
    `Server running in ${config.nodeEnv} mode on http://localhost:${config.port}`
  );
});
