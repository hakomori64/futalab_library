import { ApiProperty } from "@nestjs/swagger";

export class CreateBorrowDto {
    @ApiProperty()
    readonly user_name: string;

    @ApiProperty()
    readonly quantity: number;

    @ApiProperty()
    readonly book_id: number;

    @ApiProperty()
    readonly group_id: number;
}