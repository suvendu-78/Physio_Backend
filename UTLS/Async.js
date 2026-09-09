// const Async = (fn) => async (req, res, next) => {
//   try {
//     const data = await fn(req, res, next);
//     return data;
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Something went wrong",
//       error: error.message,
//     });
//   }
// };

// export default Async;

const Async = (fn) => async (req, res, next) => {
  try {
    const data = await fn(req, res, next);
    return data;
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Something went wrong",
      error: error.errors || [],
    });
  }
};

export default Async;
