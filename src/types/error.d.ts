export interface IApiError {
  statusCode: number;
  message?: string | any;
  errors?: any | null;
  stack?: string;
}
