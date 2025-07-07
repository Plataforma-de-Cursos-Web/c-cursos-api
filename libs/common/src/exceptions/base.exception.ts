export class BaseException extends Error {
  constructor(
    public readonly message: string,
    public readonly code: string,
    public readonly statusCode: number = 500,
    public readonly data?: any
  ) {
    super(message);
    this.name = this.constructor.name;
  }
}