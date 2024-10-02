import { PaypalService } from './paypal/paypal.service';
import { Controller, Post, Body, Param } from '@nestjs/common';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paypalService: PaypalService) {}

  // Endpoint para crear una orden de pago
  @Post('create-order')
  async createOrder(@Body() body: { amount: string }) {
    const { amount } = body;
    const order = await this.paypalService.createOrder(amount);
    return { orderId: order.id };
  }

  // Endpoint para capturar el pago
  @Post('capture-order/:orderId')
  async captureOrder(@Param('orderId') orderId: string) {
    const capture = await this.paypalService.captureOrder(orderId);
    return { status: capture.status };
  }
}
