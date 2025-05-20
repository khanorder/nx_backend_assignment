import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../schemas/user.schema';
import { UserService } from '../services/user.service';

const UserModels = MongooseModule.forFeature(
  [{ name: User.name, schema: UserSchema }],
  'auth',
);

@Global()
@Module({
  imports: [UserModels],
  providers: [UserService],
  exports: [UserService],
})
export class AuthSchemaModule {}
