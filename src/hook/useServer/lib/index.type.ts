export interface ResponseData<T> {
  code: Code;
  message: string;
  data: T;
}
export type Code = 200 | 404 | 0;
