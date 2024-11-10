import app from "./app";
import { db } from "./config/db";
import { syncTables } from "./model/sync/table";

db.authenticate()
  .then(() => console.log("Database connected"))
  .then(() =>
    app
      .listen(5001, () => {
        console.log(`Server running on port 5001`);
        // console.log(`Server: ${ENV.SERVER_URL}\n`);
      })
      .on("error", (err: any) => console.error(err))
  )
  .then(() => {
    // Start syncing tables
    syncTables();
  })
  .catch((err: any) => console.error(err));
