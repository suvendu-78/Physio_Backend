// import App from "./App.js";
// import Database from "./DataBase/databse.js";

// Database()
//   .then(() => {
//     App.listen(process.env.PORT, () => {
//       console.log("database connected successfully");
//     });
//   })
//   .catch((error) => {
//     console.log(" there some error from databse listen", error);
//   });
import App from "./App.js";
import Database from "./DataBase/databse.js";

const startServer = async () => {
  try {
    await Database();

    console.log("database connected successfully");

    if (!process.env.VERCEL) {
      const PORT = process.env.PORT || 8000;

      App.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
      });
    }
  } catch (error) {
    console.log("There is some error from database:", error);
  }
};

startServer();

export default App;
