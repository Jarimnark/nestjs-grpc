import { Controller, Get } from '@nestjs/common';
import { UserAggService } from './user-agg.service';

@Controller('user-agg')
export class UserAggController {
  constructor(private readonly userAggService: UserAggService) {}

  @Get()
  aggregateUser() {
    return this.userAggService.aggregateUser();
  }
}
