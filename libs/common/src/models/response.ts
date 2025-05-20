import { UserDTO } from './index';
import { ApiProperty } from '@nestjs/swagger';

export class ResponseSignIn {
  @ApiProperty({ type: String, default: '' })
  accessToken?: string;

  @ApiProperty({ type: String, default: '' })
  refreshToken?: string;
}

export class ResponseGetUser {
  @ApiProperty({ type: UserDTO, default: undefined })
  user?: UserDTO;
}

export class ResponseRefreshToken {
  @ApiProperty({ type: String, default: '' })
  accessToken?: string;
}

export class ResponseIsMatchedRefreshToken {
  @ApiProperty({ type: String, default: '' })
  accessToken?: string;
}