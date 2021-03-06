import { ApiProperty } from '@nestjs/swagger';

export class CreateReturnDto {

    @ApiProperty()
    readonly quantity: number;

    @ApiProperty()
    readonly book_id: number;

    @ApiProperty()
    readonly group_id: number;

    readonly user_id: number;
}
