/* eslint-disable @typescript-eslint/no-explicit-any */
interface IErrorResponse {
  success: boolean;
  message: string;
  errorMessage: string;
  errorDetails?: any;
  stack?: string | null;
}

export default IErrorResponse;
