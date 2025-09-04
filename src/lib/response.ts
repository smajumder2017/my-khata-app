export class ApiResponse {
  static success<T>(data: T, statusCode = 200) {
    return { success: true, data, statusCode };
  }

  static error(error: HttpError | Error | unknown) {
    if (error instanceof HttpError) {
      return {
        success: false,
        error: { message: error.message, error: error.error },
        statusCode: error.statusCode,
      };
    }
    if (error instanceof Error) {
      return {
        success: false,
        error: { message: error.message, error: "Internal Server Error" },
        statusCode: 500,
      };
    }
    return {
      success: false,
      error: {
        message: "An unknown error occurred",
        error: "Internal Server Error",
      },
      statusCode: 500,
    };
  }
}

export class HttpError extends Error {
  statusCode: number;
  error: string;

  constructor(
    message: string,
    error = "Internal Server Error",
    statusCode = 500
  ) {
    super(message);
    this.statusCode = statusCode;
    this.error = error;
  }
}

// Error classes for specific status codes
export class BadRequestError extends HttpError {
  constructor(message: string = "Bad Request", error: string = "Bad Request") {
    super(message, error, 400);
  }
}

export class UnauthorizedError extends HttpError {
  constructor(
    message: string = "Unauthorized Access",
    error: string = "Unauthorized"
  ) {
    super(message, error, 401);
  }
}

export class ForbiddenError extends HttpError {
  constructor(
    message: string = "Forbidden Access",
    error: string = "Forbidden"
  ) {
    super(message, error, 403);
  }
}

export class NotFoundError extends HttpError {
  constructor(
    message: string = "Requested resource not found",
    error: string = "Not Found"
  ) {
    super(message, error, 404);
  }
}

export class InternalServerError extends HttpError {
  constructor(
    message: string = "Internal Server Error",
    error: string = "Internal Server Error"
  ) {
    super(message, error, 500);
  }
}

export class ConflictError extends HttpError {
  constructor(
    message: string = "Conflict occurred",
    error: string = "Conflict"
  ) {
    super(message, error, 409);
  }
}
