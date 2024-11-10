import { USER_AGG_SERVICE_NAME, UserAggServiceClient } from '@app/common';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { USER_SERVICE } from './constant';
import { ClientGrpc } from '@nestjs/microservices';

@Injectable()
export class UserAggService implements OnModuleInit {
  private userService: UserAggServiceClient;

  constructor(@Inject(USER_SERVICE) private client: ClientGrpc) {}

  onModuleInit() {
    this.userService = this.client.getService<UserAggServiceClient>(
      USER_AGG_SERVICE_NAME,
    );
  }

  aggregateUser() {
    return this.userService.aggregateUser({});
  }
}
