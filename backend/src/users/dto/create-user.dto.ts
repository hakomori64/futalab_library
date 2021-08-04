import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
    @ApiProperty({ nullable: true })
    readonly email: string;

    @ApiProperty()
    readonly name: string;

    @ApiProperty()
    readonly sub: string;
}
