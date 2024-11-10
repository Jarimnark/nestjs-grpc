import { Test, TestingModule } from '@nestjs/testing';
import { UserAggController } from './user-agg.controller';
import { UserAggService } from './user-agg.service';

describe('UserAggController', () => {
  let controller: UserAggController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserAggController],
      providers: [UserAggService],
    }).compile();

    controller = module.get<UserAggController>(UserAggController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
