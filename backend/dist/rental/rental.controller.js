"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var RentalController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RentalController = void 0;
const common_1 = require("@nestjs/common");
const rental_service_1 = require("./rental.service");
const create_rental_dto_1 = require("./dto/create-rental.dto");
const update_rental_dto_1 = require("./dto/update-rental.dto");
let RentalController = RentalController_1 = class RentalController {
    constructor(rentalService) {
        this.rentalService = rentalService;
        this.logger = new common_1.Logger(RentalController_1.name);
    }
    create(createRentalDto) {
        return this.rentalService.create(createRentalDto);
    }
    async findAll() {
        const rentals = await this.rentalService.findAll();
        for (const rental of rentals) {
            this.logger.log(rental.book);
        }
        return rentals;
    }
    findOne(id) {
        return this.rentalService.findOne(+id);
    }
    update(id, updateRentalDto) {
        return this.rentalService.update(+id, updateRentalDto);
    }
    remove(id) {
        return this.rentalService.remove(+id);
    }
};
__decorate([
    common_1.Post(),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_rental_dto_1.CreateRentalDto]),
    __metadata("design:returntype", void 0)
], RentalController.prototype, "create", null);
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RentalController.prototype, "findAll", null);
__decorate([
    common_1.Get(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RentalController.prototype, "findOne", null);
__decorate([
    common_1.Patch(':id'),
    __param(0, common_1.Param('id')), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_rental_dto_1.UpdateRentalDto]),
    __metadata("design:returntype", void 0)
], RentalController.prototype, "update", null);
__decorate([
    common_1.Delete(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RentalController.prototype, "remove", null);
RentalController = RentalController_1 = __decorate([
    common_1.Controller('rentals'),
    __metadata("design:paramtypes", [rental_service_1.RentalService])
], RentalController);
exports.RentalController = RentalController;
//# sourceMappingURL=rental.controller.js.map