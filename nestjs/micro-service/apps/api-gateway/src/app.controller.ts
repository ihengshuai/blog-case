import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('ORDER_SERVICE') private readonly orderService: ClientProxy,
  ) {}

  // async onApplicationBootstrap() {
  //   await this.orderService.connect();
  // }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/api/order-status')
  getOrderStatus(): Observable<string> {
    return this.orderService.send({ cmd: 'get-order-status' }, {});
  }
}
