import { Controller, Get, Post, Body, Param, Delete, UseGuards, Request, Put } from '@nestjs/common';
import { InvitationsService } from './invitations.service';
import { CreateInvitationDto } from './dto/create-invitation.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('invitations')
@UseGuards(AuthGuard('jwt'))
export class InvitationsController {
  constructor(private readonly invitationsService: InvitationsService) {}

  @Post('invite')
  create(@Body() createInvitationDto: CreateInvitationDto) {
    return this.invitationsService.create(createInvitationDto);
  }

  @Get()
  findAll(@Request() req) {
    return this.invitationsService.findAll(req.user);
  }

  @Put(':id/accept')
  update(@Param('id') id: string) {
    return this.invitationsService.accept(+id);
  }

  @Delete(':id/discard')
  remove(@Param('id') id: string) {
    return this.invitationsService.remove(+id);
  }
}
