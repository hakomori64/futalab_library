import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RentalsService } from './rentals.service';

@Controller()
export class RentalsController {
  constructor(private readonly rentalsService: RentalsService) {}

  @Get()
  findAll(@Param('groupId') group_id: string) {
    return this.rentalsService.findAll(+group_id);
  }
}
