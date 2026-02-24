import { Body, Controller, Post, Put, Delete, Param, Get } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() body: CreateUserDto) {
    console.log('Body reçu:', body);

    return this.userService.createUser(body);
  }

  @Put(':email')
  async updatePassword(@Param('email') email: string, @Body() body: any) {
    return this.userService.updatePassword(email, body?.password);
  }

  @Get()
  async getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Delete(':email')
  async deleteUser(@Param('email') email: string) {
    const deleted = await this.userService.deleteUser(email);
    return {
      message: deleted ? 'Utilisateur supprimé' : 'Utilisateur non trouvé',
      success: deleted
    };
  }
}
