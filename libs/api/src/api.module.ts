import { Global, Module } from '@nestjs/common';
import { CommonModule } from '@nx-assignment/common';
import { AuthApi } from './auth.api';

@Global()
@Module({
  imports: [CommonModule],
  providers: [AuthApi],
  exports: [AuthApi],
})
export class ApiModule {}
