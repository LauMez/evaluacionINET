import axios from 'axios';

export class CartController {
    constructor ({ cartModel }) {
      this.cartModel = cartModel;
    };

    getCart = async(req, res) => {
        const clientID = req.session.user.id;

        const cart = await this.cartModel.getCart({ clientID });
        
        return res.render('cart', { cart });
    };

    buyProduct = async(req, res) => {
        const { productID } = req.params;
        const clientID = req.session.user.id;

        await this.cartModel.addProduct({ productID, clientID });

        return this.getCart(req, res);
    };

    addProduct = async(req, res) => {
        const { productID } = req.body;
        const clientID = req.session.user.id;

        const productAdded = await this.cartModel.addProduct({ productID, clientID });

        return res.json(productAdded);
    };

    updateQuantity = async(req, res) => {
        const { productID } = req.params;
        const clientID = req.session.user.id;
        const { newQuantity } = req.body;

        const quantityUpdated = await this.cartModel.updateQuantity({ productID, clientID, newQuantity });

        return res.json(quantityUpdated)
    }

    addProductInDetails = async(req, res) => {
        const { quantity } = req.body;
        const { productID } = req.params;
        const clientID = req.session.user.id;

        await this.cartModel.addProductInDetails({ productID, clientID, quantity });

        const response = await axios.get(`http://localhost:1234/producto/${productID}`);
        const product = response.data;

        return res.render('product_details', { product });
    };

    deleteProduct = async(req, res) => {
        const { productID } = req.params;
        const clientID = req.session.user.id;

        const productDeleted = await this.cartModel.deleteProduct({ productID, clientID });

        return res.json(productDeleted);
    };
};