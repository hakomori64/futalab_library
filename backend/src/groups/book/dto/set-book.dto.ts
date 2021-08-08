type setFunc = () => string;

export class SetBookDto {
    constructor(
        readonly title?: setFunc | string,
        readonly isbn?: setFunc | string,
        readonly cover_image_url?: setFunc | string,
        readonly quantity?: setFunc | number,
    ) {}
}
