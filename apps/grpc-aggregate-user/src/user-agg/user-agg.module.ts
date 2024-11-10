import { Module } from '@nestjs/common';
import { UserAggService } from './user-agg.service';
import { UserAggController } from './user-agg.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { USER_PACKAGE_NAME, USER_AGG_SERVICE_NAME } from '@app/common';
import { join } from 'path';
import { USER_SERVICE } from './constant';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: USER_SERVICE,
        transport: Transport.GRPC,
        options: {
          package: USER_PACKAGE_NAME,
          protoPath: join(__dirname, '../user.proto'),
        },
      },
    ]),
  ],
  controllers: [UserAggController],
  providers: [UserAggService],
})
export class UserAggModule {}
