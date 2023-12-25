class GenericError extends Error {
  public statusCode: number;
  public success: boolean;

  constructor(message: string, code: number, success: boolean = false) {
    super(message);
    this.success = success;
    this.statusCode = code;
    Error.captureStackTrace(this, this.constructor);
  }
}

export default GenericError;
