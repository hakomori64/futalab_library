import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { InvitationsService } from './invitations.service';
import { AuthGuard } from '@nestjs/passport';

@Controller()
@UseGuards(AuthGuard('jwt'))
export class InvitationsController {
  constructor(private readonly invitationsService: InvitationsService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  findAll(@Param('groupId') group_id: string) {
    return this.invitationsService.findAll(+group_id);
  }
}
