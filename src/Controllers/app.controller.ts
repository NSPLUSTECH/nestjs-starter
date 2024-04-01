import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { UserService } from '../Services/User.Service';
import { User } from '../Entities/User.entity';

@ApiBearerAuth()
@Controller()
export class AppController {
  constructor(private readonly userProvider: UserService) { }

  @Get()
  async getHello(): Promise<User[]> {
    let user = new User();
    user.firstName = "myFirstName";
    user.lastName = "last name";
    await this.userProvider.createUser(user);
    let retunedUser = await this.userProvider.findAll();
    return retunedUser;
  }
}
