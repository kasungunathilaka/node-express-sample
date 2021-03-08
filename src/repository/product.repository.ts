import { Connection } from "typeorm";
import { Product } from "../models/product.model";

export class ProductRepository {

  public static async getAllProducts(connection: Connection) {
    return await connection
      .getRepository(Product)
      .createQueryBuilder("product")
      .leftJoinAndSelect("product.brand", "brand")
      .getMany()
      .catch((error) => {
        throw error;
      });
  }

  public static async getProductById(connection: Connection, id: number) {
    return await connection
      .getRepository(Product)
      .findOne({
        where: { id: id },
        relations: ["brand"]
      })
      .catch((error) => {
        throw error;
      });
  }

  public static async createOrUpdateProduct(connection: Connection, product: Product) {
    return await connection
      .getRepository(Product)
      .save(product)
      .catch((error) => {
        throw error;
      });
  }

  public static async deleteProductById(connection: Connection, id: number) {
    return await connection
      .createQueryBuilder()
      .delete()
      .from(Product)
      .where("id = :id", { id: id })
      .execute()
      .catch((error) => {
        throw error;
      });
  }

  public static async createBulkProducts(connection: Connection, products: Product[]) {
    return await connection
      .getRepository(Product)
      .save(products)
      .catch((error) => {
        throw error;
      });
  }

}