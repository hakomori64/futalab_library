type setFunc = () => string

export class SetUserDto {
    constructor(
        readonly name?: setFunc | string
    ) {}
}