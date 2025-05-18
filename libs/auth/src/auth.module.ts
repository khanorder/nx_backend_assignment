import {Global, Module} from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { CommonModule } from "@nx-assignment/common";
import { AuthJwtModule } from "@nx-assignment/auth-jwt";

// import { AuthService } from './auth.service';
// import { AuthController } from './auth.controller';
// import { LocalStrategy } from './local.strategy';
// import { JwtStrategy } from './jwt.strategy';

@Global()
@Module({
    imports: [
        CommonModule,
        AuthJwtModule,
        PassportModule
    ],
    // providers: [AuthService, LocalStrategy, JwtStrategy],
    // controllers: [AuthController],
})
export class AuthModule {}
