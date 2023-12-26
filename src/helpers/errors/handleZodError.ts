import { ZodError } from "zod";
import IErrorResponse from "../../types/IErrorResponse";

const handleZodError = (err: ZodError): IErrorResponse => {
  const errorMessagesArray = err.issues.map(el => {
    return `${el.path[el.path.length - 1]} is required`;
  });
  const errorMessage = errorMessagesArray.join(", ");

  return {
    success: false,
    message: "Validation Error",
    errorMessage,
    errorDetails: err,
    stack: err.stack,
  };
};

export default handleZodError;
