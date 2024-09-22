import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderItem } from 'src/orders/entities/orderitem.entity';
import { CustomerOrders } from 'src/orders/entities/orders.entity';
import { OrdersModule } from 'src/orders/orders.module';
import { OrdersService } from 'src/orders/orders.service';
import { ProductSize } from 'src/shop/entities/product-size.entity';
import { Product } from 'src/shop/entities/product.entity';
import { User } from 'src/user/user.entity';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';

@Module({
  imports: [TypeOrmModule.forFeature([CustomerOrders,User, Product,OrderItem,ProductSize])],
  controllers: [AdminController],
  providers: [AdminService]
})
export class AdminModule {}
