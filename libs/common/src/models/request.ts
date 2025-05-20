import { ApiProperty } from '@nestjs/swagger';

export class RequestSignIn {
  @ApiProperty({ type: Number, default: '10000000' })
  userId?: string;
}

export class RequestGetUser {
  @ApiProperty({ type: Number, default: '10000000' })
  userId?: string;
}

export class RequestRefreshToken {
  @ApiProperty({ type: String, default: '' })
  refreshToken?: string;
}

export class RequestIsMatchedRefreshToken {
  @ApiProperty({ type: String, default: '10000000' })
  userId?: string;

  @ApiProperty({ type: String, default: '' })
  refreshTokenId?: string;
}
