export class AuthError extends Error {
    constructor(message: string, type: AuthErrorResponse) {
        super(message);
        this.name = type;
    }
}

export enum AuthErrorResponse {
  FORBIDDEN = "Forbidden", // 403
  INVALID_ACCESS = "InvalidAccess", // 401
  NOT_FOUND = "NotFound", // 404
  BAD_REQUEST = "BadRequest", // 400
  INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR", // 500
}

export async function HttpErrorParser(error: any,req?: Request,res?: Response) {
    const status = {
        code: 500,
        message: error.message,
    };
    switch (error.name) {
        case AuthErrorResponse.BAD_REQUEST:
        status.code = 400;
        break;
        case AuthErrorResponse.INVALID_ACCESS:
        status.code = 401;
        break;
        case AuthErrorResponse.FORBIDDEN:
        status.code = 403;
        break;
        case AuthErrorResponse.NOT_FOUND:
        status.code = 404;
        break;
        default:
        status.code = 500;
        status.message = "Internal Service Error";
    }

    // res.status(status.code).json(status);
}
  