export enum ValidationMessage {
  EnvironmentRequired = 'Environment is required',
  ApplicationPort = 'Application port is required',
  UrlServiceTaskRequired = 'Task service url is required',
  UrlServiceReviewRequired = 'Review service url is required',
  AccessTokenSecretRequired = 'SECRET_JWT is required',
  AccessTokenExpiresInRequired = 'JWT_EXPIRES_IN is required',
  RefreshTokenSecretRequired = 'REFRESH_SECRET_JWT is required',
  RefreshTokenExpiresInRequired = 'REFRESH_JWT_EXPIRES_IN is required',
}
