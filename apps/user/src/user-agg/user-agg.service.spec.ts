import { Test, TestingModule } from '@nestjs/testing';
import { UserAggService } from './user-agg.service';

describe('UserAggService', () => {
  let service: UserAggService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserAggService],
    }).compile();

    service = module.get<UserAggService>(UserAggService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
