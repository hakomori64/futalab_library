import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/users/entities/user.entity";

export class CreateGroupDto {
    @ApiProperty()
    readonly str_id: string;

    @ApiProperty()
    readonly name: string;

    readonly users: User[];
}
