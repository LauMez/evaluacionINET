import axios from 'axios';

export class PaymentController {
    constructor ({ paymentModel }) {
      this.paymentModel = paymentModel;
    };

    order = async(req, res) => {
        const { status, date, purchaseAmount, email } = req.body;
        const clientID = req.session.user.id;

        return await this.paymentModel.order({ clientID, status, date, purchaseAmount, email });
    }

    paypalConfirm = async(req, res) => {
        const { id, purchaseAmount, status, date, email } = req.body;
        const { clientID } = req.session.user.id;

        const payment = await this.paymentModel.paypalConfirm({ id, purchaseAmount, status, date, email, clientID });

        const order = await this.order(req, res);

        return res.json(payment);
    };

};