import { DataResponse, DataResponseMeta, ErrorResponse } from '../types/response.types';

export function asResponse<T>(obj: T): DataResponse<T>;
export function asResponse<T, U extends DataResponseMeta = Record<string, unknown>>(
  obj: T,
  metaObj: U,
): DataResponse<T, U>;
export function asResponse(obj: unknown, metaObj?: unknown) {
  if (metaObj) {
    return {
      data: obj,
      meta: metaObj,
    };
  } else {
    return {
      data: obj,
      meta: {},
    };
  }
}

export function asError<T>(error: T, metaObj?: DataResponseMeta): ErrorResponse<T> {
  if (metaObj) {
    return { error, meta: metaObj };
  } else {
    return { error, meta: {} };
  }
}
