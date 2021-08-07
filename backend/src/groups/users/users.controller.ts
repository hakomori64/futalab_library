import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Logger, UseInterceptors, ClassSerializerInterceptor, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from './users.service';

@Controller()
@UseGuards(AuthGuard('jwt'))
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
  ) {}
  private readonly logger = new Logger(UsersController.name);

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  findAll(@Param('groupId') group_id: string) {
    return this.usersService.findAll(+group_id);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  findOne(@Param('groupId') group_id: string, @Param('id') id: string) {
    return this.usersService.findOne(+group_id, +id);
  }

  @Post('join')
  addUser(@Param('groupId') group_id: string, @Body() data: { user_id: number }) {
    const user_id = data.user_id;
    return this.usersService.addGroup(user_id, +group_id);
  }
}
