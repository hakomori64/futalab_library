import { Controller, Get, Post, Body, Param, Delete, Logger, Put, Request, UseGuards } from '@nestjs/common';
import { ReturnService } from './return.service';
import { CreateReturnDto } from './dto/create-return.dto';
import { UpdateReturnDto } from './dto/update-return.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller()
@UseGuards(AuthGuard('jwt'))
export class ReturnController {
  private readonly logger = new Logger(ReturnController.name);

  constructor(private readonly returnService: ReturnService) {}

  @Post()
  create(@Request() req, @Body() createReturnDto: CreateReturnDto) {
    const data = {
      ...createReturnDto,
      user_id: req.user.id,
    };
    return this.returnService.create(data);
  }

  @Get()
  findAll() {
    return this.returnService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.returnService.findOne(+id);
  }

  @Put(':id')
  update(@Request() req, @Param('id') id: string, @Body() updateReturnDto: UpdateReturnDto) {
    const data = {
      ...updateReturnDto,
      user_id: req.user.id,
    };
    return this.returnService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.returnService.remove(+id);
  }
}
