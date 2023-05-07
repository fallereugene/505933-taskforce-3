import { InjectModel } from '@nestjs/mongoose';
import { RefreshTokenModel } from '../models';
import { Model } from 'mongoose';
import { RefreshTokenEntity } from '../entity';
import { Token } from '@project/contracts';

export class RefreshTokenRepository {
  constructor(
    @InjectModel(RefreshTokenModel.name)
    private readonly refreshTokenModel: Model<RefreshTokenModel>
  ) {}

  async create(item: RefreshTokenEntity): Promise<Token> {
    return new this.refreshTokenModel(item).save();
  }

  async deleteByTokenId(tokenId: string) {
    return this.refreshTokenModel.deleteOne({ tokenId }).exec();
  }

  async findByTokenId(tokenId: string): Promise<Token | null> {
    return this.refreshTokenModel.findOne({ tokenId }).exec();
  }

  async deleteExpiredTokens() {
    return this.refreshTokenModel.deleteMany({
      expiresIn: { $lt: new Date() },
    });
  }
}
