import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Request } from 'express';
import { map, Observable } from 'rxjs';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const { getRequest } = context.switchToHttp();

    const request = getRequest<Request>();

    return next.handle().pipe(
      map(async (data) => ({
        data,
        meta: {
          requestID: request.id,
          timestamp: new Date().toISOString(),
          resource: request.originalUrl,
        },
      })),
    );
  }
}
