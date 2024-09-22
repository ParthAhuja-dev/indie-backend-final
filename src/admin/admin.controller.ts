import { Body, Controller, Get, HttpException, HttpStatus, Patch } from '@nestjs/common';
import { AdminService } from './admin.service';
import { UpdateOrderStatusDto } from './UpdateOrderStatusdto';

@Controller('admin')
export class AdminController {
    constructor(private readonly AdminRepository: AdminService){}

    @Get('hello')
    sayHello(){
        return "hello from orders";
    }

    @Get('allorders')
    async allOrders(){
        return this.AdminRepository.getAllOrders();
    }

    @Patch('changeStatus')
    async updateOrderStatus(@Body() updateOrderDto: UpdateOrderStatusDto) {
    return await this.AdminRepository.changeOrderStatus(updateOrderDto);
    }


}
