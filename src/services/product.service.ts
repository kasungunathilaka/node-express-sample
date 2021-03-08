import { Connection } from "typeorm";
import { Product } from "../models/product.model";
import { ProductRepository } from "../repository/product.repository";

export class ProductService {

  public static async getAllProducts(connection: Connection) {
    return await ProductRepository.getAllProducts(connection);
  }

  public static async getProductById(connection: Connection, id: number) {
    return await ProductRepository.getProductById(connection, id);
  }

  public static async createOrUpdateProduct(connection: Connection, product: Product) {
    return await ProductRepository.createOrUpdateProduct(connection, product);
  }

  public static async deleteProductById(connection: Connection, id: number) {
    return await ProductRepository.deleteProductById(connection, id);
  }

  public static async createBulkProducts(connection: Connection, products: Product[]) {
    return await ProductRepository.createBulkProducts(connection, products);
  }

}