import { ApiProperty } from "@nestjs/swagger";

export class CreateBookDto {
    @ApiProperty()
    readonly title: string;

    @ApiProperty()
    readonly isbn: string;

    @ApiProperty()
    readonly cover_image_url: string;

    @ApiProperty()
    readonly quantity: number;
}