import { Controller } from '@nestjs/common';
import { UserAggService } from './user-agg.service';
import {
  DepartmentSummary,
  Empty,
  UserAggServiceController,
  UserAggServiceControllerMethods,
} from '@app/common';
import { Observable } from 'rxjs';

@Controller()
@UserAggServiceControllerMethods()
export class UserAggController implements UserAggServiceController {
  constructor(private readonly userAggService: UserAggService) {}
  aggregateUser(
    request: Empty,
  ):
    | Promise<DepartmentSummary>
    | Observable<DepartmentSummary>
    | DepartmentSummary {
    return this.userAggService.aggregateData();
  }
}
