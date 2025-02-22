import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Request } from 'express';
import { map, Observable } from 'rxjs';
import { asResponse } from '../utils/response.util';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const { getRequest } = context.switchToHttp();

    const request = getRequest<Request>();

    return next.handle().pipe(
      map(async (data) =>
        asResponse(data, {
          requestID: request.id,
          timestamp: new Date().toISOString(),
          resource: request.originalUrl,
        }),
      ),
    );
  }
}
