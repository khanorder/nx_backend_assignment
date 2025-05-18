import { Model } from 'mongoose';
import { UserDocument } from '../schemas/user.schema';
export declare class UserService {
    private userModel;
    constructor(userModel: Model<UserDocument>);
}
