import { validateProduct } from "../schemas/product.js";

export class ProductController {
    constructor ({ productModel }) {
      this.productModel = productModel;
    };

    getAll = async(req, res) => {
        const products = await this.productModel.getAll();
        
        return res.json(products);
    };

    getByID = async(req, res) => {
      const { productID } = req.params;

        const product = await this.productModel.getByID({ productID });

        return res.json(product);
    //   return res.render('product', { product });
    };

    getDetails = async(req, res) => {
      const { productID } = req.params;

      const product = await this.productModel.getDetails({ productID });

    //   return res.json(product);
    console.log(product);
      return res.render('product_details', { product });
    };

    getCreate = async(req, res) => {
      return res.render('create_product');
    };

    create = async(req, res) => {
      const { name, description, price, quantity } = req.body;
      console.log(req.body);

      if(!validateProduct({name, description, price, quantity})) {
        console.log('error validation');
      }

      const createdProduct = await this.productModel.create({ name, description, price, quantity });
      console.log(createdProduct);

      return res.render('create_product');
    };

    getEdit = async(req, res) => {
      return res.render('create_product');
    };

    edit = async(req, res) => {
      const { productID } = req.params;
      const { name, description, price, stock } = req.body;

      if(!validateProduct({name, description, price, quantity})) {
        console.log('error validation');
      }

      const editedProduct = await this.productModel.edit({ productID, name, description, price, stock });
        return res.json(editedProduct);
    //   return res.render('create_product');
    };

    delete = async(req, res) => {
      const { productID } = req.params;

      const deletedProduct = await this.productModel.delete({ productID });

      return res.json(deletedProduct);
    //   return res.render('products');
    };
};