import { Controller, Get, Post, Body, Param, Delete, Logger, Put } from '@nestjs/common';
import { ReturnService } from './return.service';
import { CreateReturnDto } from './dto/create-return.dto';
import { UpdateReturnDto } from './dto/update-return.dto';

@Controller()
export class ReturnController {
  private readonly logger = new Logger(ReturnController.name);
  
  constructor(private readonly returnService: ReturnService) {}

  @Post()
  create(@Body() createReturnDto: CreateReturnDto) {
    return this.returnService.create(createReturnDto);
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
  update(@Param('id') id: string, @Body() updateReturnDto: UpdateReturnDto) {
    return this.returnService.update(+id, updateReturnDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.returnService.remove(+id);
  }
}
