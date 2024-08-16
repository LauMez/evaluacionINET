export class PaymentController {
    constructor ({ paymentModel }) {
      this.paymentModel = paymentModel;
    };

    paypalConfirm = async(req, res) => {
        const payment = await this.paymentModel.paypalConfirm();
    };

};