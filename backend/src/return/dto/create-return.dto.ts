import { ApiProperty } from '@nestjs/swagger';

export class CreateReturnDto {
    @ApiProperty()
    readonly user_name: string;

    @ApiProperty()
    readonly quantity: number;

    @ApiProperty()
    readonly book_id: number;
}
