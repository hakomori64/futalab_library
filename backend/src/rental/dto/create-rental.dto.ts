import { ApiProperty } from "@nestjs/swagger";

export class CreateRentalDto {
    @ApiProperty()
    readonly borrower_name: string;

    @ApiProperty()
    readonly quantity: number;

    @ApiProperty()
    readonly book_id: number;
}
