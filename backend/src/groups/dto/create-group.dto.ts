import { ApiProperty } from "@nestjs/swagger";

export class CreateGroupDto {
    @ApiProperty()
    readonly str_id: string;

    @ApiProperty()
    readonly name: string;
}
