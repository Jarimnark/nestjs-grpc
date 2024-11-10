import { Module } from '@nestjs/common';
import { UserAggModule } from './user-agg/user-agg.module';

@Module({
  imports: [UserAggModule],
  controllers: [],
  providers: [],
})
export class UserModule {}
