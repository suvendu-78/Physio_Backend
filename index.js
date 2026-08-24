import App from "./App.js";
import Database from "./DataBase/databse.js";

Database()
  .then(() => {
    App.listen(process.env.PORT, () => {
      console.log("database connected successfully");
    });
  })
  .catch((error) => {
    console.log(" there some error from databse listen", error);
  });
