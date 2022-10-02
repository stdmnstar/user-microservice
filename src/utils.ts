import { StatusCodes } from 'http-status-codes';

export const responseMessage = (code: StatusCodes, message: string) => {
  return {
    statusCode: code,
    body: JSON.stringify({
      message,
    }),
  };
};
