interface CustomErrorProps {
  message: string;
}

export abstract class CustomError extends Error {
  constructor(error: CustomErrorProps | Error) {
    super(error.message);
    Object.assign(this, error);
  }
}
