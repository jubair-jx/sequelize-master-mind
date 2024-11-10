import { IApiError } from "../types/error";

export class ApiError extends Error {
  statusCode: number;
  message: string;
  errors?: any[];
  stack?: string | undefined;
  constructor({
    statusCode = 500,
    message = "Internal Server Error",
    errors = [],
    stack = undefined,
  }: IApiError) {
    super(message); // Call the base Error constructor with the message

    this.statusCode = statusCode;
    this.message = message;
    this.errors = errors;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
    this.stack = stack;
  }

  toJSON() {
    // Customize the JSON representation for consistent error handling
    return {
      message: this.message,
      errors: this.errors || undefined,
      statusCode: this.statusCode,
      stack: this.stack || undefined,
    };
  }
}
