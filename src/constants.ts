export const ExitCode = {
  error: 1,
  success: 0,
};

export const USER_ARGV_INDEX = 2;

export const DEFAULT_COMMAND = '--help';

export const API_PREFIX = '/api';

export const MAX_ID_LENGTH = 6;

export const HttpCode = {
  OK: 200,
  SUCCESS: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
} as const;

export const Env = {
  DEVELOPMENT: `development`,
  PRODUCTION: `production`,
} as const;
