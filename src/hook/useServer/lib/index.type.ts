export interface ResponseData<T> {
  code: Code;
  message: string;
  data: T;
}
export type Code = 200 | 404 | 0;

export type IfAny<T, Y, N> = 0 extends 1 & T ? Y : N;
