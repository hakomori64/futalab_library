import { Controller, Get, Post, Body, Patch, Param, Delete, Logger, UseInterceptors, ClassSerializerInterceptor, Put, Request, UseGuards } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('groups')
@UseGuards(AuthGuard('jwt'))
export class GroupsController {
  private readonly logger = new Logger(GroupsController.name);

  constructor(private readonly groupsService: GroupsService) {}

  @Post()
  create(@Body() createGroupDto: CreateGroupDto) {
    return this.groupsService.create(createGroupDto);
  }

  
  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  findAll(@Request() req) {
    return this.groupsService.findAllByUser(req.user);
  }
  
  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  findOne(@Request() req, @Param('id') id: string) {
    return this.groupsService.findOneByUser(+id, req.user);
  }
  
  @Put(':id')
  update(@Param('id') id: string, @Body() updateGroupDto: UpdateGroupDto) {
    return this.groupsService.update(+id, updateGroupDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.groupsService.remove(+id);
  }
}
