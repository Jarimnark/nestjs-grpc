import { Module } from '@nestjs/common';
import { UserAggService } from './user-agg.service';
import { UserAggController } from './user-agg.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [UserAggController],
  providers: [UserAggService],
})
export class UserAggModule {}
