import { ApiProperty } from "@nestjs/swagger";

export class CreateBorrowDto {
    @ApiProperty()
    readonly borrower_name: string;

    @ApiProperty()
    readonly quantity: number;

    @ApiProperty()
    readonly book_id: number;
}
