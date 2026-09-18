// import App from "./App.js";
// import Database from "./DataBase/databse.js";

// const startServer = async () => {
//   try {
//     await Database();

//     console.log("database connected successfully");

//     if (!process.env.VERCEL) {
//       const PORT = process.env.PORT || 8000;

//       App.listen(PORT, () => {
//         console.log(`Server running on port ${PORT}`);
//       });
//     }
//   } catch (error) {
//     console.log("There is some error from database:", error);
//   }
// };

// startServer();

// export default App;

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

App.use(async (req, res, next) => {
  try {
    await Database();
    next();
  } catch (error) {
    console.log("DATABASE CONNECTION ERROR:", error.message);

    return res.status(500).json({
      success: false,
      message: "Database connection failed",
    });
  }
});

export default App;
