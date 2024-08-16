import { db } from '../../config.js';

export class PaymentModel {
    static async order({ clientID, status, date, purchaseAmount, email }) {
        const [Cart] = await db.promise().execute(`SELECT cartID FROM Cart WHERE clientID = UUID_TO_BIN("${clientID}");`);
        const cart = Cart[0];

        if(Cart.length == 0) {
            console.log("cart error");
            return [];
        }

        const cartID = cart.cartID.toString('hex');

        const [uuidOrder] = await db.promise().execute('SELECT UUID() orderID;')
        const [{ orderID }] = uuidOrder;

        const [Order] = await db.promise().execute(`INSERT INTO Payment_Order (orderID, status, creation_date) VALUES (UUID_TO_BIN("${orderID}"), ?, ?)`, [status, date]);

        const [uuidBuyer] = await db.promise().execute('SELECT UUID() buyer_infoID;')
        const [{ buyer_infoID }] = uuidBuyer;

        const [Buyer] = await db.promise().execute(`INSERT INTO Buyer_Information (buyer_infoID, orderID, clientID) VALUES (UUID_TO_BIN("${buyer_infoID}"), UUID_TO_BIN("${orderID}"), UUID_TO_BIN("${clientID}"))`);

        const [selectedProducts] = await db.promise().execute(`SELECT * FROM Selected_Product WHERE cartID = UUID_TO_BIN("${cartID}");`);

        if(selectedProducts.length == 0) {
            console.log("product error");
            return [];
        }

        const productObjects = await Promise.all(selectedProducts.map(async (selectedProduct) => {
            const productID = selectedProduct.productID.toString('hex');
            const [Product] = await db.promise().execute(`SELECT * FROM Product WHERE productID = UUID_TO_BIN("${productID}");`);
            const product = Product[0];

            const [uuidProduct] = await db.promise().execute('SELECT UUID() purchased_productID;')
            const [{ purchased_productID }] = uuidProduct;

            const [PurchaseProduct] = await db.promise().execute(`INSERT INTO Purchased_Product (purchased_productID, orderID, productID, quantity) VALUES (UUUID_TO_BIN(${purchased_productID}), UUUID_TO_BIN(${orderID}), UUUID_TO_BIN(${productID}), ?);`, [selectedProduct.quantity]);

            return {
                selected_productID: selectedProduct.selected_productID.toString('hex'),
                cartID: selectedProduct.cartID.toString('hex'),
                productID: selectedProduct.productID.toString('hex'),
                name: product.name,
                price: product.price,
                quantity: selectedProduct.quantity
            };
        }));

        return {
            cartID: cartID,
            products: productObjects
        }
    };

    static async paypalConfirm({ id, purchaseAmount, status, date, email, clientID }) {
        return {
            id,
            purchaseAmount,
            status, 
            date,
            email,
            clientID
        }
    };

};  