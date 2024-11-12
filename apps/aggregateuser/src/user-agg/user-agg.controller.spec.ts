import { Test, TestingModule } from '@nestjs/testing';
import { UserAggController } from './user-agg.controller';
import { UserAggService } from './user-agg.service';
import { USER_SERVICE } from './constant';

const mockClientGrpc = {
  getService: jest.fn(() => ({
    aggregateUser: jest.fn().mockResolvedValue({ data: 'mocked response' }),
  })),
};

describe('UserAggController', () => {
  let controller: UserAggController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserAggController],
      providers: [
        UserAggService,
        {
          provide: USER_SERVICE, // Provide the USER_SERVICE token
          useValue: mockClientGrpc, // Mocked gRPC client
        },
      ],
    }).compile();

    controller = module.get<UserAggController>(UserAggController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
