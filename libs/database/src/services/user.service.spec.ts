import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { AuthDatabaseModule } from '../modules/auth-database.module';
import { CommonModule } from '@nx-assignment/common';

describe('UserService', () => {
  let userService: UserService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [CommonModule, AuthDatabaseModule],
    }).compile();

    userService = app.get<UserService>(UserService);
  });

  describe('getUser', () => {
    it('debug getUser', async () => {
      const result = await userService.getUser('10000000');
      console.log('getUser =', result);
      expect(result).toBeDefined();
    });
  });
});
