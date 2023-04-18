export enum Exception {
  Conflict = 'Account has already exists',
  Unauthorized = 'Unauthorized',
  NotFoundAccount = 'Account was not found',
  AuthorizationFailed = 'Incorrect login or password',
  InvalidEmail = 'The email is not valid',
  InvalidDate = 'The user date birth is not valid',
  InvalidAge = 'The user age must be greater than 18',
}
