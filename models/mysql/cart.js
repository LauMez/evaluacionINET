import { db } from '../../config.js';

export class CartModel {
    static async getCart({ clientID }) {
        const [Cart] = await db.promise().execute(`SELECT cartID FROM Cart WHERE clientID = UUID_TO_BIN("${clientID}");`);
        const cart = Cart[0];

        if(Cart.length == 0) {
            console.log("cart error");
            return [];
        }

        const cartID = cart.cartID.toString('hex');
        const products = await db.promise().execute(`SELECT * FROM Selected_Product WHERE cartID = UUID_TO_BIN("${cartID}");`);

        if(products.length == 0) {
            console.log("product error");
            return [];
        }

        return {
            cartID,
            products: products
        }
    }
    static async addProduct({ productID, clientID }) {
        const [Cart] = await db.promise().execute(`SELECT cartID FROM Cart WHERE clientID = UUID_TO_BIN("${clientID}");`);
        const cart = Cart[0];

        if(Cart.length == 0) {
            console.log("cart error");
            return [];
        }

        const cartID = cart.cartID.toString('hex');

        db.query(`SELECT * FROM Selected_Product WHERE cartID = UUID_TO_BIN("${cartID}") AND productID = UUID_TO_BIN("${productID}");`, (err, result) => {
            if(err) console.log(err);

            if(result.length > 0) {
                db.promise().execute(`UPDATE Selected_Product SET quantity = quantity + ? WHERE cartID = UUID_TO_BIN("${cartID}") AND productID = UUID_TO_BIN("${productID}");`, [1]);
            } else {
                const [uuidSelected] = db.promise().execute('SELECT UUID() selected_productID;');
                const [{ selected_productID }] = uuidSelected;

                db.promise().execute(`INSERT INTO Selected_Product (selected_productID, cartID, productID, quantity) VALUES (UUID_TO_BIN("${selected_productID}"), UUID_TO_BIN("${cartID}"), UUID_TO_BIN("${productID}"), ?)`, [1]);
            }
        });

        return { message: "Producto agregado al carrito" };
    };
};  