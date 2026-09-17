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

const databaseConnection = Database();

App.use(async (req, res, next) => {
  try {
    await databaseConnection;
    next();
  } catch (error) {
    console.log("Database connection error:", error);
    res.status(500).json({
      success: false,
      message: "Database connection failed",
    });
  }
});

if (!process.env.VERCEL) {
  const PORT = process.env.PORT || 8000;

  databaseConnection
    .then(() => {
      App.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
      });
    })
    .catch((error) => {
      console.log("There is some error from database:", error);
    });
}

export default App;
