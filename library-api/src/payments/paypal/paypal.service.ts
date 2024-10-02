import { Injectable } from '@nestjs/common';
import * as paypal from '@paypal/checkout-server-sdk'; // Importar de esta manera

@Injectable()
export class PaypalService {
  private client: paypal.core.PayPalHttpClient;

  constructor() {
    const environment = new paypal.core.SandboxEnvironment(
      'AZKuroLFQ7SsyogoCvbon8vJhg1yhuZWPmgYo_G2yV6hpLNMMbcEyt7fGGYmD1srT2nIqU6KGaG3uLIz',
      'EIdJ0W8NrvhEEJ5nfUUgN0qxem5toK0JKQHTRIpLSt5xzEn22cz3opFzLs3waoZJW1CeISZMUdAD6KZ4',
    );
    this.client = new paypal.core.PayPalHttpClient(environment);
  }

  // Método para crear una orden de pago
  async createOrder(amount: string) {
    const request = new paypal.orders.OrdersCreateRequest();
    request.requestBody({
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: 'USD',
            value: amount,
          },
        },
      ],
    });

    const response = await this.client.execute(request);
    return response.result;
  }

  // Método para capturar el pago
  async captureOrder(orderId: string) {
    const request = new paypal.orders.OrdersCaptureRequest(orderId);
    request.requestBody({});
    const response = await this.client.execute(request);
    return response.result;
  }
}
