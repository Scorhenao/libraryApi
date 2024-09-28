// src/interceptors/error-handling.interceptor.ts

import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  BadRequestException,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class ErrorHandlingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => ({
        status: 'success',
        data,
      })),
      catchError((error) => {
        if (error instanceof BadRequestException) {
          throw new BadRequestException({
            status: 'error',
            message: error.message,
          });
        } else if (error instanceof NotFoundException) {
          throw new NotFoundException({
            status: 'error',
            message: error.message,
          });
        } else {
          throw new InternalServerErrorException({
            status: 'error',
            message: 'Internal Server Error',
          });
        }
      }),
    );
  }
}
