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

        const [selectedProducts] = await db.promise().execute(`SELECT * FROM Selected_Product WHERE cartID = UUID_TO_BIN("${cartID}");`);

        if(selectedProducts.length == 0) {
            console.log("product error");
            return [];
        }

        const productObjects = await Promise.all(selectedProducts.map(async (selectedProduct) => {
            const productID = selectedProduct.productID.toString('hex');
            const [Product] = await db.promise().execute(`SELECT * FROM Product WHERE productID = UUID_TO_BIN("${productID}");`);
            const product = Product[0];

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
    }

    static async addProduct({ productID, clientID }) {
        const [Cart] = await db.promise().execute(`SELECT cartID FROM Cart WHERE clientID = UUID_TO_BIN("${clientID}");`);
        const cart = Cart[0];

        if(Cart.length == 0) {
            console.log("cart error");
            return [];
        }

        const cartID = cart.cartID.toString('hex');

        const [result] = await db.promise().execute(`SELECT * FROM Selected_Product WHERE cartID = UUID_TO_BIN("${cartID}") AND productID = UUID_TO_BIN("${productID}");`);

        if (result.length > 0) {
            await db.promise().execute(`UPDATE Selected_Product SET quantity = quantity + ? WHERE cartID = UUID_TO_BIN("${cartID}") AND productID = UUID_TO_BIN("${productID}");`, [1]);
        } else {
            const [uuidSelected] = await db.promise().execute('SELECT UUID() AS selected_productID;');
            const selected_productID = uuidSelected[0].selected_productID;

            await db.promise().execute(`INSERT INTO Selected_Product (selected_productID, cartID, productID, quantity) VALUES (UUID_TO_BIN("${selected_productID}"), UUID_TO_BIN("${cartID}"), UUID_TO_BIN("${productID}"), ?)`, [1]);
        }

        return { message: "Producto agregado al carrito" };
    };

    static async addProductInDetails({ productID, clientID, quantity }) {
        const [Cart] = await db.promise().execute(`SELECT cartID FROM Cart WHERE clientID = UUID_TO_BIN("${clientID}");`);
        const cart = Cart[0];

        if(Cart.length == 0) {
            console.log("cart error");
            return [];
        }

        if(!quantity || quantity == 0) quantity = 1;

        const cartID = cart.cartID.toString('hex');
        
        const [result] = await db.promise().execute(`SELECT * FROM Selected_Product WHERE cartID = UUID_TO_BIN("${cartID}") AND productID = UUID_TO_BIN("${productID}");`);

        if (result.length > 0) {
            await db.promise().execute(`UPDATE Selected_Product SET quantity = quantity + ? WHERE cartID = UUID_TO_BIN("${cartID}") AND productID = UUID_TO_BIN("${productID}");`, [quantity]);
        } else {
            const [uuidSelected] = await db.promise().execute('SELECT UUID() AS selected_productID;');
            const selected_productID = uuidSelected[0].selected_productID;

            await db.promise().execute(`INSERT INTO Selected_Product (selected_productID, cartID, productID, quantity) VALUES (UUID_TO_BIN("${selected_productID}"), UUID_TO_BIN("${cartID}"), UUID_TO_BIN("${productID}"), ?)`, [quantity]);
        }

        return { message: "Producto agregado al carrito" };
    };

    static async updateQuantity({ productID, clientID, newQuantity }) {
        const [Cart] = await db.promise().execute(`SELECT cartID FROM Cart WHERE clientID = UUID_TO_BIN("${clientID}");`);
        const cart = Cart[0];

        if(Cart.length == 0) {
            console.log("cart error");
            return [];
        }

        const cartID = cart.cartID.toString('hex');

        db.promise().execute(`UPDATE Selected_Product SET quantity = ? WHERE cartID = UUID_TO_BIN("${cartID}") AND productID = UUID_TO_BIN("${productID}");`, [newQuantity]);

        const [selectedProducts] = await db.promise().execute(`SELECT * FROM Selected_Product WHERE cartID = UUID_TO_BIN("${cartID}");`);

        if(selectedProducts.length == 0) {
            console.log("product error");
            return [];
        }

        const productObjects = await Promise.all(selectedProducts.map(async (selectedProduct) => {
            const productID = selectedProduct.productID.toString('hex');
            const [Product] = await db.promise().execute(`SELECT * FROM Product WHERE productID = UUID_TO_BIN("${productID}");`);
            const product = Product[0];

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

    static async deleteProduct({ productID, clientID }) {
        const [Cart] = await db.promise().execute(`SELECT cartID FROM Cart WHERE clientID = UUID_TO_BIN("${clientID}");`);
        const cart = Cart[0];

        if(Cart.length == 0) {
            console.log("cart error");
            return [];
        }

        const cartID = cart.cartID.toString('hex');

        await db.promise().execute(`DELETE FROM Selected_Product WHERE productID = (UUID_TO_BIN("${productID}")) AND cartID = UUID_TO_BIN("${cartID}");`);

        return { message: "Producto eliminado del carrito" };
    }
};  