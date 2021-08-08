import { OmitType } from '@nestjs/swagger';
import { CreateReturnDto } from './create-return.dto';

export class UpdateReturnDto extends OmitType(CreateReturnDto, [] as const) {}
