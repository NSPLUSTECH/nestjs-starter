import { TestingModule } from '@nestjs/testing';
import { AppController } from 'src/Controllers/app.controller';
import getTestingAppModule from 'test/TestingAppModule';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await getTestingAppModule()
    appController = app.get<AppController>(AppController);
  });

  describe('auth', () => {
    it('should return Hellow Authenticated', async () => {
      await expect(appController.getAll()).resolves.toBe('Hellow Authenticated');
    });
  });
});
