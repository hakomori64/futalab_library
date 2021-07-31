import { OmitType } from '@nestjs/swagger';
import { CreateBorrowDto } from './create-borrow.dto';

export class UpdateBorrowDto extends OmitType(CreateBorrowDto, [] as const) {}
