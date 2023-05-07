import { AccessTokenPayload } from './access-token.payload';

export interface RefreshTokenPayload extends AccessTokenPayload {
  tokenId: string;
}
