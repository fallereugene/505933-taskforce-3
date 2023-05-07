import { Token } from '@project/contracts';

export class RefreshTokenEntity implements Token {
  createdAt: Date;
  expiresIn: Date;
  id: string;
  tokenId: string;
  userId: string;
  [key: string]: unknown;

  constructor(refreshToken: Token) {
    this.createdAt = new Date();
    this.fillEntity(refreshToken);
  }

  fillEntity(entity: Token): void {
    Object.assign(this, entity);
  }
}
