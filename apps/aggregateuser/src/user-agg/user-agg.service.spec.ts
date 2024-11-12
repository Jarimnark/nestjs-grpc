import { Test, TestingModule } from '@nestjs/testing';
import { UserAggService } from './user-agg.service';
import { USER_SERVICE } from './constant';
import { firstValueFrom, of } from 'rxjs';
import { ClientGrpcProxy, Transport } from '@nestjs/microservices';

const mockClientGrpc = {
  getService: jest.fn(() => ({
    aggregateUser: jest.fn(() =>
      of({
        department: {
          engineering: {
            male: 10,
            female: 15,
            addressUser: Array(25),

            hair: {
              brown: 10,
              black: 15,
            },
          },
        },
      }),
    ),
  })),
};

describe('UserAggService', () => {
  let service: UserAggService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserAggService,
        {
          provide: USER_SERVICE,
          useValue: mockClientGrpc,
        },
      ],
    }).compile();

    service = module.get<UserAggService>(UserAggService);
    service.onModuleInit();
  });
  it('testEqual', async () => {
    const result = await firstValueFrom(service.aggregateUser());

    let checkEqual!: boolean;
    let countEqual: boolean[] = [];
    let returnEqual!: boolean;
    console.log(result);
    Object.keys(result.department).forEach((key) => {
      const group = result.department[key];

      // Ensure group exists
      if (!group || !group.addressUser || !group.hair) {
        returnEqual = false;
        return; // Skip this group if any field is missing
      }

      const countMale = group.male as number;
      const countFemale = group.female as number;
      let sumCountHair = 0;
      Object.keys(group['hair']).forEach((key) => {
        sumCountHair += group['hair'][key];
      });

      const countAddress = Object.keys(group.addressUser).length;
      checkEqual =
        countMale + countFemale === countAddress &&
        countAddress == sumCountHair;

      if (checkEqual) {
        countEqual.push(true);
      }
    });

    returnEqual = countEqual.every((c) => c == true);
    expect(returnEqual).toBe(true);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
