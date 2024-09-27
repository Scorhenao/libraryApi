import { ErrorResponseDto } from './../dtos/error-response.dto';
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';
    let error = 'Internal Server Error';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const responseError = exception.getResponse();

      if (typeof responseError === 'object' && 'message' in responseError) {
        message = (responseError as any).message;
      }
    }

    const errorResponse: ErrorResponseDto = {
      statusCode: status,
      message,
      error: error,
    };

    response.status(status).json(errorResponse);
  }
}
