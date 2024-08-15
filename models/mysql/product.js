import { db } from '../../config.js';

export class ProductModel {
  static async getAll() {
    try {
      const products = await new Promise((resolve, reject) => {
        db.execute('SELECT productID, name, price FROM Product', (err, products) => {
          if (err) reject(err);
          resolve(products);
        });
      });

      if (!products) return [];

      return products.map(product => ({
        productID: product.productID.toString('hex'),
          name: product.name,
          price: product.price
      }));
    } catch(e) {
      console.log(e);
      throw new Error('Internal server error');
    }
  };

  static async getByID({ productID }) {
    const [Product] = await db.promise().execute(`SELECT name, price FROM Product WHERE productID = UUID_TO_BIN("${productID}");`);
    const product = Product[0];

    if(Product.length == 0) return [];

    return {
      productID,
      name: product.name,
      price: product.price
    }
  };

  static async getDetails({ productID }) {
    const [Product] = await db.promise().execute(`SELECT name, price, description FROM Product WHERE productID = UUID_TO_BIN("${productID}");`);
    const product = Product[0];

    if(Product.length == 0) {
      console.log("product");
      return [];
    }

    const [Stock] = await db.promise().execute(`SELECT quantity FROM Stock WHERE productID = UUID_TO_BIN("${productID}");`);
    const stock = Stock[0];

    if(Stock.length == 0) {
      console.log("stock");
      return [];
    }

    return {
      productID,
      name: product.name,
      description: product.description,
      price: product.price,
      stock: stock.quantity
    }
  };

  static async create({ name, description, price, quantity }) {
    const [uuidProduct] = await db.promise().execute('SELECT UUID() productID;')
    const [{ productID }] = uuidProduct;

    await db.promise().query(`INSERT INTO Product (productID, name, description, price) VALUES (UUID_TO_BIN("${productID}"), ?, ?, ?)`, [ name, description, price]);

    await db.promise().query(`INSERT INTO Stock (productID, quantity) VALUES (UUID_TO_BIN("${productID}"), ?)`, [quantity]);

    return { message: "Producto creado" };
  };

  static async edit({ productID, name, description, price, stock }) {
    await db.promise().query(`UPDATE Product SET name = ?, description = ?, price = ? WHERE productID = (UUID_TO_BIN("${productID}"));`, [name, description, price]);

    await db.promise().query(`UPDATE Stock SET quantity = ? WHERE productID = (UUID_TO_BIN("${productID}"));`, [stock]);

    return { message: "Producto actualizado" };
  };

  static async delete({ productID }) {
    await db.promise().query(`DELETE FROM Stock WHERE productID = (UUID_TO_BIN("${productID}"));`);

    await db.promise().query(`DELETE FROM Product WHERE productID = (UUID_TO_BIN("${productID}"));`);

    return { message: "Producto eliminado" };
  };
};