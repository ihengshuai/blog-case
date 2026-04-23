import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class OrderStatusController {
  @MessagePattern({ cmd: 'get-order-status' })
  getOrderStatus() {
    console.log('getOrderStatus');
    return 'OK';
  }
}
