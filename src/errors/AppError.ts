export class AppError extends Error {
  constructor(message: string, public httpCode: number) {
    super(message);
  };
}
