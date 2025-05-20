import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from '@nx-assignment/common';
import { ApiModule } from '@nx-assignment/api';
import { AuthModule } from '@nx-assignment/auth';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [CommonModule, AuthModule, ApiModule],
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('signIn', () => {
    it('debug signIn"', async () => {
      const result = await appController.signIn({ userId: '10000000' });
      console.log('signIn =', result);
      expect(result).toBeDefined();
    });
  });
});
