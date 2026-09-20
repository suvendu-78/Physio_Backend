// import App from "./App.js";
// import Database from "./DataBase/databse.js";

// Database()
//   .then(() => {
//     App.listen(process.env.PORT, () => {
//       console.log("listen successfully ");
//     });
//   })
//   .catch((error) => {
//     console.log(error);
//   });
import App from "./App.js";
import Database from "./DataBase/databse.js";

if (!process.env.VERCEL) {
  const startServer = async () => {
    try {
      await Database();

      console.log("database connected successfully");

      const PORT = process.env.PORT || 8000;

      App.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
      });
    } catch (error) {
      console.log("There is some error from database:", error);
    }
  };

  startServer();
}

export default App;
