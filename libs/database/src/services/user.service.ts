import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import { ConfigService, LoggerService, UserDTO } from '@nx-assignment/common';
import { seedUsers } from '../seeds/user.seed';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name, 'auth') private userModel: Model<UserDocument>,
    private readonly logger: LoggerService,
    private readonly configService: ConfigService,
  ) {}

  async getUser(userId: string): Promise<UserDTO> {
    const user = await this.userModel.findOne({ uid: userId }).exec();
    return user as UserDTO;
  }

  async updateRefreshToken(userId: string, refreshTokenId: string): Promise<boolean> {
    const result = await this.userModel.updateOne(
      { uid: userId },
      { $set: { refreshTokenId: refreshTokenId } },
      { upsert: false }
    ).exec();
    return result && 0 < result.modifiedCount;
  }

  async isMatchRefreshToken(userId: string, refreshTokenId: string): Promise<UserDTO|null> {
    const result = await this.userModel.findOne({ uid: userId, refreshTokenId: refreshTokenId }).exec();
    return result ? result as UserDTO : null;
  }

  async isEmptyCollection(): Promise<boolean> {
    try {
      const count = await this.userModel.estimatedDocumentCount().exec();
      return 1 > count;
    } catch (error: any) {
      if ('production' !== this.configService.get('service')?.level) {
        this.logger.error(
          `${UserService.name}(isEmptyCollection): ${error.stack}`,
        );
      }
    }

    return true;
  }

  async initCollectionSeed() {
    try {
      const result = await this.userModel.create(seedUsers);
      if ('production' !== this.configService.get('service')?.level) {
        if (0 < result.length) {
          this.logger.info(
            `${UserService.name}(initCollectionSeed): ${result.length} users are created.`,
          );
        }
      }
    } catch (error: any) {
      if ('production' !== this.configService.get('service')?.level) {
        this.logger.error(
          `${UserService.name}(initCollectionSeed): ${error.stack}`,
        );
      }
    }
  }
}
