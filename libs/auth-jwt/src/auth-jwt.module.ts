import {Global, Module} from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { CommonModule } from '@nx-assignment/common';
import { AuthJwtService } from './auth-jwt.service';

@Global()
@Module({
    imports: [
        CommonModule,
        JwtModule.register({ global: true })
    ],
    providers: [ AuthJwtService ]
})
export class AuthJwtModule {}
