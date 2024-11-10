import { AggregateData, User, DepartmentSummary } from '@app/common';
import { HttpService } from '@nestjs/axios';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { firstValueFrom, max } from 'rxjs';
interface MinMaxAge {
  [department: string]: {
    minAge: number;
    maxAge: number;
  };
}
@Injectable()
export class UserAggService implements OnModuleInit {
  private users: User[] = [];
  constructor(private httpService: HttpService) {}

  async onModuleInit() {
    const res = await firstValueFrom(
      this.httpService.get('https://dummyjson.com/users'),
    );
    this.users = res.data.users;
  }

  aggregateData(): DepartmentSummary {
    const departmentData: { [key: string]: AggregateData } = {};
    const minMaxAge: MinMaxAge = {};
    let minAge = 1000000;
    let maxAge = 0;

    this.users.forEach((user) => {
      const { department } = user.company;

      if (!departmentData[department]) {
        departmentData[department] = {
          male: 0,
          female: 0,
          ageRange: '',
          hair: {},
          addressUser: {},
        };
      }

      if (!minMaxAge[department]) {
        minMaxAge[department] = { minAge: 1000000, maxAge: 0 };
      }

      const data: AggregateData = departmentData[department];

      // Count male and female
      if (user.gender === 'male') {
        data.male += 1;
      } else if (user.gender === 'female') {
        data.female += 1;
      }

      // Update age range
      if (user.age < minMaxAge[department].minAge) {
        minMaxAge[department].minAge = user.age;
      }

      if (user.age > minMaxAge[department].maxAge) {
        minMaxAge[department].maxAge = user.age;
      }

      departmentData[department].ageRange =
        `${minMaxAge[department].minAge}-${minMaxAge[department].maxAge}`;

      // Count hair colors
      const hairColor = user.hair.color;
      if (!data.hair[hairColor]) {
        data.hair[hairColor] = 0;
      }
      data.hair[hairColor] += 1;

      // Collect full name and postal code
      const fullName = `${user.firstName}${user.lastName}`;
      data.addressUser[fullName] = user.address.postalCode;
      console.log('data: ', user.company.department);
      console.log('data: ', user.gender);
      console.log('data: ', user.age);
      console.log('data: ', user.hair.color);
      console.log(
        'this is the data after iterate: ',
        departmentData[department],
      );
      console.log('this is minmaxage', minMaxAge);
    });

    return { department: departmentData };
  }
}
