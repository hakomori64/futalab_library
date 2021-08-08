import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RentalsService } from './rentals.service';

@Controller()
@UseGuards(AuthGuard('jwt'))
export class RentalsController {
  constructor(private readonly rentalsService: RentalsService) {}

  @Get()
  findAll(@Param('groupId') group_id: string) {
    return this.rentalsService.findAll(+group_id);
  }
}
