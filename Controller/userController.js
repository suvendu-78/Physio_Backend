import Async from "../UTLS/Async.js";

const Signup = Async((req, res, next) => {
  const { FName, LName, Role, Email, Password, Mobile, Address } = req.body;
  console.log(FName, LName, Role, Email, Password, Mobile, Address);
  res.status(201).json({
    success: true,
    message: "Signup data received successfully",
  });
});

export { Signup };
