import { Repository } from 'typeorm';
import { CreateRentalDto } from './dto/create-rental.dto';
import { UpdateRentalDto } from './dto/update-rental.dto';
import { Rental } from './entities/rental.entity';
export declare class RentalService {
    private rentalRepository;
    constructor(rentalRepository: Repository<Rental>);
    create(createRentalDto: CreateRentalDto): string;
    findAll(): Promise<Rental[]>;
    findOne(id: number): Promise<Rental>;
    update(id: number, updateRentalDto: UpdateRentalDto): string;
    remove(id: number): Promise<void>;
}
