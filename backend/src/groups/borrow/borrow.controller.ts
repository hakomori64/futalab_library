import { Controller, Get, Post, Body, Param, Delete, Logger, Put, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { BorrowService } from './borrow.service';
import { CreateBorrowDto } from './dto/create-borrow.dto';
import { UpdateBorrowDto } from './dto/update-borrow.dto';

@Controller()
@UseGuards(AuthGuard('jwt'))
export class BorrowController {
  private readonly logger = new Logger(BorrowController.name);

  constructor(private readonly borrowService: BorrowService) {}

  @Post()
  create(@Request() req, @Body() createBorrowDto: CreateBorrowDto) {
    const data = {
      ...createBorrowDto,
      user_id: req.user.id
    }
    return this.borrowService.create(data);
  }

  @Get()
  findAll() {
    return this.borrowService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.borrowService.findOne(+id);
  }

  @Put(':id')
  update(@Request() req, @Param('id') id: string, @Body() updateBorrowDto: UpdateBorrowDto) {
    const data = {
      ...updateBorrowDto,
      user_id: req.user.id
    };
    return this.borrowService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.borrowService.remove(+id);
  }
}
