import { RentalService } from './rental.service';
import { CreateRentalDto } from './dto/create-rental.dto';
import { UpdateRentalDto } from './dto/update-rental.dto';
export declare class RentalController {
    private readonly rentalService;
    private readonly logger;
    constructor(rentalService: RentalService);
    create(createRentalDto: CreateRentalDto): string;
    findAll(): Promise<import("./entities/rental.entity").Rental[]>;
    findOne(id: string): Promise<import("./entities/rental.entity").Rental>;
    update(id: string, updateRentalDto: UpdateRentalDto): string;
    remove(id: string): Promise<void>;
}
