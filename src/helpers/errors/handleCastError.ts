import mongoose from "mongoose";
import IErrorResponse from "../../types/IErrorResponse";

const handleCastError = (err: mongoose.Error.CastError): IErrorResponse => {
  const regex = /"(.*?)"/;
  const matches = err.message.match(regex);
  const message = `${matches![1]} is not a valid ID!`;

  return {
    success: false,
    message: "Invalid ID",
    errorMessage: message,
  };
};

export default handleCastError;
