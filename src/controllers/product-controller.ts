import { Response, Request } from 'express';
import { SqlConnectionManager } from "../utils/mysql.helper";
import { ProductService } from '../services/product.service';
import { Product } from '../models/product.model';
import { readProductsFromCSV } from '../utils/file-read.helper';


export const getAllProducts = async (req: Request, res: Response) => {
  const connection = SqlConnectionManager.createInstance();

  try {
    await SqlConnectionManager.initialiseInstance(connection);
    const products: Product[] = await ProductService.getAllProducts(connection);

    if (products.length > 0) {
      res.status(HTTPStatusCodes.OK).json(products);
    } else {
      res.status(HTTPStatusCodes.NOT_FOUND).json(`Could not find any products.`);
    }

  } catch (error) {
    console.error(error);
    res.status(HTTPStatusCodes.BAD_REQUEST).json(error);

  } finally {
    console.info('connection closed');
    await SqlConnectionManager.closeInstance(connection);
  }
}

export const getProductById = async (req: Request, res: Response) => {
  const connection = SqlConnectionManager.createInstance();

  try {
    const productId = parseInt(req.params.id);
    await SqlConnectionManager.initialiseInstance(connection);
    const product: Product = await ProductService.getProductById(connection, productId);

    if (product) {
      res.status(HTTPStatusCodes.OK).json(product);
    } else {
      res.status(HTTPStatusCodes.NOT_FOUND).json(`Could not find a product by id: ${productId}.`);
    }

  } catch (error) {
    console.error(error);
    res.status(HTTPStatusCodes.BAD_REQUEST).json(error);

  } finally {
    console.info('connection closed');
    await SqlConnectionManager.closeInstance(connection);
  }
}

export const createProduct = async (req: Request, res: Response) => {
  const connection = SqlConnectionManager.createInstance();

  try {
    let resBody = req.body as Product;
    await SqlConnectionManager.initialiseInstance(connection);
    let product: Product = await ProductService.createOrUpdateProduct(connection, resBody);

    res.status(HTTPStatusCodes.CREATED).json(product);

  } catch (error) {
    console.error(error);
    res.status(HTTPStatusCodes.BAD_REQUEST).json(error);

  } finally {
    console.info('connection closed');
    await SqlConnectionManager.closeInstance(connection);
  }
}

export const updateProduct = async (req: Request, res: Response) => {
  const connection = SqlConnectionManager.createInstance();

  try {
    let resBody = req.body as Product;
    await SqlConnectionManager.initialiseInstance(connection);
    let product: Product = await ProductService.createOrUpdateProduct(connection, resBody);

    res.status(HTTPStatusCodes.OK).json(product);

  } catch (error) {
    console.error(error);
    res.status(HTTPStatusCodes.BAD_REQUEST).json(error);

  } finally {
    console.info('connection closed');
    await SqlConnectionManager.closeInstance(connection);
  }
}

export const deleteProductById = async (req: Request, res: Response) => {
  const connection = SqlConnectionManager.createInstance();

  try {
    const productId = parseInt(req.params.id);
    await SqlConnectionManager.initialiseInstance(connection);
    const deletedProduct = await ProductService.deleteProductById(connection, productId);

    if (deletedProduct.affected === 1) {
      res.status(HTTPStatusCodes.OK).json(deletedProduct);
    } else {
      res.status(HTTPStatusCodes.NOT_FOUND).json(`Could not find a product by id: ${productId}.`);
    }

  } catch (error) {
    console.error(error);
    res.status(HTTPStatusCodes.BAD_REQUEST).json(error);

  } finally {
    console.info('connection closed');
    await SqlConnectionManager.closeInstance(connection);
  }
}

export const createBulkProducts = async (req: Request, res: Response) => {
  let connection = SqlConnectionManager.createInstance();

  try {
    readProductsFromCSV(req.file.path).then(async (bulkProducts: Product[]) => {
      await SqlConnectionManager.initialiseInstance(connection);
      const products = await ProductService.createBulkProducts(connection, bulkProducts);
      res.status(HTTPStatusCodes.CREATED).json(products);
    }).catch(error => {
      console.error(error);
    });

  } catch (error) {
    console.error(error);
    res.status(HTTPStatusCodes.BAD_REQUEST).json(error);

  } finally {
    console.info('connection closed');
    await SqlConnectionManager.closeInstance(connection);
  }
}