export class CartController {
    constructor ({ cartModel }) {
      this.cartModel = cartModel;
    };

    getCart = async(req, res) => {
        const clientID = req.session.user.id;

        const cart = await this.cartModel.getCart({ clientID });
        
        return res.json('cart', { cart });
    };

    buyProduct = async(req, res) => {

    };

    addProduct = async(req, res) => {
        const { productID } = req.body;
        const clientID = req.session.user.id;
        console.log('client id', clientID);

        const productAdded = await this.cartModel.addProduct({ productID, clientID });

        return res.json(productAdded);
    };

    addProductInDetails = async(req, res) => {
        
    };

    deleteProduct = async(req, res) => {
        
    };
};