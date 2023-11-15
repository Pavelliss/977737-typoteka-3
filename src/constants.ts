export const ExitCode = {
  error: 1,
  success: 0,
};

export const USER_ARGV_INDEX = 2;

export const DEFAULT_COMMAND = '--help';

export const HttpCode = {
  OK: 200,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  FORBIDDEN: 403,
  UNAUTHORIZED: 401,
} as const;
