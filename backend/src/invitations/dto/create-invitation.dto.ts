import { ApiProperty } from '@nestjs/swagger';

export class CreateInvitationDto {
    @ApiProperty()
    readonly email: string;

    @ApiProperty()
    readonly group_id: number;
}
