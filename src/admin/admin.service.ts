import { Get, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import orders from 'razorpay/dist/types/orders';
import { OrderItem } from 'src/orders/entities/orderitem.entity';
import { CustomerOrders } from 'src/orders/entities/orders.entity';
import { ProductSize } from 'src/shop/entities/product-size.entity';
import { Product } from 'src/shop/entities/product.entity';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AdminService {
    constructor(
        @InjectRepository(CustomerOrders)
        private readonly orderRepository: Repository<CustomerOrders>,
        @InjectRepository(OrderItem)
        private readonly orderItemRepository: Repository<OrderItem>,
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
        @InjectRepository(ProductSize)
        private readonly productSizeRepository: Repository<ProductSize>,
      ) {}


    async getAllOrders(){
        const orders = await this.orderRepository.find({
            relations: ['items'],
          });
          return orders;
    }

    // async changeOrderStatus(orderDetails: any) {
    //     try {
    //         // Log the order details received
    //         console.log(orderDetails);
    
    //         // Find the order by ID
    //         const order = await this.orderRepository.find({
    //             where: { id: orderDetails.id },
    //         });
    
    //         // If order not found, throw an error
    //         if (!order || order.length === 0) {
    //             throw new Error(`Order with ID ${orderDetails.id} not found.`);
    //         }else{

    //         }
    
    //         // Log the found order
    //         console.log(order);
    
    //         // Return the order
    //         return order;
    //     } catch (error) {
    //         // Handle any errors that occur
    //         console.error('Error while changing order status:', error.message || error);
            
    //         // You can either throw the error to propagate it further, or return a specific error response
    //         throw new Error('Unable to change order status. Please try again later.');
    //     }
    // }

    async changeOrderStatus(orderDetails: { id: number, orderStatus: string }) {
        try {
          const { id, orderStatus } = orderDetails;
    
          // Find the order by ID
          const order = await this.orderRepository.findOne({ where: { id } });
    
          if (!order) {
            throw new Error(`Order with ID ${id} not found.`);
          }
    
          // Update the order status
          order.orderStatus = orderStatus;
    
          // Save the updated order to the database
          await this.orderRepository.save(order);
    
          // Return the updated order
          return order;
        } catch (error) {
          console.error('Error while updating order status:', error.message || error);
    
          // Throw an HTTP exception if something goes wrong
          throw new HttpException(
            'Unable to update order status. Please try again later.',
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
        }
      }
    

}
