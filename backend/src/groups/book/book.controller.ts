import { Controller, Get, Post, Body, Param, Delete, Logger, Put, UseInterceptors, UploadedFile, ClassSerializerInterceptor } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Controller()
export class BookController {
  private readonly logger = new Logger(BookController.name);

  constructor(
    private readonly bookService: BookService,
  ) {}

  @Post()
  create(@Body() createBookDto: CreateBookDto) {
    return this.bookService.create(createBookDto);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  findAll(@Param('groupId') group_id: string) {
    return this.bookService.findAll(+group_id);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  findOne(@Param('groupId') group_id: string, @Param('id') id: string) {
    return this.bookService.findOne(+group_id, +id);
  }

  @Put(':id/increment')
  incrementQuantity(@Param('id') id: string) {
    return this.bookService.set(+id, {
      quantity: () => "quantity + 1"
    });
  }

  @Put(':id/decrement')
  decrementQuantity(@Param('id') id: string) {
    return this.bookService.set(+id, {
      quantity: () => "quantity - 1"
    });
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.bookService.update(+id, updateBookDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookService.remove(+id);
  }
}
