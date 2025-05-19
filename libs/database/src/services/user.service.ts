import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import { LoggerService } from '@nx-assignment/common';
import { seedUsers } from '../seeds/user.seed';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name, 'auth') private userModel: Model<UserDocument>,
    private readonly logger: LoggerService,
  ) {}

  async isEmptyCollectionUsers(): Promise<boolean> {
    try {
      const count = await this.userModel.estimatedDocumentCount().exec();
      return 1 > count;
    } catch (error: any) {
      this.logger.error(`${UserService.name}(isEmptyCollectionUsers): ${error.stack}`);
    }

    return true;
  }

  async initCollectionSeedUsers() {
    try {
      const result = await this.userModel.create(seedUsers);
    } catch (error: any) {
      this.logger.error(`${UserService.name}(initCollectionSeedUsers): ${error.stack}`);
    }
  }
}
