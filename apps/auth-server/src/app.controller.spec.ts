import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from '@nx-assignment/common';
import { AuthJwtModule } from '@nx-assignment/auth-jwt';
import { AuthDatabaseModule } from '@nx-assignment/database';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [CommonModule, AuthDatabaseModule, AuthJwtModule],
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('getUser', () => {
    it('debug getUser"', async () => {
      const result = await appController.getUser({ userId: '10000000' });
      console.log('getUser =', result);
      expect(result).toBeDefined();
    });
  });
});
