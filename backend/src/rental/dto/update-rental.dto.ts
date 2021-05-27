import { PartialType } from '@nestjs/mapped-types';
import { OmitType } from '@nestjs/swagger';
import { CreateRentalDto } from './create-rental.dto';

export class UpdateRentalDto extends OmitType(CreateRentalDto, [] as const) {}
