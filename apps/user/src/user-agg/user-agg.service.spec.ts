import { Test, TestingModule } from '@nestjs/testing';
import { UserAggService } from './user-agg.service';
import { HttpModule } from '@nestjs/axios';

describe('UserAggService', () => {
  let service: UserAggService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [UserAggService],
    }).compile();

    service = module.get<UserAggService>(UserAggService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
